$(document).ready(function(){
	initTrainsList();
});

 var config = {
    apiKey: "AIzaSyAm2Z7x9Njm9e1FTGC_Xx7VZX5YoEKR1X0",
    authDomain: "trains-homework2.firebaseapp.com",
    databaseURL: "https://trains-homework2.firebaseio.com",
    storageBucket: "trains-homework2.appspot.com",
    messagingSenderId: "384980351872"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trains = [];

function initTrainsList() {

	console.log("initializing trains list");

   // we should get data from firebase database and initialize trains
   // data.
   // after initilizing addTrainsToPage
   
   // for now we are initlaizing static data
   var tmpTrain = { "name" : "San Diego", 
   "destination" : "Los Angeles", 
   "startTime" : "0600",
   "frequency" : "40"
};
if (trains.length == 0)
{
	trains.push(tmpTrain);
}

addTrainsToPage();

};



function addTrainsToPage() {
	$("#trainRows tr").remove();
	for (var i=0; i < trains.length; i++)
	{

		var train = trains[i];
		var elem = $("<tr>");
		var td1 = $("<td>").text(train["name"]);
		var td2 = $("<td>").text(train["destination"]);
		var td3 = $("<td>").text(train["frequency"]);


		var nextTrainTime = nextArrivalTime(train["startTime"], train["frequency"]);
		var td4 = $("<td>").text(nextTrainTime);
		elem.append(td1);
		elem.append(td2);
		elem.append(td3);
		elem.append(td4);

		$("#trainRows").append(elem);
	}
};

function writeUserData(trainName, destination, startTime, frequency) {
	firebase.database().ref('trains/' + trainName).set({
		"trainName": trainName,
		"destination": destination,
		"startTime" : startTime,
		"frequency" : frequency
	});
}

$("#addTrain").click(function(event){
	var tempName = $("#trainName").val();
	var tempDest = $("#trainDestination").val();
	var tempStartTime = $("#trainStartTime").val();
	var tempFrequency = $("#trainFrequency").val();
	var train = {};
	train["name"] = tempName;
	train["destination"] = tempDest;
	train["startTime"] = tempStartTime;
	train["frequency"] = tempFrequency;
	console.log(train);
	trains.push(train);

	if (tempName != null && tempName.length == 0) {

		alert("Train name, destination, and frequency is mandatory to add a train");
		event.stopPropagation();
		return;

	}
	
	console.log("New Train is: " + JSON.stringify(train));
	console.log("Trains List is:" + JSON.stringify(trains));

   writeUserData(tempName, tempDest, tempStartTime, tempFrequency);
	addTrainsToPage();
	event.stopPropagation();

});

function nextArrivalTime(startTime, frequency)
{
	// First identify the epoch time of the startTime
	console.log(startTime);
	// use moment to get the epoch time of the startTime

	// Then get current epoch time

	

	var currentTime = moment();
	currentTime.toNow();
	var nextTrainTime = moment({years: currentTime.get('y'), 
								months: currentTime.get('m'),
								days: currentTime.get('d'),
								hours: startTime,
								minutes: 0,
								seconds: 0}
								);
	while(nextTrainTime.diff(currentTime, 'minutes') < 0){
		nextTrainTime.add(frequency, 'minutes');
	}
	return nextTrainTime;
	
};

