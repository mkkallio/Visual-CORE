'use strict'

function drawLoadProfile(data, demandHH){
    var households = [];
    var utilities = [];
    var productive = [];
    var hours = [];
    var total = [];
    var demandPU = document.getElementById("public_kwh").value;
    var demandPrUs = document.getElementById("productive_kwh").value;

    console.log(demandPU + " public. "+ demandPrUs + " productive.");

    for(var i = 0; i <= 23; i++){
        households.push(data[i].households*demandHH);
        utilities.push(data[i].public_utilities*demandPU);
        productive.push(data[i].productive_uses*demandPrUs);
        total.push(data[i].households*demandHH + data[i].public_utilities*demandPU + data[i].productive_uses*demandPrUs);
        hours.push(i);
    }
    console.log(utilities);

    var householdTrace = {
        type : "scatter",
        mode : "lines",
        name : "Households",
        x: hours,
        y: households,
        stackgroup: 'one',
        line: {color: '#2eb2ff'}
    }

    var publicTrace = {
        type : "scatter",
        mode : "lines",
        name : "Public utilities",
        x: hours,
        y: utilities,
        stackgroup: 'one',
        line: {color: '#f8c972'}
    }

    var productiveTrace = {
        type : "scatter",
        mode : "lines",
        name : "Productive uses",
        x: hours,
        y: productive,
        stackgroup: 'one',
        line: {color: '#e05a47'}
    }

    var totalTrace = {
        type : "scatter",
        mode : "lines",
        name : "Total",

        x: hours,
        y: total,
        line: {color: 'transparent'}
    }

    var graphData = [publicTrace, productiveTrace, householdTrace, totalTrace];

    var layout = {
        width: 320,
        height: 300,
        margin: {
            l: 25,
            r: 5,
            b: 5,
            t: 25,
            pad: 2
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: 'Electricity demand by hour',
        xaxis: {
          range: Math.max(hours),
          type: 'linear',
          autorange: true
        },
        yaxis: {
          autorange: true,
          range: Math.max(total+2),
          type: 'linear',
          title: "kWh"
        },
        legend: {
            orientation: 'h',
                  traceorder: 'reversed',
            x: -0.1,
            y: -0.1
          },
      };
      Plotly.newPlot('box', graphData, layout);
}

