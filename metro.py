def count_passengers_in_metro(n, data, t):
    count = 0
    for entry, exit_time in data:
        if entry <= t <= exit_time:
            count += 1
    return count

if __name__ == "__main__":
    # Считываем количество пассажиров
    n = int(input())
    
    # Считываем времена входа и выхода пассажиров
    data = []
    for _ in range(n):
        entry, exit_time = map(int, input().split())
        data.append((entry, exit_time))
    
    # Считываем момент времени T
    t = int(input())
    
    # Выводим количество пассажиров в метро в момент времени T
    print(count_passengers_in_metro(n, data, t))