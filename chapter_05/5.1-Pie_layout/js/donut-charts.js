// prettier-ignore
const drawDonutCharts = (data) => {
  // Generate the donut charts here
  const svg = d3.select('#donut')
    .append('svg')
      .attr('viewBox',`0 0 ${width} ${height}`);

  const donutContainers = svg
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const years = [1975, 1995, 2013]

  years.forEach(year =>{
    const donutContainer = donutContainers
      .append('g')
        .attr('transform', `translate(${xScale(year)},${innerHeight/2})`)
  })
  
};
