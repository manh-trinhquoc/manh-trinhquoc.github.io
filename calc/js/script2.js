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
        else if (!Number.isNaN(resultDirect) && userFormular != result.toString()) {
            // Trường hợp người dùng nhập vào 1 số rất dài dẫn đến lỗi khi chuyển đổi giữa string và number
            result = "Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác";
            console.log("Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác")
        } else if (typeof result == "number" && result.toString().length > 10) {
            // Trường hợp kết quả là số thực quá dài dẫn đến lỗi khi chuyển đổi giữa string và number
            result = result.toString().slice(0, 10);
        }
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
        this.eShowUserFormular.innerHTML = userFormularArr.join("");
        this.userFormularToCalculateArr = [];
        this.arrDeleted = [];
        this.calcResult();
    },

    deletion: function() {
        // Hàm xóa dần biểu thức toán học từ cuối
        if (this.userFormularArr.length > 0) {
            let objButtonToDel = new ObjButton(this.userFormularArr.pop(), this.userFormularToCalculateArr.pop());
            this.arrDeleted.push(objButtonToDel);
            this.addToFormular(new ObjButton('', ''))
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

// Test bước 2
console.group("Test bước 2");

for (btn of btnPureNumberArr) {
    btn.onclick();
}

// for (btn of btnPureOperatorArr) {
//     btn.onclick();
// }
btnMulti.onclick();
// btnDevide.onclick();
// btnDot.onclick();
// btnNegative.onclick();
// btnOpen.onclick();
// btnClose.onclick();
btnRand.onclick();
btnDel.onclick();
btnUndel.onclick();

console.log('Hoàn thành test bước 2');
console.groupEnd();


// 
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

function addOnlickEventHandle(arrClassName, functionDefinition) {
    // Hàm add sự kiện bấm nút vào element tương ứng
    for (className of arrClassName) {
        let elems = document.getElementsByClassName(className);
        for (let i = 0; i < elems.length; i++) {
            elems[i].onclick = functionDefinition;
        }
    }
}





// Thêm sự kiện vào các element tương ứng
addOnlickEventHandle(["js-btn-pure-number", "js-btn-pure-operator", "js-btn-multi",
    "js-btn-dot", "js-btn-negative",
    "js-btn-rand", "js-btn-close", "js-btn-open", "js-btn-pow2", "js-btn-pi", "js-btn-sqrt",
    "js-btn-abs", "js-btn-sin", "js-btn-cos"
], addToFormular)
// addOnlickEventHandle(["js-btn-ac"], allClear);
// addOnlickEventHandle(["js-btn-del"], deletion);
// addOnlickEventHandle(["js-btn-undel"], undel);