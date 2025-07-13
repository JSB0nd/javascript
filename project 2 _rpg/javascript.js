// игрок
const player = {
    name: '',
    location: 'office',
    health: 100,
    strength: 10,
    defense: 5,
    awareness: 0,
    inventory: ['Мобильник'],
    invitedToHideout: false
};

// локации
const locations = {
    office: {
        name: 'Офис',
        description: 'Тусклый свет, серые стены, безжизненный монитор. Сотрудники словно клоны. Здесь всё кажется повторяющимся и мёртвым.',
        actions: ['Проверить монитор', 'Открыть ящик', 'Выйти в коридор', 'Осмотреться']
    },
    corridor: {
        name: 'Коридор',
        description: 'Бесконечный коридор с одинаковыми дверями и однообразными шагами. Кажется, ты уже был тут. Или это было вчера? Или час назад?',
        actions: ['Вернуться в офис', 'Подняться по лестнице', 'Осмотреться']
    },
    stairs: {
        name: 'Лестница',
        description: 'Сырая, серая лестница ведёт вниз. На стенах пятна плесени. Кошка пробегает мимо... и снова.',
        actions: ['Спуститься в метро', 'Вернуться в коридор', 'Осмотреться']
    },
    metro: {
        name: 'Метро',
        description: 'Пустая станция, мигающий экран и ощущение, что ты не один. Шум поездов звучит, хотя их давно нет. Мир подвис.',
        actions: ['Осмотреть тоннель', 'Вернуться на лестницу', 'Осмотреться']
    },
    rooftop: {
        name: 'Крыша',
        description: 'Серое небо. Город мёртв. Кажется, кто-то наблюдает сверху...',
        actions: ['Посмотреть вниз', 'Вернуться на лестницу', 'Осмотреться']
    },
    hideout: {
        name: 'Скрытая зона',
        description: 'Ты в белом пространстве, как будто внутри кода. Морфеус стоит с двумя таблетками.',
        actions: ['Взять красную таблетку', 'Взять синюю таблетку']
    },
};

// dom
const locationName = document.getElementById('location-name');
const locationText = document.getElementById('location-text');
const actionButtons = document.getElementById('action-buttons');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameInterface = document.getElementById('game-interface');
const characterName = document.getElementById('character-name');
const logPanel = document.getElementById('log-content');

// характеристики
const statHealth = document.getElementById('stat-health');
const statStrength = document.getElementById('stat-strength');
const statDefense = document.getElementById('stat-defense');
const statAwareness = document.getElementById('stat-awareness');
const itemsList = document.getElementById('items');

// запуск
startButton.addEventListener('click', () => {
    const input = document.getElementById('player-name');
    const name = input.value.trim();
    if (!name) return;

    player.name = name;
    characterName.textContent = name;

    startScreen.classList.add('hidden');
    gameInterface.classList.remove('hidden');

    updateStats();
    updateInventory();
    updateLocation();
});

// обновление характеристик
function updateStats() {
    statHealth.textContent = player.health;
    statStrength.textContent = player.strength;
    statDefense.textContent = player.defense;
    statAwareness.textContent = player.awareness;
}

// обновление инвентаря
function updateInventory() {
    itemsList.innerHTML = '';
    player.inventory.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        itemsList.appendChild(div);
    });
}

// обновление локации
function updateLocation() {
    const current = locations[player.location];

    locationName.textContent = current.name;
    locationText.textContent = current.description;

    actionButtons.innerHTML = '';
    current.actions.forEach(action => {
        const btn = document.createElement('button');
        btn.textContent = action;
        btn.addEventListener('click', () => handleAction(action));
        actionButtons.appendChild(btn);
    });

    log(`Вы перешли в локацию: ${locations[player.location].name}`); // добавляем в лог переход
}

// лог
function log(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logPanel.appendChild(p);
    logPanel.scrollTop = logPanel.scrollHeight;
}

// проверка осознанности
function checkAwareness() {
    if (player.awareness >= 50 && !player.invitedToHideout) {
        player.invitedToHideout = true;
        log('📞 Мобильник звонит... Это Морфеус.');
        log('Морфеус: «Ты чувствуешь это, да? Приходи. Я жду тебя в скрытой зоне.»');
        
        // откроем новое действие
        locations[player.location].actions.push('Пойти в скрытую зону');
    }
}

// действия
function handleAction(action) {
    switch (action) {
        case 'Проверить монитор':
            log('Экран мерцает зелёными символами. Это не просто текст...');
            player.awareness += 5;
            updateStats();
            break;

        case 'Открыть ящик':
            if (!player.inventory.includes('Пистолет')) {
                log('Вы нашли пистолет! +5 к силе');
                player.inventory.push('Пистолет');
                player.strength += 5;
                updateStats();
                updateInventory();
            } else {
                log('В ящике пусто.');
            }
            break;

        case 'Выйти в коридор':
            player.location = 'corridor';
            updateLocation();
            break;

        case 'Вернуться в офис':
            player.location = 'office';
            updateLocation();
            break;

        case 'Подняться по лестнице':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Вернуться в коридор':
            player.location = 'corridor';
            updateLocation();
            break;

        case 'Спуститься в метро':
            player.location = 'metro';
            updateLocation();
            break;

        case 'Вернуться на лестницу':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Осмотреть тоннель':
            if (!player.inventory.includes('Пропуск')) {
                log('Вы нашли Пропуск! +20 к осознанности');
                player.inventory.push('Пропуск');
                player.awareness += 20;
                updateStats();
                checkAwareness();
                updateInventory();
            } else {
                log('Пропуск уже у вас.');
            }
            break;

        case 'Поймать глюк в отражении':
            log('Ваше отражение моргнуло, но вы не моргали. +5 к осознанности');
            player.awareness += 5;
            updateStats();
            checkAwareness();
            break;

        case 'Посмотреть в мигающую лампу':
            log('Свет мигает с точностью до секунды. Это не случайность. +5 к осознанности');
            player.awareness += 5;
            updateStats();
            checkAwareness();
            break;

        case 'Вглядеться в глюк в пространстве':
            log('Ступени на секунду исчезли, как будто вы находитесь в пустоте. +5 к осознанности');
            player.awareness += 5;
            checkAwareness();
            updateStats();
            break;

        case 'Замереть и слушать шум':
            log('Вы слышите странные цифры сквозь шум. Мир сломан. +5 к осознанности');
            player.awareness += 5;
            checkAwareness();
            updateStats();
            break;

        case 'Осмотреться':
            if (player.awareness >= 50 && !player.invitedToHideout) {
                player.invitedToHideout = true;
                log('📞 Мобильник звонит... Это Морфеус.');
                log('Морфеус: «Ты чувствуешь это, да? Приходи. Я жду тебя в скрытой зоне.»');
                const current = locations[player.location];
                current.actions.push('Пойти в скрытую зону');
                updateLocation(); // чтобы отобразилась новая кнопка
            } else {
                log('Ты чувствуешь, что что-то не так... но пока неясно что.');
            }
            break;

        case 'Пойти в скрытую зону':
            player.location = 'hideout';
            updateLocation();
            break;

        case 'Взять красную таблетку':
            log('Ты выбрал истину. Пробуждение началось.');
            endGame('Ты проснулся. Добро пожаловать в реальность.');
            break;

        case 'Взять синюю таблетку':
            log('Ты выбрал забыть всё. Матрица обнимает тебя вновь.');
            endGame('Ты заснул. Всё было сном. Или нет?');
            break;

        case 'Подняться на крышу':
            player.location = 'rooftop';
            updateLocation();
            break;

        case 'Вернуться на лестницу':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Посмотреть вниз':
            log('Ты ощущаешь высоту... и нереальность всего вокруг. +5 к осознанности');
            if (!player.foundGlitches.includes('rooftop')) {
                player.foundGlitches.push('rooftop');
                player.awareness += 5;
                updateStats();
                checkAwareness();
            } else {
                log('Ты уже смотрел вниз. Это ощущение знакомо.');
            }
            break;

        default:
            log('Ничего не происходит...');
    }
}

