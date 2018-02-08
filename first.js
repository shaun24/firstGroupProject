// Initialize Firebase
var config = {
    apiKey: "AIzaSyCUO5Q9tA9ekZJxRacbLTURSbZ7WoPhOIU",
    authDomain: "moody-weather.firebaseapp.com",
    databaseURL: "https://moody-weather.firebaseio.com",
    projectId: "moody-weather",
    storageBucket: "",
    messagingSenderId: "118065785801"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#weatherInput").val();
    var queryURL = "http://api.wunderground.com/api/397251ff2fe9bd69/conditions/q/" + city + ".json";
    var tempf = ['current_observation'];
    var weatherView = $("#weatherView");
    var weatherData = $("#weatherView").val();
    database.ref().set({
      cityTest: city
    });
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      $("#weatherInput").val('');
      var typeOfWeather = response.current_observation.weather;
      weatherView.text(JSON.stringify(typeOfWeather));
      $("#tempView").text(JSON.stringify(response.current_observation.temp_f));
      weatherData = weatherData + typeOfWeather;
      console.log(weatherData);
      console.log(response);
      console.log(response.current_observation.temp_f);
      movieAPI(weatherData);
    })


    function movieAPI(weatherType) {
      console.log(weatherType);
      var queryURL2 = "http://www.omdbapi.com/?i=tt3896198&s=" + weatherType + "&apikey=869ed286"; //poster NA
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {


        if (response.Response == "False") {
          alert("PICK BETTER WEATHER!");
        } else {
          for (var i = 0; i < 2; i++) {
            console.log(queryURL2);
            console.log(response);
            $("#weatherInput").text(JSON.stringify(response));
            //$("#movieLog").text(JSON.stringify(response.Title + response.Rated));
            console.log(queryURL2);
            var movieDiv = $("<div class='movie'>")
            var title = response.Search[i].Title;
            var titleDOM = $("<p>").text("Title: " + title);
            movieDiv.append(titleDOM);

            var year = response.Search[i].Year;
            var ratingDOM = $("<p>").text("Rating: " + year);
            var imgURL = response.Search[i].Poster;
            //if statement
            var poster = $("<img>").attr("src", imgURL);
            movieDiv.append(poster);
            $("#movieLog").prepend(movieDiv);
          }
        };
      });
    }
  });
  