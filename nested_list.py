def second_lowest_score_students(records):
    scores = [score for name, score in records]  # Извлекаем оценки
    sorted_scores = sorted(set(scores), reverse=True)
    
    # Проверяем, есть ли хотя бы два разных балла
    if len(sorted_scores) < 2:
        return []  # Если нет второго места, возвращаем пустой список
    
    second_lowest = sorted_scores[1]  # Находим вторую по величине оценку
    second_place_students = [name for name, score in records if score == second_lowest]  # Ищем студентов с этой оценкой
    second_place_students.sort()  # Сортируем имена в алфавитном порядке
    return second_place_students

if __name__ == "__main__":
    n = int(input().strip())  # Считываем количество студентов
    records = []
    for _ in range(n):
        name = input().strip()  # Имя студента
        score = float(input().strip())  # Оценка студента
        records.append([name, score])
    
    second_place_students = second_lowest_score_students(records)
    if second_place_students:
        for student in second_place_students:
            print(student)
    else:
        print("No second place")  # Если нет второго места