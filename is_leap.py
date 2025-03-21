def is_leap_year(year):
    # Проверка условий для високосного года
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        return True
    else:
        return False

# Чтение входных данных
year = int(input())

# Вывод результата
print(is_leap_year(year))