document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const inputField = document.getElementById('input');
    const submitForm = document.querySelector('form');
    const sortTaskUnsort = document.getElementById('unsorted');
    const sortTaskActive = document.getElementById('active');
    const sortTaskComplete = document.getElementById('completed');
    let filter = 'all';
    
    // загрузка из LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // сохранение в LocalStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // отрисовка задач
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? ' completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-timer">⏰</button>
                <button class="delete-btn button">Удалить</button>
    `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTask(index));

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener('click', () => deleteTask(index));

            const timer = li.querySelector('.task-timer');
            timer.addEventListener('click', () => timerTask(task.text))

            taskList.appendChild(li);
        });
    }

    // фильтрация задач
    function getFilteredTask() {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = getFilteredTask();

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
            checkbox.addEventListener('change', () => toggleTask(index));

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener('click', () => deleteTask(index));

            const timer = li.querySelector('.task-timer');
            timer.addEventListener('click', () => timerTask(task.text))

            taskList.appendChild(li);
        });
    }

    // добавление задачи
    function addTask(text) {
        tasks.push({ text: text, completed: false });
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

    renderTasks();
});
