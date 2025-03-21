def matrix_multiplication(n, A, B):
    # Создаем матрицу для результата
    C = [[0] * n for _ in range(n)]
    
    # Перемножаем матрицы A и B
    for i in range(n):
        for j in range(n):
            C[i][j] = sum(A[i][k] * B[k][j] for k in range(n))
    
    # Выводим результат
    for row in C:
        print(" ".join(map(str, row)))

# Чтение входных данных
n = int(input())  # Размерность матриц

# Чтение матрицы A
A = [list(map(int, input().split())) for _ in range(n)]

# Чтение матрицы B
B = [list(map(int, input().split())) for _ in range(n)]

# Вызов функции для вычисления произведения
matrix_multiplication(n, A, B)