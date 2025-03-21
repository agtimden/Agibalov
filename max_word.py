import re

def find_longest_words(filename):
    # Открываем файл для чтения
    with open(filename, 'r') as file:
        # Считываем все строки из файла
        text = file.read()
    
    # Используем регулярные выражения для извлечения всех слов (исключая спецсимволы)
    words = re.findall(r'\b\w+\b', text)

    # Находим максимальную длину слов
    max_length = max(len(word) for word in words)

    # Выводим все слова, длина которых равна максимальной
    for word in words:
        if len(word) == max_length:
            print(word)

if __name__ == "__main__":
    # Путь к файлу example.txt
    filename = 'example.txt'
    find_longest_words(filename)