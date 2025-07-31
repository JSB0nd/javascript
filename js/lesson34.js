// 1. Напиши класс Book, который имеет поля title, author и pages.
// Добавь метод для вывода краткой информации о книге;

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    print() {
        console.log(`Book: ${this.title} - ${this.author}, ${this.pages} pp.`);
    }
}

const Orwell = new Book('1984', ' George Orwell', '450');

Orwell.print(); // Book: 1984 -  George Orwell, 450 pp.

// 2. Создай класс User с полями name и email, методом displayInfo, который выводит информацию о пользователе.
// Создай несколько экземпляров и вызови метод displayInfo;

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    displayInfo() {
        console.log(`User: ${this.name} - ${this.email}`);
    }
}

const jasonStatham =  new User('Jason', 'JasonStatham@ya.ru');
const stevenSeagal = new User('Steven', 'StevenSeagal@ya.ru');
const janneClodeVanDamme = new User ('Janne', 'imba@ya.ru');

jasonStatham.displayInfo(); // User: Jason - JasonStatham@ya.ru
stevenSeagal.displayInfo(); // User: Steven - StevenSeagal@ya.ru
janneClodeVanDamme.displayInfo(); // User: Janne - imba@ya.ru

// 3. В классе Rectangle из примера добавь геттер perimeter,
// который вычисляет и возвращает периметр прямоугольника.
// Добавь сеттер height. Он должен проверять, что устанавливаемое значение высоты height больше 0.
// Если значение не положительное, то выводится сообщение об ошибке в консоль, а высота остается неизменной.

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get area() {
        return this.width * this.height;
    }

    get perimeter() {
        return (this.width + this.height) * 2;
    }

    set width(value) {
        if (value <= 0) {
            console.error('Ширина должна быть положительным числом.');
        } else {
            this._width = value;
            console.log(`Ширина установлена ${value}.`);
        }
    }

    get width() {
        return this._width;
    }

    set height(value) {
        if (value <= 0) {
            console.error('Высота должна быть положительным числом.');
        } else {
            this._height = value;
            console.log(`Высота установлена ${value}.`);
        }
    }

    get height() {
        return this._height;
    }
}

const myRect = new Rectangle(5, 10);
console.log(myRect.area); // 50
myRect.width = -3; // Ширина должна быть положительным числом.
console.log(myRect.width); // 5
console.log(myRect.perimeter); // 30
myRect.height = -155; // Высота должна быть положительным числом.
console.log(myRect.height); // 10
myRect.height = 6; // Высота установлена 6.
myRect.width = 8; // Ширина установлена 8.

