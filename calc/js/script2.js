/*Bài tập

Viết ứng dụng Calculator có các chức năng sau:

Có 1 ô để người dùng nhập dữ liệu và hiển thị kết quả.
Có các nút +, −, ×, ÷, %, =, dấu chấm (số thập phân) và các số từ 0 đến 9, để giúp người dùng tính toán các phép tính cơ bản như 1 chiếc máy tính cầm tay.
Có thêm 1 số nút để thực hiện các phép tính nâng cao như: bình phương, giai thừa, căn bậc 2, ...
Có nút để reset phép tính về như lúc ban đầu khi chưa thực hiện phép tính nào (không reload lại trang web).*/

// Thực hiện lại phần code theo phương thức hướng đối tượng
// Bước 1: Tạo lớp đối tượng đại diện cho nút và đối tượng đại diện cho máy tính
function ObjButton(userFormular, userFormularToCalculate) {
    // Obj constructor đại diện cho các nút bấm
    this.userFormular = userFormular;
    this.userFormularToCalculate = userFormularToCalculate;
    this.onclick = function() {

    }
}

let calc = {
    // obj đại diện cho máy tính
    // Biến lưu biểu thức toán học người dùng nhập vào
    userFormularArr: [],
    // Biến lưu biểu thức toán học dùng để tính kết quả
    userFormularToCalculateArr: [],
    // Biến lưu element hiển thị cho người dùng
    eShowUserFormular: document.getElementsByClassName('js-show__user-formular')[0],
    eShowResult: document.getElementsByClassName("js-show-result")[0],
    // Biến lưu lịch sử delete của người dùng
    arrDeleted: [],
    calcResult: function() {
        // hàm tính toán kết quả dựa vào biểu thức toán học người dùng nhập vào và hiển thị ra element
        let result = '';
        let userFormular = this.userFormularArr.join('');
        let userFormularToCalculate = this.userFormularToCalculateArr.join('');
        try {
            result = eval(userFormularToCalculate);
        } catch {
            result = "Công thức toán chưa hoàn thiện";

        }
        let resultDirect = Number(userFormular);
        if (result == undefined) result = "";
        else if (!Number.isNaN(resultDirect) && result.toString().length > 10) {
            // Trường hợp người dùng nhập vào 1 số rất dài dẫn đến lỗi khi chuyển đổi giữa string và number
            result = "Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác";
            console.log("Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác")
        } //else if (typeof result == 'number') result = result.toFixed(10);

        this.eShowResult.innerHTML = result;
        console.group("Test hàm calcResult()");
        console.log(userFormular);
        console.log(userFormularToCalculate);
        console.log(result);
        console.log("Hoàn thành test hàm calcResult()");
        console.groupEnd();
    },
    addToFormular: function(objButton) {
        // method add thêm ký tự vào biểu thức toán học
        if (this.userFormularArr.length > 100) {
            eShowResult.innerHTML = "Công thức đã quá dài, bạn không thể viết thêm."
            return;
        }
        this.userFormularArr.push(objButton.userFormular);
        this.userFormularToCalculateArr.push(objButton.userFormularToCalculate);
        this.eShowUserFormular.innerHTML = this.userFormularArr.join('');
        this.calcResult();
    },
    reset: function() {
        // Hàm reset calculator
        this.userFormularArr = [];
        this.eShowUserFormular.innerHTML = this.userFormularArr.join("");
        this.userFormularToCalculateArr = [];
        this.arrDeleted = [];
        this.calcResult();
    },

    deletion: function() {
        // Hàm xóa dần biểu thức toán học từ cuối
        if (this.userFormularArr.length > 0) {
            let objButtonToDel = new ObjButton(this.userFormularArr.pop(), this.userFormularToCalculateArr.pop());
            this.arrDeleted.push(objButtonToDel);
            this.eShowUserFormular.innerHTML = this.userFormularArr.join('');
            this.calcResult();
        }
    },
    undel: function() {
        // hàm phục hồi giá trị vừa xóa
        if (this.arrDeleted.length > 0) {
            this.addToFormular(this.arrDeleted.pop());
        }
    }
}

// Test object đại diện cho máy tính
// console.group('Test bước 1');
// let objButtonArr = [new ObjButton('1', '1'), new ObjButton('+', '+'), new ObjButton('3', '3')]
// for (let i = 0; i < objButtonArr.length; i++) {
//     calc.addToFormular(objButtonArr[i]);
// }
// console.log('Hoàn thành test bước 1');
// console.groupEnd();

// Bước 2: Tạo các object đại diện cho các nút bấm
// Các số 0-9
let btnPureNumberArr = [];
for (let i = 0; i < 10; i++) {
    let objBtn = new ObjButton(i.toString(), i.toString());
    objBtn.onclick = function() {
        calc.addToFormular.call(calc, this);
    }
    btnPureNumberArr.push(objBtn);
}
// Số 00
let objBtn = new ObjButton('00', '00');
objBtn.onclick = function() {
    calc.addToFormular.call(calc, this);
}
btnPureNumberArr.push(objBtn);
// Các phép toán +,-,&
let btnPureOperatorArr = []
for (btn of ['+', '-', '%']) {
    let objBtn = new ObjButton(btn, btn);
    objBtn.onclick = function() {
        calc.addToFormular.call(calc, this);
    };
    btnPureOperatorArr.push(objBtn);
}
// Phép toán *
let btnMulti = new ObjButton('×', '*');
btnMulti.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Phép toán /
let btnDevide = new ObjButton('÷', '/');
btnDevide.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Dấu '.'
let btnDot = new ObjButton('.', '.');
btnDot.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Dấu '(-'
let btnNegative = new ObjButton('(-', '(-');
btnNegative.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Dấu '('
let btnOpen = new ObjButton('(', '(');
btnOpen.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Dấu ')'
let btnClose = new ObjButton(')', ')');
btnClose.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Số 'random'
let btnRand = new ObjButton('random', 'Math.random().toFixed(3)');
btnRand.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Nút del
let btnDel = new ObjButton('', '');
btnDel.onclick = function() {
    calc.deletion();
};
// Nút undel
let btnUndel = new ObjButton('', '');
btnUndel.onclick = function() {
    calc.undel();
};
// Nút all clear
let btnAc = new ObjButton('', '');
btnAc.onclick = function() {
    calc.reset();
};
// Số 'PI'
let btnPI = new ObjButton('PI', 'Math.PI');
btnPI.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Hàm pow 2
let btnPow2 = new ObjButton('<sup>2</sup>', '**2');
btnPow2.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Hàm sqrt()
let btnSqrt = new ObjButton('√(', 'Math.sqrt(');
btnSqrt.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Hàm Abs()
let btnAbs = new ObjButton('abs(', 'Math.abs(');
btnAbs.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Hàm Sin()
let btnSin = new ObjButton('sin(', 'Math.sin(');
btnSin.onclick = function() {
    calc.addToFormular.call(calc, this);
};
// Hàm Cos()
let btnCos = new ObjButton('cos(', 'Math.cos(');
btnCos.onclick = function() {
    calc.addToFormular.call(calc, this);
};

// Test bước 2
// console.group("Test bước 2");

// for (btn of btnPureNumberArr) {
//     btn.onclick();
// }

// // for (btn of btnPureOperatorArr) {
// //     btn.onclick();
// // }
// btnMulti.onclick();
// // btnDevide.onclick();
// // btnDot.onclick();
// // btnNegative.onclick();
// // btnOpen.onclick();
// // btnClose.onclick();
// btnRand.onclick();

// btnUndel.onclick();
// btnAc.onclick();
// btnSqrt.onclick();
// btnDel.onclick();
// // btnAbs.onclick();
// // btnSin.onclick();
// btnCos.onclick();
// btnPI.onclick();
// btnClose.onclick();
// // btnPow2.onclick();

// console.log('Hoàn thành test bước 2');
// console.groupEnd();

// Bước 3: Add sự kiện onclick vào các element tương ứng
console.group("Test bước 3: Add sự kiện onclick")

// các số 0-9, 00
var elems = document.getElementsByClassName("js-btn-pure-number");
for (elem of elems) {
    for (i in btnPureNumberArr) {
        let btn = btnPureNumberArr[i];
        if (elem.innerHTML == btn.userFormular) {
            elem.onclick = () => {
                btn.onclick();
            }
        }
    }
}
// phép toán +, -, %
elems = document.getElementsByClassName("js-btn-pure-operator");
for (elem of elems) {
    for (i in btnPureOperatorArr) {
        let btn = btnPureOperatorArr[i];
        if (elem.innerHTML == btn.userFormular) {
            elem.onclick = () => {
                btn.onclick();
            }
        }
    }
}
// phép toán *, /
var elem = document.getElementsByClassName("js-btn-multi")[0];
elem.onclick = () => { btnMulti.onclick(); }
var elem = document.getElementsByClassName("js-btn-divide")[0];
elem.onclick = () => { btnDevide.onclick(); }

var elem = document.getElementsByClassName("js-btn-dot")[0];
elem.onclick = () => { btnDot.onclick(); }
var elem = document.getElementsByClassName("js-btn-negative")[0];
elem.onclick = () => { btnNegative.onclick(); }
var elem = document.getElementsByClassName("js-btn-open")[0];
elem.onclick = () => { btnOpen.onclick(); }
var elem = document.getElementsByClassName("js-btn-close")[0];
elem.onclick = () => { btnClose.onclick(); }
var elem = document.getElementsByClassName("js-btn-rand")[0];
elem.onclick = () => { btnRand.onclick(); }
var elem = document.getElementsByClassName("js-btn-undel")[0];
elem.onclick = () => { btnUndel.onclick(); }
var elem = document.getElementsByClassName("js-btn-del")[0];
elem.onclick = () => { btnDel.onclick(); }
var elem = document.getElementsByClassName("js-btn-ac")[0];
elem.onclick = () => { btnAc.onclick(); }
var elem = document.getElementsByClassName("js-btn-pow2")[0];
elem.onclick = () => { btnPow2.onclick(); }
var elem = document.getElementsByClassName("js-btn-pi")[0];
elem.onclick = () => { btnPI.onclick(); }
var elem = document.getElementsByClassName("js-btn-sqrt")[0];
elem.onclick = () => { btnSqrt.onclick(); }
var elem = document.getElementsByClassName("js-btn-abs")[0];
elem.onclick = () => { btnAbs.onclick(); }
var elem = document.getElementsByClassName("js-btn-sin")[0];
elem.onclick = () => { btnSin.onclick(); }
var elem = document.getElementsByClassName("js-btn-cos")[0];
elem.onclick = () => { btnCos.onclick(); }

console.log("Kết thúc test bước 3");
console.groupEnd();


// Bước 4: add thêm các điều kiện đặc hạn chế người dùng bấm sai nút 
function passAllRequirement(inputStr, conditionArr = []) {

    var requirementName = "testTrue";
    this[requirementName] = function() {
        return true;
    }
    var requirementName = "testFalse";
    this[requirementName] = function() {
        return false;
    }

    for (condition of conditionArr) {
        if (this[condition]() == false) return false;
    }
    return true;
}

console.log(passAllRequirement("test string", ["testTrue", "testFalse"]));

for (btn of btnPureNumberArr) {
    btn.onclick = function() {

        calc.addToFormular.call(calc, this);
    };
}

function addToFormular() {
    // Hàm xác định nút người dùng bấm và add vào biểu thức toán học
    let arrElemClassName = this.className.split(" ");
    if (arrElemClassName.indexOf("js-btn-pure-number") >= 0) {
        // xác định nút bấm thông qua class
        let lastDigit = userFormular.slice(-1);
        // không cho người dùng nhập kiểu "random2" hoặc "sqrt(2)2"
        if (lastDigit.search(/[m)>I]+/) != 0) userFormular += this.textContent;
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-pure-operator") >= 0) {
        // Không cho người dùng nhập kiểu "%3"
        if (userFormular.length == 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let index = userFormular.search(/[(+\-*÷%\.]+$/);
        // Nếu cuối chuỗi là "(-" thì không ")"
        if (index >= 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "2x/%2"
        if (["+", "-", "*", "÷", "%"].indexOf(lastDigit) > 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }

        userFormular += this.textContent;
    } else if (arrElemClassName.indexOf("js-btn-multi") >= 0) {
        let index = userFormular.search(/[(+\-*÷%\.]+$/);
        // Nếu cuối chuỗi là "(-" thì không "*"
        if (index >= 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        // Không cho người dùng nhập kiểu "*3"
        if (userFormular.length == 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "2x/%2"
        if (["+", "-", "*", "÷", "%"].indexOf(lastDigit) < 0) userFormular += this.textContent;
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-dot") >= 0) {
        let index = userFormular.search(/[0-9\.]+$/);
        let lastStr = userFormular.slice(index);
        // Nếu cuối chuỗi không phải là số thì không nhập dâu "."
        if (index < 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        // Không cho người dùng nhập kiểu "2.3.3"
        if (lastStr.indexOf(".") >= 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let lastDigit = userFormular.slice(-1);

        userFormular += this.textContent;
    } else if (arrElemClassName.indexOf("js-btn-negative") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9(-" hoặc "random(-"
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "(-";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-rand") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "randomrandom" hoặc "9random"
        if (lastDigit.search(/[0-9m)>I]+/) != 0) userFormular += "random";
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-open") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9(" hoặc "random("..
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-close") >= 0) {
        let index = userFormular.search(/[(+\-*÷%\.]+$/);
        // Nếu cuối chuỗi là "(-" thì không ")"
        if (index >= 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let numberOfOpen = 0;
        let arrUserFormular = userFormular.split("");
        // Số lượng dấu ")" không được nhiều hơn dấu "("
        for (value of arrUserFormular) {
            if (value == "(") numberOfOpen++;
            if (value == ")") numberOfOpen--;
        }
        if (numberOfOpen > 0) {
            userFormular += ")";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-pow2") >= 0) {
        let index = userFormular.search(/[(+\-*÷%\.]+$/);
        // Nếu cuối chuỗi là "(-" thì không ")**2"
        if (index >= 0) {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
        let numberOfOpen = 0;
        let arrUserFormular = userFormular.split("");
        // Số lượng dấu ")**2" không được nhiều hơn dấu "("
        for (value of arrUserFormular) {
            if (value == "(") numberOfOpen++;
            if (value == ")") numberOfOpen--;
        }
        if (numberOfOpen > 0) {
            userFormular += ")<sup>2</sup>";
        } else {
            eShowResult.innerHTML = "Phím '" + ")<sup>2</sup>" +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-pi") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9PI" hoặc "randomPI"
        if (lastDigit.search(/[0-9m)>I]+/) != 0) userFormular += "PI";
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-sqrt") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9sqrt(" hoặc "randomsqrt("
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "sqrt(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-abs") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9abs(" hoặc "randomabs("
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "abs(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-sin") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9sin(" hoặc "randomsin("
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "sin(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-cos") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9cos(" hoặc "randomcos("
        if (lastDigit.search(/[0-9m)>I]+/) != 0) {
            userFormular += "cos(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    }


}

// console.log(eval('0111'));