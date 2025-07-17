// 1. Напиши функцию, которая использует `setTimeout` для создания таймера обратного отсчета.
// Таймер должен выводить оставшееся время каждую секунду и остановиться, когда время истечет;

function timer(counter) {
    console.log(`До конца таймера ${counter} секунд`)

    if (counter > 0) {
        setTimeout(() => timer(counter - 1), 1000);
    }
}

timer(11);

// 2. Напиши функцию, которая использует `setInterval`
// для вывода сообщения "Не забудь выпить воды!" каждые 30 минут;

const message = "Не забудь выпить воды!";
let waterInterval;

function print() {
    console.log(message);
}

waterInterval = setInterval(print, 1000); // 1 секунда вместо 30 * 60 * 1000 миллиекунд (30 минут)

setTimeout (() => clearInterval(waterInterval), 12000);

// 3. Создай HTML-форму, где есть три элемента:
//  - поле "Задержка"

// - поле "Текст"

// - кнопка "Начать".
// При клике на кнопку текст выводится в консоль через указанную
// задержку до тех пор, пока пользователь снова не нажмет начать.
// Если пользователь снова нажмет на кнопку - текст снова начнет
// выводится в консоль, нажмет еще раз - прекратит и т. д.

const checkDelay = document.getElementById('delay');
const textField = document.getElementById('text');
const startBtn = document.getElementById('start');

let intervalId = null; // ID интервала
let isRunning = false; // состояние интервала

// setInterval(showMessage, rawDelayInSeconds)

startBtn.addEventListener('click', () => {
    const text = textField.value.trim();
    const delay = checkDelay.value * 1000;

    if (isRunning) {
        clearInterval(intervalId);
        startBtn.textContent = 'Начать';
        isRunning = false;
    } else {
        if (!text) {
            console.log('Введите текст!');
            return;
        }

        const showMessage = () => console.log(text);
        intervalId = setInterval(showMessage, delay);
        startBtn.textContent = 'Остановить';
        isRunning = true;

    }

});