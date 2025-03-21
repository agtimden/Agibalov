def minion_game(s):
    vowels = 'AEIOU'
    kevin_score = 0
    stuart_score = 0
    n = len(s)
    
    for i in range(n):
        # Если символ гласный, то Кевин получает очки
        if s[i] in vowels:
            kevin_score += n - i
        # Если символ согласный, то Стюарт получает очки
        else:
            stuart_score += n - i
    
    # Вывод победителя и его очков
    if kevin_score > stuart_score:
        print(f"Кевин {kevin_score}")
    elif stuart_score > kevin_score:
        print(f"Стюарт {stuart_score}")
    else:
        print(f"Ничья {kevin_score}")

if __name__ == "__main__":
    s = input()
    minion_game(s)