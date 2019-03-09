'use strict'

var lastVillage;
var totalHHdemand;

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

pointToLayer: function (feature, latlng) {
    return new L.circle(latlng, {radius: 5 });
},
onEachFeature: function (feature, layer){
    layer.on('click', function (e){
    lastVillage = e.target;
    vInput(lastVillage);
    showGvi();
    demand();
    d3.select("#temp").empty();
    totalHHdemand = lastVillage.feature.properties.Village_HH * document.getElementById("hh_kwh").value;
    drawLoadProfile(load_profiles,totalHHdemand);
    drawTotalDemand(totalHHdemand);
    })}
});

// Basemaps: satellite or street view.
var baseMaps = {
    "Satellite": satellite,
    "Streets": streets,
    "Mapnik" : mapnik,
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
/* Search control for villages */
var searchControl = new L.Control.Search({
    layer: villagePoints,
    propertyName: 'Name',
    circleLocation: true
});

searchControl.on('search_locationfound', function (e) {
    vInput(lastVillage.feature.properties.Village, lastVillage.feature.properties.Village_Po, lastVillage.feature.properties.Village_HH);
    demand();
    d3.select("#temp").empty();
    totalHHdemand = lastVillage.feature.properties.Village_HH * document.getElementById("hh_kwh").value;
    drawLoadProfile(load_profiles,totalHHdemand);
    drawTotalDemand(totalHHdemand);

}).on('search_collapsed', function (e) {
});

//Adds layer and search control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(map);
map.addControl(searchControl);



