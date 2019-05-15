/*
Bài tập

Tạo trang Đăng ký tài khoản cho phép người dùng tạo tài khoản với các thông tin sau: 
Họ tên, ngày sinh, giới tính, địa chỉ, điện thoại, email, mật khẩu.

Yêu cầu

- Giao diện đẹp, rõ ràng.

- Khi người dùng bấm vào nút đăng ký thì chuyển qua trang thông báo đăng ký thành công, 
đồng thời hiển thị lại thông tin tài khoản người dùng (trường nào rỗng thì để trống).

Gợi ý

Khi truyền thông tin qua URL, sẽ có những giá trị đặc biệt bị encode cho hợp lệ 
ví dụ như dấu cách (khoảng trắng) sẽ bị convert thành %20. Để lấy được giá trị ban đầu 
ta sử dụng function decodeURIComponent(), ngược lại với nó là function encodeURIComponent()
*/

/*
Bài tập

Bổ sung thêm thông tin và validate cho trang Đăng ký tài khoản

Yêu cầu

Bổ sung thêm các trường: Số điện thoại, địa chỉ Facebook và kiểm tra tính hợp lệ 
của tất cả các trường trước khi người dùng đăng ký.
Khi người dùng bấm vào nút đăng ký nếu hợp lệ thì chuyển qua trang thông báo đăng ký thành công, 
đồng thời hiển thị lại thông tin tài khoản người dùng. Nếu người dùng nhập thông tin không hợp lệ 
thì thông báo những trường họ nhập sai và gợi ý thông tin cần nhập.
Giao diện đẹp, rõ ràng.
*/

let date = '<option value="date">Ngày </option>';
for (let i = 1; i <= 31; i++) {
    date += `<option value="${i}">${i}</option>`;
}
let month = '<option value="month">Tháng</option>';
for (let i = 1; i <= 12; i++) {
    month += `<option value="${i}">Tháng: ${i}</option>`;
}
let year = '<option value="year">Năm</option>';
for (let i = 2019; i >= 1905; i--) {
    year += `<option value="${i}">${i}</option>`;
}
document.getElementById('date').innerHTML = date;
document.getElementById('month').innerHTML = month;
document.getElementById('year').innerHTML = year;

// Khai báo các đối tượng đại diện cho element thông báo invalid
function InvalidElement() {
    this.bind = function(elementID) {
        this.element = document.getElementById(elementID);
        console.assert(this.element, `fail to bind element width ID "${elementID}"`);
    }
    this.show = function(str) {
        this.element.removeAttribute("hidden");
        this.element.textContent = str;
    }
    this.hide = function() {
        this.element.setAttribute("hidden", "")
    }
}

let elemInvalidPhoneNumber = new InvalidElement();
elemInvalidPhoneNumber.bind("phonenumber-invalid");

let elemInvalidEmail = new InvalidElement();
elemInvalidEmail.bind("email-invalid");

let elemInvalidPassword = new InvalidElement();
elemInvalidPassword.bind("password-invalid");

let elemInvalidDateOfBirth = new InvalidElement();
elemInvalidDateOfBirth.bind("date-of-birth-invalid");

let elemInvalidGender = new InvalidElement();
elemInvalidGender.bind("gender-invalid");

// Khai báo các đối tượng đại diện cho element input
function InputElement() {
    this.bind = function(elementID) {
        this.element = document.getElementById(elementID);
        console.assert(this.element, `fail to bind element width ID "${elementID}"`);
    }
}

let elemInputPhoneNumber = new InputElement();
elemInputPhoneNumber.bind('phonenumber');
elemInputPhoneNumber.validate = function() {
    let phoneNumber = this.element.value;
    let match = phoneNumber.match(/[0-9]{6,10}/g);
    if (match == null || match.length > 1) {
        elemInvalidPhoneNumber.show("phone number should be 0-9 and between 6-10 digit");
        return false;
    }
    elemInvalidPhoneNumber.hide();
    return true
}

let elemInputEmail = new InputElement();
elemInputEmail.bind('email');
elemInputEmail.validate = function(testStr) {
    let email = this.element.value;
    if (testStr) {
        email = testStr;
        console.group("elemInputEmail validate");

    }
    // let match = email.match(/^((?>[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+\x20*|"((?=[\x01-\x7f]) [ ^ "\\]|\\[\x01-\x7f])*"\x20*)*( ? <angle><))?((?!\.)(?>\.?[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+)+|"((?=[\x01-\x7f])[^"\\]|\\[\x01-\x7f])*")@(((?!-)[a-zA-Z\d\-]+(?<!-)\.)+[a-zA-Z]{2,}|\[(((?(?<!\[)\.)(25[0-5]|2[0-4]\d|[01]?\d?\d)){4}|[a-zA-Z\d\-]*[a-zA-Z\d]:((?=[\x01-\x7f])[^\\\[\]]|\\[\x01-\x7f])+)\])(?(angle)>)$/g);
    let match = email.match(/^\S+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g);
    if (testStr) {
        console.log({ email, match });
        console.groupEnd();
    }
    if (match == null || match.length > 1) {
        elemInvalidEmail.show("email address do not match normal form");
        return false;
    }
    elemInvalidEmail.hide();
    return true
}

// elemInputEmail.validate("ass@a");

let elemInputPassword = new InputElement();
elemInputPassword.bind('password');
elemInputPassword.validate = function() {
    let password = this.element.value;
    if (password.length < 6) {
        elemInvalidPassword.show("password should not shorter than 6 character");
        return false;
    }
    elemInvalidPassword.hide();
    return true
}


function validateForm() {
    if (!elemInputPhoneNumber.validate()) return false;
    if (!elemInputEmail.validate()) return false;
    if (!elemInputPassword.validate()) return false;
    return true;
}