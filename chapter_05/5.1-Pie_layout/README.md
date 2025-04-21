# Создание круговых и кольцевых диаграмм

В этом разделе мы воспользуемся круговой диаграммой D3 и с её помощью создадим кольцевые диаграммы. В частности, мы визуализируем распределение продаж по форматам носителей за 1975, 1995 и 2013 годы. Центр каждой кольцевой диаграммы будет соотвествовать положению соответствующих лет на оси **x** потокового графика и стековой диаграммы ниже.

## Подготовительные шаги

В этой главе мы используем три контейнера SVG: **_один для кольцевых диаграмм_**, **_один для потоквого графика_**, и **_один для стековой диаграммы_**. Все контейнеры будут иметь одинаковые размеры и отступы.

Добавить контейнер SVG и установить его атрибут viewBox

```js
// prettier-ignore
const svg = d3.select('#donut')
  .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`);
```

Добавить группу SVG и сместить её с учетом левого и верхнего отступов диаграмм

```js
// prettier-ignore
const donutContainers = svg
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
```

Объявление интервальной шкалы (scale.js)

```js
const xScale = d3.scaleBand(); // Объявление интервальной шкалы
// prettier-ignore
const defineScales = (data) => {
  // Настройка предметной области
  xScale
    .domain(data.map((d) => d.year))
    .range([0, innerWidth]);
};
```

Добавление группы для каждой кольцевой диаграммы (donut-charts.js)

```js
// prettier-ignore
const years = [1975, 1995, 2013];
// prettier-ignore
years.forEach((year) => {
  const donutContainer = donutContainers
    .append('g')
      .attr('transform', `translate(${xScale(year)},${innerHeight / 2})`);
});
```

## Генератор кругового макета
