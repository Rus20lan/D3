# Манипулирование деревом DOM

## Подготовка среды разработки

1. Подключение **main.css** к проекту в **index.html**:

```html
<link rel="stylesheet" type="text/css" href="css/main.css" />
```

2. Подключение D3.js через CDN к проекту в **index.html** (строка вставляется перед закрывающим тегом `</body>`):

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

3. Подключение **main.js** к проекту в **index.html** (строка вставляется перед закрывающим тегом `</body>` и после строки подключения D3.js)

```html
<script src="js/main.js"></script>
```

Итоговый результат:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manipulating the DOM</title>
    <link rel="stylesheet" type="text/css" href="css/main.css" />
  </head>
  <body>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
```

## Выбор элементов DOM

D3 имеет два метода для выбора элементов:
**_d3.select()_** и **_d3.selectAll()_**

Метод d3.select() принимает параметр с селктором и возвращает первый найденный элемент, соответсвующий этому селектору.
d3.select("**_селектор_**")
Типы селекторов:
**`#my-id`** - **_идентификатор_**,
**.my-class** - **_класс_**,
**h1**, **svg** - **_имя тега_**,
**circle .faded**, **`#my-id p`** - **_комбинация селекторов_**

Примеры:

```
d3.select("h1") // <h1>A title</h1> - выбор заголовка h1
d3.select(".intro") // <p class="intro"></p> - выбор параграфа p с классом intro
```

## Добавление элементов в выборку

Основным методом D3, используемым для добавления элементов, является **_selection.append()_**. Он принимает тип элемента или имя тега и добавляет его в **_конец_** выбранного элемента.
Пример: Чтобы добавить элемент прямоугольник как последний элемент в контейнер SVG, необходимо выбрать контейнер SVG, а затем вызвать **_append()_**

```
d3.select("svg")
  .append("rect")
```

## Установка и изменение атрибутов

Атрибуты можно устанавливать и изменять с помощью метода **selection.attr()**. Метод **attr()** принимает два параметра: _имя атрибута_ и его _значение_.

_имя атрибута_ - тип строка
_значение_ - тип: строка, число, функция доступа

## Итоговый результат

```js
(() => {
  const svg = d3
    .select('.responsive-svg-container')
    .append('svg')
    .attr('viewBox', '0 0 1200 1600')
    .style('border', '1px solid black');

  // svg
  //   .append("rect")
  //     .attr("x", 10)
  //     .attr("y",10)
  //     .attr("width", 414)
  //     .attr("height",16)
  //     .attr("fill","turquoise")
  //     .style("fill","plum");
})();
```
