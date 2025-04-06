// prettier-ignore
(() => {
  const svg = d3.select('.responsive-svg-container')
    .append('svg')
      .attr('viewBox', '0 0 600 700')
      .style('border','1px solid black');

  // Функция привязки данных к DOM элементам
  const createViz = (data) =>{
    const barHeight = 20;
    const xScale = d3.scaleLinear().domain([0, 1078]).range([0,450]);
    const yScale = d3.scaleBand().domain(data.map(d => d.technology)).range([0,700]).paddingInner(0.2);

    const barAndLabel = svg
      .selectAll('g')
      .data(data)
      .join('g')
        .attr("transform", d =>`translate(0,${yScale(d.technology)})`);

    barAndLabel
      .append("rect")
        .attr("class", d => {return `bar bar-${d.technology}`})
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("x",100) // смещение по оси Х на 100px
        .attr("y", 0) // Прямоугольники больше не нуждаются в позиционировании по вертикали. Положение определяется по родительской группе
        .attr("fill", d => d.technology === "D3.js" ? "yellowgreen": "skyblue");

    // Добавляем первую группу меток - название технологий
    barAndLabel
      .append("text")
        .text(d => d.technology)
        .attr("x", 96)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .style("font-family","sans-serif")
        .style("font-size", "11px");

    // Добавляем вторую группу меток - сколько раз каждая технология была выбрана в опросе
    barAndLabel
      .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-family", "sans-serif")
        .style("font-size", "9px");
        
    // Добавляем вертикальную линию
    svg
      .append("line")
        .attr("x1",100)
        .attr("y1",0)
        .attr("x2", 100)
        .attr("y2",700)
        .attr("stroke", "black");
  }

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

  }).then(data => createViz(data)).then(console.log)
})();
