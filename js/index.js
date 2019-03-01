'use strict';

//Variables

// Demand variables.
var kwh_hh = document.getElementById("hh_kwh").value;
var kwh_person = document.getElementById("person_kwh").value;
var householdNro = document.getElementById("households")
var totalPdemand;
var totalHHdemand;
var totalPublicDemand = 200;
var totalProductiveDemand = 500;
var lastVillage;

/* Graphs */
// set the dimensions and margins of the graph
var margin = {top: 5, right: 10, bottom: 35, left: 50},
    width = 320 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

/* Electricity demand functions */
// Per household
function demand(){
  var tempHh = document.getElementById("hh_kwh").value;
  var tempPerson = document.getElementById("person_kwh").value;
  var tempPop = document.getElementById("vpop").value;
  var tempHouseholds = document.getElementById("households").value;

  totalHHdemand = tempHh * tempHouseholds;
  totalPdemand = tempPerson * tempPop;

  document.getElementById("content").innerHTML = "Village name: " + lastVillage.feature.properties.Village +"<br>\ Population: " + lastVillage.feature.properties.Village_Po + "<br>\
      State: "+ lastVillage.feature.properties.State + "<br>\ District: " + lastVillage.feature.properties.District + "<br>\ Township: " + lastVillage.feature.properties.Township + "<br>\
      Village Tract: " + lastVillage.feature.properties.VillageTra +" <br>\ Number of households: " + tempHouseholds + "<br>\ Total household kWh demand: " + totalHHdemand +
      " kWh <br>\ Total population kWh demand: " + totalPdemand + " kWh";

}

/* Input functions displays inputfields specific to a map layer clicked. */
function vInput(name, population, households) {
  document.getElementById("villageInputs").style.display = "block";
  document.getElementById("vpop").value = population;
  document.getElementById("vpop").placeholder ="Population of "+name;
  document.getElementById("households").value = households;
  document.getElementById("households").placeholder ="Number of households:";
  document.getElementById("riverInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  
}

function tInput(name){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "block";
  document.getElementById("tpop").value = "";
  document.getElementById("tpop").placeholder ="Population of "+name;
  document.getElementById("riverInputs").style.display = "none";
}

function rInput(id){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "block";
  document.getElementById("rflow").value = "";
  document.getElementById("rflow").placeholder ="Waterflow average of River segment "+id;
}

function hideInputs(){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
}

var hhSlider = document.getElementById("hh_kwh");
var hhOutput = document.getElementById("hhValue");
var personSlider = document.getElementById("person_kwh");
var personOutput = document.getElementById("personValue");
hhOutput.innerHTML = hhSlider.value; // Display the default slider value
personOutput.innerHTML = personSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
hhSlider.oninput = function(e) {
  hhOutput.innerHTML = this.value;
  demand(e);
  drawLoadProfile(load_profiles,totalHHdemand);
}

householdNro.oninput = function(e){
  demand(e);
  drawLoadProfile(load_profiles,totalHHdemand);
}

personSlider.oninput = function(e) {
  personOutput.innerHTML = this.value;
  demand(e);
}

/* Scaling markers ToDo
map.on('zoom', function(e) {
  var currentZoom = map.getZoom();

  //Update X and Y based on zoom level
  var mRadius = 3;

  switch(currentZoom) {
    case 6:
      mRadius = 3;
      break;
    case 7:
      mRadius = 4;
      break;
    case 8:
      mRadius = 5;
      break;
    case 9:
      mRadius = 6;
      break;
    case 10:
      mRadius = 7;
      break;
    case 11:
      mRadius = 8;
      break;
    case 12:
      mRadius = 9;
      break;
    case 13:
      mRadius = 10;
      break;
    case 14:
      mRadius = 11;
  }
  map.setOptions({
    radius: mRadius
  });
  map.redraw();
}); */
