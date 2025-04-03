// prettier-ignore
(() => {
  const svg = d3.select('.responsive-svg-container')
    .append('svg')
      .attr('viewBox', '0 0 1200 1600')
      .style('border','1px solid black');

  d3.csv("data/data.csv", d => {
    return {
      technology: d.technology,
      count: +d.count
    }
  }).then(data => {
    console.log('Максимальное значение', d3.max(data, d => d.count));
    console.log('Минимальное значение', d3.min(data, d => d.count));
    console.log('Минимальное и максимальное значение в массиве', d3.extent(data, d => d.count));
    return data.sort((a,b) => b.count - a.count) // сортировка по убыванию
  }).then(console.log)
})();
