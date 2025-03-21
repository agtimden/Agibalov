def second_place_score(scores):
    unique_scores = list(set(scores))  # Убираем повторяющиеся оценки
    unique_scores.sort(reverse=True)  # Сортируем по убыванию
    return unique_scores[1]  # Второе место

if __name__ == "__main__":
    n = int(input().strip())  # Считываем количество участников
    scores = list(map(int, input().strip().split()))  # Считываем оценки участников
    print(second_place_score(scores))