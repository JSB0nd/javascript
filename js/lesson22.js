// 1 Создай объект со свойствами и методом, который использует `this` для доступа к этим свойствам
// Затем присвой этот метод другой переменной и вызовите её. Объясни своими словами, что произошло;

console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

const user = {
    name: "Leonid",
    log: console.log(this), // област видимости которая выше, то есть window (global node.js)
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

user.greet(); // Hello, my name is Leonid
const greeting = user.greet(); // Hello, my name is Leonid

console.log(this);

// this использует контекст или область видимости от родителя, поэтому this.name поднимается на уровень выше
// и забирает объект.name из user

// 2 Объясни, почему в примере ниже в первом случае выводится имя, а во втором - undefined 
// Как сделать так, чтобы в методе delayedGreet тоже выводилось имя (без использования call, apply или bind)?

const student = {

  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}!`); // всё просто, this ищет контекст и поднимается выше, в област видимости greet
    // а так как greet выполняется из под window то и видит student.name который в глобальной видимости
  },

  delayedGreet: function() {
    setTimeout(this.greet, 1000); // в данный момент greet вызывается из под функции, с локальной видимостью внутри delayedGreet
    // то есть область видимости остается локальной, не поднимаясь выше
  }

};

student.greet() // Hello, Alice
student.delayedGreet() // Hello, undefined 

// важно каким образом и в какой области вызывается функция

// 3 Напиши функцию и вызови её с разными контекстами, используя `call`, `apply` и `bind

function greet3(hello, bye) {
    console.log(this)
    console.log(`${hello}, my name is ${this.name}. ${bye}!`)
}

const user3 = { name: "Triton" };
const user4 = { name: "Fortune" };
const user5 = { name: "Binded" };

greet3('Hello', 'Bye'); // Hello, my name is . Bye!

greet3.call(user3, 'Hello 3rd', 'Good bye') // Hello 3rd, my name is Triton. Good bye! связали greeе3 с объектом user3
greet3.call(user4, 'Hello', 'Ciao') // Hello, my name is Fortune. Ciao!
// вызов аргументов через запятую

greet3.apply(user3, ['Hello Array', 'Bye Array']) // Hello Array, my name is Triton. Bye Array!
// тоже самое, только вызов аргументов через массив

const boundGreet = greet3.bind(user)
boundGreet(); // undefined, my name is Leonid. undefined! не переданы аргументы
boundGreet('Hello', 'Bye') // Hello, my name is Leonid. Bye!
// bind не воздействует на функцию, а возвращает новую

const boundGreet2 = boundGreet.bind(user3) 
boundGreet2('Hello', 'Bye') // Hello, my name is Leonid. Bye! - не меняет контекст, всего лишь ссылка

// 4 Что будет в консоли в результате выполнения функций sayHelloToAdmin() и sayHelloToUser()?
// Объясни, почему так произошло. Как это можно изменить?

function sayHello() {
    console.log('Hello, ' + this.name)
}

const admin = {
    name: 'Bob'
};

const user44 = {
    name: 'John'
};


const sayHelloToAdmin = sayHello.bind(admin) // вот здесь связали с admin
sayHelloToAdmin() // Hello, Bob

const sayHelloToUser = sayHelloToAdmin.bind(user44) // это уже не повлияет
sayHelloToUser() // Hello, Bob
// такой же результат, потому что bind не изменяет состав или контекст, потому что функция уже сформирована ранее

sayHello.call(user44) // Hello, John
// так можно изменить

sayHello.apply(user3) // Hello, Triton
// так тоже можно изменить, здесь нет необходимости добавлять аргументы через []