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


database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().trainNameDb;
    var destination = childSnapshot.val().destinationDb;
    var frequency = childSnapshot.val().frequencyDb;
    var firstTrainTime = childSnapshot.val().firstTrainTimeDb;

    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    
   var nextTrain = moment().add(minutesAway, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    var newTableEntry = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(childSnapshot.val().destinationDb),
        $("<td>").text(childSnapshot.val().frequencyDb),
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(minutesAway)
        
    );
    $("#table > tbody").append(newTableEntry);

    

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);

});

$("#submit-button").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequency = parseInt($("#frequency").val().trim());

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var trainData = {
        trainNameDb: trainName,
        destinationDb: destination,
        firstTrainTimeDb: firstTrainTime,
        frequencyDb: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    database.ref().push(trainData);
    // $("#train-name")[0].reset();
});

});