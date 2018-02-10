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