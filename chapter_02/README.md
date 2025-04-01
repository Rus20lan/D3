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
