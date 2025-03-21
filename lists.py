if __name__ == "__main__":
    n = int(input().strip())  # Считываем количество команд
    arr = []  # Инициализируем пустой список
    
    for _ in range(n):
        command = input().strip().split()  # Считываем команду
        operation = command[0]  # Первая часть команды (тип операции)
        
        # В зависимости от операции выполняем нужное действие
        if operation == 'insert':
            i, e = int(command[1]), int(command[2])
            arr.insert(i, e)
        elif operation == 'print':
            print(arr)
        elif operation == 'remove':
            e = int(command[1])
            arr.remove(e)
        elif operation == 'append':
            e = int(command[1])
            arr.append(e)
        elif operation == 'sort':
            arr.sort()
        elif operation == 'pop':
            arr.pop()
        elif operation == 'reverse':
            arr.reverse()