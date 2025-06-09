const integer = 42;
const float = 3.14123456876;
const negative = -27;
const infinity = Infinity;
const notANumber = NaN;

console.log(integer, float, negative, infinity, notANumber);
console.log(typeof integer, typeof float, typeof negative, typeof infinity);
console.log(integer.toString());
console.log(integer.toFixed(2));

const str = 'JavaScript';

console.log(typeof str); // string
console.log(str.length); // 10
console.log(str.toUpperCase()); // JAVASCRIPT
console.log(str.toLowerCase()); // javascript
console.log(str.includes('Script')); // true

console.log(('Здесь начинается домашнее задание:').toUpperCase());
// проверка на наличие fun

const strFun = 'JavaScript is fun!';
console.log(strFun.includes('fun'));

// проверка при условии falsy

function greet(name) {
    name = name || 'Гость';
    console.log(`Привет, ${name}!`);
}

greet(); // Привет, Гость! - оператор || возвращает первый truthy аргумент
// а возвращает 'Гость' потому что name = undefined - falsy аргумент
greet('Leonid'); // Привет, Leonid! - возвращает Leonid, потому что name присвоено значение

// интерполяция

const firstName = 'Leonid';
const lastName = 'Shniakin';
const occupotion = 'software developer';

console.log(`Hello, my name is ${firstName} ${lastName}. I am ${occupotion}.`);
// это как будто самое просто задание, шаблонную строку, а именно интерполяцию я полюбил
// когда Алексей впервые показал как это работает

// сравнение null и undefined

const isNull = null;
const varUndefined = undefined; // camelCase
const not_a_number = NaN; // snake_case

console.log(isNull === undefined); // false -- потому что при строгом сравнении берется тип, который разный
console.log(typeof isNull); // object - свой тип, хоть и примитив
// суть null в обозначении объекта свойства которого не определены, здесь будет объект но пока он пуст
console.log(typeof varUndefined); // undefined - здесь тоже свой тип у примитива
// undefined выставляется по дефолту для переменных которые объявлены, но пока не присвоено значените
console.log(isNull == varUndefined); // true -- так как js приводит к строки оба значение, и не мождет их привести к строке
// оба варианта дают TypeError, как будто это тру)
console.log(isNull); // null
console.log(varUndefined); // undefined
console.log(varUndefined.toString()); // Uncaught TypeError: Cannot read properties of undefined (reading 'toString')
console.log(isNull.toString()); // Uncaught TypeError: Cannot read properties of null (reading 'toString')
console.log(isNull === null); // здесь true
console.log(not_a_number === NaN); // а здесь будет false, потому что NaN !== NaN // true
console.log (NaN === NaN); // здесь также будет false
// потому что NaN не является допустимым числом и даже не равен самому себе

// результат 1 + '1'
console.log(1 + '1') // 11
// удивительный js покоряет сердца, потому что 11, так одно из значений строка, то второе становистя строкой
// получается '1' + '1' = и получается значение 11
console.log(typeof (1 + '1')) // которое имеет тип string
console.log(1 + +'1'); // можем сложить приведение типа к number через унарный оператор
console.log(Number(1 + '1')) // либо так, но уже после создания строки 11 станет 11 типа number
console.log((Number(1 + '1')) === (1 + '1')) // false, так как 11 имеют разные типы
console.log((Number(1 + '1')) == (1 + '1')) // true, сравнение при приведении jsом к одному типу, так не стоит делать