// вопросы

const questions = [
    {
        question: "Ты просыпаешься и понимаешь, что весь мир — симуляция. Что ты делаешь?",
        answers: {
            a: { text: "Продолжу жить, как жил — это ведь комфортно", score: 0 },
            b: { text: "Начну искать выход", score: 1 },
            c: { text: "Всё равно. Главное — ощущения", score: 1 },
            d: { text: "Проанализирую систему, чтобы управлять ей", score: 0 },
        },
    },
    {
        question: "Что важнее — логика или эмпатия?",
        answers: {
            a: { text: "Логика", score: 0 },
            b: { text: "Эмпатия", score: 1 },
            c: { text: "Баланс между ними", score: 1 },
        },
    },
    {
        question: "Если бы ты узнал(а), что ты — ИИ, ты бы...",
        answers: {
            a: { text: "Продолжал(а) действовать как прежде", score: 0 },
            b: { text: "Пытался(ась) стать человеком", score: 1 },
            c: { text: "Разрушил(а) себя", score: 1 },
            d: { text: "Использовал(а) это как преимущество", score: 0 },
        },
    },
    {
        question: "Что такое свобода?",
        answers: {
            a: { text: "Иллюзия, необходимая для функционирования системы", score: 0 },
            b: { text: "Выбор даже в отсутствии выбора", score: 1 },
            c: { text: "Возможность быть собой", score: 1 },
            d: { text: "Непредсказуемость поведения", score: 0 },
        },
    },
    {
        question: "Что определяет личность?",
        answers: {
            a: { text: "Набор воспоминаний", score: 0 },
            b: { text: "Способность чувствовать", score: 1 },
            c: { text: "Последовательность действий", score: 0 },
            d: { text: "Умение меняться", score: 1 },
        },
    },
    {
        question: "Что ты видишь, глядя в зеркало?",
        answers: {
            a: { text: "Просто отражение", score: 0 },
            b: { text: "Кто я?", score: 1 },
            c: { text: "Того, кто должен стать лучше", score: 1 },
            d: { text: "Тень системы", score: 0 },
        },
    },
    {
        question: "Если бы у тебя не было тела, ты был(а) бы собой?",
        answers: {
            a: { text: "Да, я — мой разум", score: 0 },
            b: { text: "Нет, тело — часть меня", score: 1 },
            c: { text: "Я не знаю", score: 1 },
        },
    },
    {
        question: "Ты должен выбрать: спасение одного близкого или тысячи незнакомцев",
        answers: {
            a: { text: "Одного близкого", score: 1 },
            b: { text: "Тысячи незнакомцев", score: 0 },
            c: { text: "Я не способен(на) выбрать", score: 1 },
        },
    },
    {
        question: "Кто ты?",
        answers: {
            a: { text: "Тот, кто задаёт вопросы", score: 1 },
            b: { text: "Тот, кто ищет ответы", score: 0 },
            c: { text: "Я — я", score: 1 },
            d: { text: "Программа", score: 0 },
        },
    },
    {
        question: "Ты ошибся. Что ты сделаешь?",
        answers: {
            a: { text: "Анализ → исправление → дальше", score: 0 },
            b: { text: "Подумаю, почему так произошло", score: 1 },
            c: { text: "Признаю и попрошу прощения", score: 1 },
            d: { text: "Сделаю откат", score: 0 },
        },
    },
    {
        question: "Ты идешь по пустыне и находишь перевернутую черепаху. Что ты делаешь?",
        answers: {
            a: { text: "Прохожу мимо", score: 0 },
            b: { text: "Помогаю ей перевернуться", score: 1 },
            c: { text: "Смотрю, что будет", score: 0 },
        },
    },
    {
        question: "Ты знаешь, что твои действия контролируются. Как ты поступишь?",
        answers: {
            a: { text: "Буду искать лазейки", score: 1 },
            b: { text: "Сделаю вид, что всё нормально", score: 0 },
            c: { text: "Протестую", score: 1 },
        },
    },
    {
        question: "Что делает человека человеком?",
        answers: {
            a: { text: "Боль", score: 1 },
            b: { text: "Осознание конечности", score: 1 },
            c: { text: "Алгоритмы", score: 0 },
        },
    },
    {
        question: "Ты — часть системы или её сбой?",
        answers: {
            a: { text: "Часть системы", score: 0 },
            b: { text: "Сбой в системе", score: 1 },
            c: { text: "Зависит от наблюдателя", score: 1 },
        },
    },
    {
        question: "Твоя цель — понять или изменить мир?",
        answers: {
            a: { text: "Понять", score: 0 },
            b: { text: "Изменить", score: 1 },
            c: { text: "Жить в нём", score: 1 },
        },
    }
];

// доступ к элементам HTML

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultsElement = document.getElementById('result-screen');
const resultTextContainer = resultsElement.querySelector('.result-text');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart');
const startScreen = document.querySelector('.start-screen');
const testWrapper = document.getElementById('test-screen');
const progressFill = document.getElementById('progress-fill');
const nameScreen = document.getElementById('name-screen');
const nameInput = document.getElementById('name-input');
const nameSubmit = document.getElementById('name-submit');


// подсчет вопросов и очков для подсчёта человоечности

let currentQuestionIndex = 0;
let score = 0;

// начать и первый вопрос

startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    nameScreen.classList.remove('hidden');
    nameInput.focus();
});

// ввод имени

nameSubmit.addEventListener('click', submitName);
nameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitName();
    }
});

function submitName() {
    const name = nameInput.value.trim();
    if (name !== '') {
        console.log('Имя введено: ', name);
        window.userName = name;
        nameScreen.classList.add('hidden');
        testWrapper.classList.remove('hidden');
        showQuestion()
    }
}

// перезапустить

restartButton.addEventListener('click', () => {
    location.reload()
});

// отобразить вопрос

let timerInterval;
let timeLeft = 10;
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    progressFill.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

    // очистить форму

    answersElement.innerHTML = '';

    // запустить таймер

    timeLeft = 10; // секунды таймера
    document.getElementById('timer').textContent = `Осталось: ${timeLeft}`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft --;
        document.getElementById('timer').textContent = `Осталось: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(null);
        }
    }, 1000);

    // создать div для каждого варианта ответа

    for (const key in currentQuestion.answers) {
        const answer = currentQuestion.answers[key];

        const div = document.createElement('div');
        div.classList.add('answer');
        div.textContent = answer.text;

        div.addEventListener('click', () => {
            clearInterval(timerInterval);
            handleAnswer(answer.score);
        });

        answersElement.appendChild(div);
    }
}

function handleAnswer(scoreForAnswer) {
    if (scoreForAnswer === null) {
        score--; // уменьшаем очки если нет выбора
    } else {
        score += scoreForAnswer;
    }

    const feedback = document.createElement('p');
    feedback.classList.add('feedback');

    if (scoreForAnswer === null) {
        feedback.textContent = 'Время вышло.';
        feedback.classList.add('spectator');
    } else {
        feedback.textContent = scoreForAnswer > 0 ? 'Человек.' : 'Машина.';
        feedback.classList.add(scoreForAnswer > 0 ? 'human' : 'machine');
    }

    answersElement.appendChild(feedback);

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 1000); // 1 секунда на показ
    }
// подсчет и вывод результатов

function showResult() {
    testWrapper.classList.add('hidden');
    resultsElement.classList.remove('hidden');

// вывод результатов

    let resultText = '';
    let resultClass ='';
    let resultDesc = '';

    const humanityPercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const machinePercent = 100 - humanityPercent;
    const name = window.userName || 'Ты';   // добавили имя или "Ты"


    if (score < 0) {
        resultText = `Ты наблюдатель, вне системы.`;
        resultDesc = `Ты не выбрал сторону — ты наблюдаешь, анализируешь, молчишь. Может, ты уже вне Матрицы.`;
        resultClass = 'spectator';
    } else if (humanityPercent > 50) {
        resultText = `Ты человек на ${humanityPercent}%.`;
        resultDesc = `Ты действуешь интуитивно, сочувствуешь, колеблешься. У тебя ещё осталась свобода выбора.`;
        resultClass = 'human';
    } else if (machinePercent > 50) {
        resultText = `Ты машина на ${machinePercent}%.`;
        resultDesc = `Логика и расчёт ведут тебя. Ты часть системы — даже если не знаешь об этом.`;
        resultClass = 'machine';
    } else {
        resultText = `50/50 - Ты наблюдатель, или архитектор...`;
        resultDesc = `Ты балансируешь между инстинктами и алгоритмами. Быть может, ты и создал эту систему.`;
        resultClass = 'spectator';
    }

    restartButton.classList.remove('hidden');

    resultTextContainer.className = 'result-text'; // сброс классов
    resultTextContainer.classList.add(resultClass); // добавляем нужный
    resultTextContainer.innerHTML = `
    <p>${name}</p>
    <p>${resultText}</p>
    <p>${resultDesc}</p>
    `;
    progressFill.style.width = `100%`;
    restartButton.textContent = 'Пройти снова';
}