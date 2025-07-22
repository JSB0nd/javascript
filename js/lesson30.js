// 1. Создай три вложенных элемента (например, `div` внутри `div` внутри `div`).
// Назначь обработчики событий для каждого из них и проследи за последовательностью
// вызовов при клике на внутренний элемент с помощью console.log();

const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');

const handleClick = (event) => {
    console.log(event.target.innerText);
    // console.log('target >', event.target);
    // console.log('curtarget >', event.currentTarget);
    // console.log(event.target === event.currentTarget);
}

first.addEventListener('click', handleClick);
// second.addEventListener('click', handleClick); // закомментил для работы второго задания
third.addEventListener('click', handleClick);

// при клике на элемент происходит всплытие, то есть клик обрабатывается на каждом родительском уровне

// 2. Напиши код, который останавливает всплытие события на среднем элементе из предыдущего задания;

const handleClickStop = (event) => {
    console.log('Остановка на: ', event.target.innerText);

    event.stopPropagation();
}

second.addEventListener('click', handleClickStop); // Остановка на:  Click 2 Click 3

// 3. Создай форму с несколькими полями ввода и кнопкой отправки.
// Реализуй делегирование события, например, валидации каждого поля ввода при его изменении.
// Пусть это будет простое условие, например, длина строки не более 20 символов.

const form = document.getElementById('form');
// const inputs = form.querySelectorAll('input');

function checkLength (event) {
    const valueLength = event.target.value.trim().length
    if (valueLength < 5) {
        return console.log(`Минимум 5 символов: ${event.target.value}`)
    } // проверка на 5 символов
    return ''
}

// inputs.forEach(event => {
//     event.addEventListener('keyup', checkLength);
// }) // проверка каждого инпута перебором из всех инпутов в форм

form.addEventListener('keyup', checkLength); // происходит проверка на минимум 5 символов
// через делегирование на form, быстрее и проще чем искать все инпуты и перебирать каждый
