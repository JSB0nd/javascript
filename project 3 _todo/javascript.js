const todo = {
    action(e) {},
    add() {},
    create(text) {},
    init() {},
    save() {}
};

const taskBase = {
    text: '',
    checked: false,
    timer: false,

}

const taskList = document.querySelector('task-list');
const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit');

const isText = function() {
    

    if(!inputText) return;
    const task = {...taskBase};
    task.text = inputText;
}

submitButton.addEventListener('click', () => {
    const text = inputField.value.trim();
})

// https://pokodem.ru/sozdanie-prostogo-todo-list-na-javascript-s-nulya-poshagovoe-rukovodstvo/