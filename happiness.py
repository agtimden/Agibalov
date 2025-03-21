def calculate_mood(n, m, array, A, B):
    mood = 0
    # Преобразуем A и B в множества для более быстрой проверки вхождения
    set_A = set(A)
    set_B = set(B)
    
    # Обрабатываем элементы массива
    for num in array:
        if num in set_A:
            mood += 1
        elif num in set_B:
            mood -= 1
    
    return mood

# Чтение входных данных
n, m = map(int, input().split())
array = list(map(int, input().split()))
A = list(map(int, input().split()))
B = list(map(int, input().split()))

# Выводим результат
print(calculate_mood(n, m, array, A, B))