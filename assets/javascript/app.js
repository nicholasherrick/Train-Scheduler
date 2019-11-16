// Wait for HTML to load
$(document).ready(function() {

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDw_WXfcHyQgXpH9vpvEVXLMvD6AqYDr4U",
    authDomain: "train-scheduler-53a2b.firebaseapp.com",
    databaseURL: "https://train-scheduler-53a2b.firebaseio.com",
    projectId: "train-scheduler-53a2b",
    storageBucket: "train-scheduler-53a2b.appspot.com",
    messagingSenderId: "778147745819",
    appId: "1:778147745819:web:a984a76296781efe8968be"
};

// Initialize firebase data storage
firebase.initializeApp(firebaseConfig);

// Created firebase database variable
var database = firebase.database();

// Run this function when a new data object is added to firebase database
database.ref().on("child_added", function(childSnapshot) {

    // Variables named for each piece of database information
    var trainName = childSnapshot.val().trainNameDb;
    var destination = childSnapshot.val().destinationDb;
    var frequency = childSnapshot.val().frequencyDb;
    var firstTrainTime = childSnapshot.val().firstTrainTimeDb;

    // Makes a moment.js moment out of the first train time and takes a year off so that moment.js shows it before current time
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    // Created a variable "right now" in moment.js
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Variable that finds the diffrence between the current time and the train arriving 1 year ago
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Variable that finds the time remaining of the next train by taking the time diffrence from the previous variable and taking the division remainder of the train's frequency (%)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Variable that finds the minutes until the next train arrives by using the train's arrival frequency and subtracting the time remainder
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    
    // Variable that finds the time the next train will arrive byu taking the current moment an adding how many minutes away the next train is to it. Then we console log it telling it to use am/pm time format
   var nextTrain = moment().add(minutesAway, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    // Creates a new table row with all the info needed about the train
    var newTableEntry = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        // Displays time next train will arive in hours/minutes with am/pm format
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(minutesAway),
    );
    // Append new row to the table body
    $("#table > tbody").append(newTableEntry);

    
    // Console log any errors with firebase
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);

});

// Function that will add the typed in form data to the data base on click of the submit button
$("#submit-button").on("click", function(event) {
    event.preventDefault();

    // Turns the form inputs into variables
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequency = parseInt($("#frequency").val().trim());

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Makes our data inputs into an object that can be pushed.
    var trainData = {
        trainNameDb: trainName,
        destinationDb: destination,
        firstTrainTimeDb: firstTrainTime,
        frequencyDb: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    // .push our data object so that it creates an individual section in firebase that can be used and modified separately from other data objects
    database.ref().push(trainData);

    // Clears the forms after the submit
    $(".form-control").val("");
});

});