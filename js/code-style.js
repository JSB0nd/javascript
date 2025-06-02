// 1 задание
// Возьмите следующий код и приведите его в соответствие с общепринятым стандартом форматирования,
// соблюдая отступы, выравнивание и правила расстановки пробелов:

// function multiply(a,b){
//   return a*b;
// }
// const person ={name:'Alice',age:30};
// if(person.age>18){console.log('Adult');}
// else{console.log('Minor');}

function multiply(a, b) {
    return a * b;
};

const person = {
    name: 'Alice',
    age: 30
};

if (person.age > 18) {
    console.log('Adult');
} else {
    console.log('Minor');
};

// 2 задание
// Представьте, что вы работаете в команде, и вам нужно сделать код понятным для всех участников.
// Перепишите следующий код, используя понятные и логичные имена переменных и функций:

// function x(a, b) {
//   let c = a * b;
//   return c;
// }
// let d = x(5, 10);

function multiplyNumbers(num1, num2) {
    let result = num1 * num2;
    return result;
};

let result = multiplyNumbers(5, 10);

// 3 задание
// Убедитесь, что в коде используется единый стиль оформления. В следующем коде присутствуют смешанные стили кавычек,
// разное использование var, let, и const, а также различное форматирование объектов и массивов. Исправьте код:

// let items = ["apple", 'banana', "orange"];
// let price = {apple: 1, banana: 2, orange:3 };
// const total = price['apple'] + price["banana"] + price.orange;

// function calculateTotal(items) {
//   return items.reduce(function(total, item) {return total + item.price; }, 0); }

const items = [
    "apple",
    "banana",
    "orange"
];

const price = {
    apple: 1,
    banana: 2,
    orange: 3
};

const total = price.apple + price.banana + price.orange;

function calculateTotal(items) {
    return items.reduce(function (total, item) {
        return total + item.price;
    }, 0);
};

// 4 задание
// Создайте функцию validateForm, которая принимает объект формы с полями name, email и password.
// Она должна выполнять проверки для каждого поля. Если какое-то поле не заполнено или содержит неверные данные,
// функция должна сразу возвращать ошибку, используя guard expressions. Если все данные верны,
// функция должна возвращать сообщение "Форма успешно отправлена".

const user = {
    name: 'John',
    email: 'mail@gmail.com',
    password: 'John1990'
};

function validateForm({ name, email, password}) {
    if (!name || !email || !password) {
        console.log('Пожалуйста заполните все поля');
        return false;
    }

    if (!isValidName(name)) {
        console.log('Имя может содержать только буквы');
        return false;
    }

    if (!isValidEmail(email)) {
        console.log('Почта должна содержать @домен');
        return false;
    }

    if (!isValidPassword(password)) {
        console.log(`Пароль должен содержать как минимум одну заглавную,
            одну строчную буку и одну цифру`);
            return false;
    }

    console.log('Всё хорошо');
    return true;

}; // конечно использования в самом html тэгов type="text" или "phone" или "email" required было бы проще

function isValidName(name) {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(name);
};

function isValidEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    return pattern.test(email);
};

function isValidPassword(password) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
    return pattern.test(password);
};

const validUser = validateForm(user);

console.log(validUser);
// Adult
// Всё хорошо
// true