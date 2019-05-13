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

// Bước 2: Tạo đối tượng là các nút bấm
function Btn(value, onclick = function() {
    // console.log(this.value);
    quizzInProgress(this.value);
}) {

    this.value = value;
    this.onclick = onclick;
}

let btnA = new Btn("a");
let btnB = new Btn("b");
let btnC = new Btn("c");
let btnD = new Btn("d");


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

// Bước 3: xử lý các trạng thái của chương trình
// Các trạng thái của chương trình: welcome, quizzInProgress, finish, review, trophy
let programStage = {
    allStages: ["welcome", "quizzInProgress", "finish", "review", "trophy"],
    currentStage: "quizzInProgress"
}
let quizzInProgress = (function() {
    // this[programStage.currentStage] = (function() {
    // Hàm thực hiện các thao tác khi đang trong trạng thái làm quizz 
    console.group("quizzInProgress");
    qArr = [q1, q2, q3, q4, q5];
    qArr = randomSuffleArr(qArr);
    let qAnswer = [];
    let userAnswerArr = [];
    let question = qArr.pop();
    showQuizz(question);
    return function(btn) {
        console.log(qArr.length);
        if (programStage.currentStage == "quizzInProgress") {
            userAnswerArr.push({ question, btn })
            question = qArr.pop();
        }
        if (question != undefined)
            showQuizz(question);
        else {
            programStage.currentStage = "finish";
            finish(userAnswerArr);
        }
        console.log({ userAnswerArr });
    }

    function showQuizz(question) {
        let qAnswer = [question.a, question.b, question.c, question.d];
        // console.log(qAnswer);
        qAnswer = randomSuffleArr(qAnswer);
        console.log({ qAnswer });
        document.getElementsByClassName("js-question")[0].textContent = question.q;
        document.getElementsByClassName("js-answer__a")[0].textContent = qAnswer[0];
        document.getElementsByClassName("js-answer__b")[0].textContent = qAnswer[1];
        document.getElementsByClassName("js-answer__c")[0].textContent = qAnswer[2];
        document.getElementsByClassName("js-answer__d")[0].textContent = qAnswer[3];
    }
    console.groupEnd();
})();

function finish(userAnswerArr, btn) {
    document.getElementsByClassName("js-quizz-in-progress")[0].style.display = "none";
}

btnA.onclick();
btnA.onclick();
btnA.onclick();
btnA.onclick();
btnA.onclick();