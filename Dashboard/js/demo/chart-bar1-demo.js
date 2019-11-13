var models = [
    {
      "model_name":"Game1",
      "field1":800,
      "field2":150,
      "field3":200
    },
    {
      "model_name":"Game2",
      "field1":600,
      "field2":700,
      "field3":800
    },
    {
      "model_name":"Game3",
      "field1":450,
      "field2":650,
      "field3":750
    },
  
  ];
  models = models.map(i => {
    i.model_name = i.model_name;
      return i;
  });
  
  var container = d3.select('#d2id'),
      width = 500,
      height = 300,
      margin = {top: 30, right: 20, bottom: 30, left: 50},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
  
  var svg = container
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);
  
  var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
  var xScale1 = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
  
  var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
  var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
  
  xScale0.domain(models.map(d => d.model_name));
  xScale1.domain(['field1', 'field2','field3']).range([0, xScale0.bandwidth()]);
  yScale.domain([0, d3.max(models, d => d.field1 > d.field2 >d.field3 ? d.field1 : d.field2 )]);
  
  var model_name = svg.selectAll(".model_name")
    .data(models)
    .enter().append("g")
    .attr("class", "model_name")
    .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);
  
  /* Add field1 bars */
  model_name.selectAll(".bar.field1")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar field1")
  .style("fill","blue")
    .attr("x", d => xScale1('field1'))
    .attr("y", d => yScale(d.field1))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.field1)
    });
    
  /* Add field2 bars */
  model_name.selectAll(".bar.field2")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar field2")
  .style("fill","red")
    .attr("x", d => xScale1('field2'))
    .attr("y", d => yScale(d.field2))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.field2)
    });
  
    
  model_name.selectAll(".bar.field3")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar field3")
  .style("fill","yellow")
    .attr("x", d => xScale1('field3'))
    .attr("y", d => yScale(d.field3))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.field3)
    });
  
  
  // Add the X Axis
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
     .call(xAxis);
   
  
  // Add the Y Axis
  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis); 
  
     svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left)
     .attr("x",0 - (height / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Scores"); 
  
