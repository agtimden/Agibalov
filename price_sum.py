import csv

def calculate_expenses(filename):
    # Создаём переменные для хранения суммарных затрат по категориям
    adult_expenses = 0.0
    pensioner_expenses = 0.0
    child_expenses = 0.0
    
    # Открываем CSV файл и читаем данные
    with open(filename, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)  # Используем DictReader для работы с заголовками

        # Проходим по строкам файла
        for row in reader:
            # Суммируем затраты в зависимости от категории
            adult_expenses += float(row['Взрослый'])
            pensioner_expenses += float(row['Пенсионер'])
            child_expenses += float(row['Ребенок'])

    # Выводим суммарные затраты, округленные до двух знаков
    print(f"{adult_expenses:.2f} {pensioner_expenses:.2f} {child_expenses:.2f}")

if __name__ == "__main__":
    # Путь к файлу products.csv
    filename = 'products.csv'
    calculate_expenses(filename)