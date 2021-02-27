function InitialMap(){

  // Load Tiles from OpenStreetmap.org
  try {
    
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  }catch(error){
    
    console.error(error.message);
  
  }
    
  // Create a map Object, with minimum and starting zoom level.
  const mymap = L.map('MapCanvas', { 
    minZoom: 2 ,
    zoom : 3
  });

  // Add Tile Layer to the map.
  tiles.addTo(mymap);
  
  // Set The initial view of the map.
  mymap.setView([0,0]);
  
  // Draw a scale indicator on the map
  L.control.scale().addTo(mymap);

  //Return map object.
  return mymap;
}

export {InitialMap};