'use strict';

//Variables

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

function vInput(name) {
  document.getElementById("villageInputs").style.display = "block";
  document.getElementById("vpop").value = "";
  document.getElementById("vpop").placeholder ="Population of "+name;
  document.getElementById("kayinInputs").style.display = "none";
  document.getElementById("basinInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
}

function kInput(){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("kayinInputs").style.display = "block";
  document.getElementById("basinInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
}

function tInput(name){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("kayinInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "block";
  document.getElementById("tpop").value = "";
  document.getElementById("tpop").placeholder ="Population of "+name;
  document.getElementById("basinInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
}

function bInput(id){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("kayinInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "none";
  document.getElementById("bflow").value = "";
  document.getElementById("bflow").placeholder ="Total waterflow of the basin. Selected Basin HYBAS_ID: "+id;
  document.getElementById("basinInputs").style.display = "block";
}

function rInput(id){
  document.getElementById("villageInputs").style.display = "none";
  document.getElementById("kayinInputs").style.display = "none";
  document.getElementById("townshipInputs").style.display = "none";
  document.getElementById("riverInputs").style.display = "block";
  document.getElementById("rflow").value = "";
  document.getElementById("rflow").placeholder ="Waterflow average of River segment "+id;
  document.getElementById("basinInputs").style.display = "none";
}

//Calls kayinState function when the layer is clicked.
var kayinLayer = new L.geoJson(Kayin, {
  onEachFeature: function (feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = e.target.feature.properties.NAME_1 + ", " +e.target.feature.properties.NAME_0;
      kInput();
  })}
});

var kayin_villagesLayer = new L.GeoJSON(Kayin_villages, {
  onEachFeature: function(feature, layer) {
    layer.on('click', function (e){
    document.getElementById("content").innerHTML = "Village of " +e.target.feature.properties.NAME_3;
    console.log(e.target.feature.properties.NAME_3);
    vInput(e.target.feature.properties.NAME_3);
  })}
});      

var kayin_townshipsLayer = new L.GeoJSON(Kayin_townships, {
  onEachFeature: function(feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "Township of " +e.target.feature.properties.VARNAME_2;
      console.log(e.target.feature.properties.VARNAME_2);
      tInput(e.target.feature.properties.VARNAME_2);
    })}
  });     

var kayin_basinsLayer = new L.GeoJSON(kayin_basins, {
  onEachFeature: function(feature, layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "Basin HYBAS ID: "+e.target.feature.properties.HYBAS_ID;
      console.log(e.target.feature.properties.HYBAS_ID);
      bInput(e.target.feature.properties.HYBAS_ID);
    })}
  });

var riversLayer = new L.GeoJSON(rivers, {
  onEachFeature: function(feature,layer){
    layer.on('click', function (e){
      document.getElementById("content").innerHTML = "River Reach id: "+e.target.feature.properties.Reach_ID;
      rInput(e.target.feature.properties.Reach_ID);
    })}
});

// Displays an popup on the map.
function kayinState (feature,layer){
  layer.bindPopup("<h1> Kayin State </h1> <p> You clicked an area inside of Kayin State </p>");
};

var baseMaps = {
"Satellite": satellite,
"Streets": streets
};

var overlayMaps = {
"Kayin" : kayinLayer,
"Villages": kayin_villagesLayer,
"Townships": kayin_townshipsLayer,     
"Basins": kayin_basinsLayer,
"Rivers": riversLayer
};

var map = L.map('map', {
  center: [16.9459, 97.9593],
  zoom: 7,
  maxZoom: 14,
  minZoom: 6,
  layers: [streets, kayinLayer]
});

L.control.layers(baseMaps, overlayMaps).addTo(map);

