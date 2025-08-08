// 1. Создай класс Person и класс-наследник Student.
// Класс Person должен иметь свойства name и метод introduce, который выводит строку вида "Привет, меня зовут (имя)".
// Класс Student должен наследовать Person и добавлять свойство course и переопределенный метод introduce,
// который выводит строку вида "Привет, меня зовут (имя), и я учусь на (курсе) курсе".
// Используй console.log(Student.prototype) и исследуй, как JavaScript создает цепочку прототипов;

class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Привет, меня зовут ${this.name}.`);
    }
}

class Student extends Person {
    constructor(name, course) {
        super(name);
        this.course = course;
    }

    introduce() {
        console.log(`Привет, я студент ${this.name}, и я учусь на ${this.course} курсе.`);
    }
}


const ivan = new Student('Иван', '2');
ivan.introduce(); // Привет, я студент Иван, и я учусь на 2 курсе.
// Person.prototype.introduce(); // Привет, меня зовут undefined
// Student.prototype.introduce(); // Привет, я студент undefined, и я учусь на undefined курсе.
console.log(Person.prototype); // {introduce: ƒ} объект с прототипом Object.prototype
console.log(Student.prototype); // Person {introduce: ƒ} объект созданный с прототипом Person.prototype
console.log(ivan.prototype) // undefined - потому что у объекта нет свойства prototype, оно есть только у конструкторов
console.log(Object.getPrototypeOf(ivan)) // Person {introduce: ƒ}
console.log(Object.getPrototypeOf(Student)); // class Person
console.log(Object.getPrototypeOf(Student.prototype)); // {introduce: ƒ}
console.log(Object.getPrototypeOf(Person)); // ƒ () { [native code] }
console.log(Object.getPrototypeOf(Person.prototype)); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
console.log(Object.getPrototypeOf(Object.prototype)); // null

// 2. Создай класс Employee, наследующий Person.
// Класс должен добавлять свойство position и метод work,
// который выводит строку "Я работаю на позиции (должность)".
// Переопредели метод introduce так, чтобы он также включал информацию о должности;

class Employee extends Person {
    constructor(name, position) {
        super(name);
        this.position = position;
    }

    work() {
        console.log(`Я работаю на позиции - ${this.position}.`);
    }

    introduce() {
        console.log(`Привет, меня зовут ${this.name}, и я работаю на должности ${this.position}!`);
    }
}

const petro = new Employee('Пётр', 'асфальтоукладчик');
petro.introduce(); // Привет, меня зовут Пётр, и я работаю на должности асфальтоукладчик!
petro.work(); // Я работаю на позиции - асфальтоукладчик.

// 3. Создай объектное наследование без использования классов.
// Создай объект Vehicle с методом move. Создай объект Car, который наследует от Vehicle,
// добавив свой метод drive. Используй Object.create для наследования.

function Vehicle(name) {
    this.name = name;
}

Vehicle.prototype.move = function () {
    console.log(`${this.name} начал движение.`);
}

function Car(name) {
    Vehicle.call(this, name);
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.drive = function () {
    console.log(`${this.name} едет по дороге.`)
}

const hyundaiAccent = new Car('Accent');
hyundaiAccent.move(); // Accent начал движение.
hyundaiAccent.drive(); // Accent едет по дороге.
