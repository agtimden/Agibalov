def print_squares(n):
    for i in range(n):
        print(i ** 2)

if __name__ == "__main__":
    n = int(input().strip())
    print_squares(n)