const menuItems = [
  // Супы
  {
    keyword: 'gaspacho',
    name: 'Гаспачо',
    price: 200,
    category: 'soup',
    count: '250 мл',
    image: 'Гаспачо.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'mushroom_puree',
    name: 'Грибной суп-пюре',
    price: 220,
    category: 'soup',
    count: '300 мл',
    image: 'Грибной-суп-пюре.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'norwegian',
    name: 'Норвежский суп',
    price: 250,
    category: 'soup',
    count: '300 мл',
    image: 'Норвежский-суп.png',
    kind: 'fish'
  },
  {
    keyword: 'ramen',
    name: 'Рамен',
    price: 375,
    category: 'soup',
    count: '425 г',
    image: 'Рамен.png',
    kind: 'meat'
  },
  {
    keyword: 'tom_yam',
    name: 'Том ям с креветками',
    price: 650,
    category: 'soup',
    count: '500 г',
    image: 'Том-ям.png',
    kind: 'fish'
  },
  {
    keyword: 'chicken_soup',
    name: 'Куриный суп',
    price: 330,
    category: 'soup',
    count: '350 г',
    image: 'Куриный-суп.png',
    kind: 'meat'
  },
  // Главные блюда
  {
    keyword: 'chicken_cutlet',
    name: 'Котлеты из курицы с картофельным пюре',
    price: 350,
    category: 'main',
    count: '250 г',
    image: 'Котлеты-из-курицы-с-картофельным-пюре.png',
    kind: 'meat'
  },
  {
    keyword: 'lasagna',
    name: 'Лазанья',
    price: 400,
    category: 'main',
    count: '300 г',
    image: 'Лазанья.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'fried_potatoes',
    name: 'Жареная картошка с грибами',
    price: 300,
    category: 'main',
    count: '250 г',
    image: 'Жареная-картошка-с-грибами.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'fish_cutlet',
    name: 'Рыбная котлета с рисом и спаржей',
    price: 320,
    category: 'main',
    count: '270 г',
    image: 'Рыбная-котлета.png',
    kind: 'fish'
  },
  {
    keyword: 'pizza_margarita',
    name: 'Пицца Маргарита',
    price: 450,
    category: 'main',
    count: '470 г',
    image: 'Пицца-Маргарита.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'shrimp_pasta',
    name: 'Паста с креветками',
    price: 340,
    category: 'main',
    count: '280 г',
    image: 'Паста-с-креветками.png',
    kind: 'fish'
  },
  // Салаты и стартеры
  {
    keyword: 'korean_salad',
    name: 'Корейский салат с овощами и яйцом',
    price: 330,
    category: 'salad',
    count: '250 г',
    image: 'Корейский-салат.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'caesar_chicken',
    name: 'Цезарь с цыпленком',
    price: 370,
    category: 'salad',
    count: '220 г',
    image: 'Цезарь-с-цыпленком.png',
    kind: 'meat'
  },
  {
    keyword: 'caprese',
    name: 'Капрезе с моцареллой',
    price: 350,
    category: 'salad',
    count: '235 г',
    image: 'Капрезе.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'tuna_salad',
    name: 'Салат с тунцом',
    price: 480,
    category: 'salad',
    count: '250 г',
    image: 'Салат-с-тунцом.png',
    kind: 'fish'
  },
  {
    keyword: 'fries_caesar',
    name: 'Картофель фри с соусом Цезарь',
    price: 280,
    category: 'salad',
    count: '235 г',
    image: 'Картофель-фри-цезарь.png',
    kind: 'vegetarian'
  },
  {
    keyword: 'fries_ketchup',
    name: 'Картофель фри с кетчупом',
    price: 260,
    category: 'salad',
    count: '235 г',
    image: 'Картофель-фри-кетчуп.png',
    kind: 'vegetarian'
  },
  // Напитки
  {
    keyword: 'carrot_juice',
    name: 'Морковный сок',
    price: 100,
    category: 'drink',
    count: '200 мл',
    image: 'Морковный-сок.png',
    kind: 'cold'
  },
  {
    keyword: 'apple_juice',
    name: 'Яблочный сок',
    price: 100,
    category: 'drink',
    count: '200 мл',
    image: 'Яблочный-сок.png',
    kind: 'cold'
  },
  {
    keyword: 'orange_juice',
    name: 'Апельсиновый сок',
    price: 120,
    category: 'drink',
    count: '200 мл',
    image: 'Апельсиновый-сок.png',
    kind: 'cold'
  },
  {
    keyword: 'cappuccino',
    name: 'Капучино',
    price: 180,
    category: 'drink',
    count: '300 мл',
    image: 'Капучино.png',
    kind: 'hot'
  },
  {
    keyword: 'green_tea',
    name: 'Зеленый чай',
    price: 100,
    category: 'drink',
    count: '300 мл',
    image: 'Зеленый-чай.png',
    kind: 'hot'
  },
  {
    keyword: 'black_tea',
    name: 'Черный чай',
    price: 90,
    category: 'drink',
    count: '300 мл',
    image: 'Черный-чай.png',
    kind: 'hot'
  },
  // Десерты
  {
    keyword: 'baklava',
    name: 'Пахлава',
    price: 220,
    category: 'dessert',
    count: '300 г',
    image: 'Пахлава.png',
    kind: 'small'
  },
  {
    keyword: 'cheesecake',
    name: 'Чизкейк',
    price: 240,
    category: 'dessert',
    count: '125 г',
    image: 'Чизкейк.png',
    kind: 'small'
  },
  {
    keyword: 'choco_cheesecake',
    name: 'Шоколадный чизкейк',
    price: 260,
    category: 'dessert',
    count: '125 г',
    image: 'Шоколадный-чизкейк.png',
    kind: 'small'
  },
  {
    keyword: 'choco_cake',
    name: 'Шоколадный торт',
    price: 270,
    category: 'dessert',
    count: '140 г',
    image: 'Шоколадный-торт.png',
    kind: 'medium'
  },
  {
    keyword: 'donuts3',
    name: 'Пончики (3 штуки)',
    price: 410,
    category: 'dessert',
    count: '350 г',
    image: 'Пончики-3.png',
    kind: 'medium'
  },
  {
    keyword: 'donuts6',
    name: 'Пончики (6 штук)',
    price: 650,
    category: 'dessert',
    count: '700 г',
    image: 'Пончики-6.png',
    kind: 'large'
  }
]; 