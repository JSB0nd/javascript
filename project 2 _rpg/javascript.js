// Игрок
const player = {
    name: '',
    location: 'office',
    health: 100,
    strength: 10,
    defense: 7,
    awareness: 0,
    inventory: ['Мобильник'],
    invitedToWhiteRoom: false,
    foundGlitches: [],
    usedPistol: false,
    fighting: null,
    currentEnemy: null,
    trained: false,
    trainedKungFu: false,
    trainedPilot: false,
    usedGlasses: false,
    foundMedkitToilet: false,
    foundMedkitStairs: false,
    foundMedkitOffice: false,
    foundMedkitMetro: false,
    coffeeCount: 0,
};

// Враги
const enemies = {
    agent: {
        name: 'Агент',
        health: 70,
        strength: 15,
        description: '🕶️ Безликий охранник системы.'
    },
    agentSmith: {
        name: 'Агент Смит',
        health: 500,
        strength: 25,
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

// создание фона как в матрице
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Установка размеров
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Символы (японские и латиница)
const symbols = 'アカサタナハマヤラワアイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Массив капель — одна на каждый столбец
const drops = Array(columns).fill(1);

// Функция отрисовки
function drawMatrix() {
    // Полупрозрачная чёрная заливка (эффект затухания)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#028502'; // цвет кода
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Сброс высоты случайно
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
}

// Запуск анимации
// drawMatrix();


// Локации
const locations = {
    office: {
        name: 'Офис',
        description: 'Открытые кабинки, яркий свет и холодный монитор. Коллеги молчат, глядя в экраны. Воздух застоялся. Телефоны не звонят, но раз в минуту раздаётся еле слышный треск в проводах. Один из сотрудников, похоже, даже не моргает.',
        actions: ['Проверить монитор', 'Открыть ящик', 'Выйти в коридор']
    },
    corridor: {
        name: 'Коридор',
        description: 'Тихий и длинный коридор с множеством одинаковых дверей. Пахнет пластиком и пылью. Кажется, что двери двигаются, когда ты отворачиваешься. Свет моргает с ритмом, как будто им кто-то управляет.',
        actions: ['Вернуться в офис', 'Зайти в туалет', 'Пройти на лестницу', 'Осмотреться'],
        glitches: ['Ощущение как будто коридор удлиняется до бесконечности']
    },
    toilet: {
        name: 'Туалет',
        description: 'Холодный кафель, блеклое зеркало и ощущение наблюдения. На полу валяется аптечка. Мигание лампы отражается в зеркале не синхронно. Кто-то будто оставил следы, ведущие в стену.',
        actions: ['Вернуться в коридор', 'Осмотреться'],
        glitches: [
            '🚰 Из крана течёт чёрная жидкость, хотя ты его не открывал.',
            '🪞 В зеркале твоё отражение моргает с задержкой.'
        ]
    },
    stairs: {
        name: 'Лестница',
        description: 'Бетонные ступени ведут вверх и вниз. Свет тусклый, шаги гулко отдаются эхом. На одном из пролётов лежит разорванный галстук. На стене — трещина, похожая на цифру 1.',
        actions: ['Подняться на крышу', 'Спуститься в серверную', 'Выйти на улицу', 'Вернуться в коридор', 'Осмотреться'],
        glitches: ['Тень от перил движется сама по себе', 'Кошка пробегает мимо... и снова']
    },
    street: {
        name: 'Улица',
        description: 'Мир снаружи не выглядит лучше — прохожие избегают взглядов, машины стоят в пробке, но никто не сигналит. Витрины магазинов повторяются, как будто зациклены. Полицейский смотрит сквозь тебя, как будто не замечает.',
        actions: ['Пройти на лестницу', 'Спуститься в метро', 'Осмотреться'],
        glitches: [
            'Ветер дует в одну сторону, а облака — в другую',
            'Люди начинают смотреть на тебя, как будто что-то знают'
        ]
    },
    metro: {
        name: 'Метро',
        description: 'Станция пуста, табло мигает, но поездов нет. Кажется, время остановилось. Один из автоматов с напитками показывает только цифры «1999». Рядом светится кофейный автомат — единственное, что тут живое.',
        actions: ['Осмотреть тоннель', 'Вернуться на улицу', 'Зайти в белую дверь', 'Взять кофе', 'Осмотреться'],
        glitches: [
            'Табло мигает странной последовательностью: 010101...',
            'Ты замечаешь белую дверь в стене, она не должна здесь быть',
            '🎧 Слышен звук приближающегося поезда... но рельсы пусты'
        ]
    },
    rooftop: {
        name: 'Крыша',
        description: 'Город стелется под ногами. Воздух плотный, будто наблюдает за тобой. Справа торчит антенна, направленная в никуда. На парапете лежит чей-то старый ботинок — одинокий и странный.',
        actions: ['Посмотреть вниз', 'Пройти на лестницу', 'Осмотреться'],
        glitches: ['Птица повисла в воздухе и исчезла']
    },
    whiteRoom: {
        name: 'Белая комната',
        description: 'Бесконечная белизна. Перед тобой стоит Морфеус с таблетками. Здесь всё возможно. Словно сама реальность здесь на паузе. Звук гаснет, будто ты в вакууме.',
        actions: ['Взять 🔴 красную таблетку', 'Взять 🔵 синюю таблетку', 'Осмотреться']
    },
    construct: {
        name: 'Тренировочная конструкция',
        description: 'Белое пространство, наполненное оружием, книгами и техниками. Здесь ты можешь освоить всё, что пожелаешь. Арсенал вспыхивает на секунду и снова исчезает. Ты ощущаешь странное покалывание в затылке, словно мозг перезагружается.',
        actions: ['Осмотреться', 'Изучить кунг-фу', 'Изучить пилотирование', 'Выйти в Матрицу'],
        glitches: ['Оружие появляется из ниоткуда', 'Время кажется нелинейным']
    },
    matrix: {
        name: 'Матрица',
        description: 'Ты идёшь по улице рядом с Морфеусом. Он объясняет, что мир — лишь иллюзия. Люди вокруг не подозревают, что находятся в плену. Все вокруг двигаются по траекториям, словно по сценарию. Морфеус говорит: «Большинство этих людей ещё не готовы».',
        actions: ['Осмотреться', 'Вернуться в конструкцию'],
        glitches: [
            '👠 Женщина в красном привлекает твоё внимание. Ты оборачиваешься... но где она?',
            '🔁 Прохожий, который только что прошёл мимо, снова идёт навстречу — дежавю?'
        ]
    },
    serverRoom: {
        name: 'Серверная',
        description: '⚡ Подземная комната в здании, вся уставлена мерцающими серверами. В воздухе пахнет озоном. Провода, как корни, расходятся во все стороны.',
        actions: ['Осмотреться', 'Осмотреть стол' ,'Пройти на лестницу'],
        glitches: [
            'Один сервер отображает фотографию тебя ребёнком.',
            'Цифры бегут назад.'
        ]
    },
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
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


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
        const button = document.createElement('button');
        button.textContent = item;
        button.classList.add('item');
        itemsList.appendChild(button);
        button.addEventListener('click', () => useItem(item));
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
            player.health += 40;
            log('💊 Вы использовали аптечку. +40 здоровья');
            removeItem(item);
            break;

        case 'Кофе':
            player.health += 30;
            log('☕ Вы выпили кофе. +30 здоровья');
            removeItem(item);
            break;

        case 'Пистолет':
            if (!player.usedPistol) {
                player.strength += 80;
                player.usedPistol = true;
                log('🔫 Вы активировали пистолет. +80 к силе (разово)');
                removeItem(item);
                updateStats();
            }
            break;

        case 'Мобильник':
            log('📞 Просто мобильник.');
            break;

        case 'Очки':
            if (!player.usedGlasses) {
                player.awareness += 25;
                player.defense += 7;
                player.strength += 5;
                player.usedGlasses = true;
                drawMatrix() // запуск анимации
                log('🕶️ Ты надел очки — и всё изменилось. Мир больше не выглядит обычным: стены, объекты, люди, даже воздух — всё теперь состоит из бегущего зелёного кода.. +25 к осознанности.');
                log(`👊 +5 к силе, +7 к защите`)
                updateStats();
            } else {
                log('🕶️ Очки уже использованы.');
            }
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

    const dangerZones = ['corridor', 'stairs', 'metro', 'serverRoom'];

    if (player.awareness > 60 && player.location === 'rooftop') {
        startFight('agentSmith');
    } else if (
        player.awareness > 23 &&
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
let enemyAttackInterval = null;

function startFight(enemyKey) {
    const base= enemies[enemyKey];
    const enemy = {...base} // копия объекта противника
    enemy.health = base.health;

    player.fighting = enemyKey;
    player.currentEnemy = enemy;

    log(`⚠️ ${enemy.name} появился! ${enemy.description}`);
    combatActions.classList.remove('hidden');

    setInterval(() => {
        if (player.fighting === enemyKey && enemy.health > 0) {
            const difficultyFactor = Math.floor(player.awareness / 8) // зависимость сложности от осознанности
            const baseRetaliation = Math.max(enemy.strength - player.defense, 5);
            const variability = Math.floor(Math.random() * 6) - 3; // диапазон от -3 до +2
            const retaliation = Math.max(baseRetaliation + variability + difficultyFactor, 1);
            player.health -= retaliation;
            log(`🔁 ${enemy.name} атакует: -${retaliation} здоровья`);
            updateStats();

            if (player.health <= 0) {
                clearInterval(enemyAttackInterval);
                endGame('☠️ Вы были побеждены.');
            }

        }
    }, 3500);
}

function endFight() {
    player.fighting = null;
    combatActions.classList.add('hidden');
    if (enemyAttackInterval !== null) {
        clearInterval(enemyAttackInterval);
        enemyAttackInterval = null;
    }
}

function handleCombat(action) {
    const enemy = player.currentEnemy;
    if (!enemy || enemy.health <= 0) {
        log(`⚠️ Нет противника.`);
        return;
    }

    if (action === 'attack') {
        const damage = player.strength;
        enemy.health -= damage;
        log(`👊 Вы нанесли ${damage} урона ${enemy.name}. 🩸У противника осталось ${enemy.health > 0 ? enemy.health : 0} здоровья`);

        if (enemy.health <= 0) {
            log(`✅ ${enemy.name} побеждён! +10 к силе`);
            player.strength += 5;
            updateStats();
            endFight();
            return;
        }

        const baseRetaliation = Math.max(enemy.strength - player.defense, 5);
        const variability = Math.floor(Math.random() * 6) - 3; // диапазон от -3 до +2
        const retaliation = Math.max(baseRetaliation + variability, 1);
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

        if (Math.random() < 0.6) {
            enemy.health -= 5;
            log(`💨 Вы успешно уклонились! и нанесли урона на -5 здоровья!`);
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


// function endGame(message) {
//     drawMatrix()
//     log(message);
//     actionButtons.innerHTML = '';
//     combatActions.classList.add('hidden');
// }

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

            if (!player.foundMedkitToilet) {
                player.inventory.push('Аптечка');
                player.foundMedkit = true;
                updateInventory();
                log('🚽 Вы нашли аптечку!');
            }
            break;

        case 'Вернуться в коридор':
            player.location = 'corridor';
            updateLocation();
            break;

        case 'Пройти на лестницу':
            player.location = 'stairs';
            updateLocation();

            if (!player.foundMedkitStairs) {
                player.inventory.push('Аптечка');
                player.foundMedkitStairs = true;
                updateInventory();
                log('🚽 Вы нашли аптечку!');
            }
            break;

        case 'Подняться на крышу':
            if (player.inventory.includes('Пропуск')) {
                player.location = 'rooftop';
                updateLocation();
            } else {
                log('🚫 Лестница на крышу закрыта. Нужен пропуск.');
            }
            break;

        case 'Вернуться в офис':
            player.location = 'office';
            updateLocation();

            if (!player.foundMedkitOffice) {
                player.inventory.push('Аптечка');
                player.foundMedkitOffice = true;
                updateInventory();
                log('🚽 Вы нашли аптечку!');
            }
            break;

        case 'Выйти на улицу':
            player.location = 'street';
            updateLocation();
            break;

        case 'Спуститься в метро':
            player.location = 'metro';
            updateLocation();

            if (!player.foundMedkitMetro) {
                player.inventory.push('Аптечка');
                player.foundMedkitMetro = true;
                updateInventory();
                log('🚽 Вы нашли аптечку!');
            }
            break;

        case 'Вернуться на улицу':
            player.location = 'street';
            updateLocation();
            break;

        case 'Осмотреть тоннель':
            if (!player.inventory.includes('Пропуск')) {
                player.inventory.push('Пропуск');
                updateInventory();
                log('🪪 Вы нашли Пропуск! Теперь вы можете попасть в серверную и на крышу.');
            } else {
                log('🪪 Здесь пусто... Пропуск уже у вас.');
            }
            break;

        case 'Взять кофе':
            if (!player.coffeeCount) player.coffeeCount = 0;

            if (player.coffeeCount < 3) {
                player.inventory.push('Кофе');
                player.coffeeCount++;
                log(`☕ Вы достали кофе из автомата.`);
                updateInventory();
            } else {
                log('☕ Автомат пуст. Кофе больше не выдаётся.');
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

        case 'Выйти в Матрицу':
            player.location = 'matrix';
            updateLocation();
            break;

        case 'Вернуться в конструкцию':
            player.location = 'construct';
            updateLocation();
            break;

        case 'Взять 🔴 красную таблетку':
            player.health = 100;
            player.location = 'construct';
            log('🔴 Ты выбрал истину. Добро пожаловать в реальность.');
            log('🧠 Пробуждение завершено. Здоровье восстановлено.');
            drawMatrix()
            updateStats();
            updateLocation();
            break;

        case 'Взять 🔵 синюю таблетку':
            if (player.inventory.includes('Кофе') || player.usedPistol) {
                endGame('😴 Матрица тебе дала всё — комфорт, кофе и оружие. Ты выбрал её снова.');
            } else {
                endGame('💤 Ты заснул. Или всё было сном?..');
            }
            break;

        case 'Изучить кунг-фу':
            if (!player.trainedKungFu) {
                player.trainedKungFu = true;
                player.strength += 20;
                log('🥋 Вы загрузили Кунг-Фу. 20 к силе');
                updateStats();
            } else {
                log('📁 Вы уже знаете кунг-фу.');
            }
            break;

        case 'Изучить пилотирование':
            if (!player.trainedPilot) {
                player.trainedPilot = true;
                player.defense += 10;
                log('🚁 Вы изучили управление вертолётом. +10 к защите');
                updateStats();
            } else {
                log('📁 Пилотирование уже освоено.');
            }
            break;

        case 'Спуститься в серверную':
            if (player.inventory.includes('Пропуск')) {
                player.location = 'serverRoom';
                updateLocation();
            } else {
                log('🚫 Дверь в серверную закрыта. Нужен пропуск.');
            }
            break;

        case 'Осмотреть стол':
            if (!player.inventory.includes('Очки')) {
                player.inventory.push('Очки');
                log('🕶️ Вы нашли чёрные очки.');
                updateInventory();
            } else {
                log('🕶️ Очки уже у вас.');
            }
            break;

        default:
            log('❓ Ничего не произошло...');
    }
}


// Проверка звонка Морфеуса
function checkAwareness() {
    if (player.awareness >= 70 && !player.invitedToWhiteRoom) {
        player.invitedToWhiteRoom = true;
        log('📞 Звонит мобильник. Это Морфеус...');
        log('🕴️ "Ты чувствуешь, что что-то не так? Этот мир — лишь фасад."');
        log('🕴️ "Всё, что ты видишь — ложь, чтобы удерживать тебя в системе."');
        log('🕴️ "Ты готов узнать правду? Я жду тебя в Белой комнате. За белой дверью."');
    }
}

// Обработка экрана концовки
function endGame(message) {
    drawMatrix()
    log(message);
    actionButtons.innerHTML = '';
    combatActions.classList.add('hidden');

    gameInterface.classList.add('hidden');
    const endingScreen = document.getElementById('ending-screen');
    const endMessage = document.getElementById('end-message');

    endMessage.textContent = message;
    endingScreen.classList.remove('hidden');
}