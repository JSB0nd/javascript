 // цикл for

 for (let i = 0; i < 10; i++) {
     console.log(`Считаем по циклу for ++ ${i}`);
 }

 for (let i = 10; i > 0; i--) {
     console.log(`Считаем по циклу for -- ${i}`);
 }

 const books = [
     {
         name: 'John',
         age: '2000'
     },
     {
         name: 'John1',
         age: '2001'
     },
     {
         name: 'John2',
         age: '2002'
     },
     {
         name: 'John3',
         age: '2003'
     },
    {
         name: 'John4',
         age: '2004'
     },
     {
         name: 'John5',
         age: '2005'
     }
 ]

for (let i = 0; i < books.length; i++) {
    console.log(`${books[i].name} - ${books[i].age}`);
}

// цикл while

 let i=0;
while (i <= 10) {
    console.log(`Погнали while${i}`);
    i++ // это break цикла while
}

// цикл do while

 let j=10;

do {
     console.log(`Едем do while ${j}`);
     j++ // это break цикла while
 } while (j < 10)

 // цикл for in

 const person = {
    name: 'John',
     age: 20,
     city: 'New York'
 }

 console.log(person.city)
 console.log(person['city'])

for (let key in person) {
    console.log(`выводим цикл for in ${key} - ${person[key]}`); // интерполяция - это очень удобно
}

// вложенные циклы

 for (let k = 0; k < 3; k++) {
     for (let l = 0; l < 3; l++) {
         for (let m = 0; m < 3; m++) {
             console.log(`i = ${k}, j = ${l}, m = ${m}`);
         }
     }
 }

 // прерывание цикла

 const magazine = ['name1','name2','name3','name4','name5','name6'];

 for (let n = 0; n < magazine.length; n++) {
     if (magazine[n] === 'name4') {
         console.log(`Журнал найден - ${magazine[n]}`);
         break;
     }
     console.log('в поиске...')
 }

 for (let n = 0; n < magazine.length; n++) {
     if (magazine[n] === 'name4') {
         console.log(`Журнал найден - ${magazine[n]}`);
         continue;
     }
     console.log('в поиске продолжения...')
 }

 // считаем сумму чисел от 0 до 100

 let p

 function sumTo() {
     let sum = 0;
        p = 0;
             while (p <= 100) {
             p++
             sum += p
            }
     return sum;
 }

 console.log(`Сумма чисел от 0 до 100 равна ${sumTo()}`)

 // показ простых чисел в интервале от 0 до 100

 function countSimpleInteger (start, end) {
     let result = ''; // пустая перемeнная, бех присвоения даёт undefined

     for (let num = start; num <= end; num++) { // num <= 100 - указывает в каком интервале ищем простые числа
         let count = 0;

         for (let q = 1; q <= num; q++) {
             if (num % q === 0) {
                 count++; // считаем количество делителей
             }
         }

         if (count === 2) {
             result += num + ' '; // добавляем только простые числа
         }
     }
     return result; // возвращаем результат в функцию, результат в удобном формате
 }

 console.log(countSimpleInteger(0 , 100)); // отображаем всё в удобном представлении, и легко модицифицировать диапазон, профит