import { InitialMap } from "./CreateMap.js";
import {InitialHeatLayer} from "./Heat";

$(document).ready(function(){
    const mapInst=InitialMap(); // Initialize map.
    InitialHeatLayer().then(function(HLayer){ // Initialise heat layer and then add it to the map.
        HLayer.addTo(mapInst);
    });
});