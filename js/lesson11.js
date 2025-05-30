// палиндром

let string
function checkIsPalindrom(string = 12321) {
    const cleaned = string.toString().replace(/[^a-zа-яё0-9]/gi, '').toLowerCase()
    const reversed = cleaned.split('').reverse().join('')


    if ( cleaned === reversed) {
        console.log(`${string} - является палиндромом -`)
        console.log(true)
    } else {
        console.log(`${string} - не палиндром -`)
        console.log(false)
    }
}

checkIsPalindrom() // 12321 - является палиндромом - true
checkIsPalindrom(123454321) // 123454321 - является палиндромом - true
checkIsPalindrom('Лёша на полке клопа нашёл') // Лёша на полке клопа нашёл - является палиндромом - true
checkIsPalindrom('Вася Пупкин') // Вася Пупкин - не палиндром - false

// самое короткое слова

function findShortestWord(sentence) {
    const words = sentence.split(' ')
    let shortestWord = words[0]

    for ( let i = 1; i < words.length; i++) {
        if (words[i].length < shortestWord.length) {
            shortestWord = words[i]
        }
    }
    return shortestWord
}

const sentence = 'Ищем самое короткое слово здесь'
const shortestWord = findShortestWord(sentence)
console.log(`${shortestWord} - будет самое короткое слово в "${sentence}"`) 
// Ищем - будет самое короткое слово в "Ищем самое короткое слово здесь"

// телефонный номер из 10 цифр
 
let phone
const createPhoneNumber = (num) => {
    const numbers = Array.from(String(num), Number)
    let format = '8(xxx)xxx-xx-xx';

    for (let i = 0; i < numbers.length; i++) {
        format = format.replace('x', numbers[i])
    }

    return format
}

phone = 9681191288
const formattedNumber = createPhoneNumber(phone)
console.log(formattedNumber) // 8(968)119-12-88

// ищем максимум и минимум в массиве

function findMinMaxInArray(array) {
    if (array.length === 0) {
        return {
            min: undefined,
            max: undefined
        }}
        
        const min = Math.min(...array)
        const max = Math.max(...array)

        return console.log({min, max})
    }

const array = [-5, 1, 25, 65, -33, 99]
const findedMinMax = findMinMaxInArray(array) // {min: -33, max: 99}

// массив на увеличение

function incrementionArraysNumbers(arr) {
    return [...arr].sort((a, b) => a - b)
}

const sortedNewArray = incrementionArraysNumbers(array)
console.log(sortedNewArray) // (6) [-33, -5, 1, 25, 65, 99]

function bubbleSort(arr) {
    const result = [...arr]

    for (let i = 0; i < result.length; i++ ) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {

                let temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] =  temp;
            }
        }
    }
    return result;
}

console.log(bubbleSort(array)) // (6) [-33, -5, 1, 25, 65, 99]