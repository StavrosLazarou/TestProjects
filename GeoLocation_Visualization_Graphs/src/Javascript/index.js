import { InitMap,loadDataSets,resetFilters,SwapLayers,PiePointM,BarPointM, DisableLayer } from './MapContent'; 
import { CreateBarChart,chart } from "./BarChart"
import { InitPieChart } from "./PieChart";

// Initialize DOM Elements 
var PieChObj=document.getElementById("PieChart");
var BarChOnj=document.getElementById("BarChart");
var ResetBtn=document.getElementById("reset");

$(document).ready(function(){ 

    let intitialRun=[false,false]; // Check if a Project runs for the first time.
                                   // Index 0 => Pie Chart , index 1 => Bar Chart
    
    InitMap(); // Initialize map.

    PieChObj.addEventListener("click", function (event){ // Pie Chart Event Listener.
        // Swap Dom elements.
        ResetBtn.classList.add("hide"); // hide reset button.
        document.getElementById("Bar").classList.add('hide'); // hide bar chart.
        document.getElementById("Pie").classList.remove('hide'); // display pie chart.

        if (intitialRun[0]==false){ // if it is run for the first time fetch the data and display them on the map.
            InitPieChart();
            loadDataSets("Pie");
            DisableLayer(BarPointM);
            intitialRun[0]=true
        }else{  // if it is not the first run swap the map layers.
            event.preventDefault();
            SwapLayers(BarPointM,PiePointM);
        }
    });

    BarChOnj.addEventListener("click", function (event){ // Bar Chart Event Listener.
        // Swap Dom Elements.
        ResetBtn.classList.remove("hide"); // Display reset button.
        document.getElementById("Bar").classList.remove('hide'); // Display Bar Chart.
        document.getElementById("Pie").classList.add('hide'); // hide pie chart.

        if (intitialRun[1]==false){ // if it is run for the first time fetch the data and display them on the map.
            loadDataSets("Bar");
            am4core.ready(function() {
                CreateBarChart();
            });
            DisableLayer(PiePointM);
            intitialRun[1]=true;
        }else{ // if it is not the first run swap the map layers.
            event.preventDefault();
            SwapLayers(PiePointM,BarPointM);
        }
    });

    document.getElementById("reset").addEventListener("click", function (){ // Reset Button Event Listener.
        resetFilters();
    });

});
