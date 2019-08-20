console.group("script.js");


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
    return email;
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
    return password;
}

function ElemInputGroup(...elemNames) {
    this.elemNames = elemNames;
    for (name of elemNames) {
        this[name] = name;
        console.assert(this[name], `fail to create property ${name}`);
    }
    this.bind = function(...elementIDs) {
        for (elementID of elementIDs) {
            this[elementID] = document.getElementById(elementID);
            console.assert([this.elementID], `fail to bind element width ID "${elementID}"`);
        }

    }
}

let elemInputDateOfBirth = new ElemInputGroup('date', 'month', 'year');
elemInputDateOfBirth.bind('date', 'month', 'year');
elemInputDateOfBirth.validate = function() {
    for (name of this.elemNames) {
        let value = Number(this[name].value);
        if (Number.isNaN(value) == true) {
            elemInvalidDateOfBirth.show(`please choose ${name } in your date of birth`);
            return false;
        }

    }
    let date = Number(this['date'].value);
    let month = Number(this['month'].value);
    let year = Number(this['year'].value);
    let validateDate = new Date(year, month - 1, date);
    if (validateDate.getMonth() != month - 1) {
        elemInvalidDateOfBirth.show(`tháng ${month} không có ngày ${date}.`);
        return false;
    }
    return true;
}

function validateForm() {
    if (!elemInputPhoneNumber.validate()) return false;
    // if (!elemInputEmail.validate()) return false;
    // if (!elemInputPassword.validate()) return false;
    if (!elemInputDateOfBirth.validate()) return false;
    let email = elemInputEmail.validate()
    let password = elemInputPassword.validate();
    // firebase
    createAccount(email, password);
    // go to success.html
    return false;
    // return true;
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBiGBBfGWtZfsa0LIppaZcVrak1K54C4RA",
    authDomain: "form-2af48.firebaseapp.com",
    databaseURL: "https://form-2af48.firebaseio.com",
    projectId: "form-2af48",
    storageBucket: "form-2af48.appspot.com",
    messagingSenderId: "814221987803",
    appId: "1:814221987803:web:da976ea17815edc7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function createAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.group("createUser");
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(JSON.stringify(error));
        alert(JSON.stringify(errorCode));
        alert(JSON.stringify(errorMessage));
        console.groupEnd();
    });

}

firebase.auth().onAuthStateChanged(function(user) {
    console.group("auth state change");
    console.log(JSON.stringify(user));
    if (user) {
        // User is signed in.
        alert("user log in");
        document.write("user log in");
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        alert("user log out");
        document.write("user log out");
    }
    console.groupEnd();
});

console.groupEnd();