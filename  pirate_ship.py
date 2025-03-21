def pirate_ship(n, m, items):
    # Сортируем товары по стоимости на единицу веса, по убыванию
    items.sort(key=lambda x: x[2] / x[1], reverse=False)
    
    result = []
    remaining_capacity = n  # Остаток грузоподъемности судна
    
    for item in items:
        name, weight, value = item
        if remaining_capacity == 0:
            break
        
        if weight <= remaining_capacity:
            # Если весь товар помещается на судно
            result.append((name, weight, value))
            remaining_capacity -= weight
        else:
            # Если товар не помещается целиком, берем только часть
            fraction_value = value * (remaining_capacity / weight)
            result.append((name, remaining_capacity, fraction_value))
            remaining_capacity = 0
    
    # Выводим результат в формате "название вес стоимость"
    for name, weight, value in result:
        print(f"{name} {weight:.2f} {value:.2f}")

# Чтение входных данных
n, m = map(int, input().split())  # Грузоподъемность и количество товаров
items = []

for _ in range(m):
    name, weight, value = input().split()
    weight = int(weight)
    value = int(value)
    items.append((name, weight, value))

# Вызов функции и вывод результатов
pirate_ship(n, m, items)