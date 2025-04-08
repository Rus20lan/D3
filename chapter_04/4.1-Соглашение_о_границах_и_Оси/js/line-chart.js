// Load the data here
d3.csv('./data/weekly_temperature.csv', d3.autoType).then((data) => {
  console.log(data);
  drawLineChart(data);
});
// Create the line chart here
const drawLineChart = (data) => {};
