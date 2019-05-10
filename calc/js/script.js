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
    userFormularToCalculate = userFormular.replace(/random/g, "Number(Math.random().toFixed(3))");
    userFormularToCalculate = userFormularToCalculate.replace(/<sup>2<\/sup>/g, "**2");
    userFormularToCalculate = userFormularToCalculate.replace(/PI/g, "Math.PI");
    userFormularToCalculate = userFormularToCalculate.replace(/sqrt\(/g, "Math.sqrt(");
    userFormularToCalculate = userFormularToCalculate.replace(/abs\(/g, "Math.abs(");
    userFormularToCalculate = userFormularToCalculate.replace(/sin\(/g, "Math.sin(");
    userFormularToCalculate = userFormularToCalculate.replace(/cos\(/g, "Math.cos(");
    try {
        result = eval(userFormularToCalculate);
    } catch {
        result = "Công thức toán chưa hoàn thiện";
        console.log(userFormularToCalculate);
    }

    let resultDirect = Number(userFormular);
    if (result == undefined) result = "";
    else if (!Number.isNaN(resultDirect) && userFormular != result.toString()) {
        result = "Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác";
        console.log("Giá trị nằm ngoài phạm vi chuyển đổi và tính toán chính xác")
    }
    eShowResult.innerHTML = result;
    console.group("Result:");
    console.log(userFormular);
    console.log(result);
    console.groupEnd();
}

function addToFormular() {
    let arrElemClassName = this.className.split(" ");
    if (userFormular.length > 100) {
        eShowResult.innerHTML = "Công thức đã quá dài, bạn không thể viết thêm."
        return;
    } else if (arrElemClassName.indexOf("js-btn-pure") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // không cho người dùng nhập kiểu "random2" hoặc "sqrt(2)2"
        if (lastDigit.search(/[m)>]+/) != 0) userFormular += this.textContent;
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-pure-operator") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "2x/%2"
        if (["+", "-", "x", "/", "%"].indexOf(lastDigit) < 0) userFormular += this.textContent;
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-dot") >= 0) {
        let lastStr = userFormular.slice(userFormular.search(/[0-9\.]+$/));
        // Không cho người dùng nhập kiểu "2.3.3"
        if (lastStr.indexOf(".") < 0) userFormular += this.textContent;
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-negative") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "9(-" hoặc "random(-"
        if (lastDigit.search(/[0-9m)>]+/) != 0) {
            userFormular += "(-";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-rand") >= 0) {
        let lastDigit = userFormular.slice(-1);
        // Không cho người dùng nhập kiểu "random"
        if (lastDigit.search(/[0-9m)>]+/) != 0) userFormular += "random";
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-open") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) {
            userFormular += "(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
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
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-pow2") >= 0) {
        let numberOfOpen = 0;
        let arrUserFormular = userFormular.split("");
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
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) userFormular += "PI";
        else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-sqrt") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) {
            userFormular += "sqrt(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-abs") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) {
            userFormular += "abs(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-sin") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) {
            userFormular += "sin(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    } else if (arrElemClassName.indexOf("js-btn-cos") >= 0) {
        let lastDigit = userFormular.slice(-1);
        if (lastDigit.search(/[0-9a-zA-Z)>]+/) != 0) {
            userFormular += "cos(";
        } else {
            eShowResult.innerHTML = "Phím '" + this.textContent +
                "' không phù hợp ngữ cảnh. Bạn hãy chọn phím khác";
            return;
        }
    }

    eShowUserFormular.innerHTML = userFormular;
    calcResult();
    arrDeleted = [];
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
    } else if (userFormular.endsWith(")<sup>2</sup>")) {
        arrDeleted.push(")<sup>2</sup>");
        userFormular = userFormular.slice(0, -")<sup>2</sup>".length);
    } else if (userFormular.endsWith("PI")) {
        arrDeleted.push("PI");
        userFormular = userFormular.slice(0, -"PI".length);
    } else if (userFormular.endsWith("sqrt(")) {
        arrDeleted.push("sqrt(");
        userFormular = userFormular.slice(0, -"sqrt(".length);
    } else if (userFormular.endsWith("abs(")) {
        arrDeleted.push("abs(");
        userFormular = userFormular.slice(0, -"abs(".length);
    } else if (userFormular.endsWith("sin(")) {
        arrDeleted.push("sin(");
        userFormular = userFormular.slice(0, -"sin(".length);
    } else if (userFormular.endsWith("cos(")) {
        arrDeleted.push("cos(");
        userFormular = userFormular.slice(0, -"cos(".length);
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
    "js-btn-rand", "js-btn-close", "js-btn-open", "js-btn-pow2", "js-btn-pi", "js-btn-sqrt",
    "js-btn-abs", "js-btn-sin", "js-btn-cos"
], addToFormular)





addOnlickEventHandle(["js-btn-ac"], allClear);
addOnlickEventHandle(["js-btn-del"], deletion);
addOnlickEventHandle(["js-btn-undel"], undel);