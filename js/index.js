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

// Basemap options
var satellite = L.tileLayer.provider('MapBox', {
maxZoom: 18,
id: 'mapbox.satellite',
accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
}),
streets = L.tileLayer.provider('MapBox', {
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
}),
mapnik = L.tileLayer.provider('OpenStreetMap',{
  maxZoom: 18,
}),
topomap = L.tileLayer.provider('OpenTopoMap',{
  maxZoom: 18
});

/* Graphs */
// set the dimensions and margins of the graph
var margin = {top: 5, right: 10, bottom: 35, left: 50},
    width = 320 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;



function drawLoadProfile(data) {

  d3.select("#temp").remove();
  var svg = d3.select("#box")
  .append("svg")
    .attr("id", "temp")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    //.domain(d3.max(data, function(d) { return d.Time; }))
    .domain([0, d3.max(data, function(d) { return +d.hour; })])
  .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("hour");

  // Add Y axis

    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { 
      var var1 = d.households*totalHHdemand;
      var var2 = d.public_utilities*totalPublicDemand;
      var var3 = d.productive_uses*totalProductiveDemand;
      var var1max = Math.max(var1);
      var var2max = Math.max(var2);
      var var3max = Math.max(var3);
      var maxim = Math.max(var1max,var2max,var3max)
      return maxim+2; })])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y));
  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#2eb2ff")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.hour) })
      .y(function(d) { return y(d.households*totalHHdemand) }))
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("kWh"); 

// Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#323451")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.hour) })
      .y(function(d) { return y(d.public_utilities*totalPublicDemand) })
      )
// Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#e05a47")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.hour) })
      .y(function(d) { return y(d.productive_uses*totalProductiveDemand) })
      )

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

  document.getElementById("content").innerHTML = "Village name: " + lastVillage.feature.properties.Village +"<br>\ Population: " + lastVillage.feature.properties.Village_Po + "<br>\
      State: "+ lastVillage.feature.properties.State + "<br>\ District: " + lastVillage.feature.properties.District + "<br>\ Township: " + lastVillage.feature.properties.Township + "<br>\
      Village Tract: " + lastVillage.feature.properties.VillageTra +" <br>\ Number of households: " + lastVillage.feature.properties.tempHouseholds + "<br>\ Total household kWh demand: " + totalHHdemand +
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

/* Map interactivity for each layer. */

var districtLayer = new L.geoJson(districts, {
  style: {
    stroke: 1,
    fillOpacity: 0,
    color: "black"
  },
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
      d3.select("#temp").empty();
      drawLoadProfile(load_profiles);
    })}
});

// Basemaps: satellite or street view.
var baseMaps = {
"Satellite": satellite,
"Streets": streets,
"OSM.mapnik" : mapnik,
"TopoMap" : topomap
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
  drawLoadProfile(load_profiles);
}

householdNro.oninput = function(e){
  demand(e);
  drawLoadProfile(load_profiles);
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

console.log(load_profiles);