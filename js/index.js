'use strict';

//Leaflet Scripts

var map = L.map('map').setView([16.9459, 97.9593], 6);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
            }).addTo(map);

// Displays an popup on the map.
function kayinState (feature,layer){
    layer.bindPopup("<h1> Kayin State </h1><p> You clicked an area inside of Kayin State </p>");
};

//Calls kayinState function when the layer is clicked.
var kayinLayer = new L.geoJson(Kayin, {
    onEachFeature: kayinState
    }).addTo(map);

var kayin_villagesLayer = new L.GeoJSON(Kayin_villages);       
//kayin_villagesLayer.addTo(map);
var kayin_townshipsLayer = new L.GeoJSON(Kayin_townships);       
//kayin_townshipsLayer.addTo(map);
var kayin_basinsLayer = new L.GeoJSON(kayin_basins);
//kayin_basinsLayer.addTo(map);
