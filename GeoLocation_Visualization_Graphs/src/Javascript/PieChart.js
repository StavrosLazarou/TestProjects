import * as echarts from 'echarts';

// Initilize Variables
var pieChart;
var PieChartData1;
var PieChartData2;

async function loadDataSets() {
    // If it success it extract the data from response text.
    try{ 
        await $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("secret-key", "$2b$10$RD7000C7VhWDHr5iZpWPLO9/0apVA81ZHwUMirSE5udLcBoUOAwnC");
        },
            datatype:"json",
            url: "https://api.jsonbin.io/b/602d5c050665b21b00b9068b",
            success : function(data){
            PieChartData1=data.collection[0];
            PieChartData2=data.collection[1];
            } 
        })
    }catch(err){
        console.error("Chart Data Set 1 Error: "+err.responseJSON.message);
    }

}

// Create Properties Object for the Pie Chart.
function chartPieOpts(dataobj){
// specify chart configuration item and data
return {
    title: {
        text: dataobj.name,
        left: "center",
        top: "top",
        textStyle: {
          fontSize: 30,
          color: "#fcfcfc"
        }
    },
    legend: {
        top: '90%',
        left: 'center', 
        textStyle: {
            color: "#fcfcfc"
        }
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: "#2f2f2f",
        borderColor: "#2f2f2f",
        textStyle: {
            color: "#b8b8b8"
        }
    },
    series: [
        {
            name: 'Data Set 1',
            type: 'pie',
            radius: ['70%', '30%'],
            avoidLabelOverlap: true,
            legendHoverLink: true,
            itemStyle: {
                borderRadius: 5,
                borderColor: '#1e1e1e',
                borderWidth: 5
            },
            label: {
                show: false,
                position: 'center'
            },
            data: dataobj.data
        }
    ]
};
}

// Initialize Pie Chart.
function InitializePie(){
        // based on prepared DOM, initialize echarts instance
        return echarts.init(document.getElementById('Pie'));
}

// Update data of the Chart.
function UpdateData(Chart,data){
    var option = chartPieOpts(data);
    Chart.setOption(option);
}

// When page loads, fetch data and create Pie Chart.
function InitPieChart(){
    loadDataSets();
    pieChart = InitializePie();
}

export {pieChart,PieChartData1,PieChartData2,UpdateData,InitPieChart}
