// @TODO: YOUR CODE HERE!
// setup SVG location
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("./assets/data/data.csv").then(function(peopleData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    peopleData.forEach(function(data) {
    //   console.log(data);
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });



    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, (d3.max(peopleData, d => d.poverty
        )+1)])
      .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, (d3.max(peopleData, d => d.healthcare
        )+2)])
      .range([chartHeight, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);




    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(peopleData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");
        

    // Step:6: insert text in circles
    // ==============================
    var textGroup = chartGroup.selectAll(null)
    .data(peopleData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr('x',d => (xLinearScale(d.poverty))-8 )
    .attr("y", d => (yLinearScale(d.healthcare)+4))
    .attr('fill', 'white')
    .attr('font-size',12)
    ;

    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Healthcare");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty");
    }).catch(function(error) {
    console.log(error);


});
