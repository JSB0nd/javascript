document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const inputField = document.getElementById('input');
    const submitButton = document.getElementById('submit');

// загрузка из LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// сохранение в LocalStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// отрисовка задач
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? ' completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button id="task-timer">⏰</button>
                <button class="delete-btn">Удалить</button>
    `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTask(index));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(index));

            taskList.appendChild(li);
        });
    }

// добавление задачи
    function addTask(text) {
        tasks.push({text, completed: false});
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

//  слушатель инпута
    submitButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            addTask(text);
            inputField.value = '';
        }
    });

    renderTasks();
});







const taskBase = {
    text: '',
    checked: false,
    timer: false,
}



const isText = function() {
    

    if(!inputText) return;
    const task = {...taskBase};
    task.text = inputText;
}



// https://pokodem.ru/sozdanie-prostogo-todo-list-na-javascript-s-nulya-poshagovoe-rukovodstvo/