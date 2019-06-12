/*Xử lý số
● Bài 1: Viết hàm tính thể tích hình cầu, với tham số truyền vào là bán kính của hình cầu.
*/
console.group("Xử lý số")

function bai1(r) {
    return (Math.PI * 4 / 3 * r).toFixed(2);
}
console.group("bai1");
console.log(bai1(1));
console.groupEnd();
/*
● Bài 2: Viết hàm truyền vào 2 số nguyên, tính tổng tất cả các số nguyên nằm giữa chúng. Ví dụ với
tham số 3 và 8 ta có kết quả là 22 (bằng 4 + 5 + 6 + 7).
*/
console.group("bai2");

function bai2(int1, int2) {
    let result = 0;
    for (let i = int1 + 1; i < int2; i++) {
        result += i;
    }
    return result;
}

console.log(bai2(3, 8));
console.groupEnd();
/*
● Bài 3: Cho 1 số, kiểm tra xem số đó có phải là số nguyên tố hay không, kết quả trả về true hoặc false.
*/
console.group("bai3");

function bai3(int1) {
    for (let i = 2; i <= int1 / 2; i++) {
        if (int1 % i == 0) return false;
    }
    return true;
}
console.log(bai3(11));
console.log(bai3(12));
console.groupEnd();
/*
● Bài 4: Cho 1 số nguyên dương bất kỳ. Tính tổng tất cả các số nguyên tố mà nhỏ hơn hoặc bằng tham
số truyền vào.
*/
console.group("bai4");

function bai4(int1) {
    let result = 0;
    for (let i = 2; i <= int1; i++) {
        if (bai3(i)) result += i;
    }
    return result;
}

console.log(bai4(11));
console.log(bai4(12));
//2, 3, 5, 7, 11
console.groupEnd();
/*
● Bài 5: Cho 1 số nguyên dương, viết hàm tính tổng tất cả các ước số của số đó.
*/
console.group("bai5");

function bai5(int1) {
    let result = 0;
    for (let i = 2; i <= int1 / 2; i++) {
        if (int1 % i == 0) {
            result += i;
        }
    }
    return result;
}
console.log(bai5(12));
//2, 3, 4, 6
console.groupEnd();
/*
● Bài 6: Cho 1 số nguyên dương bất kỳ. Tính tổng tất cả các số chẵn thuộc dãy Fibonacci (0, 1, 1, 2, 3,
5, 8, 13...) mà nhỏ hơn hoặc bằng tham số truyền vào.
*/
console.group("bai6");

function bai6(int1) {
    function getFibonacci(int1) {
        if (int1 < 1) return undefined;
        let fibonacci = [0, 1];
        if (int1 == 1) return [0];
        if (int1 == 2) return fibonacci;
        for (let i = 3; i <= int1; i++) {
            fibonacci.push(fibonacci[i - 3] + fibonacci[i - 2]);
        }
        return fibonacci;
    }
    // for (i = 1; i <= 7; i++) {
    //     console.log(getFibonacci(i));
    // }
    let fibonacci = getFibonacci(int1 + 5);
    let result = 0;
    for (let i = 1; i < int1 + 5; i++) {
        if (fibonacci[i] > int1) break;
        if (fibonacci[i] % 2 == 0) {
            result += fibonacci[i];
        }
    }
    return result;
}

console.log(bai6(8));
console.log(bai6(12));
//2, 8 = 10;
console.groupEnd();
console.groupEnd();
/*
Xử lý chuỗi
● Bài 1: Chuyển 1 chuỗi gồm nhiều từ thành chuỗi mới viết hoa các chữ cái đầu tiên của mỗi từ. Ví dụ:
''HELLO world'' => ''Hello World''.
*/
console.group("Xử lý chuỗi");
console.group("bai2_1");

function bai2_1(str) {
    let strArr = str.split(" ").map(value => {
        return value[0].toUpperCase() + value.slice(1).toLowerCase();;
    });
    // console.log(strArr);
    return strArr.join(" ");
}
console.log(bai2_1("HELLO world"));
console.groupEnd();
/*
● Bài 2: Chuyển 1 chuỗi gồm nhiều từ thành dạng Spinal case. Ví dụ: ''HELLO world'' => ''hello-world''.
*/
console.group("bai2_2");

function bai2_2(str) {
    let strArr = str.toLowerCase().split(" ");
    return strArr.join("-");
}
console.log(bai2_2("HELLO world"));
console.groupEnd();
/*
● Bài 3: Viết hàm truyền vào 2 chuỗi, kiểm tra xem chuỗi thứ nhất có chứa toàn bộ ký tự nằm trong
chuỗi thứ 2 hay không, kết quả trả về true nếu có và false nếu không (không phân biệt hoa thường).
Ví dụ ''HELLO world'' có chứa ''how'' nhưng không chứa ''hey''.
*/
console.group("bai2_3");

function bai2_3(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    for (char of str1) {
        if (str2.indexOf(char) < 0) return false;
    }
    return true;
}
console.log(bai2_3("how", "HELLO world"));
console.log(bai2_3("hey", "HELLO world"));
console.groupEnd();
/*
● Bài 4: Cho 1 chuỗi, kiểm tra xem chuỗi đó có phải chuỗi đối xứng hay không (đọc xuôi hay ngược
đều như nhau, không tính khoảng trắng, không phân biệt hoa thường), kết quả trả về true hoặc
false. Ví dụ ''Race car'' trả về true, ''hello world'' trả về false.
*/
console.group("bai2_4");

function bai2_4(str) {
    str = str.toLowerCase().split(" ").join("");
    // console.log(str);
    for (let i = 0; i < (str.length - 1) / 2; i++) {
        if (str[i] != str[str.length - 1 - i]) return false;
    }
    return true;
}
console.log(bai2_4("Race car"));
console.log(bai2_4("hello world"));
console.groupEnd();
console.groupEnd();
/*
Xử lý mảng
● Bài 1: Viết hàm loại bỏ các giá trị sai trong 1 mảng. Các giá trị sai bao gồm: false, null, undefined,
NaN, 0, ''''.
*/
console.group("Xử lý mảng");
console.group("bai3_1");

function bai3_1(arr) {

    return arr.reduce(function(total, value) {
        if (Number.isNaN(value)) return total;
        if (!value) return total;
        total.push(value)
        return total;
    }, []);
}
console.log(bai3_1([false, true, null, undefined, NaN, 0, "", 1, " "]));
console.groupEnd();
/*
● Bài 2: Viết hàm so sánh mảng, truyền vào 2 mảng bất kỳ, kết quả trả về là 1 mảng chỉ chứa những
phần tử không đồng thời nằm trong 2 mảng truyền vào. Ví dụ truyền vào [1, 2, 3] và [1, 3, 4, 5] thì
kết quả trả về là mảng [2, 4, 5].
*/
console.group("bai3_2");

function bai3_2(arr1, arr2) {
    return arr2.reduce(function(total, value) {
        if (arr1.indexOf(value) < 0) total.push(value);
        return total;
    }, arr1.reduce(function(total, value) {
        if (arr2.indexOf(value) < 0) total.push(value);
        return total;
    }, []));
}
console.log(bai3_2([1, 2, 3], [1, 3, 4, 5]));
console.groupEnd();
/*
● Bài 3: Cho 1 mảng các chuỗi. Viết hàm lọc ra các phần tử có độ dài lớn nhất. Ví dụ với tham số
[''aba'', ''aa'', ''ad'', ''c'', ''vcd''] thì kết quả trả về [''aba'', ''vcd''].
*/
console.group("bai3_3");

function bai3_3(arr) {
    let maxLenght = arr.reduce(function(total, value) {
        return total > value.length ? total : value.length;
    }, 0)
    return arr.reduce(function(total, value) {
        if (maxLenght <= value.length) total.push(value);
        return total;
    }, [])
}
console.log(bai3_3(["aba", "aa", "ad", "c", "vcd"]));
console.groupEnd();
/*
● Bài 4: Cho 2 số nguyên dương n và m. Tạo ra 1 mảng 2 chiều n x m là các số nguyên liên tiếp
(tính từ 1) theo kiểu ziczac. Ví dụ với n = 3 và m = 3 thì kết quả là mảng 2 chiều như sau
[ [1, 2, 3], [6, 5, 4], [7, 8, 9] ].
*/
console.group("bai3_4");

function bai3_4(n, m) {
    let result = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < m; j++) {
            row.push(i * n + j + 1);
        }
        if (i % 2 != 0) row.sort(function(a, b) {
            return b - a;
        });
        result.push(row);
    }
    return result;
}
console.log(JSON.stringify(bai3_4(3, 3)));
console.groupEnd();
console.groupEnd();
/*
Xử lý object
● Bài 1: Cho 1 object. Viết hàm kiểm tra xem object đó có phải là object rỗng hay không (không có thuộc
tính nào). Kết quả trả về true hoặc false.
● Bài 2: Cho 1 mảng các object chứa thông tin sinh viên dạng { name: ''Huy'', gender: ''Male'', age: 20 }.
Viết hàm sắp xếp lại mảng trên theo tên học viên (không phân biệt hoa thường).
● Bài 3: Cho 1 mảng các object chứa thông tin sinh viên dạng { name: ''Huy'', gender: ''Male'', age: 20 }.
Viết hàm sắp xếp lại mảng trên theo tuổi học viên từ cao đến thấp.
● Bài 4: Cho 1 mảng các object chứa thông tin sinh viên dạng { name: ''Huy'', gender: ''Male'', age: 20 }.
Viết hàm lọc ra những sinh viên nào có tên bắt đầu bằng chữ ''H'' hoặc ''h''.
● Bài 5: Cho 1 mảng các object chứa thông tin sinh viên dạng { name: ''Huy'', gender: ''Male'', age: 20 }.
Viết hàm tính ra số tuổi trung bình của toàn bộ sinh viên

Tổng hợp
● Bài 1: Cho 2 số a và b. Viết hàm giải phương trình bậc nhất dạng ax + b = 0.
● Bài 2: Cho 3 số a, b và c. Viết hàm giải phương trình bậc 2 dạng ax² + bx + c = 0.
● Bài 3: Viết hàm có 2 tham số, tham số đầu tiên là 1 chuỗi thời gian t dạng ''giờ:phút:giây'', tham số
thứ 2 là 1 số x <= 1000. Kết quả trả về là 1 chuỗi biểu thị thời gian sau x giây kể từ thời điểm t. Ví
dụ với t = ''9:20:56'' và x = 7 thì kết quả là ''9:21:3''.
● Bài 4: Một con ốc sên leo từ đáy giếng lên miệng giếng, biết ban ngày leo được x mét, ban đêm lại
bị tụt xuống y mét, hỏi sau bao nhiêu ngày thì ốc sên sẽ lên được đến miệng giếng. Viết hàm giải
bài toán trên với 3 tham số h là chiều cao của giếng, x và y như mô tả trên.
● Bài 5: Cho 1 số nguyên, hãy viết hàm sắp xếp lại các chữ số trong số nguyên đó sao cho ra 1 số
nhỏ nhất có thể (không tính số 0 đầu tiên). Ví dụ với tham số 53751 thì kết quả là 13557*/