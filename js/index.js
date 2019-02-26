'use strict';

//Variables

var kwh_hh = document.getElementById("hh_kwh").value;
var kwh_person = document.getElementById("person_kwh").value;
var lastVillage;

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.satellite',
accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
}),
streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
});

/* Electricity demand functions */
// Per household
function demand(){
  var tempHh = document.getElementById("hh_kwh").value;
  var tempPerson = document.getElementById("person_kwh").value;
  var tempPop = document.getElementById("vpop").value;
  var tempHouseholds = document.getElementById("households").value;

  var hhResult = tempHh * tempHouseholds;
  var personResult = tempPerson * tempPop;

  document.getElementById("content").innerHTML = "Village name: " + lastVillage.feature.properties.Village +"<br>\ Population: " + lastVillage.feature.properties.Village_Po + "<br>\
      State: "+ lastVillage.feature.properties.State + "<br>\ District: " + lastVillage.feature.properties.District + "<br>\ Township: " + lastVillage.feature.properties.Township + "<br>\
      Village Tract: " + lastVillage.feature.properties.VillageTra +" <br>\ Number of households: " + lastVillage.feature.properties.Village_HH + "<br>\ Total household kWh demand: " + hhResult +
      " kWh <br>\ Total population kWh demand: " + personResult + " kWh";

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

/* Map interactivity for each layer. */

var districtLayer = new L.geoJson(districts, {
  onEachFeature: function (feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = e.target.feature.properties.NAME_2 + ", " + e.target.feature.properties.NAME_0;
      hideInputs();
  })}
});  

var townshipLayer = new L.GeoJSON(townships, {
  style: {
    stroke: 1,
    fillOpacity: 0,
    color: "red"
  },
  onEachFeature: function(feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "Township of " + e.target.feature.properties.NAME_3;
      tInput(e.target.feature.properties.NAME_3);
    })}
  });     

var townLayer = new L.GeoJSON(city_town, {
  pointToLayer: function (feature, latlng) {
    return new L.circle(latlng, {radius: 5, color: "black"});
  },
  onEachFeature: function(feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "Town name: " + e.target.feature.properties.City__Town;
      hideInputs();
    })}
  });

var riversLayer = new L.GeoJSON(rivers, {
  onEachFeature: function(feature,layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "River Reach id: " + e.target.feature.properties.Reach_ID;
      rInput(e.target.feature.properties.Reach_ID);
    })}
});

var villagePoints = new L.GeoJSON (village_points, {
  //icon: dotIcon,
  pointToLayer: function (feature, latlng) {
    return new L.circle(latlng, {radius: 5 });
  },
  onEachFeature: function (feature, layer){
    layer.on('click', function (e){
      lastVillage = e.target;
      vInput(lastVillage.feature.properties.Village, lastVillage.feature.properties.Village_Po, lastVillage.feature.properties.Village_HH);
      demand();
    })}
});

// Map types, satellite or street view.
var baseMaps = {
"Satellite": satellite,
"Streets": streets
};

// Initializing the map
var map = L.map('map', {
  center: [20.78919, 97.03776],
  zoom: 7,
  maxZoom: 14,
  minZoom: 6,
  layers: [streets, villagePoints]
});

//Layers
var overlayMaps = {
  "Districts" : districtLayer,
  "Townships": townshipLayer,     
  "Towns": townLayer,
  "Rivers": riversLayer,
  "Villages": villagePoints
  };


//Adds layer control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(map);

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
}

personSlider.oninput = function() {
  personOutput.innerHTML = this.value;
  demand();
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

