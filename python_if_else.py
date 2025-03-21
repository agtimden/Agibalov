def check_weird(n):
    if n % 2 == 1:
        return "Weird"
    elif 2 <= n <= 5:
        return "Not Weird"
    elif 6 <= n <= 20:
        return "Weird"
    else:
        return "Not Weird"

if __name__ == "__main__":
    n = int(input().strip())
    print(check_weird(n))