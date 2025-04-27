// prettier-ignore
const drawStreamGraph = (data) => {
  // Generate the streamgraph here

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3
    .select('#streamgraph')
    .append('svg')
    .attr('viewBox', [0, 0, width, height]);

  const innerChart = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const stackGenerator = d3.stack()
    .keys(formatsInfo.map((f) => f.id));
  const annotatedData = stackGenerator(data);
  const maxUpperBoundary = d3.max(
    annotatedData[annotatedData.length - 1],
    (d) => d[1]
  );
  const yScale = d3
    .scaleLinear()
      .domain([0, maxUpperBoundary])
      .range([innerHeight, 0])
      .nice();
  
  const areaGenerator = d3.area()
    .x(d => xScale(d.data.year) + xScale.bandwidth()/2)
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveCatmullRom);

  innerChart
    .append("g")
      .attr("class", "area-container")
    .selectAll("path")
    .data(annotatedData)
    .join("path")
      .attr("d",areaGenerator)
      .attr("fill", d => colorScale(d.key));
  
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
    .call(leftAxis);
};
