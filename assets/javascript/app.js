$(document).ready(function() {





var firebaseConfig = {
    apiKey: "AIzaSyDw_WXfcHyQgXpH9vpvEVXLMvD6AqYDr4U",
    authDomain: "train-scheduler-53a2b.firebaseapp.com",
    databaseURL: "https://train-scheduler-53a2b.firebaseio.com",
    projectId: "train-scheduler-53a2b",
    storageBucket: "train-scheduler-53a2b.appspot.com",
    messagingSenderId: "778147745819",
    appId: "1:778147745819:web:a984a76296781efe8968be"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName
var destination
var frequency
var nextArrival
var minutesAway

database.ref().on("value", function(snapshot) {



});







});