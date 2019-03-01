'use strict';

var totalPublicDemand = 200;
var totalProductiveDemand = 500;

function drawLoadProfile(data, demand) {
    var totalHHdemand = demand;
    d3.select("#temp").remove();
    var svg = d3.select("#box")
    .append("svg")
      .attr("id", "temp")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      //.domain(d3.max(data, function(d) { return d.Time; }))
      .domain([1, d3.max(data, function(d) { return +d.hour; })])
    .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .text("ending hour");
  
    // Add Y axis
  
      var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { 
        return d.productive_uses*totalProductiveDemand + d.public_utilities*totalPublicDemand + d.households*totalHHdemand +2; })])
      .range([ height, 0 ]);
      svg.append("g")
      .call(d3.axisLeft(y));
    // Add household line
    var householdLine = 
      svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2eb2ff")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.hour) })
        .y(function(d) { return y(d.households*totalHHdemand) }))
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text("Demand (kWh)"); 
  
  // Add the line
    var publicline = 
      svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f8c972")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.hour) })
        .y(function(d) { return y(d.public_utilities*totalPublicDemand) }))
  // Add the line
    var productivityline =
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#e05a47")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.hour) })
        .y(function(d) { return y(d.productive_uses*totalProductiveDemand) }))
  
  // Add the line
    var totalline =
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.hour) })
        .y(function(d) { return y(d.productive_uses*totalProductiveDemand + d.public_utilities*totalPublicDemand + d.households*totalHHdemand) }))

  }