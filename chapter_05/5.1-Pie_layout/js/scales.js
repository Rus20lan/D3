// Initialize the scales here
const xScale = d3.scaleBand();
// prettier-ignore
const defineScales = (data) => {
  // Define the scales domain and range here
  xScale
    .domain(data.map((d) => d.year))
    .range([0, innerWidth]);
};
