// Игрок
const player = {
    name: '',
    location: 'office',
    health: 100,
    strength: 10,
    defense: 5,
    awareness: 0,
    inventory: ['Мобильник'],
    invitedToWhiteRoom: false,
    foundGlitches: [],
    usedPistol: false,
    fighting: null,
    currentEnemy: null,
};

// Враги
const enemies = {
    agent: {
        name: 'Агент',
        health: 50,
        strength: 15,
        defense: 8,
        description: '🕶️ Безликий охранник системы.'
    },
    agentSmith: {
        name: 'Агент Смит',
        health: 100,
        strength: 25,
        defense: 15,
        description: '💀 Главный антагонист. Неумолим и силён.'
    }
};

// DOM
const locationName = document.getElementById('location-name');
const locationText = document.getElementById('location-text');
const actionButtons = document.getElementById('action-buttons');
const combatActions = document.getElementById('combat-actions');
const attackBtn = document.getElementById('attack-btn');
const dodgeBtn = document.getElementById('dodge-btn');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameInterface = document.getElementById('game-interface');
const characterName = document.getElementById('character-name');
const logPanel = document.getElementById('log-content');

const statHealth = document.getElementById('stat-health');
const statStrength = document.getElementById('stat-strength');
const statDefense = document.getElementById('stat-defense');
const statAwareness = document.getElementById('stat-awareness');
const itemsList = document.getElementById('items');
const restart = document.getElementById('restart-button');

// Локации
const locations = {
    office: {
        name: 'Офис',
        description: 'Открытые кабинки, яркий свет и холодный монитор. Коллеги молчат, глядя в экраны. Воздух застоялся.',
        actions: ['Проверить монитор', 'Открыть ящик', 'Выйти в коридор']
    },
    corridor: {
        name: 'Коридор',
        description: 'Тихий и длинный коридор с множеством одинаковых дверей. Пахнет пластиком и пылью.',
        actions: ['Вернуться в офис', 'Зайти в туалет', 'Выйти на лестницу', 'Осмотреться'],
        glitches: ['Отражение в стекле не двигается вместе с вами']
    },
    toilet: {
        name: 'Туалет',
        description: 'Холодный кафель, блеклое зеркало и ощущение наблюдения. На полу валяется аптечка.',
        actions: ['Вернуться в коридор', 'Осмотреться']
    },
    stairs: {
        name: 'Лестница',
        description: 'Бетонные ступени ведут вверх и вниз. Свет тусклый, шаги гулко отдаются эхом.',
        actions: ['Подняться на крышу', 'Выйти на улицу', 'Вернуться в коридор', 'Осмотреться'],
        glitches: ['Тень от перил движется сама по себе', 'Кошка пробегает мимо... и снова']
    },
    street: {
        name: 'Улица',
        description: 'Мир снаружи не выглядит лучше — прохожие избегают взглядов, машины стоят в пробке, но никто не сигналит.',
        actions: ['Подняться на лестницу', 'Спуститься в метро', 'Осмотреться'],
        glitches: [
            'Ветер дует в одну сторону, а облака — в другую',
            'Люди начинают смотреть на тебя, как будто что-то знают'
        ]
    },
    metro: {
        name: 'Метро',
        description: 'Станция пуста, табло мигает, но поездов нет. Кажется, время остановилось.',
        actions: ['Осмотреть тоннель', 'Вернуться на улицу', 'Зайти в белую дверь', 'Осмотреться'],
        glitches: [
            'Табло мигает странной последовательностью: 010101...',
            'Ты замечаешь белую дверь в стене, она не должна здесь быть'
        ]
    },
    rooftop: {
        name: 'Крыша',
        description: 'Город стелется под ногами. Воздух плотный, будто наблюдает за тобой.',
        actions: ['Посмотреть вниз', 'Спуститься на лестницу', 'Осмотреться'],
        glitches: ['Птица повисла в воздухе и исчезла']
    },
    whiteRoom: {
        name: 'Белая комната',
        description: 'Бесконечная белизна. Перед тобой стоит Морфеус с таблетками. Здесь всё возможно.',
        actions: ['Взять красную таблетку', 'Взять синюю таблетку', 'Осмотреться']
    }
};

// Слушатели
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

restart.addEventListener('click', () => {location.reload()});
attackBtn.addEventListener('click', () => handleCombat('attack'));
dodgeBtn.addEventListener('click', () => handleCombat('dodge'));

// Обновление
function updateStats() {
    statHealth.textContent = player.health;
    statStrength.textContent = player.strength;
    statDefense.textContent = player.defense;
    statAwareness.textContent = player.awareness;
}

function updateInventory() {
    itemsList.innerHTML = '';
    player.inventory.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        itemsList.appendChild(div);
        div.addEventListener('click', () => useItem(item));
    });
}

function removeItem(item) {
    const index = player.inventory.indexOf(item);
    if (index !== -1) player.inventory.splice(index, 1);
    updateInventory();
}

function useItem(item) {
    switch (item) {
        case 'Аптечка':
            player.health += 30;
            log('💊 Вы использовали аптечку. +30 здоровья');
            removeItem(item);
            break;
        case 'Кофе':
            player.health += 20;
            log('☕ Вы выпили кофе. +20 здоровья');
            removeItem(item);
            break;
        case 'Пистолет':
            if (!player.usedPistol) {
                player.strength += 40;
                player.usedPistol = true;
                log('🔫 Вы активировали пистолет. +40 к силе (разово)');
                removeItem(item);
                updateStats();
            }
            break;
        case 'Источник':
            player.health = 100;
            log('⚡ Вы подключились к Источнику. Здоровье полностью восстановлено.');
            removeItem(item);
            break;
    }
    updateStats();
}

// Локация
function updateLocation() {
    const loc = locations[player.location];
    locationName.textContent = loc.name;
    locationText.textContent = loc.description;

    actionButtons.innerHTML = '';
    loc.actions.forEach(action => {
        const btn = document.createElement('button');
        btn.textContent = action;
        btn.addEventListener('click', () => handleAction(action));
        actionButtons.appendChild(btn);
    });

    log(`📍 Вы находитесь в локации: ${loc.name}`);

    const dangerZones = ['corridor', 'stairs', 'metro'];

    if (player.awareness > 60 && player.location === 'rooftop') {
        startFight('agentSmith');
    } else if (
        player.awareness > 20 &&
        player.fighting === null &&
        dangerZones.includes(player.location) &&
        Math.random() < 0.8 // 80% шанс
    ) {
        startFight('agent');
    } else {
        endFight();
    }
}

function log(msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    logPanel.appendChild(p);
    logPanel.scrollTop = logPanel.scrollHeight;
}

// Бой
function startFight(enemyKey) {
    const base= enemies[enemyKey];
    const enemy = {...base} // копия объекта противника
    enemy.health = base.health;

    player.fighting = enemyKey;
    player.currentEnemy = enemy;

    log(`⚠️ ${enemy.name} появился! ${enemy.description}`);
    combatActions.classList.remove('hidden');
}

function endFight() {
    player.fighting = null;
    combatActions.classList.add('hidden');
}

function handleCombat(action) {
    const enemy = player.currentEnemy;
    if (!enemy) return;

    if (action === 'attack') {
        const damage = player.strength;
        enemy.health -= damage;
        log(`👊 Вы нанесли ${damage} урона ${enemy.name}. 🩸У противника осталось ${enemy.health > 0 ? enemy.health : 0} здоровья`);

        if (enemy.health <= 0) {
            log(`✅ ${enemy.name} побеждён! +10 к силе`);
            player.strength += 10;
            updateStats();
            endFight();
            return;
        }

        const retaliation = Math.max(enemy.strength - player.defense, 5);
        player.health -= retaliation;
        log(`🔁 ${enemy.name} отвечает ударом: -${retaliation} здоровья`);
        updateStats();

        if (player.health <= 0) endGame('☠️ Вы были побеждены.');
    }

    if (action === 'dodge') {
        player.defense = Math.max(0, player.defense - 1);
        updateStats();

        if (player.fighting === 'agentSmith') {
            log('❌ От агента Смита не уйти!');
            return;
        }

        if (Math.random() < 0.5) {
            log('💨 Вы успешно уклонились!');
            endFight();
        } else {
            const retaliation = Math.max(enemy.strength - player.defense, 5);
            player.health -= retaliation;
            log(`😵 Не удалось уклониться! Получен урон: -${retaliation} HP`);
            updateStats();

            if (player.health <= 0) endGame('☠️ Вас одолели.');
        }
    }
}

function endGame(message) {
    log(message);
    actionButtons.innerHTML = '';
    combatActions.classList.add('hidden');
}

// Действия
function handleAction(action) {
    switch (action) {
        case 'Проверить монитор':
            if (!player.foundGlitches.includes('monitor')) {
                player.foundGlitches.push('monitor');
                player.awareness += 7;
                log('🖥️ Монитор мерцает нечитаемым зелёным кодом. +7 к осознанности');
                updateStats();
            } else {
                log('🖥️ Экран пуст...');
            }
            break;

        case 'Открыть ящик':
            if (!player.inventory.includes('Пистолет')) {
                player.inventory.push('Пистолет');
                log('🗃️ В ящике лежал пистолет!');
                updateInventory();
            } else {
                log('🗃️ В ящике пусто.');
            }
            break;

        case 'Посмотреть вниз':
            player.awareness += 5;
            log('🔭 Нереальность всего накрывает тебя. +5 к осознанности');
            updateStats();
            break;

        case 'Осмотреться': {
            const loc = locations[player.location];
            const glitches = loc.glitches || [];
            const newGlitch = glitches.find(g => !player.foundGlitches.includes(g));
            if (newGlitch) {
                player.foundGlitches.push(newGlitch);
                player.awareness += 8;
                log(`🧠 ${newGlitch}. +8 к осознанности`);
                updateStats();
            } else {
                log('🔍 Всё кажется обычным...');
            }
            checkAwareness();
            break;
        }

        case 'Выйти в коридор':
            player.location = 'corridor';
            updateLocation();
            break;

        case 'Зайти в туалет':
            player.location = 'toilet';
            updateLocation();
            if (!player.inventory.includes('Аптечка')) {
                player.inventory.push('Аптечка');
                updateInventory();
                log('🚽 Вы нашли аптечку!');
            }
            break;

        case 'Вернуться в коридор':
            player.location = 'corridor';
            updateLocation();
            break;

        case 'Выйти на лестницу':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Подняться на крышу':
            if (player.inventory.includes('Пропуск')) {
                player.location = 'rooftop';
                updateLocation();
            } else {
                log('🚫 Лестница на крышу закрыта. Нужен пропуск.');
            }
            break;

        case 'Спуститься на лестницу':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Вернуться в офис':
            player.location = 'office';
            updateLocation();
            break;

        case 'Выйти на улицу':
            player.location = 'street';
            updateLocation();
            break;

        case 'Подняться на лестницу':
            player.location = 'stairs';
            updateLocation();
            break;

        case 'Спуститься в метро':
            player.location = 'metro';
            updateLocation();
            break;

        case 'Вернуться на улицу':
            player.location = 'street';
            updateLocation();
            break;

        case 'Осмотреть тоннель':
            if (!player.inventory.includes('Пропуск')) {
                player.inventory.push('Пропуск');
                updateInventory();
                log('📄 Вы нашли Пропуск! Теперь вы можете попасть на крышу.');
            } else {
                log('📄 Здесь пусто... Пропуск уже у вас.');
            }
            break;

        case 'Зайти в белую дверь':
            if (player.awareness >= 50 && player.invitedToWhiteRoom) {
                player.location = 'whiteRoom';
                updateLocation();
            } else {
                log('🚪 Дверь кажется закрытой. Возможно, ты пока не готов.');
            }
            break;

        case 'Взять красную таблетку':
            if (player.strength >= 30) {
                endGame('🧠 Ты не просто пробудился — ты стал угрозой для Матрицы. Добро пожаловать в сопротивление.');
            } else {
                endGame('🧠 Пробуждение завершено. Истина открылась, но всё только начинается...');
            }
            break;

        case 'Взять синюю таблетку':
            if (player.inventory.includes('Кофе') || player.usedPistol) {
                endGame('😴 Матрица тебе дала всё — комфорт, кофе и оружие. Ты выбрал её снова.');
            } else {
                endGame('💤 Ты заснул. Или всё было сном?..');
            }
            break;

        default:
            log('❓ Ничего не произошло...');
    }
}


// Проверка звонка Морфеуса
function checkAwareness() {
    if (player.awareness >= 50 && !player.invitedToWhiteRoom) {
        player.invitedToWhiteRoom = true;
        log('📞 Звонит мобильник. Это Морфеус...');
        log('🕴️ "Ты чувствуешь, что-то не так? Приходи... Я жду в белой комнате."');
    }
}

// Обработка экрана концовки
function endGame(message) {
    log(message);
    actionButtons.innerHTML = '';
    combatActions.classList.add('hidden');

    gameInterface.classList.add('hidden');
    const endingScreen = document.getElementById('ending-screen');
    const endMessage = document.getElementById('end-message');

    endMessage.textContent = message;
    endingScreen.classList.remove('hidden');
}