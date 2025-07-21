// 1. Напиши асинхронную функцию `delay`, которая принимает 
// один аргумент - количество миллисекунд, и возвращает промис,
// который разрешается (резолвится) через заданное количество
// времени. Используй `async/await` для ожидания этого промиса
// и выведите сообщение "Задержка завершена" после завершения
// ожидания;

async function delay(ms) {
    const delaying = await new Promise (resolve =>
        setTimeout(() => resolve(), ms,));
        console.log('Задержка завершена');
}

delay(2000); // Задержка завершена



// 2. Напиши асинхронную функцию `fetchUserData`,
// которая делает запрос к фейковому API (любому)
// и возвращает данные пользователя.
// Используй функцию fetch (подробнее о fetch - тут.).

const url = 'https://jsonplaceholder.typicode.com/todos';

async function fetchUserData() {
    console.log('Fetch User Data started...');
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data:', data);
}

fetchUserData();


async function fetchUserData2() {
    console.log('Получаем данные пользователя...');
    try {
    await delay(1000);
    const response = await fetch(url);
    const data = await response.json();
    console.log('Получено:', data);
    } catch (error) {
        console.log('Ошибка:', error);
    } finally {
        console.log('Завершено')
    }
}

fetchUserData2();