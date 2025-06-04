function hasEvenNumber(arr) {

    let foundEven = false;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] % 2 === 0) {

            foundEven = true;

        } else if (arr[i] % 2 !== 0) {

            foundEven = false;

        }

    }

    return foundEven;

}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true