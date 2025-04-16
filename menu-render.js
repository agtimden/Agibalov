// Сортировка по алфавиту
const sortedMenu = [...menuItems].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

// Объект с соответствиями категорий и их DOM-элементов
const categories = {
  soup: document.querySelector('#soups .menu-items'),
  main: document.querySelector('#main-dishes .menu-items'),
  salad: document.querySelector('#salads .menu-items'),
  drink: document.querySelector('#drinks .menu-items'),
  dessert: document.querySelector('#desserts .menu-items')
};

// Очищаем все контейнеры
Object.values(categories).forEach(container => {
  container.innerHTML = '';
});

// Группируем блюда по категориям и сортируем по алфавиту
const groupedItems = {};
Object.keys(categories).forEach(category => {
  groupedItems[category] = menuItems
    .filter(item => item.category === category)
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
});

// Отрисовываем блюда в соответствующие секции
Object.entries(groupedItems).forEach(([category, items]) => {
  const container = categories[category];
  if (!container) return;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.setAttribute('data-dish', item.keyword);
    card.setAttribute('data-kind', item.kind);

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="150">
      <p>${item.name}</p>
      <p>${item.count}</p>
      <p>${item.price} ₽</p>
      <button type="button">Добавить</button>
    `;

    container.appendChild(card);
  });
});

// Добавляем обработчики для фильтров
document.querySelectorAll('.filters').forEach(filterContainer => {
  filterContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('filter-btn')) return;
    
    const kind = e.target.getAttribute('data-kind');
    const section = e.target.closest('section');
    const items = section.querySelectorAll('.menu-item');
    
    // Если кликнули по уже активному фильтру - показываем все блюда
    if (e.target.classList.contains('active')) {
      items.forEach(item => item.style.display = '');
      e.target.classList.remove('active');
    } else {
      // Убираем активный класс у всех кнопок в этом блоке фильтров
      filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      // Добавляем класс active к нажатой кнопке и фильтруем
      e.target.classList.add('active');
      items.forEach(item => {
        item.style.display = item.getAttribute('data-kind') === kind ? '' : 'none';
      });
    }
  });
});

// --- ЛОГИКА ВЫБОРА БЛЮД ДЛЯ ЗАКАЗА ---
const selectSoup = document.getElementById('soup');
const selectMain = document.getElementById('main');
const selectSalad = document.getElementById('salad');
const selectDrink = document.getElementById('drink');
const selectDessert = document.getElementById('dessert');

const priceBlock = document.createElement('div');
priceBlock.className = 'order-total';
selectDessert.parentNode.appendChild(priceBlock);

function getSelectedDish(category, value) {
  return menuItems.find(d => d.category === category && d.keyword === value);
}

function updateSelectOptionText(select, category) {
  Array.from(select.options).forEach(option => {
    if (!option.value) return; // пропускаем плейсхолдер
    const dish = getSelectedDish(category, option.value);
    if (dish) {
      option.textContent = `${dish.name}  ${dish.price}₽`;
    }
  });
  // Для выбранного блюда — выделить цену
  const selected = select.options[select.selectedIndex];
  if (selected && selected.value) {
    const dish = getSelectedDish(category, selected.value);
    if (dish) {
      selected.textContent = `${dish.name}  ${dish.price}₽`;
    }
  }
}

function updateTotal() {
  updateSelectOptionText(selectSoup, 'soup');
  updateSelectOptionText(selectMain, 'main');
  updateSelectOptionText(selectSalad, 'salad');
  updateSelectOptionText(selectDrink, 'drink');
  updateSelectOptionText(selectDessert, 'dessert');

  const soup = getSelectedDish('soup', selectSoup.value);
  const main = getSelectedDish('main', selectMain.value);
  const salad = getSelectedDish('salad', selectSalad.value);
  const drink = getSelectedDish('drink', selectDrink.value);
  const dessert = getSelectedDish('dessert', selectDessert.value);
  
  let total = 0;
  if (soup) total += soup.price;
  if (main) total += main.price;
  if (salad) total += salad.price;
  if (drink) total += drink.price;
  if (dessert) total += dessert.price;
  
  if (total > 0) {
    priceBlock.textContent = `Итого: ${total} ₽`;
  } else {
    priceBlock.textContent = '';
  }
}

[selectSoup, selectMain, selectSalad, selectDrink, selectDessert].forEach(select => {
  select.addEventListener('change', updateTotal);
});

Object.values(categories).forEach(section => {
  section.addEventListener('click', e => {
    const card = e.target.closest('.menu-item');
    if (!card) return;
    const keyword = card.getAttribute('data-dish');
    const dish = menuItems.find(d => d.keyword === keyword);
    if (!dish) return;
    if (dish.category === 'soup') selectSoup.value = dish.keyword;
    if (dish.category === 'main') selectMain.value = dish.keyword;
    if (dish.category === 'salad') selectSalad.value = dish.keyword;
    if (dish.category === 'drink') selectDrink.value = dish.keyword;
    if (dish.category === 'dessert') selectDessert.value = dish.keyword;
    updateTotal();
  });
});

updateTotal();

// Функция для создания карточки блюда
function createMenuItem(item) {
  // Создаем основной контейнер для карточки
  const menuItem = document.createElement('div');
  menuItem.className = 'menu-item';
  
  // Создаем контейнер для изображения
  const imageContainer = document.createElement('div');
  imageContainer.className = 'menu-item-image';
  
  // Создаем элемент изображения
  const image = document.createElement('img');
  image.src = `images/${item.image}`; // Устанавливаем путь к изображению
  image.alt = item.name; // Устанавливаем альтернативный текст
  imageContainer.appendChild(image); // Добавляем изображение в контейнер
  
  // Создаем контейнер для информации о блюде
  const infoContainer = document.createElement('div');
  infoContainer.className = 'menu-item-info';
  
  // Создаем заголовок с названием блюда
  const title = document.createElement('h3');
  title.textContent = item.name;
  infoContainer.appendChild(title);
  
  // Создаем блок с ценой и весом порции
  const priceContainer = document.createElement('div');
  priceContainer.className = 'menu-item-price';
  
  // Создаем элемент с ценой
  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = `${item.price} ₽`; // Отображаем цену в рублях
  priceContainer.appendChild(price);
  
  // Создаем элемент с весом порции
  const weight = document.createElement('span');
  weight.className = 'weight';
  weight.textContent = item.count; // Отображаем вес/объем порции
  priceContainer.appendChild(weight);
  
  infoContainer.appendChild(priceContainer); // Добавляем блок с ценой в контейнер информации
  
  // Создаем кнопку добавления в корзину
  const addButton = document.createElement('button');
  addButton.className = 'add-to-cart';
  addButton.textContent = 'Добавить в корзину';
  addButton.onclick = function() {
    addToCart(item); // При клике вызываем функцию добавления в корзину
  };
  infoContainer.appendChild(addButton); // Добавляем кнопку в контейнер информации
  
  // Добавляем все элементы в основную карточку
  menuItem.appendChild(imageContainer);
  menuItem.appendChild(infoContainer);
  
  return menuItem; // Возвращаем готовую карточку
}

// Функция для отображения меню
function renderMenu() {
  // Получаем контейнер для меню
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // Очищаем контейнер
  
  // Создаем секции для разных категорий блюд
  const categories = {
    soup: 'Супы',
    main: 'Главные блюда',
    salad: 'Салаты и стартеры',
    drink: 'Напитки',
    dessert: 'Десерты'
  };
  
  // Для каждой категории создаем отдельную секцию
  for (const [category, title] of Object.entries(categories)) {
    // Создаем заголовок секции
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = title;
    menuContainer.appendChild(sectionTitle);
    
    // Создаем контейнер для блюд категории
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'menu-category';
    
    // Фильтруем блюда по категории и создаем карточки
    const categoryItems = menuItems.filter(item => item.category === category);
    categoryItems.forEach(item => {
      categoryContainer.appendChild(createMenuItem(item));
    });
    
    menuContainer.appendChild(categoryContainer); // Добавляем секцию в меню
  }
}

// Функция для добавления блюда в корзину
function addToCart(item) {
  // Получаем текущую корзину из localStorage или создаем новую
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Проверяем, есть ли уже такое блюдо в корзине
  const existingItem = cart.find(cartItem => cartItem.keyword === item.keyword);
  
  if (existingItem) {
    // Если блюдо уже есть, увеличиваем количество
    existingItem.quantity += 1;
  } else {
    // Если блюда нет, добавляем его с количеством 1
    cart.push({
      ...item,
      quantity: 1
    });
  }
  
  // Сохраняем обновленную корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Обновляем отображение корзины
  updateCartDisplay();
  
  // Показываем уведомление о добавлении
  showNotification(`${item.name} добавлен в корзину`);
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
  // Получаем элемент счетчика корзины
  const cartCount = document.getElementById('cart-count');
  
  // Получаем текущую корзину
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Вычисляем общее количество товаров
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Обновляем счетчик
  cartCount.textContent = totalItems;
}

// Функция для показа уведомлений
function showNotification(message) {
  // Создаем элемент уведомления
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Добавляем уведомление на страницу
  document.body.appendChild(notification);
  
  // Через 3 секунды удаляем уведомление
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  renderMenu(); // Отображаем меню
  updateCartDisplay(); // Обновляем отображение корзины
}); 