// 1. Создай класс Counter,
// который будет иметь приватное свойство count.
// Напиши публичные методы для увеличения, уменьшения
// и отображения значения счетчика;

class Counter {
    #count = 0;

    constructor(name) {
        this.name = name;
    }

    increase(amount) {
        this.#count += amount;
        console.log(`Увеличиваем на ${amount}`);
    }

    decrease(amount) {
        this.#count -= amount;
        console.log(`Уменьшаем на ${amount}`)
    }


    getCount() {
        console.log(`Счётчик равен ${this.#count}`);
    }
}

const counter = new Counter('First');
counter.increase(1); // Увеличиваем на 1
counter.increase(2); // Увеличиваем на 2
counter.increase(3); // Увеличиваем на 3
counter.decrease(2); // Уменьшаем на 2
// console.log(counter.#count); // Private field '#count' must be declared
counter.getCount(); // Счётчик равен 4

// 2. Создай класс EmailValidator со статическим методом isValid(email),
// который будет проверять, является ли строка корректным email
// (достаточно простой проверки на наличие символа @);

class EmailValidator {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    static isValid(email) {
        if (email.indexOf('@') !== -1) {
            console.log(`Это похоже на почту ${email}`);
        } else {
            console.log(`${email} должна содержать @!`);
        }
    }
}


EmailValidator.isValid('boris-blade'); // boris-blade должна содержать @!
EmailValidator.isValid('boris-blade@ya.ru'); // Это похоже на почту boris-blade@ya.ru

// 3. Создай класс Order с приватным методом #calculateTotal(),
// который будет рассчитывать общую стоимость заказа.
// Сделай публичный метод, который возвращает результат этого расчета,
// и вызывай его через созданный экземпляр класса.

class Order {
    constructor(name, amount, price) {
        this.name = name;
        this.amount = amount;
        this.price = price;
    }

    #calculateTotal(amount, price) {
        return amount * price;
    }

    getTotal() {
        console.log(`Сумма заказа ${this.name} равна ${this.#calculateTotal(this.amount, this.price)}р.`);
    }
}

const orderSugar = new Order('Сахар', 10, 48.5);
orderSugar.getTotal(); // Сумма заказа 485р.

const orderSalt = new Order('Соль', 5, 22);
orderSalt.getTotal(); // Сумма заказа 110р.
// orderSalt.#calculateTotal(5, 22) // Uncaught SyntaxError: Private field '#calculateTotal' must be declared in an enclosing class