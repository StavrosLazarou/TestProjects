import { filterbyID } from "./MapContent.js"; 

// Initialize Variables
var barData;
var chart;

// fetch data and draw the chart.
async function FetchChartData() { 
  // If it success the barData get the value of response text. 
  try{ 
    await $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("secret-key", "$2b$10$RD7000C7VhWDHr5iZpWPLO9/0apVA81ZHwUMirSE5udLcBoUOAwnC");
      },
        datatype:"json",
        url: "https://api.jsonbin.io/b/602f840da3e9f25d023c1032",
        success : function(data){
          barData = data;
        } 
    })
  }catch(err){
    console.error("Chart data Error: "+err.responseJSON.message);
  }

  // Draw the Chart.
  DrawBarChart();
}

// Draw the Chart.
function DrawBarChart(){

  // Themes
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
    
  // Create chart instance
  chart = am4core.create("Bar", am4charts.XYChart3D);
  chart.paddingBottom = 40;
  chart.angle = 35;
  
  // Add data
  chart.data = barData;
    
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "continent";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.inside = true;
  categoryAxis.renderer.grid.template.disabled = true;

  // Labels
  let labelTemplate = categoryAxis.renderer.labels.template;
  labelTemplate.dy = 50;
    

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.grid.template.disabled = true;
  
  // Create series
  var series = chart.series.push(new am4charts.ConeSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "continent";
  
  var columnTemplate = series.columns.template;
  columnTemplate.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  })
  
  columnTemplate.adapter.add("stroke", function(stroke, target) {
    return chart.colors.getIndex(target.dataItem.index);
  })

  series.columns.template.events.on("hit", function(ev) {
    filterbyID(ev.target._dataItem._dataContext.continent);  
    }, this );    
}

// Initialize Bar Chart
function CreateBarChart(){
  FetchChartData();
}

export{chart,CreateBarChart}