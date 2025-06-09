// Найти элемент на странице

const paragraph1 = document.getElementById('p1')
const p1newText = paragraph1.textContent = '1. * Добавляю новый текст в < p >'

console.log(p1newText)

// изменить фон

const p2class = document.getElementsByClassName('p2class')
paragraph2 = p2class[0] // возвращает коллекцию даже если элемент 1 - по классу
paragraph2.style.color = 'red'
paragraph2.style.backgroundColor = 'black'
paragraph2.style.fontSize = '2em'

// новый элемент в конце

const newElementEnd = document.createElement('a')
newElementEnd.setAttribute('href', 'https://www.google.ru/?hl=ru')
newElementEnd.classList.add('lesson-mission-text')
newElementEnd.textContent = 'google.com'
document.body.appendChild(newElementEnd)

console.log(newElementEnd.textContent)

//  удаляем

const elementToRemove = document.getElementById('p4')
// elementToRemove.parentNode.removeChild(elementToRemove)
elementToRemove.remove() // так проще

// другая ссылка

const otherLink = document.querySelector('a')
otherLink.href = 'https://ya.ru/'
otherLink.textContent = 'Яндекс'

console.log(otherLink.href)

// новый элемент в DOM

const newElement = document.createElement('p')
newElement.textContent = '8. Новый элемент в конце списка'
newElement.classList.add('class-for-text')
paragraph8 = document.getElementsByClassName('lesson-mission-text')[0]
paragraph8.appendChild(newElement)

console.log(newElement.textContent)

//  переключаем класс

const toggleClass = document.getElementsByTagName('span')[0]
toggleClass.classList.toggle('red')

console.log(toggleClass.classList)

