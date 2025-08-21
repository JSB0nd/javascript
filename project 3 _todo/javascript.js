document.addEventListener('DOMContentLoaded', async () => {
    const taskList = document.getElementById('task-list');
    const inputField = document.getElementById('input');
    const submitForm = document.querySelector('form');
    const sortTaskUnsort = document.getElementById('unsorted');
    const sortTaskActive = document.getElementById('active');
    const sortTaskComplete = document.getElementById('completed');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const okButton = document.getElementById('ok-button');

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
                id: task.id,
                text: task.title,
                completed: task.completed,
            }));
        } catch (error) {
            console.log('Ошибка загрузки данных, используем локальные примеры: ', error);

            // возвращаем дефолтный массив, если API недоступен
            return [
                { id: 1, text: "Покормить рыбок", completed: false },
                { id: 2, text: "Покормить кошку", completed: false },
                { id: 3, text: "Положить обед на работу", completed: false },
                { id: 4, text: "Отвезти детей в детский сад", completed: false },
                { id: 5, text: "Купить сосиски на вечер", completed: false }
            ];
        }
    }

    // async function loadInitialData() {
    //     const apiTasks = await fetchPosts();
    //     const localTasks = localStorage.getItem('tasks');
    //     const savedTasks = localTasks ? JSON.parse(localTasks) : [];
    //
    //     const allTasks = [...savedTasks];
    //
    //     apiTasks.forEach(apiTask => {
    //         if (!allTasks.some(task => task.text === apiTask.text)) {
    //             allTasks.push(apiTask);
    //         }
    //     });
    //
    //     tasks = allTasks;
    //     saveTasks();
    //     renderTasks();
    // }

    async function loadInitialData() {
        const localTasks = localStorage.getItem('tasks');
        tasks = localTasks ? JSON.parse(localTasks) : [];

        if (tasks.length === 0) {
            try {
                const apiTasks = await fetchPosts();
                tasks = apiTasks;
                console.log(`Загружено ${apiTasks.length} задач из API`);
            } catch (error) {
                console.log('Не удалось загрузить задачи из API');
            }
        }

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
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? ' completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-timer">⏰</button>
                <button class="delete-btn button">Удалить</button>
    `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            const timer = li.querySelector('.task-timer');
            timer.addEventListener('click', () => timerTask(task.text))

            taskList.appendChild(li);
        });
    }

    // добавление задачи
    function addTask(text) {
        tasks.push({
            id: Date.now(),
            text: text,
            completed: false,
        });
        console.log(`Добавлена задача ${text}`)
        saveTasks();
        renderTasks();
    }

    // проверка чекбокса
    function toggleTask(index) {
        const taskIndex = tasks.findIndex(task => task.id === index);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks();
        }
    }

    // удаление задачи
    function deleteTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const deletedTask = tasks[taskIndex];
            tasks.splice(taskIndex, 1);
            console.log(`Удалена задача: "${deletedTask.text}" (ID: ${taskId})`);
            saveTasks();
            renderTasks();
        } else {
            console.warn(`Задача с ID ${taskId} не найдена!`);
        }
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
                showCustomAlert(`⏰
                время для задачи:
                ${text}`);
                // alert(`⏰ Время дла задачи: ${text}`);
            }, timerStamp * 1000);
        } else {
            alert('Пожалуйста, введите положительное число!')
            console.log(`${timerStamp} не является положительным числом`);
        }
    }

    // функция отображения окна
    function showCustomAlert(text) {
        alertMessage.innerText = text;
        customAlert.style.display = 'block';
    }

    // функция скрытия окна
    function hideCustomAlert() {
        customAlert.style.display = 'none';
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

    okButton.addEventListener('click', () => hideCustomAlert());
    window.addEventListener('click', function (event) {
        if (event.target === customAlert) {
            hideCustomAlert();
        }
    });

    // renderTasks();
    await loadInitialData();
});
