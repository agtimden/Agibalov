import subprocess
import pytest

INTERPRETER = 'python3'

def run_script(filename, input_data=None):
    proc = subprocess.run(
        [INTERPRETER, filename],
        input='\n'.join(input_data if input_data else []),
        capture_output=True,
        text=True,
        check=False
    )
    return proc.stdout.strip()

test_data = {
    'python_if_else': [
        ('1', 'Weird'),
        ('4', 'Not Weird'),
        ('3', 'Weird'),
        ('6','Weird'),
        ('22', 'Not Weird')
    ],
    'arithmetic_operators': [
        (['1', '2'], ['3', '-1', '2']),
        (['10', '5'], ['15', '5', '50'])
    ]
    
}

def test_hello_world():
    assert run_script('hello_world.py') == 'Hello, world!'

@pytest.mark.parametrize("input_data, expected", test_data['python_if_else'])
def test_python_if_else(input_data, expected):
    assert run_script('python_if_else.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['arithmetic_operators'])
def test_arithmetic_operators(input_data, expected):
    assert run_script('arithmetic_operators.py', input_data).split('\n') == expected

test_data.update({
    'division': [
        (['10', '3'], ['3', '3.3333333333333335']),
        (['7', '2'], ['3', '3.5']),
        (['9', '9'], ['1', '1.0'])
    ],
    'loops': [
        (['3'], ['0', '1', '4']),
        (['5'], ['0', '1', '4', '9', '16'])
    ],
    'print_function': [
        (['3'], ['123']),
        (['5'], ['12345']),
        (['1'], ['1'])
    ]
})

@pytest.mark.parametrize("input_data, expected", test_data['division'])
def test_division(input_data, expected):
    assert run_script('division.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['loops'])
def test_loops(input_data, expected):
    assert run_script('loops.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['print_function'])
def test_print_function(input_data, expected):
    assert run_script('print_function.py', input_data).split('\n') == expected


test_data.update({
    'second_score': [
        (['5', '2 3 6 6 5'], ['5']),
        (['4', '4 4 2 4'], ['2']),
        (['6', '1 2 3 4 5 6'], ['5']),
    ],
    'nested_list': [
        (['3', 'Тина', '10', 'Акрити', '20', 'Харш', '15'], ['Харш']),
        (['4', 'Джон', '60', 'Петр', '40', 'Анна', '50', 'Елена', '45'], ['Анна']),
    ],
    'lists': [
        (['12', 'insert 0 5', 'insert 1 10', 'insert 0 6', 'print', 'remove 6', 'append 9', 'append 1', 'sort', 'print', 'pop', 'reverse', 'print'],
         ['[6, 5, 10]', '[1, 5, 9, 10]', '[9, 5, 1]']),
        (['5', 'append 2', 'append 1', 'insert 1 3', 'sort', 'print'], ['[1, 2, 3]']),
        (['6', 'append 10', 'insert 1 5', 'insert 2 20', 'remove 5', 'reverse', 'print'], ['[20, 10]']),
    ]
})

@pytest.mark.parametrize("input_data, expected", test_data['second_score'])
def test_second_score(input_data, expected):
    assert run_script('second_score.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['nested_list'])
def test_nested_list(input_data, expected):
    assert run_script('nested_list.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['lists'])
def test_lists(input_data, expected):
    assert run_script('lists.py', input_data).split('\n') == expected


test_data.update({
    'swap_case': [
        (['Www.MosPolytech.ru'], ['wWW.mOSpOLYTECH.RU']),
        (['Pythonist 2'], ['pYTHONIST 2']),
        (['Hello World'], ['hELLO wORLD']),
        (['Swap Case!'], ['sWAP cASE!']),
    ],
    'split_and_join': [
        (['this is a string'], ['this-is-a-string']),
        (['hello world'], ['hello-world']),
        (['python is fun'], ['python-is-fun']),
        (['split and join'], ['split-and-join']),
    ],
    'max_word': [
        (['example.txt'], ['сосредоточенности']),
        (['text_example.txt'], ['сосредоточенности']),
        (['max_word.txt'], ['сосредоточенности']),
    ]
})

@pytest.mark.parametrize("input_data, expected", test_data['swap_case'])
def test_swap_case(input_data, expected):
    assert run_script('swap_case.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['split_and_join'])
def test_split_and_join(input_data, expected):
    assert run_script('split_and_join.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['max_word'])
def test_max_word(input_data, expected):
    assert run_script('max_word.py', input_data).strip() == expected[0]
    
test_data.update({
    'price_sum': [
        (['products.csv'], ['6842.84 5891.06 6810.90']),
    ],
    'anagram': [
        (['listen', 'silent'], ['YES']),
        (['hello', 'world'], ['NO']),
        (['evil', 'vile'], ['YES']),
        (['python', 'typhon'], ['YES']),
    ],
    'metro': [
        (['4', '10 20', '5 15', '12 30', '5 25', '12'], ['4']),
        (['3', '0 10', '5 20', '10 30', '8'], ['2']),
        (['2', '0 5', '3 8', '7'], ['1']),
    ]
})

@pytest.mark.parametrize("input_data, expected", test_data['price_sum'])
def test_price_sum(input_data, expected):
    assert run_script('price_sum.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['anagram'])
def test_anagram(input_data, expected):
    assert run_script('anagram.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['metro'])
def test_metro(input_data, expected):
    assert run_script('metro.py', input_data).strip() == expected[0]

test_data.update({
    'minion_game': [
        (['BANANA'], ['Стюарт 12']),
        (['APPLE'], ['Стюарт 9']),
        (['ABACUS'], ['Кевин 12']),
        (['EEEEE'], ['Кевин 15']),
    ],
    'is_leap': [
        (['2000'], ['True']),
        (['2020'], ['True']),
        (['1900'], ['False']),
        (['2024'], ['True']),
        (['2100'], ['False']),
    ],
    'happiness': [
        (['3 2', '1 5 3', '3 1', '5 7'], ['1']),
        (['4 3', '1 2 3 4', '2 3 5', '4 6 8'], ['1']),
        (['2 3', '1 2', '2 3 4', '5 6 7'], ['1']),
        (['5 3', '5 3 5 2 1', '5 4 6', '6 7 8'], ['2']),
    ]
})

@pytest.mark.parametrize("input_data, expected", test_data['minion_game'])
def test_minion_game(input_data, expected):
    assert run_script('minion_game.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['is_leap'])
def test_is_leap(input_data, expected):
    assert run_script('is_leap.py', input_data).strip() == expected[0]

@pytest.mark.parametrize("input_data, expected", test_data['happiness'])
def test_happiness(input_data, expected):
    assert run_script('happiness.py', input_data).strip() == expected[0]


test_data.update({
    'matrix_mult': [
        (['2', '1 2', '3 4', '5 6', '7 8'], ['19 22', '43 50']),
        (['3', '1 2 3', '4 5 6', '7 8 9', '9 8 7', '6 5 4', '3 2 1'], ['30 24 18', '84 69 54', '138 114 90']),
        (['3', '1 0 0', '0 1 0', '0 0 1', '1 0 0', '0 1 0', '0 0 1'], ['1 0 0', '0 1 0', '0 0 1']),
        (['2', '2 0', '0 2', '1 0', '0 1'], ['2 0', '0 2'])
    ]
})


@pytest.mark.parametrize("input_data, expected", test_data['matrix_mult'])
def test_matrix_mult(input_data, expected):
    assert run_script('matrix_mult.py', input_data).strip().split('\n') == expected