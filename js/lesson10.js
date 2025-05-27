// 1. показ средней суммы чисел
const numbers = [1, 2, 3, 4, 5];

function averageNumbers(...numbers) { // добавил rest для сборки всего массива произвольной длины
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length; // добавил длину массива для определения среднего значения
}

console.log(averageNumbers(...numbers)); // 3

// как я понял оператор spread разворачивает массив в отдельные аргументы
// оператор rest действует в другую сторону, собирает аргументы в массив

// 2. деструктуризация объекта
const person = {
    name: "John",
    age: 25,
    country: 'USA'
}

function personStriing({ name, age, country}){
    console.log(`${name} ${age} ${country}`); // убрал знаки, поставил пробелы в интерполяции
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
function userArray() {
const  {name:n, age:a, address: {city:c, street:s , ...userCut}} = user
console.log(n + ' ' + a) // Leonid 34
console.log(userCut); // { building: [ 63, 1 ] }
}
userArray(); // переделал в функцию)

// либо так
function userArray2({name, age, ...userCut}){
    console.log(name); // Leonid
    console.log(age); // 34
    console.log(userCut); // {address: { city: 'Manitogorsk', street: 'Zeleniy log', building: [ 63, 1 ] }}
}

userArray2(user);

// кстати, спасибо! сегодня я поспавши, усвоил информацию, и за несколько минут изменил что нужно) с полным пониманием
