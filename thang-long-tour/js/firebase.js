// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBLun8W025GfovROcAH9hiI3XaU8TVM0vY",
    authDomain: "thang-long-tour.firebaseapp.com",
    databaseURL: "https://thang-long-tour.firebaseio.com",
    projectId: "thang-long-tour",
    storageBucket: "",
    messagingSenderId: "686130862617",
    appId: "1:686130862617:web:705408b2e99ddd3d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function submitSignUp(event) {
    // Khi người dùng submit form đăng ký    
    event.preventDefault();
    // get user input and validate
    let isAllValidated = true;
    let elem = document.getElementById('sign-up-name');
    if (!isValidated(['cannotEmpty'], elem)) isAllValidated = false;

    elem = document.getElementById('sign-up-phone');
    if (!isValidated(['cannotEmpty', 'isPhoneNumber'], elem)) isAllValidated = false;

    elem = document.getElementById('sign-up-email');
    if (!isValidated(['cannotEmpty', 'isEmail'], elem)) isAllValidated = false;
    let email = elem.value;

    elem = document.getElementById('sign-up-pass');
    if (!isValidated(['cannotEmpty', 'longerThan6Digit'], elem)) isAllValidated = false;
    let password = elem.value;

    let elem2 = document.getElementById('sign-up-pass-2');
    if (!isValidated(['isEqual'], elem, elem2)) isAllValidated = false;

    console.log('isAllValidated: ' + isAllValidated);
    if (!isAllValidated) return;
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.group('createUserWithEmailAndPassword()');
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
        console.groupEnd();
    });
    // [END createwithemail]
}

function isValidated(conditionArr, ...elemArr) {
    let isAllValidated = true;
    for (let condition of conditionArr) {
        // console.log(condition);
        if (condition == 'cannotEmpty') cannotEmpty(elemArr[0]);
        if (condition == 'isEqual') isEqual(elemArr[0], elemArr[1]);
        if (condition == 'isEmail') isEmail(elemArr[0]);
        if (condition == 'isPhoneNumber') isPhoneNumber(elemArr[0]);
        if (condition == 'longerThan6Digit') longerThan6Digit(elemArr[0]);
        if (!isAllValidated) break;
    };
    return isAllValidated;

    function cannotEmpty(elem) {
        if (elem.value == '') {
            // console.log(elem);
            isAllValidated = false;
            elem.nextElementSibling.textContent = 'Trường này không được để trống';
        } else elem.nextElementSibling.textContent = '';
    }

    function isEqual(elem1, elem2) {
        if (elem1.value != elem2.value) {
            isAllValidated = false;
            elem2.nextElementSibling.textContent = 'Nhập lại mật khẩu không khớp';
        } else elem2.nextElementSibling.textContent = '';
    }

    function isEmail(elem) {
        let result = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(elem.value);
        if (!result) {
            isAllValidated = false;
            elem.nextElementSibling.textContent = 'Email bạn nhập phải có định dạng exmaple@example.example'
        } else elem.nextElementSibling.textContent = '';
    }

    function isPhoneNumber(elem) {
        let result = /^[0-9+\- ]$/.test(elem.value);
        if (!result) {
            isAllValidated = false;
            elem.nextElementSibling.textContent = 'Số điện thoại chỉ có thể chứa các ký tự "0-9 + -" và dấu cách';
        } else elem.nextElementSibling.textContent = '';
    }

    function longerThan6Digit(elem) {
        if (elem.value.length < 6) {
            isAllValidated = false;
            elem.nextElementSibling.textContent = 'Mật khẩu phải dài hơn 6 kí tự';
        } else elem.nextElementSibling.textContent = '';
    }
}

let showPassWord = (function() {
    let toggleShow = false;
    return function(elem) {
        if (toggleShow) {
            elem.innerHTML = `<i class="fas fa-eye"></i>`;
            toggleShow = false;
            document.getElementById('sign-up-pass').setAttribute('type', 'text');
            document.getElementById('sign-up-pass-2').setAttribute('type', 'text');
        } else {
            elem.innerHTML = `<i class="fas fa-eye-slash"></i>`;
            toggleShow = true;
            document.getElementById('sign-up-pass').setAttribute('type', 'password');
            document.getElementById('sign-up-pass-2').setAttribute('type', 'password');
        }
    };
})();

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // if (!emailVerified) {
            //     document.getElementById('quickstart-verify-email').disabled = false;
            // }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            // document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    // document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
    initApp();
};