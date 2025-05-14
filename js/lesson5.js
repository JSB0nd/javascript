example1 = 2 * 2 + 3; 
console.log(example1) // 7


// example2 = ( sin * cos ) ** 2
let sin = Math.sin(54)
let cos = Math.cos(16)
let example2 = ( sin * cos ) ** 2

console.log(`Sinus = ${sin}`) // Sinus = -0.5587890488516163
console.log(`Cosinus = ${cos}`) // Cosinus = -0.9576594803233847
console.log(example2) // 0.2863637210469634
console.log(Math.round(example2)) // 0
console.log(example2.toFixed(3)) // 0.286


// example3 = ( numerator / denominator + square ) * power

let numerator = ( 16 * ( 13.2 * 71.9 ) ** (1/2) )
let denominator = ( 2.4 / 7 ** 4 )
let square = ( 3 ** ( (49) ** (1/2) ))
let power = ( 2 ** 7 )

let example3 = ( numerator / denominator + square ) * power
console.log(example3.toFixed(0)) // 63399252


// проверка на четность

let number

function isEven(number) { 

    if ( number % 2 === 0 ) {
        console.log(number + " является четным числом.");
    } else {
        console.log(number + " является нечетным числом.");
    }
}

isEven(33) // 33 является нечетным числом.
isEven(10) // 10 является четным числом.
isEven(22) // 22 является четным числом.
isEven(812748347) // 812748347 является нечетным числом.
isEven(-9) // -9 является нечетным числом.

// Проверка на введенное поле

let user

function isEmpty(user) {
    if ( user === "" || null ) {
        console.log("Hello. Guest!");
    } else {
        console.log(`Hello, ${user}!`);
    }
}

isEmpty('Leonid') // Hello, Leonid!
isEmpty(null) // 