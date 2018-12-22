 
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

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
      let trainName= $("#train-name-input").val().trim();
      let trainDestination= $("#destination-input").val().trim();
      let startTime= $("start-time-input").val().trim();
      let trainFrequency= $("frequency-input").val().trim();

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
  });

  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());
      let trainName = childSnapshot.val().train;
      let trainDestination = childSnapshot.val().destination;
      let startTime = childSnapshot.val().start;
      let trainFrequency = childSnapshot.val().frequency;

      console.log(trainName);
      console.log(trainDestination);
      console.log(startTime);
      console.log(trainFrequency);

      
  })