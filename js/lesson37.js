// 1. Напиши объект с несколькими свойствами
// и сделай все свойства неизменяемыми
// (с помощью Object.defineProperty).
// Проверь, можно ли изменить их значения после этого;

const pet = {};

Object.defineProperty(pet, 'name', {
    value: 'Vasilisa',
    writable: false,
    enumerable: false,
    configurable: false,
})

pet.age = 5;
console.log(pet.name); // Vasilisa
console.log(pet.age); // 5

pet.age = 5.5;
console.log(pet.age); // 5.5 - так как через точку присваивается true всем дескрипторам

pet.name = 'Margo';
console.log(pet.name); // Vasilisa - не изменилось

delete pet.name;
console.log(pet.name); // Vasilisa - не удалилось

// 2. Создай объект с несколькими свойствами,
// \где одно из них будет неперечисляемым
// (не должно выводиться в циклах).
// Убедись, что свойство не отображается
// при выводе ключей объекта через цикл for...in.

const car = {}

Object.defineProperty(car, 'model', {
    value: 'Accent',
    writable: false,
    enumerable: true,
    configurable: false,
})

Object.defineProperty(car, 'year', {
    value: '2003',
    writable: false,
    enumerable: true,
    configurable: false,
})

Object.defineProperty(car, 'color', {
    value: 'blue',
    writable: true,
    enumerable: false,
    configurable: false,
})

console.log(car); // {model: 'Accent', year: '2003', color: 'blue'}
console.log(Object.values(car)); // ['Accent', '2003']
console.log(Object.keys(car)); // ['model', 'year']

for (const key in car) {
    console.log(key) // model year
}
console.log(JSON.stringify(car)); // {"model":"Accent","year":"2003"}
console.log(car.color) // blue

// получается enumerable: false - дескриптор, который влияет на видимость,
// то есть не видно при for, при Object.keys и Object.values (еще не видно при JSON.stringify)
// видно лишь напрямую, и также при проверках

console.log(Object.getOwnPropertyDescriptor(car, 'color')); // {value: 'blue', writable: true, enumerable: false, configurable: false}
console.log(Object.getOwnPropertyNames(car)); // ['model', 'year', 'color']
console.log(car.hasOwnProperty('color')); // true
