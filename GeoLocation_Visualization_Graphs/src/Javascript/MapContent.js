import 'regenerator-runtime/runtime'; // For working properly with Parcel Js 
import { PieChartData1 , PieChartData2 , pieChart, UpdateData } from "./PieChart";

// Initialize variables
var geojsonData1; 
var mymap;
var PiePointM;
var BarPointM;
var URLS={"Pie":"https://api.jsonbin.io/b/602d56c20665b21b00b90378","Bar":"https://api.jsonbin.io/b/602e40424177c81b39c7dea5"};

async function loadDataSets(type) {
  //JQuery , Fetch map data from jsonbin 
  // If it success the geojsonData1 get the value of response text. 
  try{ 
    await $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("secret-key", "$2b$10$RD7000C7VhWDHr5iZpWPLO9/0apVA81ZHwUMirSE5udLcBoUOAwnC");
      },
        datatype:"json",
        url: URLS[type],
        success : function(data){
          geojsonData1 = data;
        } 
    })
  }catch(err){
    console.error("Data Set Error: "+err.responseJSON.message);
  }

  if (type == "Pie"){
    //Create a layer group for the pie markers.
    PiePointM = L.layerGroup([ L.geoJSON(geojsonData1, {
      pointToLayer : addMarkers,
      onEachFeature : getPopups
      })
    ]);

    // Draw the pie markers on the map.
    PiePointM.addTo(mymap);

  }else if (type=="Bar"){

    // Create a layer group for the bar markers
    BarPointM = L.layerGroup([ L.geoJSON(geojsonData1, {
      pointToLayer : addMarkers,
      onEachFeature : getPopups
      })
    ]);
    // Draw the bar markers on the map.
    BarPointM.addTo(mymap);
  
  }
}

// Check if json entry is of Point type and if has a name property. If it does , run UpdateData function.
function getPopups(feature, layer) {
  if (feature.geometry.type == "Point"  && feature.properties.name == "Brazil" ) {
    layer.on('click',function(e){
      UpdateData(pieChart,PieChartData1);
    });

  }else if(feature.geometry.type == "Point"  && feature.properties.name == "Egypt" ) {
    layer.on('click',function(e){
      UpdateData(pieChart,PieChartData2);
    });

  }
}


// Create Markers.
function addMarkers(feature, latlng) {
    return new L.Marker(latlng, {
    color: feature.properties["marker-color"]
    });    
};

// filter out the markers from "bar Project" by id.
function filterbyID(filterValue){
  BarPointM=L.layerGroup([ L.geoJSON(geojsonData1, {
    pointToLayer : addMarkers,
    onEachFeature : getPopups,
    filter: function(feature, layer) {
      if (feature.properties.id == filterValue){
        BarPointM.clearLayers(); // clear all markers.
        return feature.properties.id 
      }
    }
  })]).addTo(mymap);
};

// Reset filter applied to markers.
function resetFilters(filterValue){
  BarPointM=L.layerGroup([ L.geoJSON(geojsonData1, {
    pointToLayer : addMarkers,
    onEachFeature : getPopups,
    filter: function(feature, layer) {
        BarPointM.clearLayers(); // clear all markers. if we don't use "clear" then we have duplicate some markers.
        return feature.properties.id
    }
  })]).addTo(mymap);
}

// Hide a layer from the map.
function DisableLayer(hide){
 
  if(mymap.hasLayer(hide)) {
    mymap.removeLayer(hide);
  }

}

// Swap the given map layers.
function SwapLayers(hide,show){
  if(mymap.hasLayer(hide)){
      DisableLayer(hide);
      mymap.addLayer(show);
  }

}

// Initialize the map
function InitMap(){
  // Create a map Object, with  minimum Zoom and starting zoom level.
  mymap = L.map('MapCanvas', { 
    minZoom: 2 ,
    zoom : 3
  });

  try {
    // Load Tiles from OpenStreetmap.org
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  }catch(error){
    console.error(error.message);
  }

  // Set the Initial placement and the zoom level
  mymap.setView([0, 0]);

  // Draw the tiles to map
  tiles.addTo(mymap);

  // Draw a scale indicator on the map
  L.control.scale().addTo(mymap);

};

export {loadDataSets, InitMap, filterbyID ,resetFilters,mymap,PiePointM,BarPointM,SwapLayers,DisableLayer};