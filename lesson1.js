const title = document.getElementById("tile");
console.log(title.innerText);
console.log('Сообщение');
console.info('Информационное сообщение');
console.warn('Предупрждение');
console.error('Ошибка!');
console.time('Loop');
for (let i = 0; i < 10000; i++) {}
console.timeEnd('Loop');

