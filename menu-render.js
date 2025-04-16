// Создаем копию массива menuItems и сортируем блюда по алфавиту
const sortedMenu = [...menuItems].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

// Объект с ссылками на контейнеры для разных категорий блюд
const categories = {
  soup: document.querySelector('#soups .menu-items'), // Контейнер для супов
  main: document.querySelector('#main-dishes .menu-items'), // Контейнер для главных блюд
  drink: document.querySelector('#drinks .menu-items') // Контейнер для напитков
};

// Очищаем контейнеры перед добавлением новых элементов
categories.soup.innerHTML = '';
categories.main.innerHTML = '';
categories.drink.innerHTML = '';

// Перебираем все блюда и создаем для них карточки
sortedMenu.forEach(dish => {
  // Создаем элемент карточки
  const card = document.createElement('div');
  // Добавляем класс для стилизации
  card.className = 'menu-item';
  // Добавляем атрибут с идентификатором блюда
  card.setAttribute('data-dish', dish.keyword);

  // Формируем HTML-содержимое карточки
  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" width="150">
    <p>${dish.name}</p>
    <p>${dish.count}</p>
    <p>${dish.price} руб.</p>
    <button type="button">Добавить</button>
  `;

  // Добавляем карточку в соответствующий контейнер категории
  if (categories[dish.category]) {
    categories[dish.category].appendChild(card);
  }
});

// --- ЛОГИКА ВЫБОРА БЛЮД ДЛЯ ЗАКАЗА ---

// Получаем ссылки на элементы выбора блюд
const selectSoup = document.getElementById('soup');
const selectMain = document.getElementById('main');
const selectDrink = document.getElementById('drink');

// Создаем блок для отображения общей стоимости
const priceBlock = document.createElement('div');
priceBlock.className = 'order-total';
selectDrink.parentNode.appendChild(priceBlock);

// Функция для поиска блюда по категории и значению
function getSelectedDish(category, value) {
  return menuItems.find(d => d.category === category && d.keyword === value);
}

// Функция для обновления текста опций в выпадающем списке
function updateSelectOptionText(select, category) {
  // Обновляем текст для каждой опции
  Array.from(select.options).forEach(option => {
    if (!option.value) return; // Пропускаем плейсхолдер
    const dish = getSelectedDish(category, option.value);
    if (dish) {
      option.textContent = `${dish.name}  ${dish.price}₽`;
    }
  });
  // Для выбранного блюда обновляем текст с ценой
  const selected = select.options[select.selectedIndex];
  if (selected && selected.value) {
    const dish = getSelectedDish(category, selected.value);
    if (dish) {
      selected.textContent = `${dish.name}  ${dish.price}₽`;
    }
  }
}

// Функция для обновления общей стоимости заказа
function updateTotal() {
  // Обновляем текст опций во всех выпадающих списках
  updateSelectOptionText(selectSoup, 'soup');
  updateSelectOptionText(selectMain, 'main');
  updateSelectOptionText(selectDrink, 'drink');

  // Получаем выбранные блюда
  const soup = getSelectedDish('soup', selectSoup.value);
  const main = getSelectedDish('main', selectMain.value);
  const drink = getSelectedDish('drink', selectDrink.value);
  
  // Считаем общую стоимость
  let total = 0;
  if (soup) total += soup.price;
  if (main) total += main.price;
  if (drink) total += drink.price;
  
  // Обновляем отображение общей стоимости
  if (soup || main || drink) {
    priceBlock.textContent = `Итого: ${total} ₽`;
  } else {
    priceBlock.textContent = '';
  }
}

// Добавляем обработчики изменения выбранных блюд
[selectSoup, selectMain, selectDrink].forEach(select => {
  select.addEventListener('change', updateTotal);
});

// Добавляем обработчики клика по карточкам блюд
Object.values(categories).forEach(section => {
  section.addEventListener('click', e => {
    // Находим ближайшую карточку блюда
    const card = e.target.closest('.menu-item');
    if (!card) return;
    // Получаем идентификатор блюда
    const keyword = card.getAttribute('data-dish');
    // Находим блюдо в списке
    const dish = menuItems.find(d => d.keyword === keyword);
    if (!dish) return;
    // Устанавливаем выбранное значение в соответствующий список
    if (dish.category === 'soup') selectSoup.value = dish.keyword;
    if (dish.category === 'main') selectMain.value = dish.keyword;
    if (dish.category === 'drink') selectDrink.value = dish.keyword;
    // Обновляем общую стоимость
    updateTotal();
  });
});

// Инициализируем отображение общей стоимости
updateTotal(); 