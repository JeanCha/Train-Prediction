$(document).ready(function() {

    // add remove button feature
    // add auto refresh feature

    var config = {
        apiKey: "AIzaSyAHLqI0-NWEPbOJiV69llkgZKCZeU1NIWQ",
    authDomain: "trainpredictions-f2a6a.firebaseapp.com",
    databaseURL: "https://trainpredictions-f2a6a.firebaseio.com",
    projectId: "trainpredictions-f2a6a",
    storageBucket: "trainpredictions-f2a6a.appspot.com",
    messagingSenderId: "957449280190",
    appId: "1:957449280190:web:2c784d54f962a0f3"
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();


    
    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var firstTrain = $('#trainTime').val().trim();
        var trainFreq = $('#trainFreq').val().trim();
        
        var trainUpdate = {
            
            name: trainName,
            place: destination,
            firstTrain: firstTrain,
            frequency: trainFreq
        }
        
        database.ref().push(trainUpdate);
        
        
        $('form')[0].reset();
        
    });
    
    database.ref().on("child_added", function(childSnapshot) {
        
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().place;
        var firstTrain = childSnapshot.val().firstTrain;
        var trainFreq = childSnapshot.val().frequency;
        
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        
        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format( "HH:mm"));

        // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
       
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
  
        // var tRemainder = diffTime % trainFreq;
        // console.log(tRemainder);

        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);


        // var minsTillTrain = trainFreq - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + minsTillTrain);

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        
        // var nextTrain = moment().add(minsTillTrain, "minutes");
        // console.log("ARRIVAL TIME: "  + moment(nextTrain).format("HH:mm"));

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
        
        // var nextTrainFormated = moment(nextTrain).format("HH:mm");
        
        // var newTrain = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + nextTrainFormated + "</td><td>" + minsTillTrain  + "</td></tr>";

        $("table tbody").append(newTrain);
        
    });
    
    $('#backToTop').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate({scrollTop:0}, '500');
        
    });

});
