// 1. Напиши функцию `getUserData`, которая возвращает промис с данными пользователя через 2 секунды.
// Затем создай цепочку промисов, которая обрабатывает эти данные и выводит результат в консоль;



const promiseUserData = new Promise((resolve, reject) => {
    setTimeout(function getUserData(){
        console.log('Preparing user data...');
            userData = {
                name: "John",
                age: 25,
            }
            resolve(userData) // возвращаем объект userData
        }
        , 2000);
}); // Preparing user data...

promiseUserData.then((data)=> {
        const p = new Promise((resolve, reject) => {
            setTimeout(function () {
                    console.log('Getting user data...');
                    resolve(data);
                }
                , 1000)
        }); // Getting user data...

    p.then((data) => {
            setTimeout(function () {
                    console.log('Promise resolved ', data);
                }
                , 1000);
        }
    )

    p.finally(() => {
        setTimeout(function () {
            console.log('User Data have gotten successfully.');
        }, 1000)

    })// Promise resolved {name: 'John', age: 25}
})


// 2. Напиши две функции, каждая из которых возвращает промис с данными через 3 и 5 (5 и 7) секунд соответственно.
// Используй такой метод промисов, чтобы дождаться выполнения обоих промисов и вывести результаты в консоль;

const fetchData = new Promise((resolve, reject) => {
    setTimeout(function () {
        const data = {
            someData: true
        }
        console.log('Fetching data...');
        resolve(data);
    }, 5000)
})

const fetchData2 = new Promise((resolve, reject) => {
    setTimeout(function () {
        const data2 = {
            yetAnotherData: true
        }
        console.log('Fetching data2...');
        resolve(data2);
    }, 6000)
})

Promise.all([fetchData, fetchData2])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('Ошибка:', error);
    })


// 3. Напиши две функции, каждая из которых возвращает промис через случайное время (от 1 до 5 секунд).
// Используй такой метод промисов, чтобы вывести результат первого выполненного промиса в консоль.

const fetchData3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Данные загружены Data3');
    }, (Math.ceil(Math.random() * 5) + 7) * 1000); // получаем рандомное число от от 1 до 5 секунд (+7)
});

const fetchData4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Данные загружены Data4');
    }, (Math.ceil(Math.random() * 5) + 7) * 1000); // получаем рандомное число от от 1 до 5 секунд (+7)
});

const fetchData5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Данные загружены Data5');
    }, (Math.ceil(Math.random() * 5) + 7) * 1000); // получаем рандомное число от от 1 до 5 секунд (+7)
});

Promise.race([fetchData3, fetchData4, fetchData5])
    .then((result) => {
        console.log(result);
    }) // Данные загружены Data3 или Data4 или Data5
.catch((error) => {
    console.log('Ошибка:', error);
});
