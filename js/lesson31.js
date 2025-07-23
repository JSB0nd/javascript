// 1. Создай форму для ввода контактной информации (имя, телефон, email).
// Сохрани данные в LocalStorage в виде объекта JSON. Затем извлеки данные из LocalStorage,
// преобразуй их обратно в объект и отобрази контактную информацию на странице;

const userData = {
    name: '',
    phone: '',
    email: '',
}

const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const inputEmail = document.getElementById('email');
const saveData = document.getElementById('save-user');
const submitForm = document.getElementById('form');
const checkItem = document.getElementById('get-user');
const outputName = document.getElementById('output-name');
const outputPhone = document.getElementById('output-phone');
const outputEmail = document.getElementById('output-email');

// submitForm.addEventListener('submit', (e) => e.preventDefault() );

saveData.addEventListener('click', () => {
    const name = inputName.value.trim();
    const phone = inputPhone.value.trim();
    const email = inputEmail.value.trim();

    if (!name || !phone || !email) {
        console.log('Заполните все поля перед сохранением!')
        return
    }

    userData.name = name;
    userData.phone = phone;
    userData.email = email;

    console.log(userData);

    localStorage.setItem('user', JSON.stringify(userData));
})

checkItem.addEventListener('click', () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser === null) {
        return console.log('Все данные были удалены!')
    }

    outputName.innerText = `Имя: ${savedUser.name}`;
    outputPhone.innerText = `Телефон: ${savedUser.phone}`;
    outputEmail.innerText = `Почта: ${savedUser.email}`;
    console.log(savedUser);




})


// 2. Создай приложение для учета расходов. Сохрани каждую запись расхода (описание, сумма, дата)
// в LocalStorage в виде массива объектов JSON. Затем извлеки данные из LocalStorage
// и отобрази список расходов. Также реализуй функцию удаления записи из LocalStorage;

let expenses = []

const inputItem = document.getElementById('item');
const inputPrice = document.getElementById('price');
const inputDate = document.getElementById('date');
const saveExpenseData = document.getElementById('save-log');
const checkItemLog = document.getElementById('get-item');
const clearButton = document.getElementById('clear-btn');
const expensesList = document.getElementById('expense-list');

// const outputItem = document.getElementById('output-item');
// const outputPrice = document.getElementById('output-price');
// const outputDate = document.getElementById('output-date');



saveExpenseData.addEventListener('click', () => {

    const item = inputItem.value.trim();
    const price = inputPrice.value.trim();
    const date = inputDate.value.trim();

    const expenseData = {
        item: '',
        price: '',
        date: ''
    }

    expenseData.item = item;
    expenseData.price = price;
    expenseData.date = date;

    if (!item || !price || !date) {
        console.log('Заполните все поля перед сохранением!')
        return
    }

    expenses.push(expenseData);

    // function insertData(expenseData) {
    //     const newItemsLog = [];
    //     for (let i = 0; i < expenseData.length; i++) {
    //         newItemsLog.push(expenseData);
    //     }
    //     // const oneData = itemsLog[expenseData]
    //     // newData = {...oneData};
    //     // itemsLog.push(newData);
    //     return newItemsLog;
    // }
    //
    // insertData(expenseData);

    console.log(expenseData);

    localStorage.setItem('expenses', JSON.stringify(expenses));

    inputItem.value = '';
    inputPrice.value = '';
    inputDate.value = '';

    console.log('Расход добавлен!')
})

checkItemLog.addEventListener('click', () => {
    const expenseLog = JSON.parse(localStorage.getItem('expenses')) || [];

    console.log(expenseLog);

    expensesList.innerHTML = '';

    expenseLog.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.innerHTML = `
        <p>Товар: ${expense.item}</p>
        
        <p>Цена: ${expense.price} р</p>
        
        <p>Дата: ${expense.date}</p>
`;
        expensesList.append(expenseElement);
    });
});

clearButton.addEventListener('click', () => {
    localStorage.clear();
    expenses = [];
    expensesList.innerHTML = '';
    console.log('Все данные удалены!')
});

// 3. Создай счетчик, который отслеживает и отображает активное время пользователя на странице.
// Время должно обновляться каждую секунду и сохраняться в SessionStorage.

const startTime = Date.now();
const displayElement = document.getElementById('visit-time');
console.log(startTime);

if (!sessionStorage.getItem('startTime')) {
    sessionStorage.setItem('startTime', Date.now());
}

function updateTimer() {
    const startTime = sessionStorage.getItem('startTime');
    const currentTime = Date.now();
    const totalSeconds = Math.floor((currentTime - startTime) / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((currentTime - startTime) / 1000 / 60);

    displayElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

}

setInterval(updateTimer, 1000);
