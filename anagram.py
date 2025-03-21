from collections import Counter

def check_anagram(str1, str2):
    # Сравниваем частоты символов в обеих строках
    if Counter(str1) == Counter(str2):
        return "YES"
    else:
        return "NO"

if __name__ == "__main__":
    # Считываем две строки
    str1 = input().strip()
    str2 = input().strip()
    
    # Выводим результат
    print(check_anagram(str1, str2))