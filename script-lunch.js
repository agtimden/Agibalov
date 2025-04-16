// Инициализация переменных для хранения выбранных блюд
let selectedItems = {
    soups: [],
    mainDishes: [],
    salads: [],
    drinks: []
};

// Инициализация переменной для хранения итоговой суммы
let totalPrice = 0;

// Функция для обновления отображения итоговой суммы
function updateTotalPrice() {
    // Сброс итоговой суммы
    totalPrice = 0;
    
    // Подсчет суммы для каждого типа блюд
    Object.values(selectedItems).forEach(items => {
        items.forEach(item => {
            totalPrice += item.price;
        });
    });
    
    // Обновление отображения итоговой суммы
    document.querySelector('.order-total').textContent = `Итого: ${totalPrice} ₽`;
}

// Функция для добавления блюда в заказ
function addToOrder(itemType, itemId, itemName, itemPrice) {
    // Создание объекта блюда
    const item = {
        id: itemId,
        name: itemName,
        price: itemPrice
    };
    
    // Добавление блюда в соответствующий массив
    selectedItems[itemType].push(item);
    
    // Обновление отображения итоговой суммы
    updateTotalPrice();
    
    // Обновление отображения выбранных блюд
    updateSelectedItemsDisplay();
}

// Функция для удаления блюда из заказа
function removeFromOrder(itemType, itemId) {
    // Поиск индекса блюда в массиве
    const index = selectedItems[itemType].findIndex(item => item.id === itemId);
    
    // Удаление блюда из массива
    if (index !== -1) {
        selectedItems[itemType].splice(index, 1);
    }
    
    // Обновление отображения итоговой суммы
    updateTotalPrice();
    
    // Обновление отображения выбранных блюд
    updateSelectedItemsDisplay();
}

// Функция для обновления отображения выбранных блюд
function updateSelectedItemsDisplay() {
    // Обновление отображения для каждого типа блюд
    Object.keys(selectedItems).forEach(itemType => {
        const container = document.querySelector(`#${itemType}-selected`);
        if (container) {
            // Очистка контейнера
            container.innerHTML = '';
            
            // Добавление выбранных блюд
            selectedItems[itemType].forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'selected-item';
                itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.price} ₽</span>
                    <button onclick="removeFromOrder('${itemType}', '${item.id}')">×</button>
                `;
                container.appendChild(itemElement);
            });
        }
    });
}

// Функция для обработки отправки формы
function handleFormSubmit(event) {
    // Предотвращение стандартной отправки формы
    event.preventDefault();
    
    // Проверка наличия выбранных блюд
    const hasSelectedItems = Object.values(selectedItems).some(items => items.length > 0);
    if (!hasSelectedItems) {
        showNotification('Пожалуйста, выберите хотя бы одно блюдо');
        return;
    }
    
    // Получение данных формы
    const formData = new FormData(event.target);
    const orderData = {
        items: selectedItems,
        totalPrice: totalPrice,
        customerInfo: Object.fromEntries(formData.entries())
    };
    
    // Отправка данных на сервер (заглушка)
    console.log('Отправка заказа:', orderData);
    
    // Показ уведомления об успешном заказе
    showNotification('Заказ успешно оформлен!');
    
    // Сброс формы и выбранных блюд
    event.target.reset();
    selectedItems = {
        soups: [],
        mainDishes: [],
        salads: [],
        drinks: []
    };
    updateSelectedItemsDisplay();
    updateTotalPrice();
}

// Функция для показа уведомления
function showNotification(message) {
    // Создание оверлея
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    // Создание уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()">OK</button>
    `;
    
    // Добавление уведомления в оверлей
    overlay.appendChild(notification);
    
    // Добавление оверлея на страницу
    document.body.appendChild(overlay);
}

// Инициализация обработчиков событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Добавление обработчика отправки формы
    const orderForm = document.querySelector('#order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Инициализация фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаление класса active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавление класса active текущей кнопке
            this.classList.add('active');
            
            // Получение типа фильтра
            const filterType = this.dataset.filter;
            
            // Фильтрация блюд
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (filterType === 'all' || item.dataset.type === filterType) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 