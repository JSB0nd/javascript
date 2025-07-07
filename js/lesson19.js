const student = {
    name: "Leonid",
    age: 34,
    adress: {
        city: "Magnitogorsk",
        street: "Zeleniy Log"
    }
};

console.log(student);

// shallow copy через оператор spread
const shallowStudent = {...student};
shallowStudent.adress.city = "Ekaterinburg";

console.log(shallowStudent.adress.city); // Ekaterinburg
console.log(student.adress.city); // Ekaterinburg

// копирование через object.assign
const shallowStudentAssign = Object.assign({}, student);
shallowStudentAssign.adress.street = "Academic Sakharov";

console.log(shallowStudentAssign.adress.street); // Academic Sakharov
console.log(student.adress.street); // Academic Sakharov

// поверхностное копирование позволяет скопировать свойства верхнего уровня,
// вложенные объекты и массивы остаются ссылками, и меняются при изменении
// скопированных объектов

// DEEP clone
// structuredClone() встроенная функция
const originalObject = {
    string: "Hello, world!",
    number: 123,
    bool: true,
    date: new Date(),
    array: [1, 2, 3],
    nested: {
        moreData: "This is nested",
    },
};

const deepCopiedObject = structuredClone(originalObject);
deepCopiedObject.nested.moreData  = "This is DEEP";

console.log(originalObject.nested); // { moreData: 'This is nested' }
console.log(deepCopiedObject.nested); // { moreData: 'This is DEEP' }

// JSON метод
const someOriginal = { a: 1, b: { c: 2, d: undefined } };
const someJSONCopiedObject = JSON.parse(JSON.stringify(someOriginal));

console.log(someOriginal); // { a: 1, b: { c: 2, d: undefined } }
console.log(someJSONCopiedObject); // { a: 1, b: { c: 2 } } -- undefined потрачено

const sayHiArray = { sayHi: () => console.log('Hello, Alice!')};
const sayHiJSONCopied = JSON.parse(JSON.stringify(sayHiArray));

console.log(sayHiArray); // { sayHi: [Function: sayHi] }
console.log(sayHiJSONCopied); // {} - пустой объект
// при копировании методов JSON происходит сериализация (перевод в строку)
// сами объекты и массивы сериализуемы, то есть можно переводит и распарсивать обратно,
// но есть несериализуемые данные: undefined, функция, символ (пока не знаю что такое)
// и если их распарсить то получится null в массиве, а в объекты просто будут опущены такие данные

// самописная функция
function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") { // происходит проверка на тип объект и null (который тип объект), что не примитив
        return obj; // возвращаем изначальный объект
    }
    const copy = Array.isArray(obj) ? [] : {}; // создаем новый объект в зависимости от начального типа
    for (let key in obj) { // проходим циклом for по объекту, по каждому ключу
            if (obj.hasOwnProperty(key)) { // проверка на уникальное свойства, если имеет свойство ключ, то
                copy[key] = deepCopy(obj[key]); // рекурсивное копирование и накопление в новый объект пар свойство ключ
            } // функция вызывает саму себя для каждого вложенного уровня
    }
    return copy; // возврат накопленного нового объекта, по окончанию цикла for...in
}

const deepObj = {  a: 1, b: { c: 2 } };

const deepDeepCopy = deepCopy(deepObj);
deepDeepCopy.b.c = 888;

console.log(deepDeepCopy.b.c); // 888
console.log(deepObj.b.c); // 2

// функция deepCopy() позволяет совершать глубокое копирование, но функции остаются ссылочными

