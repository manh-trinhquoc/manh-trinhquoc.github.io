/*
Validate mật khẩu: Dài hơn 8 ký tự, phải có lớn hơn 1 chữ Hoa, phải có số, không có các ký tự đặc biệt
*/

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



let elemInvalidPassword = new InvalidElement();
elemInvalidPassword.bind("password-invalid");



// Khai báo các đối tượng đại diện cho element input
function InputElement() {
    this.bind = function(elementID) {
        this.element = document.getElementById(elementID);
        console.assert(this.element, `fail to bind element width ID "${elementID}"`);
    }
}


let elemInputPassword = new InputElement();
elemInputPassword.bind('password');
elemInputPassword.validate = function(testCase) {
    let password;
    if (typeof testCase == 'string') password = testCase;
    else password = this.element.value;
    if (password.length < 8) {
        elemInvalidPassword.show("password should not shorter than 8 character");
        return false;
    }
    // var patt = new RegExp("[A-Z]+");
    if (!/[A-Z]+/.test(password)) return false;
    if (!/[0-9]+/.test(password)) return false;
    if (/[^a-zA-Z0-9]+/.test(password)) return false;

    elemInvalidPassword.hide();
    return true
}


// Test case: 
/*Một số test case: 
Password1 -- pass
 Password1'--noPass
Password2!@#$%^O(*&^' -- noPass
password2!@#$%^(*&^' -- noPass
password -- noPass
password2 -- noPass
Password -- noPass
あPassword1 -- noPass*/

console.log(elemInputPassword.validate('Password1'));

console.log(elemInputPassword.validate("Password1'"));
console.log(elemInputPassword.validate(`Password2!@#$%^O(*&^`));
console.log(elemInputPassword.validate(`password`));
console.log(elemInputPassword.validate(`password2`));
console.log(elemInputPassword.validate(`あPassword1`));

function validateForm() {
    if (!elemInputPassword.validate()) return false;
    return true;
}