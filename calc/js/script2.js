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
    calcResult2: function() {
        // Hàm cũ lưu để dùng lại nếu hàm mới bị lỗi
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
        else if (!Number.isNaN(resultDirect) && result.toString().length > 16) {
            // Trường hợp người dùng nhập vào 1 số rất dài dẫn đến lỗi khi chuyển đổi giữa string và number
            result = "Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác";
        } //else if (typeof result == 'number') result = result.toFixed(10);

        this.eShowResult.innerHTML = result;
        console.group("Test hàm calcResult()");
        console.log(userFormular);
        console.log(userFormularToCalculate);
        console.log(result);
        console.log("Hoàn thành test hàm calcResult()");
        console.groupEnd();
    },
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
        else if (!Number.isNaN(resultDirect) && result.toString().length > 15) {
            // Trường hợp người dùng nhập vào 1 số rất dài dẫn đến lỗi khi chuyển đổi giữa string và number
            this.delete();
            result = "Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác";
        }

        // Xử lý 0.1+0.2 = 0.3 và 0.1+0.2-0.3 = 0;
        if (typeof result == 'number' && result.toString().length > 15) {
            // console.log(result.toString());
            // console.log(result.toString().slice(0, 16));
            result = Number(result.toFixed(15).toString());
        }

        this.eShowResult.innerHTML = result;

        // console.log(userFormular);
        // console.log(userFormularToCalculate);
        // console.log(result);
        // console.log("Hoàn thành test hàm calcResult()");
    },
    addToFormular: function(objButton) {
        // method add thêm ký tự vào biểu thức toán học
        if (this.userFormularArr.length > 25) {
            this.eShowResult.innerHTML = "Công thức đã quá dài, bạn không thể viết thêm."
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

    delete: function() {
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
let btnDivide = new ObjButton('÷', '/');
btnDivide.onclick = function() {
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
    calc.delete();
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

// for (btn of btnPureOperatorArr) {
//     btn.onclick();
// }
// btnMulti.onclick();
// // btnDivide.onclick();
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

// các số 0-9
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

// số 00
document.getElementsByClassName("js-btn-pure-number__000")[0].onclick = () => {
    btnPureNumberArr[0].onclick();
    btnPureNumberArr[0].onclick();
    btnPureNumberArr[0].onclick();
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
elem.onclick = () => { btnDivide.onclick(); }

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

// console.log("Kết thúc test bước 3");


// Bước 4: add thêm các điều kiện đặc hạn chế người dùng bấm sai nút 
function passAllRequirement(inputStr, conditionArr = []) {

    this["cannot start with"] = function() {
        // không cho người dùng nhập nút này đầu tiên
        if (inputStr.length <= 0) return false;
        return true;
    }
    this["cannot after random PI ) pow2"] = function() {
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[m)>I]+/) != -1) return false;
        return true;
    }
    this["cannot after +-*/"] = function() {
        let lastDigit = inputStr.slice(-1);
        // Không cho người dùng nhập kiểu "2x/%2"
        if (["+", "-", "×", "÷", "%"].indexOf(lastDigit) != -1) return false;
        return true;
    }
    this["cannot duplicate in a number"] = function() {
        // Không cho người dùng nhập kiểu "2.3.3"
        let index = inputStr.search(/[0-9\.]+$/);
        let lastStr = inputStr.slice(index);
        if (lastStr.indexOf(".") != -1) return false;
        return true;

    }
    this["must after a number"] = function() {
        // cuối chuỗi phải là số
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[0-9]+/) == -1) return false;
        return true;
    }
    this["cannot after a number"] = function() {
        // Cuối chuỗi không phải là số 
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[0-9]+/) != -1) return false;
        return true;
    }
    this["no more than ("] = function() {
        // số lượng không nhiều hơn dấu (
        let numberOfOpen = 0;
        let arrUserFormular = inputStr.split("");
        // Số lượng dấu ")" không được nhiều hơn dấu "("
        for (value of arrUserFormular) {
            if (value == "(") numberOfOpen++;
            if (value == ")") numberOfOpen--;
        }
        if (numberOfOpen <= 0) return false;
        return true;
    }
    this["cannot after ("] = function() {
        // Cuối chuỗi không phải là (
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[(]+/) != -1) return false;
        return true;
    }
    this["cannot after ."] = function() {
        // Cuối chuỗi không phải là .
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[\.]+/) != -1) return false;
        return true;
    }
    this["cannot after pow2"] = function() {
        // Cuối chuỗi không phải là .
        let lastDigit = inputStr.slice(-1);
        if (lastDigit.search(/[>]+/) != -1) return false;
        return true;
    }
    this["cannot after [+-*/%]("] = function() {
        // Cuối chuỗi không phải là .
        let lastDigit = inputStr.slice(-2);
        if (lastDigit.search(/[+\-*\/%]\(/) != -1) return false;
        return true;
    }
    for (condition of conditionArr) {
        if (this[condition]() == false) return false;
    }
    return true;
}

function alertUser(str) {
    calc.eShowResult.innerHTML = "Phím '" + str +
        "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
}


btnPureNumberArr[0].onclick = function() {
    let requirements = ["cannot after random PI ) pow2"];
    if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
        alertUser(this.userFormular);
        return;
    }
    let userFormular = calc.userFormularArr.join('');
    calc.addToFormular.call(calc, this);

    if (passAllRequirement(userFormular, ["must after a number"])) return;
    if (!passAllRequirement(userFormular, ["cannot after ."])) return;
    calc.addToFormular.call(calc, btnDot);
};

for (btn of btnPureNumberArr.slice(1)) {
    btn.onclick = function() {
        let requirements = ["cannot after random PI ) pow2"];
        if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
            alertUser(this.userFormular);
            return;
        }
        calc.addToFormular.call(calc, this);
    };
}
for (btn of [...btnPureOperatorArr, btnMulti, btnDivide]) {
    btn.onclick = function() {
        let requirements = ["cannot start with", "cannot after (", "cannot after .",
            "cannot after +-*/"
        ];

        while (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
            // Thay operator cũ bằng operator mới
            btnDel.onclick();
            if (calc.userFormularArr.join('') == '') return
        }
        calc.addToFormular.call(calc, this);
    };
}

btnPow2.onclick = function() {
    let requirements = ["cannot start with", "cannot after (", "cannot after .", "cannot after +-*/", "cannot after pow2"];
    if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
        alertUser(this.userFormular);
        return;
    }
    calc.addToFormular.call(calc, this);
}

btnDot.onclick = function() {
    let requirements = ["cannot duplicate in a number", "must after a number"];
    if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
        alertUser(this.userFormular);
        return;
    }
    calc.addToFormular.call(calc, this);
}

for (btn of [btnAbs, btnNegative, btnRand, btnPI, btnOpen, btnSqrt, btnSin, btnCos, btnSin]) {
    btn.onclick = function() {
        let requirements = ["cannot after random PI ) pow2", "cannot after a number", "cannot after ."];
        if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
            alertUser(this.userFormular);
            return;
        }
        calc.addToFormular.call(calc, this);
    }
}

btnClose.onclick = function() {
    let requirements = ["cannot after +-*/", "no more than (", "cannot after (", "cannot after ."];
    if (!passAllRequirement(calc.userFormularArr.join(''), requirements)) {
        alertUser(this.userFormular);
        return;
    }
    calc.addToFormular.call(calc, this);
}



// btnPureNumberArr[0].onclick();
// btnPureNumberArr[1].onclick();
// btnPureOperatorArr[0].onclick();
// btnPureNumberArr[0].onclick();
// btnPureNumberArr[2].onclick();