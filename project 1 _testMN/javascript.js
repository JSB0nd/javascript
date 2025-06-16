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


let currentQuestionIndex = 0;
let score = 0;

// начало теста

startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  testWrapper.classList.remove('hidden');
  showQuestion();
});

// способ перезапустить

restartButton.addEventListener('click', () => {
  location.reload
})

// функция для отображения вопроса

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // очистить форму
    testForm.innerHTML = '';

    // создать радио-кнопки для каждого варианта ответа

    for (const key in currentQuestion.answers) {
    const answer = currentQuestion.answers[key];

    const label = document.createElement('label');
    label.classList.add('answer-option');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = key;

    label.appendChild(input);
    label.append(` ${answer.text}`);

    answersElement.appendChild(label);
  }

  // переход к следующему вопросу и подсчет очков
  
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Далее';
  nextButton.classList.add('button');
  answersElement.appendChild(nextButton);

  nextButton.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;

    const selectedScore = currentQuestion.answers[selected.value].score;
    score += selectedScore;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
};

// подсчет и вывод результатов

function showResult() {
  testWrapper.classList.add('hidden');
  resultsElement.classList.remove('hidden');

  const humanityPercent = Math.round((score / questions.length) * 100);
  const machinePercent = 100 - humanityPercent;

// вывод результатов

let resultText = '';

if (score >= (questions.length / 2)) {
    resultText = `Ты человек на ${humanityPercent}%. Машинность: ${machinePercent}%ю`;
} else {
    resultText = `Ты машина на ${machinePercent}%. Человеченость: ${humanityPercent}%ю`ж
}

resultTextContainer.innerHTML = `<p>${resultText}</p>`;
  restartButton.textContent = 'Пройти снова';
};