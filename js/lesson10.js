// 1. показ средней суммы чисел
const numbers = [1, 2, 3, 4];

function averageNumbers(a, b, c, d) {
    const sum = a + b + c + d;
    return sum / 4
}

console.log(averageNumbers(...numbers)); // 2.5

// как я понял оператор spread разворачивает массив в отдельные аргументы
// оператор rest действует в другую сторону, собирает аргументы в массив

// 2. деструктуризация объекта
const person = {
    name: "John",
    age: 25,
    country: 'USA'
}

function personStriing({ name, age, country}){
    console.log(`${name} + ${age} - ${country}`);
}

personStriing(person); // John 25 USA


// 3. деструктуризация вложенного массива

const user = {
    name: "Leonid",
    age: 34,
    address: {
        city: 'Manitogorsk',
        street: 'Zeleniy log',
        building: [63, 1]
    }
}

const { name, age, address: {city, street, building:[f, g]}, } = user;
console.log(`${name} ${age}, ${city}, ${street}, ${f}, ${g}`);
// Leonid 34, Manitogorsk, Zeleniy log, 63, 1

// 4. использование spread

const fruits = ['Apple', 'Orange', 'Banana']
const moreFruits = ['Mango', ...fruits, 'Peach']
console.log(moreFruits); // [ 'Mango', 'Apple', 'Orange', 'Banana', 'Peach' ]

// 5. использование rest

const  {name:n, age:a, address: {city:c, street:s , ...userCut}} = user
console.log(n + ' ' + a) // Leonid 34
console.log(userCut); // { building: [ 63, 1 ] }
