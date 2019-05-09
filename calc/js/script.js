/*Bài tập

Viết ứng dụng Calculator có các chức năng sau:

Có 1 ô để người dùng nhập dữ liệu và hiển thị kết quả.
Có các nút +, −, ×, ÷, %, =, dấu chấm (số thập phân) và các số từ 0 đến 9, để giúp người dùng tính toán các phép tính cơ bản như 1 chiếc máy tính cầm tay.
Có thêm 1 số nút để thực hiện các phép tính nâng cao như: bình phương, giai thừa, căn bậc 2, ...
Có nút để reset phép tính về như lúc ban đầu khi chưa thực hiện phép tính nào (không reload lại trang web).*/
let userFormular = '';
let userFormularToCalculate = '';
let eShowUserFormular = document.getElementsByClassName('js-show__user-formular')[0];
let eShowResult = document.getElementsByClassName("js-show-result")[0];
let arrDeleted = [];

function calcResult() {
    let result = '';
    userFormularToCalculate = userFormular.replace(/random/g, "Math.random()");
    try {
        result = eval(userFormularToCalculate);
    } catch {
        result = "Công thức chưa hoàn thiện";
    }
    if (result == undefined) result = "";
    eShowResult.innerHTML = result;
}

function addToFormular() {
    let arrElemClassName = this.className.split(" ");
    if (arrElemClassName.indexOf("js-btn-pure") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[a-z)]+/) != 0) userFormular += this.textContent;
    } else if (arrElemClassName.indexOf("js-btn-pure-operator") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (["+", "-", "*", "/", "%"].indexOf(lastDigit) < 0) userFormular += this.textContent;
    } else if (arrElemClassName.indexOf("js-btn-dot") >= 0) {
        let lastStr = userFormular.slice(userFormular.search(/[0-9\.)]+$/));
        if (lastStr.indexOf(".") < 0) userFormular += this.textContent;
    } else if (arrElemClassName.indexOf("js-btn-negative") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-z)]+/) != 0) {
            userFormular += "(-";
        }
    } else if (arrElemClassName.indexOf("js-btn-rand") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-z)]+/) != 0) userFormular += "random";
    } else if (arrElemClassName.indexOf("js-btn-open") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-z)]+/) != 0) {
            userFormular += "(";
        }
    } else if (arrElemClassName.indexOf("js-btn-close") >= 0) {
        let numberOfOpen = 0;
        let arrUserFormular = userFormular.split("");
        for (value of arrUserFormular) {
            if (value == "(") numberOfOpen++;
            if (value == ")") numberOfOpen--;
        }
        if (numberOfOpen > 0) {
            userFormular += ")";
        }
    }

    eShowUserFormular.innerHTML = userFormular;
    calcResult();
}

function addOnlickEventHandle(arrClassName, functionDefinition) {
    for (className of arrClassName) {
        let elems = document.getElementsByClassName(className);
        for (let i = 0; i < elems.length; i++) {
            elems[i].onclick = functionDefinition;
        }
    }
}

function allClear() {
    userFormular = '';
    eShowUserFormular.innerHTML = userFormular;
    userFormularToCalculate = '';
    arrDeleted = [];
    calcResult();
}

function deletion() {
    let arrUserFormular = userFormular.split("");
    if (userFormular.endsWith("random")) {
        arrDeleted.push("random");
        userFormular = userFormular.slice(0, -"random".length);
    } else if (arrUserFormular.length > 0) {
        arrDeleted.push(arrUserFormular.pop());
        userFormular = arrUserFormular.join("");
    }

    eShowUserFormular.innerHTML = userFormular;
    calcResult();
}

function undel() {
    if (arrDeleted.length > 0) userFormular += arrDeleted.pop();
    eShowUserFormular.innerHTML = userFormular;
    calcResult();
}

addOnlickEventHandle(["js-btn-pure", "js-btn-pure-operator", "js-btn-dot", "js-btn-negative",
    "js-btn-rand", "js-btn-close", "js-btn-open"
], addToFormular)





addOnlickEventHandle(["js-btn-ac"], allClear);
addOnlickEventHandle(["js-btn-del"], deletion);
addOnlickEventHandle(["js-btn-undel"], undel);