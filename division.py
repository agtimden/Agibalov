def division_operations(a, b):
    if b == 0:
        return "Division by zero is not allowed", "Division by zero is not allowed"
    return a // b, a / b

if __name__ == "__main__":
    a = int(input().strip())
    b = int(input().strip())

    results = division_operations(a, b)
    for res in results:
        print(res)