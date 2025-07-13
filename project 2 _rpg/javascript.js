// Игровые данные
const gameData = {
    player: {
        name: "Нео",
        health: 100,
        strength: 10,
        defense: 5,
        awareness: 0,
        hacking: 0,
        inventory: ["Мобильник", "Пропуск"]
    },
    currentLocation: "office",
    locations: {
        office: {
            name: "Офис",
            description: `Ваш рабочий кабинет. На столе - компьютер и документы. В углу кошка проходит дважды.`,
            actions: ["Осмотреть монитор", "Проверить ящик стола", "Выйти в коридор"]
        },
        corridor: {
            name: "Коридор",
            description: "Длинный пустой коридор с мерцающим светом. Лифт и лестница.",
            actions: ["Вернуться в офис", "Спуститься в подвал", "Вызвать лифт"]
        },
        basement: {
            name: "Подвал",
            description: "Темное помещение с серверами. В воздухе пахнет озоном.",
            actions: ["Осмотреть серверы", "Вернуться в коридор"]
        },
        whiteRoom: {
            name: "Белая комната",
            description: "Пустое белое пространство. Перед вами женщина с вазой.",
            actions: ["Поговорить с Оракулом", "Вернуться в офис"]
        },
        metro: {
            name: "Метро",
            description: "Пустая станция. Поезд стоит без машиниста. На табло вместо цифр - символы кода.",
            actions: ["Сесть в поезд", "Осмотреть тоннель", "Вернуться в коридор"]
        },
        serverRoom: {
            name: "Серверный узел",
            description: "Комната с зелёным кодом Матрицы в воздухе. Агенты уже знают о вашем присутствии.",
            actions: ["Взломать систему", "Сразиться с Агентом", "Бежать"]
        },
        rooftop: {
            name: "Крыша",
            description: "Ветер свистит в ушах. Агент Смит ждёт вас, ухмыляясь.",
            actions: ["Сразиться с Агентом", "Попытаться убежать"]
        },
        subway: {
            name: "Метро",
            description: "Пустая станция. В тени видна фигура в чёрном костюме.",
            actions: ["Подойти ближе", "Спрятаться"]
        },
        hideout: {
            name: "Убежище повстанцев",
            description: "Подпольная база. Морфеус предлагает вам красную таблетку.",
            actions: ["Принять таблетку", "Отказаться", "Задать вопрос"]
        }
    },
    log: []
};

// Обработчик нажатия Enter в поле ввода
document.getElementById('player-name').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        startGame();
    }
});

// Обработчик клика по кнопке старта
document.getElementById('start-button').addEventListener('click', startGame);

// Функция начала игры
function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    gameData.player.name = playerName || "Нео";

    // Скрываем стартовый экран
    document.getElementById('start-screen').classList.add('hidden');
    // Показываем игровой интерфейс
    document.getElementById('game-interface').classList.remove('hidden');

    // Обновляем имя персонажа
    document.getElementById('character-name').textContent = gameData.player.name;

    // Первая запись в журнал
    addToLog(`Игра началась. ${gameData.player.name} чувствует, что реальность даёт трещину...`);

    updateUI();
}

// Добавление записи в журнал
function addToLog(message) {
    gameData.log.push(message);
    if (gameData.log.length > 50) gameData.log.shift(); // Ограничиваем размер журнала
    updateUI();
}

// Обновление интерфейса
function updateUI() {
    // Обновляем данные персонажа
    document.getElementById('health').value = gameData.player.health;
    document.querySelector('#character-panel .stat:nth-child(2) span').textContent = gameData.player.strength;
    document.querySelector('#character-panel .stat:nth-child(3) span').textContent = gameData.player.defense;
    document.querySelector('#character-panel .stat:nth-child(4) span').textContent = gameData.player.awareness + '%';
    document.querySelector('#character-panel .stat:nth-child(5) span').textContent = gameData.player.hacking;

    // Обновляем инвентарь
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    gameData.player.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item;
        itemsContainer.appendChild(itemElement);
    });

    // Обновляем текущую локацию
    const location = gameData.locations[gameData.currentLocation];
    document.getElementById('location-name').textContent = location.name;
    document.getElementById('location-text').textContent = location.description;

    // Обновляем доступные действия
    const actionsContainer = document.getElementById('action-buttons');
    actionsContainer.innerHTML = '';
    location.actions.forEach((action, index) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${action}`;
        button.addEventListener('click', () => handleAction(action));
        actionsContainer.appendChild(button);
    });

    // Обновляем журнал
    const logContainer = document.getElementById('log-content');
    logContainer.innerHTML = '';
    gameData.log.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `> ${entry}`;
        logContainer.appendChild(entryElement);
    });
}

// Обработка действий
function handleAction(action) {
    const location = gameData.locations[gameData.currentLocation];

    switch(action) {
        case "Осмотреть монитор":
            gameData.player.awareness += 5;
            addToLog("Код матрицы мелькает на экране... Осознанность +5%");
            break;

        case "Проверить ящик стола":
            if (!gameData.player.inventory.includes("Пистолет")) {
                gameData.player.inventory.push("Пистолет");
                addToLog("Вы нашли пистолет! Кто-то явно готовился к неприятностям.");
            } else {
                addToLog("Только старые документы и канцелярия.");
            }
            break;

        case "Выйти в коридор":
            gameData.currentLocation = "corridor";
            addToLog("Вы в коридоре. Лифт и лестница ведут вниз.");
            break;

        case "Спуститься в подвал":
            gameData.currentLocation = "basement";
            addToLog("Вы спустились в подвал. Здесь холодно и тихо.");
            break;

        case "Вызвать лифт":
            if (gameData.player.awareness >= 30) {
                addToLog("Лифт открывается - внутри никого... слишком подозрительно.");
            } else {
                addToLog("Лифт не реагирует. Кажется, отключен.");
            }
            break;

        case "Осмотреть серверы":
            gameData.player.hacking += 10;
            addToLog("Вы изучаете серверы. Взлом +10");
            break;

        case "Поговорить с Оракулом":
            if (gameData.player.awareness >= 50) {
                addToLog('Оракул улыбается: "Ты уже знаешь, что делать..."');
            } else {
                addToLog('"Ты еще не готов" - говорит Оракул');
            }
            break;

        case "Вернуться в офис":
            gameData.currentLocation = "office";
            addToLog("Вы вернулись в офис.");
            break;

        case "Сесть в поезд":
            if (gameData.player.hacking >= 25) {
                gameData.currentLocation = "serverRoom";
                addToLog("Поезд привёз вас к серверному узлу!");
            } else {
                addToLog("Поезд не двигается. Нужно найти способ его запустить...");
            }
            break;

        case "Осмотреть тоннель":
            if (!gameData.player.inventory.includes("Вирусный чип")) {
                gameData.player.inventory.push("Вирусный чип");
                gameData.player.hacking += 15;
                addToLog("Вы нашли Вирусный чип! Взлом +15");
            } else {
                addToLog("Только мусор и крысы.");
            }
            break;

        case "Взломать систему":
            if (gameData.player.hacking >= 30) {
                gameData.player.hacking += 20;
                addToLog("Код Матрицы под вашим контролем! Взлом +20");
            } else {
                addToLog("Слишком сложно... Нужно больше навыка взлома.");
            }
            break;

        case "Сразиться с Агентом":
            if (gameData.player.inventory.includes("Пистолет") && gameData.player.strength >= 15) {
                addToLog("Вы победили Агента! Но он скоро восстановится...");
                gameData.player.awareness += 20;
            } else {
                gameData.player.health -= 30;
                addToLog("Агент ранил вас! Здоровье -30");
            }
            break;

        case "Попытаться убежать":
            if (gameData.player.awareness >= 40) {
                addToLog("Вы использовали знание Матрицы для побега!");
            } else {
                gameData.player.health -= 15;
                addToLog("Агент догнал вас! Здоровье -15");
            }
            break;

        case "Принять таблетку":
            gameData.player.inventory.push("Красная таблетка");
            gameData.player.awareness = 100;
            addToLog("Мир вокруг начинает распадаться... Вы пробуждаетесь!");
            break;

        case "Задать вопрос":
            addToLog('Морфеус: "Матрица — это тюрьма для разума."');
            break;


        case "Сразиться с солдатом":
            if (gameData.player.strength >= 10) {
                addToLog("Вы нейтрализовали солдата!");
                gameData.player.inventory.push("Ключ-карта");
            } else {
                gameData.player.health -= 10;
                addToLog("Солдат ранил вас! Здоровье -10");
            }
            break;

        case "Очистить вирус":
            if (gameData.player.hacking >= 20) {
                addToLog("Вирус уничтожен! Взлом +5");
                gameData.player.hacking += 5;
            } else {
                gameData.player.defense -= 2;
                addToLog("Вирус атаковал! Защита -2");
            }
            break;

        case "Позвонить по номеру":
            if (gameData.player.inventory.includes("Мобильник")) {
                addToLog('Голос в трубке: "Ищи чёрного кота..."');
            }
            break;

        default:
            addToLog("Действие не распознано");
    }

    updateUI();
}