let price;
price = 100;
console.log( price ); // 100
// Всё нормально, потому что let позволяет назначать переменную без присвоения значения

price  = 150;
console.log( price ); // 150
// Всё нормально, потому что let позволяет менять значение

let price = 200
console.log( price ); // Uncaught SyntaxError: Identifier 'price' has already been declared

const anotherPrice; // Uncaught SyntaxError: Missing initializer in const declaration
anotherPrice = 189;
console.log( anotherPrice ); // Нельзя объявлять const без присвоения значения

const yetAnotherPrice = 144;
console.log( yetAnotherPrice ); // 144, потому что всё верно

const yetAnotherPrice = 155;
console.log( yetAnotherPrice ); // Uncaught SyntaxError: Identifier 'yetAnotherPrice' has already been declared

/* Данный ответ получается потому что const переменная которая не меняет своего значения,
то есть только readonly variable - как говорит Code Analysis в WebStorm
(если оно примитивное, и не является объектом или массивом,
потому что const является на объект,
то есть объект или массив можно изменять)
 */

console.log( a ); // undefined
console.log( b ); // Uncaught ReferenceError: Cannot access 'b' before initialization

let b;
var a;

console.log( a ); // undefined
console.log( b ); // undefined

a = 5;
b = 6;

console.log( a ); // 5
console.log( b ); // 6

/* для меня разница между let (const) и var именно в том,
что let (const) имеют область видимости, а именно последовательны, как таблица стилей
- то есть не существуют пока не были объявлены
в то же время var может "всплывать", показывая себя до объявления
(если я правильно понял то var даже видна из функции, чего не делают let и const
поэтому использование var нежелательно, разве что для старых браузеров ie11 и подобных анахронизмов)
соответственно -- undefined -- потому что еще не присвоено значение
 */
