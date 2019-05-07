// Bài 1: Cho mảng lớn hơn 2, chứa các số khác. Viết hàm tìm số lớn thức nhì trong mảng
function bai1(arr) {
    let result = arr.sort((a, b) => {
        return b - a;
    })[1];

    return result;
}

console.log("Bài 1:");
console.log(bai1([-1, 0, 1, 2, 12, 23]));

// Bài 2: Cho 1 mảng các chuỗi bất kỳ. Tìm ra chuỗi có độ dài lớn nhất trong mảng.
function bai2(arr) {
    let result = arr[0];
    for (str of arr) {
        if (result.length < str.length) result = str;
    }
    return result;
}


console.log("Bài 2:");
console.log(bai2(['0', '01', '01234', '0123']));

// Bài 3: Viết hàm có 2 tham số là chuỗi str và target, dùng để kiểm tra xem str có kết thúc
// bởi target hay không. Trả về true hoặc false
function bai3(str, target) {
    return str.endsWith(target);
}


console.log("Bài 3:");
console.log(bai3("0123abc", "abc"));
console.log(bai3("0123abc", "cdf"));

//Bài 4: Cho 1 mảng bất kỳ. kiểm tra xem mảng có phần tử nào bị lặp lại hay không.
//kết quả trả về là true hoặc false
function bai4(arr) {
    let maxIndex = arr.length - 1;
    for (let i = 0; i <= maxIndex - 1; i++) {
        for (let j = i + 1; j <= maxIndex; j++) {
            if (arr[i] === arr[j]) return true;
            else if (Number.isNaN(arr[i]) && Number.isNaN(arr[j])) return true;
        }
    }
    return false;
}


console.log("Bài 4:");
console.log(bai4([1, "a", 3, 4]));
console.log(bai4([1, "undifined", 3, undefined]));


console.log(bai4([1, "a", 3, 1]));
console.log(bai4([1, "a", 3, "a"]));
console.log(bai4([1, undefined, 3, undefined]));
console.log(bai4([1, null, 3, null]));
console.log(bai4([1, NaN, 3, NaN]));

//Bài 5: Viết hàm truyền vào 1 chuỗi là tên thẻ HTML, kiểm tra xem trong file HTML có bai nhiêu thẻ đó
// Kết quả trả về là số lượng thẻ. Nếu không có trả về 0;
function bai5(tagName) {
    let nodeList = document.getElementsByTagName(tagName);
    return nodeList.length;
}


console.log("Bài 5:");
console.log(bai5("p"));
console.log(bai5("div"));