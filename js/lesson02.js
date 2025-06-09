const City = 'Magnitogorsk'; // Город в котором я живу
let temperatureDegrees = 9;// Погода на сегодня
let weatherCondition = 'rain, cloudly'; // Состояние погоды

function weather() {
    console.log('Weather in ' + City + ': ' + temperatureDegrees + '"C, ' + weatherCondition)
}
/* Функция
вызова
погоды */

weather(); // Вызов функции

let a = 10; // Переменная
let b = 20; // Ещё переменная
let c = 5; // Еще одна переменная, каждая из них может изменять значение

function summaryAndMultiply() {
    console.log( (a + b) * c );
}   // Создание функции которая складывает a и b, и потом всё умножает на c

summaryAndMultiply(); // Вызов функции сложения и умножения

// Однострочный комментарий приятнее читается если мало текста

/* Чем
такой
комментарий
! */