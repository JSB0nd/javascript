// 1. Сделай HTML-форму для создания нового поста с полями id пользователя, заголовок, текст.
// При отправке формы выполни POST запрос и отобрази ответ сервера на странице;

const inputUserID = document.getElementById('user-id');
const inputTitle = document.getElementById('title');
const inputPost = document.getElementById('post');
const saveData = document.getElementById('save-data-btn');
const outputAnswer = document.getElementById('answers');

const requestURL = 'https://jsonplaceholder.typicode.com/posts';
const headers = {
    'Content-Type': 'application/json',
}

function fetchPosts() {
    return fetch(requestURL)
        .then(res => {
            if (!res.ok) throw Error(`Ошибка сети!`);
            return res.json();

        });
}

function renderPosts(posts) {
    postList.innerHTML = ''; // очистка перед новым выводом

    posts.forEach(post => {
        const postInfo = document.createElement('li');
        postInfo.dataset.postId = post.id;
        postInfo.textContent = `${post.id} - ${post.title}`;
        postList.appendChild(postInfo);
    });
}

function reloadPosts() {
    return fetchPosts().then(renderPosts).catch(err => console.error(err));
}

saveData.addEventListener('click',() => {
        const userId = inputUserID.value.trim();
        const title = inputTitle.value;
        const post = inputPost.value;
        const body = {
            userId: userId,
            title: title,
            body: post
        };

    fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            outputAnswer.innerHTML = ''; // очистка перед выводом

            const postId = document.createElement('p');
            postId.textContent = `Созданный пост ID: ${data.id}`;
            outputAnswer.appendChild(postId);
        })
        .catch(err => console.log('Ошибка:', err))
}) // Созданный пост ID: 101

// 2. Реализуй кнопку для загрузки списка постов.
// При нажатии на кнопку выполни GET запрос к API и
// отобрази список постов на странице;

const loadData = document.getElementById('load-data-btn');
const postList = document.getElementById('post-list');
const clearList = document.getElementById('clear-list');


loadData.addEventListener('click', (e) => {
    reloadPosts();
})

clearList.addEventListener('click', (e) => {
    postList.innerHTML = ''; // очистка перед выводом
})

// 3. Создай функцию для удаления поста по id.
// Выполни DELETE запрос к API и обнови DOM,
// удалив соответствующий пост;

const inputDeleteId = document.getElementById('delete-id');
const deleteButton = document.getElementById('delete-btn');

deleteButton.addEventListener('click', (e) => {
    const id = inputDeleteId.value.trim();
    if (!id) return;


    fetch(`${requestURL}/${id}`, {method: 'DELETE'})
        .then(res => {
            return null
        })
        // .then(posts => {
        //     console.log(`${id} - удалён`);
        //     return reloadPosts()
        // }) // не изменяется json posts чтобы отобразить изменения, поэтому меняем DOM
        .then(() => {
            const li = postList.querySelector(`[data-post-id="${id}"]`);
            if (!li) {
                console.error(`Поста с ${id} не существует`)
            } else {
                li.remove();
                console.log(`${id} - удалён`);
            }
        })
        .catch(err => console.log('Ошибка:', err))
})

// 4. Реализуй функциональность для обновления данных пользователя.
// Используй PUT запрос для отправки обновленных данных на сервер
// и отобрази обновленный профиль на странице.
// Объясни, в чём разница между PUT и PATCH запросами.

const inputNewId = document.getElementById('new-user-id');
const inputNewTitle = document.getElementById('new-title');
const inputNewPost = document.getElementById('new-post');
const putData = document.getElementById('put');
const uploadData = document.getElementById('upload-data');

const putPost = (id, updatedData) => {
    return fetch(`${requestURL}/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(updatedData),
    })
        .then(res => res.json())
}

putData.addEventListener('click', (e) => {
    const id = inputNewId.value.trim();
    const newTitle = inputNewTitle.value;
    const newPost = inputNewPost.value;

    const updatedDate = {
        id: id,
        userId: 1,
        title: newTitle,
        body: newPost,
    }

    putPost(id, updatedDate)
        .then((res) => {
            console.log(`Обновили пост ${id}:`);
            console.log(res);
            uploadData.innerHTML = `
            <p>Обновили пост ${id}:</p>
            <p>Заголовок:</p>
            <p>${newTitle}</p>
            <p>Содержимое:</p>
            <p>${newPost}</p>
`;
            return res;
        })
        .catch(err => console.log('Ошибка:', err))
});

// разница методов PUT и PATCH, в том что первый обновляет весь объект, второй только часть
// это означает что если в PUT отправить какое-то поле пустое, он данный ключ объекты
// и сделает пустым - null