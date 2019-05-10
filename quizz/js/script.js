/*
Luyện tập lại HTML DOM bằng cách viết 1 ứng dụng Quiz cho phép người dùng trả lời 5 - 10 câu hỏi.
 Khi người dùng trả lời xong hết thì kiểm tra kết quả, nếu người dùng trả lời đúng hết thì
 chuyển người dùng sang trang chúc mừng còn nếu sai thì thông báo và 
 hiển thị nút để người dùng chơi lại. Gợi ý: sử dụng window.location.href để chuyển trang.

Yêu cầu
- Trình bày đẹp cả trang Quiz lẫn trang chúc mừng
- Nộp bài tập lên github dưới dạng static page.
*/

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


let appStage = {
    currentStage: "quizz in progress",
    stageList: ["welcome", "quizz in progress", "view result", "review answer", "trophy page"],
    getNextStage: function() {
        let currentIndex = this.stageList.indexOf(currentStage);
        if (currentIndex < this.stageList.length - 1) {
            this.currentStage = this.stageList[currentIndex + 1];
        }
        return this.currentStage
    }
};

function randomSuffleArr(arr) {
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

function quizzInProgress() {
    console.group("quizzInProgress");
    let qArr = [q1, q2, q3, q4, q5];
    qArr = randomSuffleArr(qArr);
    let qAnswer = [];
    while (qArr.length) {
        let question = qArr.pop();
        let qAnswer = [question.a, question.b, question.c, question.d];
        console.log(qAnswer);
        qAnswer = randomSuffleArr(qAnswer);
        console.log(qAnswer);
        document.getElementsByClassName("js-question")[0].textContent = question.q;
        document.getElementsByClassName("js-answer__a")[0].textContent = qAnswer[0];
        document.getElementsByClassName("js-answer__b")[0].textContent = qAnswer[1];
        document.getElementsByClassName("js-answer__c")[0].textContent = qAnswer[2];
        document.getElementsByClassName("js-answer__d")[0].textContent = qAnswer[3];
    }
    console.groupEnd();
}

quizzInProgress();