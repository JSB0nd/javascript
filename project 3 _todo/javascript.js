document.addEventListener('DOMContentLoaded', async () => {
    const taskList = document.getElementById('task-list');
    const inputField = document.getElementById('input');
    const submitForm = document.querySelector('form');
    const sortTaskUnsort = document.getElementById('unsorted');
    const sortTaskActive = document.getElementById('active');
    const sortTaskComplete = document.getElementById('completed');
    const requestURL = 'https://jsonplaceholder.typicode.com/todos';
    let tasks = [];
    let filter = 'all';

    // // загрузка данных с сети
    // let tasks = JSON.parse(fetchPosts()) || [];

    // загрузка из LocalStorage
    // const localTasks = localStorage.getItem('tasks');
    // if (localTasks) {
    //     tasks = JSON.parse(localTasks)
    // }

    // загрузка данных с api
    async function fetchPosts() {
        try {
            const response = await fetch(requestURL + '?_limit=5'); // лимит = 5 задач с api
            if (!response.ok) throw Error('Ошибка сети!');
            const apiTasks = await response.json();

            // преобразуем в формат наших данных
            return apiTasks.map(task => ({
                text: task.title,
                completed: task.completed,
                id: task.id
            }));
        } catch (error) {
            console.log('Ошибка загрузки данных: ', error);
            return [];
        }
    }

    async function loadInitialData() {
        const apiTasks = await fetchPosts();
        const localTasks = localStorage.getItem('tasks');
        const savedTasks = localTasks ? JSON.parse(localTasks) : [];

        const allTasks = [...savedTasks];

        apiTasks.forEach(apiTask => {
            if (!allTasks.some(task => task.text === apiTask.text)) {
                allTasks.push(apiTask);
            }
        });

        tasks = allTasks;
        saveTasks();
        renderTasks();
    }

    // сохранение в LocalStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // фильтрация задач
    function getFilteredTasks() {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    }

    // отрисовка задач
    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = getFilteredTasks();

        filteredTasks.forEach((task, index) => {
            const realIndex = tasks.findIndex(t => t === task);

            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? ' completed' : ''}`;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-timer">⏰</button>
                <button class="delete-btn button">Удалить</button>
    `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTask(realIndex));

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener('click', () => deleteTask(realIndex));

            const timer = li.querySelector('.task-timer');
            timer.addEventListener('click', () => timerTask(task.text))

            taskList.appendChild(li);
        });
    }

    // добавление задачи
    function addTask(text) {
        tasks.push({
            text: text,
            completed: false,
            id: Date.now()
        });
        console.log(`Добавлена задача ${text}`)
        saveTasks();
        renderTasks();
    }

    // проверка чекбокса
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // удаление задачи
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // установка таймера
    function timerTask(text) {
        const timerStampString = prompt('Сколько секунд таймера?', '5');

        if (timerStampString === null) { // обработка кнопки Отмены
            return;
        }

        const timerStamp = Number(timerStampString);

        if (!isNaN(timerStamp) && timerStamp > 0) {
            console.log(`Таймер установлен на ${timerStamp} секунд для задачи:
                 ${text}`);

            setTimeout(() => {
                alert(`⏰ Время дла задачи: ${text}`);
            }, timerStamp * 1000);
        } else {
            alert('Пожалуйста, введите положительное число!')
            console.log(`${timerStamp} не является положительным числом`);
        }
    }


    //  обработчики событий
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = inputField.value.trim();
        if (text) {
            addTask(text);
            inputField.value = '';
        } else {
            alert('Задача не может быть пустой!');
        }
    });

    sortTaskUnsort.addEventListener('click', () => {
        filter = 'all';
        renderTasks();
    });

    sortTaskActive.addEventListener('click', () => {
        filter = 'active';
        renderTasks()
    });

    sortTaskComplete.addEventListener('click', () => {
        filter = 'completed';
        renderTasks()
    });

    // renderTasks();
    await loadInitialData();
});
