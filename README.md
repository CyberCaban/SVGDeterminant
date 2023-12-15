# Генератор SVG для определителя
Рассмотрите пример анимации для перечисления слагаемых в определителе (правило треугольника).

Для трёх квадратов задаётся 12 кадров анимации (По 2 одинаковых кадра на каждое слагаемое. С одним кадром на слагаемое квадраты не будут задерживаться на своих местах.). Анимируется положение квадрата по x и его цвет.

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150" height="150">
        <rect width="50" height="50" x="0" y="0" fill="blue">
        <animate attributeName="x" values="0;0;0;0;50;50;50;50;100;100;100;100" dur="6s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="blue;blue;red;red;blue;blue;red;red;blue;blue;red;red" dur="6s" repeatCount="indefinite"></animate>
      </rect><rect width="50" height="50" x="50" y="50" fill="blue">
        <animate attributeName="x" values="50;50;100;100;0;0;100;100;0;0;50;50" dur="6s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="blue;blue;red;red;blue;blue;red;red;blue;blue;red;red" dur="6s" repeatCount="indefinite"></animate>
      </rect><rect width="50" height="50" x="100" y="100" fill="blue">
        <animate attributeName="x" values="100;100;50;50;100;100;0;0;50;50;0;0" dur="6s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="blue;blue;red;red;blue;blue;red;red;blue;blue;red;red" dur="6s" repeatCount="indefinite"></animate>
      </rect>
</svg>

![download](https://github.com/CyberCaban/SVGDeterminant/assets/74456694/568284e3-703e-4c64-8e3e-f1dae2c8420c)


Ввод: натуральное n > 2 -- порядок определителя
Вывод: аналогичный анимированный файл с n квадратами и (n!)*2 кадрами.

Найти сайт можно во вкладке Deployments или по этой [ссылке](https://cybercaban.github.io/SVGDeterminant/)!
