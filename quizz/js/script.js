/*
Luyện tập lại HTML DOM bằng cách viết 1 ứng dụng Quiz cho phép người dùng trả lời 5 - 10 câu hỏi.
 Khi người dùng trả lời xong hết thì kiểm tra kết quả, nếu người dùng trả lời đúng hết thì
 chuyển người dùng sang trang chúc mừng còn nếu sai thì thông báo và 
 hiển thị nút để người dùng chơi lại. Gợi ý: sử dụng window.location.href để chuyển trang.

Yêu cầu
- Trình bày đẹp cả trang Quiz lẫn trang chúc mừng
- Nộp bài tập lên github dưới dạng static page.
*/
// Bước 1. Tạo đối tượng quizz để lưu câu hỏi
function Quizz(question, a, b, c, d, answerTrue) {
    this.q = question;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.answer = answerTrue;
}

let q1 = new Quizz("Ai đang làm các chuẩn cho Web?", "W3C", "Mozilla", "Google", "Microsoft", "a");
let q2 = new Quizz("Thẻ <input type=”Submit” …> dùng để làm gì?", " Tạo một nút lệnh dùng để gửi tin trong form đi",
    "Tất cả các ý kiến trên", "Tạo một ô text để nhập dữ liệu", "Tạo một nút lệnh dùng để xoá thông tin trong form",
    "a");
let q3 = new Quizz("Thẻ HTML nào tạo ra một ô nhập dữ liệu?", "<input type='textfield'>",
    "<textinput type='text'>", "<textfield>", "<input type='text'>", "d");
let q4 = new Quizz("Đâu là mã HTML thực hiện căn lề trái cho nội dung 1 ô trong bảng",
    "<td valign='left'>", "<tdleft>", "<td leftalign>", "<td align='left'>", "d");
let q5 = new Quizz("Thẻ <input type=”Password” …> dùng để làm gì?", "Tạo một textbox cho phép nhập liệu nhiều dòng",
    "Tạo một ô text để nhập dữ liệu 1 dòng", " Tạo một ô nhập mật khẩu", "Tất cả các ý trên", "c");





// Bước 2: Tạo đối tượng là các nút bấm và hàm onclick
function Btn(value, onclick = function() {
    // console.log(this.value);
    quizzInProgress(this);
}) {

    this.value = value;
    this.onclick = onclick;
}

let btnA = new Btn("a");
let btnB = new Btn("b");
let btnC = new Btn("c");
let btnD = new Btn("d");
// Test
// btnA.onclick();
// btnA.onclick();
// btnA.onclick();
// btnA.onclick();
// btnA.onclick();

let btnReview = new Btn("review");
btnReview.onclick = function() {
    finished(undefined, this);
}
// Test
// btnReview.onclick();

let btnReplay = new Btn("replay");
btnReplay.onclick = function() {
    btnReview.onclick.call(this);
}

let btnPrev = new Btn("prev");
btnPrev.onclick = function() {
    reviewing(undefined, this);
}
let btnNext = new Btn("next");
btnNext.onclick = function() {
    reviewing(undefined, this);
}


document.getElementsByClassName("js-answer__a")[0].onclick = function() {
    btnA.onclick();

}
document.getElementsByClassName("js-answer__b")[0].onclick = function() {
    btnB.onclick();
}
document.getElementsByClassName("js-answer__c")[0].onclick = function() {
    btnC.onclick();
}
document.getElementsByClassName("js-answer__d")[0].onclick = function() {
    btnD.onclick();
}
document.getElementsByClassName("js-review")[0].onclick = function() {
    btnReview.onclick();
}
document.getElementsByClassName("js-replay")[0].onclick = function() {
    btnReplay.onclick();
}
document.getElementsByClassName("js-reviewing__prev")[0].onclick = function() {
    btnPrev.onclick();
}
document.getElementsByClassName("js-reviewing__next")[0].onclick = function() {
    btnNext.onclick();
}



// Bước 3: xử lý các trạng thái của chương trình
// Các trạng thái của chương trình: welcome, quizzInProgress, finish, review, trophy
let viewManager = {
    allStages: ["welcome", "quizzInProgress", "finished", "reviewing", "trophy"],
    currentStage: "quizzInProgress",
    manageView: function(currentStage) {

        this["quizzInProgress"] = function() {
            document.getElementsByClassName("js-quizz-in-progress")[0].style.height = "auto";
            document.getElementsByClassName("js-finished")[0].style.height = 0;
            let elem = document.getElementsByClassName("js-reviewing__prev")[0];
            elem.classList.add("answer__wrapper_display_none");
            elem.classList.remove("reviewing__button");
            elem = document.getElementsByClassName("js-reviewing__next")[0];
            elem.classList.add("answer__wrapper_display_none");
            elem.classList.remove("reviewing__button");
            document.getElementsByClassName("js-answer__a")[0].classList.remove("reviewing__button_wrong");
            document.getElementsByClassName("js-answer__b")[0].classList.remove("reviewing__button_wrong");
            document.getElementsByClassName("js-answer__c")[0].classList.remove("reviewing__button_wrong");
            document.getElementsByClassName("js-answer__d")[0].classList.remove("reviewing__button_wrong");
            document.getElementsByClassName("js-answer__a")[0].classList.remove("reviewing__button_right");
            document.getElementsByClassName("js-answer__b")[0].classList.remove("reviewing__button_right");
            document.getElementsByClassName("js-answer__c")[0].classList.remove("reviewing__button_right");
            document.getElementsByClassName("js-answer__d")[0].classList.remove("reviewing__button_right");
        }
        this["reviewing"] = function() {
            document.getElementsByClassName("js-quizz-in-progress")[0].style.height = "auto";
            document.getElementsByClassName("js-finished")[0].style.height = 0;
            let elem = document.getElementsByClassName("js-reviewing__prev")[0];
            elem.classList.remove("answer__wrapper_display_none");
            elem.classList.add("reviewing__button");
            elem = document.getElementsByClassName("js-reviewing__next")[0];
            elem.classList.remove("answer__wrapper_display_none");
            elem.classList.add("reviewing__button");
        }
        this["finished"] = function() {
            document.getElementsByClassName("js-quizz-in-progress")[0].style.height = 0;
            document.getElementsByClassName("js-finished")[0].style.height = "auto";
        }
        this["trophy"] = function() {

        }
        this.currentStage = currentStage;
        this[currentStage]();
    }
}
let quizzInProgress = (function() {
    // Hàm thực hiện các thao tác khi đang trong trạng thái làm quizz 
    // console.group("quizzInProgress");
    let qAnswer = [];
    let userAnswerArr = [];
    let question = [];
    initial();
    return function(btn) {
        if (viewManager.currentStage == "reviewing") return;
        if (viewManager.currentStage != "quizzInProgress") {
            initial();
            return;
        }

        let value = btn.value
        userAnswerArr.push({ question, qAnswer, userAnswer: btn.value })
        question = qArr.pop();

        if (question == undefined) {
            finished(userAnswerArr);
            return;
        }
        qAnswer = [question.a, question.b, question.c, question.d];
        qAnswer = randomSuffleArr(qAnswer);
        showQuizz(question, qAnswer);

        console.log({ userAnswerArr });


    }

    function showQuizz(question, qAnswer) {
        // console.log({ qAnswer });
        document.getElementsByClassName("js-question")[0].textContent = question.q;
        document.getElementsByClassName("js-answer__a")[0].textContent = qAnswer[0];
        document.getElementsByClassName("js-answer__b")[0].textContent = qAnswer[1];
        document.getElementsByClassName("js-answer__c")[0].textContent = qAnswer[2];
        document.getElementsByClassName("js-answer__d")[0].textContent = qAnswer[3];
    }

    function initial() {

        viewManager.manageView("quizzInProgress");

        qArr = [q1, q2, q3, q4, q5];
        //qArr = [q1, q2];
        qArr = randomSuffleArr(qArr);
        qAnswer = [];
        userAnswerArr = [];
        question = qArr.pop();
        qAnswer = [question.a, question.b, question.c, question.d];
        // console.log(qAnswer);
        qAnswer = randomSuffleArr(qAnswer);
        showQuizz(question, qAnswer);
    }

    function randomSuffleArr(arr) {
        // Hàm đảo thứ tự ngẫu nhiên 1 chuỗi.
        console.group("randomSuffleArr");
        let nArr = arr.slice();
        let result = [];
        let count = 0;
        while (nArr.length > 0) {
            let random = Math.floor(Math.random() * nArr.length);
            let item = nArr.splice(random, 1);
            result.push(...item);
        }
        console.groupEnd();
        return result;
    }
    // console.groupEnd();
})();

let finished = function(userAnswerArr, btn = undefined) {
    this["replay"] = function() {
        if (viewManager.currentStage != "finished") return;
        quizzInProgress();
    }
    this["review"] = function() {
        if (viewManager.currentStage != "finished") return;
        reviewing(this.userAnswerArr);
    }
    if (btn == undefined) {
        viewManager.manageView("finished");
        this.userAnswerArr = userAnswerArr;
        let countRightAnswer = 0;
        for (each of this.userAnswerArr) {
            let userAnswer = convertUserAnswer(each.qAnswer, each.userAnswer);
            let answerTrue = each.question[each.question.answer]
            console.log({ userAnswer, answerTrue })
            if (userAnswer == answerTrue) {
                countRightAnswer++;
            }

        }
        if (countRightAnswer == this.userAnswerArr.length) {
            trophy();
        }
        document.getElementsByClassName("js-result")[0].textContent = `Bạn đã trả lời đúng ${countRightAnswer}
        trên ${userAnswerArr.length} câu hỏi`
    } else this[btn.value]();

    function convertUserAnswer(qAnswer, userAnswer) {
        switch (userAnswer) {
            case "a":
                return qAnswer[0];
            case "b":
                return qAnswer[1];
            case "c":
                return qAnswer[2];
            case "d":
                return qAnswer[3];
            default:
                return undefined;
        }
    }
}

function reviewing(userAnswerArr, btn) {
    this["next"] = function() {
        if (viewManager.currentStage != "reviewing") return;
        this.currentQuestion++;
        if (this.currentQuestion >= this.userAnswerArr.length) {
            finished(this.userAnswerArr);
            this.currentQuestion--;
            return
        }
    }
    this["prev"] = function() {
        if (viewManager.currentStage != "reviewing") return;
        if (this.currentQuestion > 0) this.currentQuestion--;
    }

    if (btn == undefined) {
        viewManager.manageView("reviewing");
        this.userAnswerArr = userAnswerArr;
        this.currentQuestion = 0;

    } else this[btn.value]();
    showQuizz();



    function showQuizz() {
        let userAnswerResult = this.userAnswerArr[this.currentQuestion];
        let question = userAnswerResult.question;
        let qAnswer = userAnswerResult.qAnswer;
        let userAnswer = userAnswerResult.userAnswer;
        document.getElementsByClassName("js-question")[0].textContent = question.q;
        document.getElementsByClassName("js-answer__a")[0].textContent = qAnswer[0];
        document.getElementsByClassName("js-answer__b")[0].textContent = qAnswer[1];
        document.getElementsByClassName("js-answer__c")[0].textContent = qAnswer[2];
        document.getElementsByClassName("js-answer__d")[0].textContent = qAnswer[3];
        for (each of ["a", "b", "c", "d"]) {
            colorButton(each, "remove", "red");
            colorButton(each, "remove", "green")
        }
        colorButton(userAnswer, "add", "red");
        colorButton(convertTrueAnswer(question, qAnswer), "add", "green");

    }

    function colorButton(button, action, color) {
        this["add"] = function() {
            if (color == "red")
                document.getElementsByClassName("js-answer__" + button)[0].classList.add("reviewing__button_wrong");
            else if (color == "green")
                document.getElementsByClassName("js-answer__" + button)[0].classList.add("reviewing__button_right");
        }
        this["remove"] = function() {
            if (color == "red")
                document.getElementsByClassName("js-answer__" + button)[0].classList.remove("reviewing__button_wrong");
            else if (color == "green")
                document.getElementsByClassName("js-answer__" + button)[0].classList.remove("reviewing__button_right");
        }
        this[action]();
    }

    function convertTrueAnswer(question, qAnswer) {
        let answerTrue = question[question.answer];
        switch (answerTrue) {
            case qAnswer[0]:
                return "a";
            case qAnswer[1]:
                return "b";
            case qAnswer[2]:
                return "c";
            case qAnswer[3]:
                return "d";
            default:
                return undefined;
        }
    }

}

function trophy() {
    location.href = "trophy.html";
}