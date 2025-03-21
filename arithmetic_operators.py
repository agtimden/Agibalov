def arithmetic_operations(a, b):
    return a + b, a - b, a * b

if __name__ == "__main__":
    a = int(input().strip())
    b = int(input().strip())
    
    results = arithmetic_operations(a, b)
    for res in results:
        print(res)