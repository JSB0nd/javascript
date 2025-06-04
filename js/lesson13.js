// Отладка кода 🔧
// точка останова

function hasEvenNumber(arr) {

    let foundEven = false;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] % 2 === 0) {

            return foundEven = true;

            return; // в данном месте не хватало return

        } else if (arr[i] % 2 !== 0) {

            foundEven = false;

        }

    }

    return;

}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true

// true - не хватало остановки функции при условии 2 === 0

// debugger

function calculateAverage(numbers) {

    debugger

    let sum = 0;

    debugger

    for (let i = 0; i < numbers.length; i++) { // должно быть <

        sum += numbers[i];

        debugger

    }

    return sum / numbers.length;

}

console.log(calculateAverage([2, 4, 6])); // Ожидается: 4

// 4 - проблема была в цикле

// console.log

function findLargestNumber(arr) {

    console.log('arr ' + arr);

    let largest = arr[0]; // проблема здесь, инициализируем первое число как максимум и двигаем дальше

    console.log('largest ' + largest)

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > largest) {

            largest = arr[i];

            console.log('largest ' + largest);

        }

    }

    return largest;

}

console.log(findLargestNumber([-10, -20, -30])); // Ожидается: -10

// -10