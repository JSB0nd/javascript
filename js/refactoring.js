// 1 задание
// В следующем коде несколько раз повторяются похожие операции. Проведите рефакторинг, чтобы избежать дублирования,
// используя функции или другие средства:
const product1 = { name: 'Product 1', price: 10 };
const product2 = { name: 'Product 2', price: 20 };
// const total1 = product1.price * 1.2;
// const total2 = product2.price * 1.2;
// console.log('Total for Product 1:', total1);
// console.log('Total for Product 2:', total2);

function totalPrice(name, price) {
  const total = price * 1.2;
  console.log(`Total for ${name}: ${total}`);
}

const totalForProduct1 = totalPrice(product1.name, product1.price); // Total for Product 1: 12
const totalForProduct2 = totalPrice(product2.name, product2.price); // Total for  Product 2: 24


// 2 задание
// Код ниже содержит сложные вложенные условия. Упростите его, чтобы улучшить читаемость и уменьшить вероятность ошибок:
// if (user.isAdmin) {
//   if (user.isActive) {
//     if (user.age > 18) {
//       console.log('Access granted');
//     }
//   }
// }


function checkUser(user) {
  if (user.isAdmin &&
      user.isActive &&
      user.age > 18) {
    console.log('Access granted')
  }
}

// 3 задание
// В следующей функции выполняется слишком много операций. Разделите её на несколько более коротких функций,
// чтобы улучшить читаемость и повторное использование кода:
function checkStock(item) {
  return Math.random() < 0.5; // Возвращает рандомно true или false, это просто иммитация функции!
}
// function processOrder(order) {
//   // Валидация данных заказа
//   if (!order.id || !order.items || order.items.length === 0) {
//     console.log('Invalid order');
//     return;
//   }
//   // Рассчет суммы
//   let total = 0;
//   for (let item of order.items) {
//     total += item.price * item.quantity;
//   }
//   // Проверка наличия на складе
//   for (let item of order.items) {
//     if (!checkStock(item)) {
//       console.log('Item out of stock:', item.name);
//       return;
//     }
//   }
//   // Выполнение заказа
//   console.log('Order processed with total:', total);
// }

function processOrder(order) {
  if (!validationOrder(order)) return;

  const total = totalSum(order);

  if (!checkStockItem(order)) return;

  performOrder(order);
}

// проверка заказа
const validationOrder = (order) => {
  const isValid = order.id && order.items && order.items.length > 0;
  if (isValid) return true;

  return console.log('Invalid order');
  return false;
}
// подсчет суммы
const totalSum = (order) => {
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  return total;
}
// проверка наличия на складе
const checkStockItem = (order) => {
  for (let item of order.items) {
    if (!checkStock(item)) {
      console.log('Item out of stock:', item.name);
      return false;
    }
  }
  return true;
}
// выполнение заказа
const performOrder = (total) => {
  console.log('Order processed with total:', total);
}