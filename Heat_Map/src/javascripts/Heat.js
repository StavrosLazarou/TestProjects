import HeatmapOverlay from 'leaflet-heatmap'

var data_heat=[];

// Heatmap Confinguration
var HeatMap_config = {
	"radius": 3,
	"maxOpacity": 0.4,
	"scaleRadius": true, 	// scales the radius based on map zoom 
	// if set to false the heatmap uses the global maximum for colorization
	// if activated: uses the data maximum within the current map boundaries
	//   (there will always be a red spot with useLocalExtremas true)
	"useLocalExtrema": false,
	// which field name in your data represents the latitude - default "lat"
	latField: 'lat',
	// which field name in your data represents the longitude - default "lng"
	lngField: 'lng',
	// which field name in your data represents the data value - default "value"
	valueField: 'weight'
};

async function InitialHeatLayer(){
	// JQuery - Fecth heat layer data from jsonbin.  
	try{ 
	  await $.ajax({
		beforeSend: function(request) {
		  request.setRequestHeader("secret-key", "$2b$10$RD7000C7VhWDHr5iZpWPLO9/0apVA81ZHwUMirSE5udLcBoUOAwnC");
		},
		  datatype:"json",
		  url: "https://api.jsonbin.io/b/6030db1cd677700867e56b71/1",
		  success : function(data){
				L.geoJSON(data,{onEachFeature: function getHeatValues(feature,layer){
					// Extract specific data from geojson file.
					let lat=feature.geometry.coordinates[1];
					let lng=feature.geometry.coordinates[0];
					let weight=feature.properties.weight;
					data_heat.push({lat,lng,weight}); // Update data_heat list.
				} });
		    } 
	    })
	}catch(err){
	  console.error("Heat data Error: "+err.responseJSON.message);
	}
	
	// Heat Data Object.
	const Data = {
		max: 8,
		min:1,
		data: data_heat
	};

	var heatmapLayer = new HeatmapOverlay(HeatMap_config); // Create heat map layer.
	heatmapLayer.setData(Data); // Add data to the heat map layer.

	// Return heat map layer
	return heatmapLayer;
}

export {InitialHeatLayer};