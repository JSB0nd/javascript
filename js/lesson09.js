const fruits = ['Apple', 'Orange', 'Banana', 'Cucumber'];

console.log(fruits); // [ 'Apple', 'Orange', 'Banana' ]
console.log(fruits[0]); // Apple
console.log(fruits[1]); //Orange
console.log(fruits[2]); // Banana
console.log(fruits[3]); // Cucumber
console.log(fruits[4]); // undefined
console.log(fruits.length); // 4
console.log(fruits[fruits.length - 1]); // Cucumber
console.log(fruits[fruits.length + 1]); // undefined

// mutable

fruits.push('Tomato');
console.log(fruits); // [ 'Apple', 'Orange', 'Banana', 'Cucumber', 'Tomato' ]]

fruits.pop();
console.log(fruits); // [ 'Apple', 'Orange', 'Banana', 'Cucumber' ]

fruits.shift();
console.log(fruits); // [ 'Orange', 'Banana', 'Cucumber' ]

fruits.unshift('Applesin');
console.log(fruits); // [ 'Applesin', 'Orange', 'Banana', 'Cucumber' ]

fruits.splice(0, 1, 'Apple', 'Apricot', 'Peach', 'Plum');
// console.log(fruits); // [
// 'Apple',    'Apricot',
//     'Peach',    'Plum',
//     'Orange',   'Banana',
//     'Cucumber'
// ]

fruits.sort();
console.log(fruits); // [
//     'Apple',  'Apricot',
//     'Banana', 'Cucumber',
//     'Orange', 'Peach',
//     'Plum'
// ]

fruits.reverse();
console.log(fruits); // [
// 'Plum',   'Peach',
//     'Orange', 'Cucumber',
//     'Banana', 'Apricot',
//     'Apple'
// ]

fruits.fill('F');
console.log(fruits); // [
// 'F', 'F', 'F',
//     'F', 'F', 'F',
//     'F'
// ]

// immutable

const numbers = [1, 2, 3, 4, 5];
console.log(numbers); // [1, 2, 3, 4, 5]

const numbersIndexOf = numbers.indexOf(3);
console.log(numbersIndexOf); // 2

const numbersIncludes = numbers.includes(2)
console.log(numbersIncludes); // true

const numbersSlice = numbers.slice().reverse();
console.log(numbersSlice); // [ 5, 4, 3, 2, 1 ]

const numbersSquareRoot = numbers.map((item) => {
    return item ** 1/2
}); // данная конструкция для большого количества действий
console.log(numbersSquareRoot); // [ 0.5, 1, 1.5, 2, 2.5 ]

const numbersFilteredEvens = numbers.filter(num => num % 2 === 0);
console.log(numbersFilteredEvens); // [ 2, 4 ]

const numbersFilteredNotEvens = numbers.filter(num => num % 2 !== 0);
console.log(numbersFilteredNotEvens); // [ 1, 3, 5 ]

const numbersLoop = numbers.forEach((number, index) => {
    console.log(index);
    console.log(number);
}) // loop

const numbersJoin = numbers.join(' + ')
console.log(numbersJoin); // 1 + 2 + 3 + 4 + 5

const numbersHas4 = numbers.some(num => num === 4);
console.log(numbersHas4); // true

    // Домашнее задание

    // 1

const numbersDoubled = numbers.map(num => num ** 2);
console.log(numbersDoubled); // [ 1, 4, 9, 16, 25 ]

    // 2

const badArray = [1, 2, 2, 3, 4, 4, 5, 5]
console.log(badArray);

function filterDuplicates(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}
const goodArray = filterDuplicates(badArray);
console.log(goodArray);//

    // 3

const numbersSumTotal = numbers.reduce((total, number) => total + number, 0);
console.log(numbersSumTotal); // 15

    // 4

function reversedArray(arr) {
    const reversedArray = [];
    for (let i = arr.length - 1; i >= 0 ; i--) {
        reversedArray.push(arr[i]);
    }
    return reversedArray;
}

const reversedNumbers = reversedArray(numbers);
console.log(reversedNumbers); // [ 5, 4, 3, 2, 1 ]

    // 5

const name = 'Leonid'
let age = 34

//name = 'Vasya' // TypeError: Assignment to constant variable.
age = 43
console.log(`name is: ${name}, age is: ${age}`); // name is: Leonid, age is: 43
// const = нельзя изменять примитивы
// let - можно изменять примитивы

let dog = ['Rocky', 'small', 'dog']
const cat = ['Vasya', 'fat', 'cat']

dog.push('Male'); // добавляем Male в конец
cat.unshift('Female'); // добавляем Female в начало

console.log(`Pets: ${dog.join('-')} and ${cat.join('-')}`);// Pets: Rocky-small-dog-Male and Female-Vasya-fat-cat
// такие операции возможны на массивом, потому что он является ссылочным объектом

const petsArray = dog.concat(cat);
console.log(petsArray); // [
// 'Rocky',  'small',
//     'dog',    'Male',
//     'Female', 'Vasya',
//     'fat',    'cat'
// ]

console.log(dog) // [ 'Rocky', 'small', 'dog', 'Male' ]
console.log(cat) // [ 'Female', 'Vasya', 'fat', 'cat' ]

