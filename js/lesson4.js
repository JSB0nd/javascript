let a;

console.log(a); // undefined
console.log(typeof a); // undefined

const b = null;

console.log(b); // null
console.log(typeof b) // object

const text = "Hello, World!";

console.log(text); // Hello, World!
console.log(typeof text); // string

const number = 12345;
const float = 3.14;

console.log(number); // 12345
console.log(float); // 3.14
console.log(typeof number); // number
console.log(typeof float); // number

const isTrue = true;
const isFalse = !true;

console.log(isTrue + '!=' + isFalse); // true!=false
console.log(typeof isTrue) + console.log(typeof isFalse); // boolean boolean

const array = ["a", "b", "c"];

console.log(array); // (3)['a', 'b', 'c']
console.log(array[0]); // a
console.log(typeof array); // object

const object = {
    name: "John",
    age: 42,
};

console.log(object); // {name: 'John', age: 42}
console.log(object.name); // John
console.log(typeof object); // object

const copiedObject = object;
copiedObject.name = "Leonid";
copiedObject.age = 34;
console.log(copiedObject); // {name: 'Leonid', age: 34}

const Me = `My name is ${copiedObject.name} and I am ${copiedObject.age} years.`;
console.log(Me); // My name is Leonid and I am 34 years. - пример с интерполяцией

const fruits = ["яблоко", "банан", "вишня"];
fruits.push("персик");
console.log(fruits); // (4)['яблоко', 'банан', 'вишня', 'персик']
console.log(fruits.length); // 4

const book = {
    name: "Война и Мир",
    pages: 460,
    age: 1980,
    binding: "Твёрдый"
}

console.log(book);
console.log(typeof book);
console.log(book.name);

// разница примитивных и ссылочных данных

const number1 = 23;
number2 = number1;

console.log('number1 ' + number1);
console.log('number2 ' + number2);

number2 = 38;

console.log('number2 ' + number2); // примитивные данные, которые копируют друг друга, хранятся по значению

// примитивными могут быть строки, числа, undefined, null

const someObject = {
    name: "John",
}

const someObject2 = someObject;

console.log('someObject1 ' + someObject);
console.log('someObject2 ' + someObject2)

someObject2.name = "Victor";

console.log('someObject1 ' + someObject);
console.log('someObject2 ' + someObject2) // ссылочные типы данных, как ярлык для данных, хранятся по ссылке

// ссылочными могут быть объекты, массивы, функции - сложные данные