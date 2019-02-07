'use strict';

/* Leaflet Map Scripts */

var map = L.map('map').setView([16.9459, 97.9593], 6);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
            }).addTo(map);
//Variables
var toggleKayin = false;
var toggleTownships = false;
var toggleVillages = false;
var toggleBasins = false;
/* Map Functions */

// Displays an popup on the map.
function kayinState (feature,layer){
    layer.bindPopup("<h1> Kayin State </h1> <p> You clicked an area inside of Kayin State </p>");
};
//Villages popup
function kayinVillages (feature,layer){
    layer.bindPopup("<h1> Village of "+feature.properties.NAME_3+". </h1>");
};
//Township popup
function kayinTownship (feature,layer){
    layer.bindPopup("<h1> Tonwship: "+feature.properties.VARNAME_2+". </h1>");
};
//Basin popup
function kayinBasin (feature,layer){
    layer.bindPopup("<h1> Basin </h1>");
};

//Calls kayinState function when the layer is clicked.
var kayinLayer = new L.geoJson(Kayin, {
    onEachFeature: kayinState
    }).addTo(map);

var kayin_villagesLayer = new L.GeoJSON(Kayin_villages, {
    onEachFeature: kayinVillages
    });      

var kayin_townshipsLayer = new L.GeoJSON(Kayin_townships, {
    onEachFeature: kayinTownship
    });     

var kayin_basinsLayer = new L.GeoJSON(kayin_basins, {
    onEachFeature: kayinBasin
    });

/* Toggle Layers Functions */
function toggleKayinLayer() {
  if(!toggleKayin) {
    map.removeLayer(kayinLayer);
    document.getElementById("kayinBtn").style.background = 'white';
    document.getElementById("kayinBtn").style.color = 'black'
  } else {
    map.addLayer(kayinLayer);
    document.getElementById("kayinBtn").style.background = '#4CAF50';
    document.getElementById("kayinBtn").style.color = 'white'
  }
  toggleKayin = !toggleKayin;
};

function toggleVillagesLayer() {
  if(!toggleVillages) {
    map.removeLayer(kayin_villagesLayer);
    document.getElementById("villagesBtn").style.background = 'white';
    document.getElementById("villagesBtn").style.color = 'black'
  } else {
    map.addLayer(kayin_villagesLayer);
    document.getElementById("villagesBtn").style.background = '#4CAF50';
    document.getElementById("villagesBtn").style.color = 'white'
  }
  toggleVillages = !toggleVillages;
};

function toggleTownshipsLayer() {
  if(!toggleTownships) {
    map.removeLayer(kayin_townshipsLayer);
    document.getElementById("townshipsBtn").style.background = 'white';
    document.getElementById("townshipsBtn").style.color = 'black'
  } else {
    map.addLayer(kayin_townshipsLayer);
    document.getElementById("townshipsBtn").style.background = '#4CAF50';
    document.getElementById("townshipsBtn").style.color = 'white'
  }
  toggleTownships = !toggleTownships;
};

function toggleBasinsLayer() {
  if(!toggleBasins) {
    map.removeLayer(kayin_basinsLayer);
    document.getElementById("basinsBtn").style.background = 'white';
    document.getElementById("basinsBtn").style.color = 'black'
  } else {
    map.addLayer(kayin_basinsLayer);
    document.getElementById("basinsBtn").style.background = '#4CAF50';
    document.getElementById("basinsBtn").style.color = 'white'
  }
  toggleBasins = !toggleBasins;
};
