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

  // Извлечь типы из атрибута columns и отфильтровать элемент "year"
  const formats = data.columns.filter((format) => format !== 'year');
  years.forEach(year =>{
    const donutContainer = donutContainers
      .append('g')
        .attr('transform', `translate(${xScale(year)},${innerHeight/2})`);
    // Извлечь данные относящиеся к интересующему году
    const yearData = data.find((d) => d.year === year);
  
    // Инициализировать пустой массив для форматированных данных
    const formattedData = [];
  
    formats.forEach((format) =>{
      formattedData.push({format, sales:yearData[format]});
    })
    // console.log(formattedData);
    // Инициализация генератора кругового макета
    const pieGenerator = d3.pie()
      .value(d => d.sales);
    // Создание аннотированных данных для кругового макета и сохранение в константе annotatedData
    const annotatedData = pieGenerator(formattedData);
    // console.log(annotatedData);
    // Инициализация генератора дуг
    const arcGenerator = d3.arc()
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3);
    
    const arcs = donutContainer
      .selectAll(`.arc${year}`)
      .data(annotatedData)
      .join("g")
        .attr("class", `arc-${year}`);
    
    arcs
      .append('path')
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.format));

    arcs
      .append('text')
        .text(d => {
          d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
          return d3.format(".0%")(d.percentage)
        })
        .attr("x", d =>{
          d["centroid"] = arcGenerator
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)
            .centroid();
          return d.centroid[0]
        })
        .attr("y", d => d.centroid[1])
        .attr("text-anchor", "middle")
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#f6fafc')
        .attr('fill-opacity', d => d.percentage < 0.05 ? 0 :1)
        .style("font-size", '16px')
        .style('font-weight', 500);

    donutContainer
        .append('text')
          .text(year)
          .attr('text-anchor', "middle")
          .attr('dominant-baseline', 'middle')
          .style('font-size', '24px')
          .style('font-weight', 500);

  })
  
};
