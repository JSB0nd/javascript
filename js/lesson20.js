// массив чисел
const numbers = [4, 9, 16, 25, 36];

const squareRoots = [];
for (let i = 0; i < numbers.length; i++) {
    squareRoots.push(numbers[i] ** (1/2));
} // решение без hof

console.log(squareRoots); // [ 2, 3, 4, 5, 6 ]

const squareRootsHOF = numbers.map(n => n ** (1/2) ) // является примером стрелочной функции высшего порядка

console.log(squareRootsHOF); // [ 2, 3, 4, 5, 6 ]

// объект с setTimeout
const user = {
    name: "Leonid",
    greet: function(){
        console.log("Hello World");
        setTimeout(() => {
            console.log(`Hello, ${user.name}`);
        }, 1000);
    }
}

user.greet(); // Hello World
// Hello, Leonid -- причем setTimeout откладывает выполнение данной функции
// так что fullAge выводится раньше, потому что без задержки

// high order function
const persons = [
    { name: 'Peter', age: 16 },
    { name: 'Mark', age: 18 },
    { name: 'John', age: 27 },
    { name: 'Jane', age: 14 },
    { name: 'Tony', age: 24},
];

const fullAge = persons.filter(person => person.age > 18);
console.log(fullAge); // [ { name: 'John', age: 27 }, { name: 'Tony', age: 24 } ]
// все просто если использовать встроенные функции в js
