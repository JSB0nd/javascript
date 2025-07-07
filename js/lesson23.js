// 1. Напиши функцию, которая создает и возвращает другую функцию.
// Внутренняя функция должна иметь доступ к переменной,
// объявленной во внешней функции, даже после завершения внешней функции;

function counter() {
    let count = 0;

    return function () {
        count++;
        return count;
    }
}

let counter1 = counter();
console.log(counter1()); // 1
console.log(counter1()); // 2

// 2. Реализуй пример с несколькими вложенными функциями,
// где каждая функция использует переменные из своего собственного и внешних лексических окружений;

function greeting() {
    const hello = 'Hello, ';
    console.log(hello);

    function nameIs() {
        const myName = 'my name is ';
        console.log(hello + myName);

        function innerName() {
            const firstName = 'Leonid';
            console.log(hello + myName + firstName);
        }

        innerName(); // Hello, my name is Leonid

        // console.log(hello + myName + firstName) // Uncaught ReferenceError: firstName is not defined
    }

    nameIs(); // Hello, my name

    // console.log(hello + myName + firstName) // Uncaught ReferenceError: myName is not defined
}

greeting(); ///Hello,
// каждая функция использует переменные из своего и внешнего лексического окружения
// обращение к переменным вложенным в функции приводит к Uncaught ReferenceError

// 3*. Тебе нужно написать функцию для вычисления чисел Фибоначчи с использованием цикла и кэширования.
//     Числа Фибоначчи — это последовательность, в которой каждое число является суммой двух предыдущих чисел. Кэширование необходимо для того, чтобы избежать повторных вычислений одних и тех же значений, что значительно ускорит работу функции. Кэширование реализуем с помощью только что изученных замыканий :)
// Функция должна возвращать другую функцию, которая принимает число `n` и возвращает `n`-е число Фибоначчи.
//     Внутренняя функция должна использовать кэширование для хранения уже вычисленных значений чисел Фибоначчи.
//     Реализация должна быть через цикл, НЕ через рекурсию!
//     Пример:

// function fibonacci(n) {
//     if (n < 0) return null;
//     if (n === 0) return 0;
//     if (n === 1) return 1;
//
//     const cache = [0, 1];
//
//     for (let i = 2; i <= n; i++) {
//         cache[i] = cache[i - 1] + cache[i - 2];
//     }
//
//     return cache[n];
// }
//
// console.log(fibonacci(10)); // 55

// const fibonacci = createFibonacciCalculator();
// console.log(fibonacci(0)); // 0
// console.log(fibonacci(1)); // 1
// console.log(fibonacci(5)); // 5
// console.log(fibonacci(10)); // 55
// // console.log(fibonacci(50)); // 12586269025 (очень быстро за счет кэширования)