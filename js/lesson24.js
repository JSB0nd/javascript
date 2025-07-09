// 1. Напиши рекурсивную функцию для вычисления суммы всех элементов в массиве;

const array = [ 1, 2, 3, 4, 5];

const sum = (array, index = 0) => {
    if (index >= array.length) return 0; // базовый случай

    return array[index] + sum (array, (index + 1)); // рекурсивный случай
}

console.log(sum(array)); // 15

// 2. Реализуй функцию для нахождения максимального элемента в массиве с использованием рекурсии;

const maxArray = (array, index = 0) => {
    if (index === array.length - 1) return array[index]; // базовый случай

    const maxOfRest = maxArray(array, index + 1);

    return array[index] > maxOfRest ? array[index] : maxOfRest;
}

console.log(maxArray(array)); // 5

// 3. Помнишь функцию глубоко копирования объектов? Там использовалась рекурсия. Вернись к ней и
// проанализируй её еще раз, чтобы усвоить информацию ещё лучше! Это задание на самостоятельную работу - ничего присылать не нужно!

// copy[key] = deepCopy(obj[key]); // рекурсивное копирование в новый объект, который был создан изначально
// в лексической области при вызове функции
//  if (obj === null || typeof obj !== "object") // запускает саму себя пока удовлетворяет условию

// 4. А вот теперь нужно реализовать функцию для вычисления чисел Фибоначчи с кэшированием через рекурсию!
// Требования те же, что и в предыдущем уроке.

function fibonacci(n, cache = {}) {
    if (n < 0) return null;
    if (n === 0) return 0;
    if (n === 1) return 1;

    if (cache[n] !== undefined) {
        return cache[n];
    }

    cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);

    return cache[n];
}

console.log(fibonacci(11)); // 89
console.log(fibonacci(20)) // 6765