// 1,2,3,4,5,6,7
// 1,1,2,3,5,8,13
function getFibonacyArr(x) {
//     x -= 1;
    let result = [1, 1];
    if (x == 1) return [1];
    if (x == 2) return [1, 1];
    for (let i = 2; i < x; i++) {
        let value = result[i - 1] + result[i - 2];
        result.push(value);

    }
    return result;
}

console.group("getFibonacyArr");
console.log(getFibonacyArr(1));
console.log(getFibonacyArr(2));
console.log(getFibonacyArr(3));
console.log(getFibonacyArr(4));
console.log(getFibonacyArr(5));
console.log(getFibonacyArr(6));
console.log(getFibonacyArr(7));
console.groupEnd();

function getSum(x) {

    let fibonacyArr = getFibonacyArr(x + 1);
    let sum = fibonacyArr.reduce(function(total, value) {
        if (value > x || value % 2) return total;
        return total + value;
    }, 0);
    return sum;
}

console.group("getSum");
console.log(getSum(1));
console.log(getSum(2));
console.log(getSum(3));
console.log(getSum(13));

console.groupEnd();


// Bai 1
function bai1(arr) {
    arr.sort(function(a, b) {
        return b - a;
    })
    console.log(arr);
    return arr[1];

}

console.log(bai1([3, 2, 1, 4]))

// Bai 2
function bai2(arr) {
    let maxString = '';
    for (string of arr) {
        if (string.length > maxString.length) maxString = string;
    }
    return maxString;
}

console.log(bai2(['1', '12', '123']));

// Bai 3
function bai3(string) {
    let stringArr = string.split(' ');
    let result = stringArr.map(function(value) {
        return value[0].toUpperCase() + value.slice(1) + ' ';
    }).join(' ');
    return result;
}

console.log(bai3("heLLo world"))