'use strict';

//Variables

// Demand variables.
var kwh_hh = document.getElementById("hh_kwh").value;
var kwh_person = document.getElementById("person_kwh").value;
var householdNro = document.getElementById("households");
var popNro = document.getElementById("vpop");
var totalPublicDemand = document.getElementById("public_kwh").value;
var totalProductiveDemand = document.getElementById("productive_kwh").value;
var totalPdemand;
var totalHHdemand;
var lastVillage;

/* Graphs */
// set the dimensions and margins of the graph
var margin = {top: 5, right: 10, bottom: 35, left: 50},
    width = 320 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

/* TODO merge these Input functions into a single function */
/* The following xInput functions hides / displays relevant elements based on feature */
//defaults to general village info when village feature is selected
function vInput(lastVillage) {
  document.getElementById("villageInputs").style.display = "block";
  document.getElementById("hhAppliances").style.display = "none";
  document.getElementById("publicis").style.display = "none";
  document.getElementById("productiveis").style.display = "none";
  document.getElementById("vpop").value = lastVillage.feature.properties.Population;
  document.getElementById("vpop").placeholder = "Population of " + lastVillage.feature.properties.Name;
  document.getElementById("households").value = lastVillage.feature.properties.Village_HH;
  document.getElementById("households").placeholder = "Number of households:";
  document.getElementById("riverInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
}

function tInput(name){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "block";
  document.getElementById("tpop").value = "";
  document.getElementById("tpop").placeholder = "Population of " + name;
  document.getElementById("riverInputs").style.display = "none";
}

function rInput(id){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "block";
  document.getElementById("rflow").value = "";
  document.getElementById("rflow").placeholder ="Waterflow average of River segment " + id;
}

function hideInputs(){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
}
/* TODO merge show functions into one...
   Following show functions hides / displays relevant information based on nav icon clicked */

function showGvi(){
  document.getElementById("gvinav").style.display = "none";
  document.getElementById("hhnav").style.display = "inline-block";
  document.getElementById("publicnav").style.display = "inline-block";
  document.getElementById("productivenav").style.display = "inline-block";
  document.getElementById("hhAppliances").style.display = "none";
  document.getElementById("publicis").style.display = "none";
  document.getElementById("productiveis").style.display = "none";
  document.getElementById("gvi").style.display = "block";
}

function showHouseholds(){
  document.getElementById("gvinav").style.display = "inline-block";
  document.getElementById("hhnav").style.display = "none";
  document.getElementById("publicnav").style.display = "inline-block";
  document.getElementById("productivenav").style.display = "inline-block";
  document.getElementById("hhAppliances").style.display = "block";
  document.getElementById("publicis").style.display = "none";
  document.getElementById("productiveis").style.display = "none";
  document.getElementById("gvi").style.display = "none";
}

function showPublic(){
  document.getElementById("gvinav").style.display = "inline-block";
  document.getElementById("hhnav").style.display = "inline-block";
  document.getElementById("publicnav").style.display = "none";
  document.getElementById("productivenav").style.display = "inline-block";
  document.getElementById("hhAppliances").style.display = "none";
  document.getElementById("publicis").style.display = "block";
  document.getElementById("productiveis").style.display = "none";
  document.getElementById("gvi").style.display = "none";
}

function showProductive(){
  document.getElementById("gvinav").style.display = "inline-block";
  document.getElementById("hhnav").style.display = "inline-block";
  document.getElementById("publicnav").style.display = "inline-block";
  document.getElementById("productivenav").style.display = "none";
  document.getElementById("hhAppliances").style.display = "none";
  document.getElementById("publicis").style.display = "none";
  document.getElementById("productiveis").style.display = "block";
  document.getElementById("gvi").style.display = "none";
}

var hhSlider = document.getElementById("hh_kwh");
var hhOutput = document.getElementById("hhValue");
var personSlider = document.getElementById("person_kwh");
var personOutput = document.getElementById("personValue");
var publicSlider = document.getElementById("public_kwh");
var publicOutput = document.getElementById("publicValue");
var productiveSlider = document.getElementById("productive_kwh");
var productiveOutput = document.getElementById("productiveValue");
hhOutput.innerHTML = hhSlider.value;
personOutput.innerHTML = personSlider.value;
publicOutput.innerHTML = publicSlider.value;
productiveOutput.innerHTML = productiveSlider.value;

// Update the current slider value (each time you drag the slider handle)
hhSlider.oninput = function(e) {
  hhOutput.innerHTML = this.value;
  demand();
  drawLoadProfile( load_profiles, totalHHdemand);
  drawTotalDemand( totalHHdemand );
}

householdNro.oninput = function(e){
  demand(e);
  drawLoadProfile(load_profiles,totalHHdemand);
  drawTotalDemand( totalHHdemand );
}

popNro.oninput = function(e){
  demand(e);
}

personSlider.oninput = function(e) {
  personOutput.innerHTML = this.value;
  demand(e);
}

publicSlider.oninput = function(e) {
  publicOutput.innerHTML = this.value;
  demand(e);
  drawLoadProfile(load_profiles,totalHHdemand);
  drawTotalDemand( totalHHdemand );
}

productiveSlider.oninput = function(e) {
  productiveOutput.innerHTML = this.value;
  demand(e);
  drawLoadProfile(load_profiles,totalHHdemand);
  drawTotalDemand( totalHHdemand );
}

/* Electricity demand functions */
// Per household
function demand(){
  var tempHh = document.getElementById("hh_kwh").value;
  var tempPerson = document.getElementById("person_kwh").value;
  var tempPop = document.getElementById("vpop").value;
  var tempHouseholds = document.getElementById("households").value;

  totalHHdemand = tempHh * tempHouseholds;
  totalPdemand = tempPerson * tempPop;
  var grandTotal = totalHHdemand + parseFloat(publicSlider.value) + parseFloat(productiveSlider.value);

  document.getElementById("content").innerHTML = "Village name: " + lastVillage.feature.properties.Name +"<br>\ State: "+ lastVillage.feature.properties.State + ", District: " + lastVillage.feature.properties.District + "<br>\ "+
      " Township: " + lastVillage.feature.properties.Township + ", Village Tract: " + lastVillage.feature.properties.VillageTra +" <br>\ Population: " + lastVillage.feature.properties.tempPop + ", Number of households: " + tempHouseholds + "<br>\ " + 
      " Total household kWh demand: " + Math.round(totalHHdemand * 10) / 10 + " kWh, Total population kWh demand: " + Math.round(totalPdemand * 10) / 10 + " kWh <br>\ " +
      " Total public utilities usage: " + publicSlider.value + "kWh , Total productive usage: " + productiveSlider.value + " kWh <br>\ " + 
      " Total usage (households, public utilities and productive usage): " + Math.round(grandTotal * 10) / 10 + " kWh.";
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
