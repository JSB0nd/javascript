// моя среда выполнения node.js в webstorm
//1. Напиши функцию, которая добавляет два числа. Включи строгий режим
// и попробуй создать переменную внутри функции без использования ключевого слова.
// Исправь код, чтобы он работал в строгом режиме;

function num() {
    "use strict"
    let x = 0;
    y = 1;
}

// num(); // ReferenceError: y is not defined

function numCorrect() {
    "use strict"
    let x = 0;
    let y = 1;
}

numCorrect();

//2. Создай функцию, которая принимает два параметра с одинаковыми именами.
// Включи строгий режим и исправь ошибку, чтобы функция работала корректно;

// //function sum(a, a) {
//     'use strict'
//     return a + a; // SyntaxError: Duplicate parameter name not allowed in this context
// }

function sumCorrect(a, b) {
    'use strict'
    a = b
    return a + b;
}

//3. Напиши код, в котором функция выводит значение this в консоль.
// Включи строгий режим и проанализируй, как изменилось значение this;

function showThis() {
    console.log(this);
}

showThis(); // Object [global]

function showThisStrict() {
    'use strict'
    console.log(this);
}

showThisStrict(); // undefined

const showThisStrict2 = () => {
    'use strict'
    console.log(this);
}

showThisStrict2(); // {} - такое поведение при запуске в node.js, не глобальный объект, а пустой объект

// use strict в обычной функции при вызове без контекста this - undefined
// в стрелочной берётся из внешнего окружения
// в node.js глобальный объект не global, а пустой объект {}

//4. Попробуй удалить встроенное свойство объекта (например, метод toString у объекта) в строгом режиме
// Объясни, почему это не работает, и что нужно сделать, чтобы избежать подобных ошибок.

function deleteProto() {
    "use strict";
    delete Object.prototype.toString;
}

deleteProto();

// TODO .... в целом это все мои поиски истины (с помощью DeepSeek) и не обязательно просматривать
// function deleteProto1() {
//     "use strict";
//     console.log("До удаления:", Object.prototype.hasOwnProperty("toString")); // true
//     delete Object.prototype.toString;
//     console.log("После удаления:", Object.prototype.hasOwnProperty("toString")); // true (не удалилось)
// }
// deleteProto1();

function deleteProtoVeryStrict() {
    "use strict";
    Reflect.deleteProperty(Object.prototype, "toString"); // TypeError в строгом режиме
}
deleteProtoVeryStrict(); //

function deleteProtoDeepStrict() {
    "use strict";
    console.log("До удаления:", 'toString' in Object.prototype); // true
    delete Object.prototype.toString;
    console.log("После удаления:", 'toString' in Object.prototype); // true (метод остался!)
    console.log("После удаления (hasOwnProperty):", Object.prototype.hasOwnProperty("toString")); // false
}
deleteProtoDeepStrict(); // А по факту:
// До удаления: false
// После удаления: false
// После удаления (hasOwnProperty): false

// продолжаем с Deep Seek

// Вывод:
//     Ваш код в VS Code (Node.js) ведёт себя нестандартно:
//
//     delete Object.prototype.toString формально удаляет свойство из Object.prototype (hasOwnProperty возвращает false), но метод остаётся доступным (видимо, через прототип).
//
// Reflect.deleteProperty() строго следует спецификации и выбрасывает ошибку.
//
//     В браузере (Chrome/Firefox) оба варианта вызовут TypeError.
//
//     Лучшая практика: Не пытайтесь удалять встроенные методы, это небезопасно и ведёт к неожиданному поведению!


console.log(Object.getOwnPropertyDescriptor(Object.prototype, "toString")); // undefined

console.log("Среда выполнения:", typeof process !== 'undefined' ? 'Node.js' : 'Браузер');
console.log("Версия Node.js:", process?.versions?.node);

if (!('toString' in Object.prototype)) {
    Object.prototype.toString = Function.prototype.toString;
}

deleteProto();

const descriptor = Object.getOwnPropertyDescriptor(Object.prototype, "toString");
if (descriptor) {
    console.log("Это собственное свойство Object.prototype");
} else {
    console.log("toString наследуется из другого места");
}

// 💡 Вывод: что изменилось в Node.js 22.16.0?
// Раньше	Сейчас (Node.js 22.16.0)
// Object.prototype.hasOwnProperty("toString") → true	false
// delete Object.prototype.toString → TypeError	Молча игнорируется (так как toString не own property)
// 'toString' in Object.prototype → true	true (но наследуется)

// TODO ... здесь можно читать - Вывод DeepSeek, кратко:
// Ваш результат (toString не в Object.prototype) — это особенность Node.js 22.x
// Почему так происходит?
// Оптимизация V8: Методы типа toString вынесены в скрытый прототип для ускорения
//
// Спецификация ECMAScript не запрещает такое поведение (главное, чтобы 'toString' in Object.prototype === true)

function deleteObjectPrototype() {
    "use strict";
    delete Object.prototype;
}

deleteObjectPrototype(); // TypeError: Cannot delete property 'prototype' of function Object() { [native code] }

//  а мой вывод в том что пример из обучения вызывает TypeError :)
// и не стоит трогать встроенные свойства, удалять их, и тем более переопределять
// лучше создать свой объект с нужными методами

// вот хотел же лечь пораньше - простая тема! А просто ничего не может быть)