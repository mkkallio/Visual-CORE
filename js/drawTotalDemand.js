'use strict'

function drawTotalDemand(hh){
    var pub = document.getElementById("public_kwh").value;
    var productive = document.getElementById("productive_kwh").value;
    var total = hh + parseFloat(pub) + parseFloat(productive);
    var data = [
        {
          x: ['Total', 'Households', 'Public', 'Productive'],
          y: [total, hh, pub, productive],
          type: 'bar',
          marker: {
            color: ['rgba(48, 178, 36, 0.96)', 'rgba(46, 178, 255, 1)', 'rgba(248, 201, 114, 1)','rgba(224, 90, 71, 1)']
            }
        }
      ];

    var layout = {
    width: 320,
    height: 300,
    margin: {
        l: 35,
        r: 5,
        b: 25,
        t: 25,
        pad: 2
    },
    xaxis: {
        tickangle: 0
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: 'Daily energy consumption estimate'
    };
      
      Plotly.newPlot('boxTD', data, layout, {displayModeBar: false});
}