// Массив допустимых комбинаций блюд
// Каждый элемент массива представляет собой объект с полями для каждого типа блюда
// 1 означает, что блюдо должно быть в комбо, 0 - не должно быть
const validCombos = [
    { soup: 1, main: 1, salad: 1, drink: 1 }, // Комбо 1: суп + основное + салат + напиток
    { soup: 1, main: 1, salad: 0, drink: 1 }, // Комбо 2: суп + основное + напиток
    { soup: 0, main: 1, salad: 1, drink: 1 }, // Комбо 3: основное + салат + напиток
    { soup: 1, main: 1, salad: 1, drink: 0 }, // Комбо 4: суп + основное + салат
    { soup: 0, main: 1, salad: 0, drink: 1 }  // Комбо 5: основное + напиток
];

// Функция для проверки соответствия заказа одной из допустимых комбинаций
function checkCombo(order) {
    // Проверяем каждую допустимую комбинацию
    return validCombos.some(combo => {
        // Проверяем соответствие каждого типа блюда
        return ['soup', 'main', 'salad', 'drink'].every(type => {
            // Если в комбо требуется блюдо (1), оно должно быть в заказе
            // Если в комбо не требуется блюдо (0), его не должно быть в заказе
            return combo[type] === (order[type] ? 1 : 0);
        });
    });
}

// Функция для создания и отображения уведомления на странице
function showNotification(message) {
    // Создаем оверлей для затемнения фона
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    // Создаем контейнер уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Создаем и настраиваем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.className = 'close-notification';
    notification.appendChild(closeButton);
    
    // Добавляем элементы на страницу
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    // Добавляем обработчик клика для закрытия уведомления
    closeButton.onclick = () => {
        document.body.removeChild(overlay);
    };
    
    // Устанавливаем автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    }, 5000);
}

// Функция для проверки отсутствующих элементов в заказе
function getMissingItems(order) {
    // Проверяем, соответствует ли заказ допустимым комбинациям
    if (checkCombo(order)) {
        return null; // Если всё в порядке, возвращаем null
    }
    
    // Формируем сообщение об ошибке
    let message = 'Ваш заказ не соответствует ни одному из доступных комбо. ';
    
    // Проверяем наличие основного блюда (обязательно для всех комбо)
    if (!order.main) {
        message += 'Основное блюдо обязательно для всех комбо. ';
    }
    
    // Проверяем наличие дополнительных элементов
    if (!order.soup && !order.salad && !order.drink) {
        message += 'Добавьте хотя бы один дополнительный элемент (суп, салат или напиток).';
    }
    
    return message;
}

// Добавляем обработчик события отправки формы
document.querySelector('form').addEventListener('submit', function(e) {
    // Предотвращаем стандартное поведение формы
    e.preventDefault();
    
    // Собираем данные о выбранных блюдах
    const order = {
        soup: document.querySelector('input[name="soup"]:checked'),
        main: document.querySelector('input[name="main"]:checked'),
        salad: document.querySelector('input[name="salad"]:checked'),
        drink: document.querySelector('input[name="drink"]:checked')
    };
    
    // Проверяем наличие ошибок в заказе
    const errorMessage = getMissingItems(order);
    
    if (errorMessage) {
        // Если есть ошибки, показываем сообщение об ошибке
        showNotification(errorMessage);
    } else {
        // Если всё в порядке, показываем сообщение об успешном оформлении
        showNotification('Ваш заказ успешно оформлен!');
        // Очищаем форму
        this.reset();
    }
}); 