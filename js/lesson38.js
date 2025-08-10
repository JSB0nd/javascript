// 1. Создай класс Car с конструктором, который принимает марку и модель автомобиля.
// Добавь метод для вывода информации об автомобиле.
// Создай несколько экземпляров класса и выведи их информацию;

class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    getInfo() {
        console.log(`Марка: ${this.brand}, Модель: ${this.model}.`);
    }
}

const accent = new Car('Hyundai', 'Accent');
const vesta = new Car('Lada', 'Vesta');
const impreza = new Car('Subaru', 'Impreza');

accent.getInfo(); // Марка: Hyundai, Модель: Accent.
vesta.getInfo(); // Марка: Lada, Модель: Vesta.
impreza.getInfo(); // Марка: Subaru, Модель: Impreza.

// 2. Создай класс ElectricCar, который наследует класс Car
// и добавь дополнительное свойство для емкости батареи.
// Переопредели метод вывода информации, чтобы включить информацию о батарее;

class ElectricCar extends Car {
    constructor(brand, model, battery) {
        super(brand, model);
        this.battery = battery;
    }

    getInfo() {
        console.log(`Марка электромобиля: ${this.brand}, Модель: ${this.model}, Аккумулятор: ${this.battery} Ah.`);
    }
}

const tesla3 = new ElectricCar('Tesla', '3', 100);
tesla3.getInfo(); // Марка электромобиля: Tesla, Модель: 3, Аккумулятор: 100 Ah.

// 3. Напиши пример использования полиморфизма,
// создав несколько классов, наследующих общий базовый класс,
// и вызывая общий метод для всех объектов.

// продолжаю Car

class Offroad extends Car {
    constructor(brand, model, wheelDrive) {
        super(brand, model);
        this.wheelDrive = wheelDrive;
    }

    getInfo() {
        console.log(`Марка внедорожника: ${this.brand}, Модель: ${this.model}, Привод: ${this.wheelDrive}.`);
    }
}

class RetroCar extends Car {
    constructor(brand, model, year) {
        super(brand, model);
        this.year = year;
    }

    getInfo() {
        console.log(`Марка ретро: ${this.brand}, Модель: ${this.model}, Год выпуска: ${this.year}.`);
    }
}

const wrangler = new Offroad('Jeep', 'Wrangler', '4x4');
const fordT = new RetroCar('Ford', 'T', '1923');

wrangler.getInfo(); // Марка внедорожника: Jeep, Модель: Wrangler, Привод: 4x4.
fordT.getInfo(); // Марка ретро: Ford, Модель: T, Год выпуска: 1923.
tesla3.getInfo(); // Марка электромобиля: Tesla, Модель: 3, Аккумулятор: 100 Ah.
accent.getInfo(); // Марка: Hyundai, Модель: Accent.




