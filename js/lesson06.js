// Условия 🛅

let age

function checkAge(age) {
    if (age < 18) {
        console.log(`Ваш возраст ${age} лет, Вы несовершеннолетний!`)
    } else if (age === 18) {
        console.log(`Ваш возраст ${age} лет, Вы совершеннолетний!`)
    } else if (age < 35) {
        console.log(`Ваш возраст ${age} лет, Вы очень совершеннолетний!`)
    } else if (age < 60) {
        console.log(`Ваш возраст ${age} лет, Вам пора задуматься о пенсии!`)
    } else {
        console.log(`Ваш возраст ${age} лет, Вы уже на пенсии!`)
    }
}

age = 15
checkAge(age) // Ваш возраст 15 лет, Вы несовершеннолетний!
checkAge(18) // Ваш возраст 18 лет, Вы совершеннолетний!
checkAge(28) // Ваш возраст 28 лет, Вы очень совершеннолетний!
checkAge(38) // Ваш возраст 38 лет, Вам пора задуматься о пенсии!
checkAge(48) // Ваш возраст 48 лет, Вам пора задуматься о пенсии!
checkAge(64) // Ваш возраст 64 лет, Вы уже на пенсии!

age = 20;
let message1 = (age >= 18) ? `${age} лет, вы совершеннолетний!` : `${age} лет, вы несовершеннолетний :(`;
console.log(message1); // 20 лет, вы совершеннолетний!

age = 15;
let message2 = (age >= 18) ? `${age} лет, вы совершеннолетний!` : `${age} лет, вы несовершеннолетний :(`;
console.log(message2); // 15 лет, вы несовершеннолетний :(

// проверка числа

const number = +prompt('Введите любое число')
let answer
if (number > 0) {
    answer = `Ваше число ${number} является положительным`
} else if (number < 0) {
    answer = `Ваше число ${number} является отрицательным`
} else {
    answer = "Ноль же ж"
}
alert(answer)

// либо тернарное условие в консоль лог

const numberTernar = 12
let messageTernar = (number >= 0)

    ? "Положительное число"
    : "Отрицательно число"

console.log(`${numberTernar} - ${messageTernar} - тернарный оператор`)

// проверка месяца

let month = +prompt("Введи число месяца (1-12)"); // приведение к typeof Number
let monthName;

switch (month) {
    case 1:
        monthName = 'Январь';
        break;
    case 2:
        monthName = 'Февраль';
        break;
    case 3:
        monthName = 'Март';
        break;
    case 4:
        monthName = 'Апрель';
        break;
    case 5:
        monthName = 'Май';
        break;
    case 6:
        monthName = 'Июнь';
        break;
    case 7:
        monthName = 'Июль';
        break;
    case 8:
        monthName = 'Август';
        break;
    case 9:
        monthName = 'Сентябрь';
        break;
    case 10:
        monthName = 'Октябрь';
        break;
    case 11:
        monthName = 'Ноябрь';
        break;
    case 12:
        monthName = 'Декабрь';
        break;
    default:
        monthName = 'Месяц неизвестен, введи число от 1 до 12'
}

alert(`Месяц который ты ввёл ${monthName}!`) // показывает месяц, вне диапозона 1-12 выводит сообщение

// А теперь самое жёсткое - проверка индекса массы тела! Ухх, я бы даже не начинал :|

const heightCommon = +prompt ("Введи свой рост, см")
const height = heightCommon/100 // перевод в метры
const mass = +prompt ("Введи свой вес, кг") // здесь и так сойдет
const imt = (mass / height ** 2).toFixed(2)
let imtInfo

switch(true) {
    case (imt < 16 ):
        imtInfo = 'выраженный дефицит массы тела, истощение'
        break;
    case (imt < 18.5 ):
        imtInfo = 'недостаточная масса тела - дефицит'
        break
    case (imt < 25 ):
        imtInfo = 'нормально всё'
        break
    case (imt < 30 ):
        imtInfo = 'лишний вес, избыточная масса - преожирение'
        break
    case (imt < 35 ):
        imtInfo = 'ожирение I степени'
        break
    case (imt < 40 ):
        imtInfo = 'ожирение II степени'
        break
    default:
        imtInfo = 'ожирение III степени - морбидное (это когда совсем пиздец, как в Блейде, чувак который лежал на кровати)'
        break
}

alert(`Твой ${imt} - ${imtInfo}`)