$(document).ready(function () {
    let currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    let config = {
        apiKey: "AIzaSyDAO2_Kn7k2poFBY-JAuqihgww4ivTZOJA",
        authDomain: "train-scheduler-82ade.firebaseapp.com",
        databaseURL: "https://train-scheduler-82ade.firebaseio.com",
        projectId: "train-scheduler-82ade",
        storageBucket: "train-scheduler-82ade.appspot.com",
        messagingSenderId: "718855778516"
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        let trainName = $("#train-name-input").val().trim();
        let trainDestination = $("#destination-input").val().trim();
        let startTime = $("start-time-input").val().trim();
        let trainFrequency = $("frequency-input").val().trim();

        let newTrain = {
            train: trainName,
            destination: trainDestination,
            start: startTime,
            frequency: trainFrequency
        };
        database.ref().push(newTrain);
        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.frequency);

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#start-time-input").val("");
        $("#frequency-input").val("");

        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val());
            let trainName = childSnapshot.val().train;
            let trainDestination = childSnapshot.val().destination;
            let startTime = childSnapshot.val().start;
            let trainFrequency = childSnapshot.val().frequency;

            console.log(trainName);
            console.log(trainDestination);
            console.log(startTime);
            console.log(trainFrequency);

            let currentTime = moment();
            console.log("Current Time: " + moment(currentTime).format("HH:mm"));

            let diffTime = moment().diff(moment(startTime), "minutes");
            console.log("difference in time :" + diffTime);

            let tRemainder = diffTime % trainFrequency;
            console.log(tRemainder);

            let tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("minutes till train: " + tMinutesTillTrain);

            let nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("arrival time:" + moment(nextTrain).format("HH:mm"));

            let newRow= $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(trainDestination),
                $("<td>").text(startTime),
                $("<td>").text(trainFrequency),
                $("<td>").text(nextTrain),
                $("<td>").text(tMinutesTillTrain),
            );

            $("#train-table > tbody").append(newRow);

        })
    });

});
