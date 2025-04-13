// prettier-ignore
// Load the data here
d3.csv('./data/weekly_temperature.csv', d3.autoType).then((data) => {
  console.log(data);
  drawLineChart(data);
});
// Create the line chart here
const drawLineChart = (data) => {
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3
    .select('#line-chart')
    .append('svg')
    .attr('viewBox', `0, 0, ${width}, ${height}`);
  // .style('background-color', 'rgba(77, 144, 254, 0.05)');
  const innerChart = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  // const firstDate = d3.min(data, (d) => d.date);
  const firstDate = new Date(2021, 0, 1, 0, 0, 0);
  const lastDate = d3.max(data, (d) => d.date);
  const xScale = d3
    .scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  const maxTemp = d3.max(data, (d) => d.max_temp_F);
  const yScale = d3.scaleLinear().domain([0, maxTemp]).range([innerHeight, 0]);

  const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'));
  // prettier-ignore
  innerChart
    .append('g')
      .attr('class', 'axis-x')
      .attr("transform",`translate(0,${innerHeight})`)
      // .style('background-color', 'rgba(77, 144, 254, 0.05)')
      .call(bottomAxis);

  // d3.selectAll('.tick').attr('y', '10px');
  d3.selectAll('.axis-x text')
    .attr('x', (d) => {
      const currentMonth = d;
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
      return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr('y', '10px');

  const leftAxis = d3.axisLeft(yScale);

  innerChart.append('g').attr('class', 'axis-y').call(leftAxis);
  d3.selectAll('.axis-y text').attr('x', '-10px');

  d3.selectAll('.axis-x text, .axis-y text')
    .style('font-family', 'Roboto, sans-seri')
    .style('font-size', '14px');
  // prettier-ignore
  svg
    .append('text')
    .text('Температура (F)')
    .attr('y', '20px');

  const aubergine = '#75485E';
  // prettier-ignore
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr('r',4)
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.avg_temp_F))
      .attr('fill', aubergine);
  // prettier-ignore
  // Создаем генератор линий
  const lineGenerator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.avg_temp_F));
  // Создаем генератор кривой при помощи интерполяции
  const curveGenerator = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.avg_temp_F))
    .curve(d3.curveCatmullRom);
  innerChart
    .append('path')
    .attr('d', curveGenerator(data))
    .attr('fill', 'none')
    .attr('stroke', aubergine);
  // prettier-ignore
  const areaGenerator = d3.area()
    .x(d => xScale(d.date))
    .y0(d => yScale(d.min_temp_F))
    .y1(d => yScale(d.max_temp_F))
    .curve(d3.curveCatmullRom)
  innerChart
    .append('path')
    .attr('d', areaGenerator(data))
    .attr('fill', aubergine)
    .attr('fill-opacity', 0.2);
  // prettier-ignore
  innerChart
    .append("text")
      .text("Средняя температура")
      .attr("x", xScale(lastDate) + 10)
      .attr("y", yScale(data[data.length - 1].avg_temp_F))
      .attr("dominant-baseline", "middle")
      .attr("fill", aubergine);
  // prettier-ignore
  innerChart
    .append("text")
      .text("Минимальная температура")
      .attr("x", xScale(data[data.length - 3].date) + 13)
      .attr("y",yScale(data[data.length - 3].min_temp_F )+ 20)
      .attr("dominant-baseline", "hanging")
      .attr("fill", aubergine);

  innerChart
    .append('line')
    .attr('x1', xScale(data[data.length - 3].date))
    .attr('y1', yScale(data[data.length - 3].min_temp_F) + 3)
    .attr('x2', xScale(data[data.length - 3].date) + 10)
    .attr('y2', yScale(data[data.length - 3].min_temp_F) + 20)
    .attr('stroke', aubergine)
    .attr('stroke-width', 2);

  innerChart
    .append('text')
    .text('Максимальная температура')
    .attr('x', xScale(data[data.length - 5].date) + 23)
    .attr('y', yScale(data[data.length - 5].max_temp_F) - 60)
    .attr('fill', aubergine);

  innerChart
    .append('line')
    .attr('x1', xScale(data[data.length - 5].date) + 23)
    .attr('y1', yScale(data[data.length - 5].max_temp_F) - 58)
    .attr('x2', xScale(data[data.length - 5].date) + 16)
    .attr('y2', yScale(data[data.length - 5].max_temp_F) - 45)
    .attr('stroke', aubergine)
    .attr('stroke-width', 2);

  innerChart.selectAll('text').style('font-size', 14);
};
