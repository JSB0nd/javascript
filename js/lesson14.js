// объект

const user = {
    name : 'Leonid',
    age : 34,
    hobby : ['gym', 'studying'],
    greeting() {
        console.log('Hello!')
    },
    reading : {
        isReading: false
    }
};

console.log(user); // {
// name: 'Leonid',
//     age: 34,
//     hobby: [ 'gym', 'studying' ],
//     greeting: [Function: greeting],
// reading: { isReading: false }
// }

for (let key in user) {
    console.log(`${key}: ${user[key]}`);
} // name: Leonid
// age: 34
// hobby: gym,studying
// greeting: greeting() {
//     console.log(`Hello, ${name}!`)
// }
// reading: [object Object]

console.log(user.name); // Leonid

console.log(user['reading']); // { isReading: false }

console.log(Object.keys(user)); // [ 'name', 'age', 'hobby', 'greeting', 'reading' ]

console.log(Object.values(user)); //   'Leonid',
// 34,
//     [ 'gym', 'studying' ],
//     [Function: greeting],
// { isReading: false }
// ]

console.log(Object.entries(user)); // [
//     [ 'name', 'Leonid' ],
//     [ 'age', 34 ],
//     [ 'hobby', [ 'gym', 'studying' ] ],
//     [ 'greeting', [Function: greeting] ],
// [ 'reading', { isReading: false } ]
// ]

// меняем объект

user.surname = 'Shnyakin';

console.log(user.surname); // Shnyakin

user['post index'] = 455008;

console.log(user['post index']); // 455008

delete user['post index'];

console.log(user['post index']); // undefined

const changeUser = () => {
    user.name = 'Viktor';
    user.age = 30;
    user.hobby = ['eating', 'playing games'];

    delete user.greeting;
    delete user.reading;
    delete user.surname;

    return console.log(Object.entries(user));
}

changeUser(); // [
// [ 'name', 'Viktor' ],
//     [ 'age', 30 ],
//     [ 'hobby', [ 'eating', 'playing games' ] ]
// ]

for (let key in user) {
    console.log(`${key}: ${user[key]}`);
} // name: Viktor
// age: 30
// hobby: eating,playing games



