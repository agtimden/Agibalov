// Сортировка меню по алфавиту с учетом русской локали
const sortedMenu = [...menuItems].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

// Получение контейнеров для разных категорий блюд из DOM
const categories = {
  soup: document.querySelector('#soups .menu-items'), // Контейнер для супов
  main: document.querySelector('#main-dishes .menu-items'), // Контейнер для главных блюд
  drink: document.querySelector('#drinks .menu-items') // Контейнер для напитков
};

// Очистка контейнеров перед рендерингом
categories.soup.innerHTML = ''; // Очистка контейнера супов
categories.main.innerHTML = ''; // Очистка контейнера главных блюд
categories.drink.innerHTML = ''; // Очистка контейнера напитков

// Рендеринг карточек блюд
sortedMenu.forEach(dish => {
  // Создание карточки блюда
  const card = document.createElement('div'); // Создание div-элемента
  card.className = 'menu-item'; // Установка класса
  card.setAttribute('data-dish', dish.keyword); // Установка атрибута с ключевым словом

  // Заполнение карточки данными
  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" width="150"> <!-- Изображение блюда -->
    <p>${dish.name}</p> <!-- Название блюда -->
    <p>${dish.count}</p> <!-- Объем/вес порции -->
    <p>${dish.price} руб.</p> <!-- Цена -->
    <button type="button">Добавить</button> <!-- Кнопка добавления -->
  `;

  // Добавление карточки в соответствующий контейнер
  if (categories[dish.category]) {
    categories[dish.category].appendChild(card); // Добавление карточки в нужный контейнер
  }
});

// Получение элементов select для выбора блюд
const selectSoup = document.getElementById('soup'); // Select для супов
const selectMain = document.getElementById('main'); // Select для главных блюд
const selectDrink = document.getElementById('drink'); // Select для напитков

// Создание блока для отображения общей суммы
const priceBlock = document.createElement('div'); // Создание div-элемента
priceBlock.className = 'order-total'; // Установка класса
selectDrink.parentNode.appendChild(priceBlock); // Добавление блока в DOM

// Функция для получения выбранного блюда по категории и значению
function getSelectedDish(category, value) {
  return menuItems.find(d => d.category === category && d.keyword === value); // Поиск блюда в массиве
}

// Функция для обновления текста опций в select
function updateSelectOptionText(select, category) {
  Array.from(select.options).forEach(option => {
    if (!option.value) return; // Пропуск плейсхолдера
    const dish = getSelectedDish(category, option.value); // Получение блюда
    if (dish) {
      option.textContent = `${dish.name}  ${dish.price}₽`; // Обновление текста опции
    }
  });
  // Обновление текста выбранного блюда
  const selected = select.options[select.selectedIndex]; // Получение выбранной опции
  if (selected && selected.value) {
    const dish = getSelectedDish(category, selected.value); // Получение выбранного блюда
    if (dish) {
      selected.textContent = `${dish.name}  ${dish.price}₽`; // Обновление текста выбранной опции
    }
  }
}

// Функция для обновления общей суммы заказа
function updateTotal() {
  // Обновление текста опций во всех select
  updateSelectOptionText(selectSoup, 'soup'); // Обновление select супов
  updateSelectOptionText(selectMain, 'main'); // Обновление select главных блюд
  updateSelectOptionText(selectDrink, 'drink'); // Обновление select напитков

  // Получение выбранных блюд
  const soup = getSelectedDish('soup', selectSoup.value); // Получение выбранного супа
  const main = getSelectedDish('main', selectMain.value); // Получение выбранного главного блюда
  const drink = getSelectedDish('drink', selectDrink.value); // Получение выбранного напитка
  
  // Расчет общей суммы
  let total = 0; // Инициализация суммы
  if (soup) total += soup.price; // Добавление цены супа
  if (main) total += main.price; // Добавление цены главного блюда
  if (drink) total += drink.price; // Добавление цены напитка
  
  // Обновление блока с общей суммой
  if (soup || main || drink) {
    priceBlock.textContent = `Итого: ${total} ₽`; // Отображение суммы
  } else {
    priceBlock.textContent = ''; // Очистка блока, если ничего не выбрано
  }
}

// Добавление обработчиков событий для select
[selectSoup, selectMain, selectDrink].forEach(select => {
  select.addEventListener('change', updateTotal); // Обработка изменения выбора
});

// Добавление обработчиков событий для карточек блюд
Object.values(categories).forEach(section => {
  section.addEventListener('click', e => {
    const card = e.target.closest('.menu-item'); // Получение карточки блюда
    if (!card) return; // Выход, если клик не по карточке
    const keyword = card.getAttribute('data-dish'); // Получение ключевого слова
    const dish = menuItems.find(d => d.keyword === keyword); // Поиск блюда
    if (!dish) return; // Выход, если блюдо не найдено
    // Установка выбранного блюда в соответствующий select
    if (dish.category === 'soup') selectSoup.value = dish.keyword; // Установка супа
    if (dish.category === 'main') selectMain.value = dish.keyword; // Установка главного блюда
    if (dish.category === 'drink') selectDrink.value = dish.keyword; // Установка напитка
    updateTotal(); // Обновление суммы
  });
});

// Инициализация общей суммы при загрузке страницы
updateTotal(); 