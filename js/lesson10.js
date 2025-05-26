const originalArray = [1, 2, 3, 4, 5];
const copiedArray = [...originalArray];

console.log(copiedArray); // [ 1, 2, 3, 4, 5 ]

const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9];
const combinedArray = [...array1, ...array2];

console.log(combinedArray); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9]

const originalIbject = { a: 1, b: 2, c: 3 };
const copiedIbject = { ...originalIbject };

console.log(copiedIbject); // { a: 1, b: 2, c: 3 }

const object1 = { a: 1, b: 2};
const object2 = { c: 3, d: 4 };
const combinedIbject = { ...object1, ...object2};

console.log(combinedIbject); // { a: 1, b: 2, c: 3, d: 4 }

const numbers0 = [1, 2, 3];
const sum = (a, b, c) => a + b +c;

console.log(sum(...numbers0)); // 6

// как я понял оператор spread находистя справа от = и поэтому производит действия сложения
// массивов и объектов, а такжэе передает аргументы в функции

function acc(...numbers) {
    return numbers.reduce((acc, number) => acc + number, 0);
}

console.log(sum(1, 2, 3, 4)); // 6
console.log(sum(5, 6, 7, 8)); // 18

// Простая деструктуризация массива
const numbers = [1, 2, 3];
const [one, two, three] = numbers;

console.log(one); // 1
console.log(two); // 2
console.log(three); // 3

// Пропуск элементов
const [first, , third] = numbers;

console.log(first); // 1
console.log(third); // 3

// Деструктуризация с остатком (rest)
const [head, ...tail] = numbers;

console.log(head); // 1
console.log(tail); // [2, 3]

// Простая деструктуризация объекта
const user = { name: 'Alice', age: 25, country: 'USA' };
const { name, age, country } = user;

console.log(name); // Alice
console.log(age); // 25
console.log(country); // USA

// Переименование переменных
const { name: userName, age: userAge, country: userCountry } = user;

console.log(userName); // Alice
console.log(userAge); // 25
console.log(userCountry); // USA

// Деструктуризация с остатком (rest)
const { name: n, ...rest } = user;

console.log(n); // Alice
console.log(rest); // { age: 25, country: 'USA' }

// Вложенная деструктуризация объекта
const person = {
    name: 'Bob',
    address: {
        city: 'New York',
        zip: '10001'
    }
};
const { nameB, address: { city, zip } } = person;

console.log(nameB); // Bob
console.log(city); // New York
console.log(zip); // 10001

// Вложенная деструктуризация массива
const nestedArray = [1, [2, 3], 4];
const [a, [b, c], d] = nestedArray;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
console.log(d); // 4

// Деструктуризация в параметрах функции
function printUser({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`);
}

const user1 = { name: 'Charlie', age: 30 };
printUser(user1); // Name: Charlie, Age: 30

const user2 = { name: 'Angel', age: 25}
printUser(user2); // Name: Angel, Age: 25


// Деструктуризация массивов в параметрах функции
function summary([a, b, c, d, e, f]) {
    return a + b + c + d + e + f;
}

const numbersS = [1, 2, 3, 4, 5, 6];
console.log(summary(numbersS)); // 21

// то есть оператор rest находится как бы до = и производит действия
// разделения на составляющие