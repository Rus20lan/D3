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

Круговые и кольцевые диаграммы визуализируют отношения "часть-целое" - количество, представленное каждым сектором, по отношению к общему количеству.
**Генератор круговых макетов** в D3 вычисляет **_начальный_** и **_конечный_** углы каждого сектора на основе процента, который он представляет.
**Генератор круговых макетов** в D3 принимает входные данные, отформатированные как массив чисел.

**Когда данные извлекаются, например, из CSV-файла, D3 присоединяет к результирующему набору данных массив с заголовками столбцов из исходного набора данных. Он доступен как атрибут data.columns**

1. Извлечь типы из атрибута columns и отфильтровать элемент "year"
2. Извлечь данные относящиеся к интересующему году
3. Инициализировать пустой массив для форматированных данных
4. Для каждого типа создать объект, содержащий идентификатор типа носителя и объем его продаж за интересующий год. Поместить этот объект в массив отформатированных данных.

```js
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
  
  // Для каждого типа создать объект, содержащий идентификатор типа носителя и объем его продаж за интересующий год. Поместить этот объект в массив отформатированных данных.
  formats.forEach((format) =>{
    formattedData.push({format, sales:yearData[format]});
  })
  console.log(formattedData);
  })
  
};
```

### Инициализация и вызов генератора кругового макета

Мы создадим новый генератор с помощью метода **d3.pie()** из модуля d3-shape. Поскольку отформатированные данные имеют вид массива объектов, нам нужно сообщить генератору, какой ключ содержит значение, определяющее размер сектора. Для этого настроим функцию доступа **value()**.

```js
// prettier-ignore
const pieGenerator = d3.pie()
  .value(d => d.sales);
```

Чтобы создать аннотированные данные для кругового макета, просто вызовем функцию генератора, передадим ей отформатированные данные и сохраним результат в константе с именем **annotatedData**:

```js
// prettier-ignore
const pieGenerator = d3.pie()
  .value(d => d.sales);
const annotatedData = pieGenerator(formattedData);
```

Генератор кругового макета диаграмм (**_pieGenerator_**) возвращает новый аннотированный набор данных, содержащий ссылку на исходный набор и включающий новые атрибуты - **_значение для каждого сектора_**, **_его индекс_**, а также его **_начальный_** и **_конечный_** углы (в радианах).
**Генератор кругового макета** не участвует напрямую в рисовании диаграммы. Он относится к этапу предварительной обработки и просто вычисляет **_углы секторов куговой диаграммы_**.

### Рисование дуг

1. Вызвать функции доступа **startAngle()** и **endAngle()** и указать им ключ, под которым значения для них доступны в аннотированном наборе данных.
2. Использовать шаблон привязки данных для генерации одного элемента **path** для каждого объекта в аннотированном наборе данных.
3. Вызвать функцию **arcGenerator()**, чтобы получить атрибут **d** для каждого элемента **path**.

```js
// prettier-ignore
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
  .join('path')
  .attr('class', `arc-${year}`)
  .attr('d', arcGenerator);
```

### Использование цветовой шкалы

Простой способ применить правильный цвет к каждой дуге - объявить цветовую шкалу. В D3 цветовые шкалы часто создаются с помощью **d3.scaleOrdinal()**.
В файле **scales.js** мы сначала объявляем порядковую шкалу и сохраняем её в константе **colorScale**
В нашем случае предметная область - это массив типов носителей, а диапазон - это массив цветов, соответствующих типом.

```js
// prettier-ignore
const colorScale = d3.scaleOrdinal();

const defineScales = (data) => {
  ...

  // Color scale
  colorScale
    .domain(formatsInfo.map(f => f.id))
    .range(formatsInfo.map(f => f.color));

};
```

Возвращаемся в **donut-charts.js**, где зададим атрибут **fill** дуг, передав в цветовую шкалу идентификатор типа носителя музыки, привязанного к каждой дуге:

```js
// prettier-ignore
const arcs = donutContainer
     .selectAll(`.arc${year}`)
     .data(annotatedData)
     .join("path")
       .attr("class", `arc-${year}`)
       .attr("d", arcGenerator)
       .attr("fill", d => colorScale(d.data.format));
```

### Добавление меток

1. Использовать шаблон привязки данных для добавления групп SVG

```js
// prettier-ignore
const arcs = donutContainer
      .selectAll(`.arc${year}`)
      .data(annotatedData)
      .join("g") // <- Использовать шаблон привязки данных для добавления групп SVG
```

2. Добавить элемент **path** внутри каждой группы и нарисовать дуги, вызвав генератор дуг. Связать атрибут **fill** с цветовой шкалой.

```js
// prettier-ignore
arcs
  .append('path')
    .attr("d", arcGenerator)
    .attr("fill", d => colorScale(d.data.format));
```

3. Добавить текстовый элемент внутрь каждой группы

```js
// prettier-ignore
arcs
  .append('text')
```

4. Задать текст, вычислив процент, занимаемый каждой дугой. Сохранить полученное значение в связанных данных (**d["percentage"]**)

```js
// prettier-ignore
.text(d => {
  d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
  return d3.format(".0%")(d.percentage)
})
```

5. Получить координаты центроида каждой дуги и сохранить его в связанных данных (**d["centroid"]**). Затем использовать его для установки атрибутов x и y меток.

```js
// prettier-ignore
.attr("x", d =>{
  d["centroid"] = arcGenerator
    .startAngle(d.startAngle)
    .endAngle(d.endAngle)
    .centroid();
  return d.centroid[0]
})
```

6. Скрыть метки для дуг, представляющих значение меньше 5%

```js
.attr("text-anchor", "middle")
.attr('dominant-baseline', 'middle')
.attr('fill', '#f6fafc')
.attr('fill-opacity', d => d.percentage < 0.05 ? 0 :1)

```
