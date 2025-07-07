// 1. Напиши функцию, которая создает локальную переменную и выводит её значение
// Попробуй получить доступ к этой переменной вне функции и объясни, что произошло;

const global = 'I am global'

console.log(global) // I am global
console.log(this.global) // undefined

const showGlobal = () => {
    const local = 'I am local';
    console.log(`${local} in showGlobal`)
}

showGlobal() // I am local in showGlobal
console.log(local) // Uncaught ReferenceError: local is not defined

// глобал - глобальная зона видимости window, доступны для любой функции при любом вызовые
// local - локальная, а точнее функциональная зона видимости, доступна только внутри функции
// Uncaught ReferenceError потому что local недоступна в глобальной зоне видимости

// 2. Создай блок с условием и объяви переменную внутри него
// Попробуй получить доступ к этой переменной вне блока и объясни результат;

if (true) {
    const block = 'It is block'
    console.log(block) // It is block
}

console.log(block) // lesson22.js:29 Uncaught ReferenceError: block is not defined

// аналогично, block это блочная область видимости, то есть то что внутри {}
// вызов из глобальной области приводит к Uncaught ReferenceError, нет доступ к блочной области видимости

// 3. Изучи, что такое hoisting в JavaScript и расскажи своими словами
//  что это такое и какие проблемы с ним связаны. Приведи примеры :)

console.log('Пример ' + x + y + z)
const x = 1 // Uncaught ReferenceError: Cannot access 'x' before initialization
let y = 2 // Uncaught ReferenceError: Cannot access 'y' before initialization
var z = 3 // Пример undefined.
// данный пример показывает что const и let не поднимаются (hoisting), то есть нельзя использовать
// до объявления, var возможно, только до момента присваивания будет значени undefined
// но нужно использовать const и let, так как у них блочная видимость, исключаются неожиданные результаты var 

sayHello() // Hello, World!

function sayHello() {
    console.log('Hello, World!')
} // декларированные функции всплывают, их можно вызвать до момента объявления