// 1. Напиши функцию `safeDivide`, которая принимает два числа и возвращает результат их деления.
// Если второй аргумент равен нулю, функция должна бросать ошибку с сообщением "Деление на ноль невозможно".
// Используй `try...catch` для обработки ошибок и выведи сообщение об ошибке в консоль;

function safeDivide(a, b) {
    if (b === 0) {
        throw new Error("Деление на ноль невозможно");
    }
    return a / b;
}

try {
    console.log(safeDivide(20, 0));
} catch (error) {
    console.log("Ошибка:" , error.message); // Ошибка: Деление на ноль невозможно
}

// 2. Напиши функцию `transfromJSON`, которая принимает строку в формате JSON и возвращает объект.
// Используй `try...catch` для обработки возможных ошибок при парсинге JSON и выведи сообщение об ошибке в консоль;

const jsonString = '{"name": "John", "age": 30, "city": "New York"}'

function transformJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Ошибка при преобразовании JSON:", error);
        return null;
    }
}

result = transformJSON(jsonString);
console.log(result); // {name: 'John', age: 30, city: 'New York'}

const jsonString2 = 'string';
result2 = transformJSON(jsonString2); // Ошибка при преобразовании JSON: SyntaxError: Unexpected token 's', "string" is not valid JSON


// 3. Напиши функцию `checkAccess`, которая принимает возраст пользователя. Если возраст меньше 18,
// функция должна бросать ошибку с сообщением "Доступ запрещен". Используйте `try...catch` для обработки ошибок
// и выведи сообщение об ошибке в консоль.

function checkAccess(age) {
    if (age < 18) {
        throw new Error("Доступ запрещен!");
    }
    return age;
}

try {
    console.log(checkAccess(16));
} catch (error) {
    console.log("Ошибка:", error.message); // Ошибка: Доступ запрещен
} finally {
    console.log("Проверка проведена"); // Проверка проведена
}