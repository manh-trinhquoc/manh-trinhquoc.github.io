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

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.

    firebase.auth().onAuthStateChanged(function(user) {
        // console.log(user);
        // console.log(user.providerData);

        if (user) {
            // User is signed in.
            currentUserObj.isLoggedIn = true;
            currentUserObj.displayName = user.displayName;
            currentUserObj.email = user.email;
            currentUserObj.photoURL = user.photoURL;
            // get user data from database
            let docRef = db.collection("users").doc(currentUserObj.email);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    let docData = doc.data()
                    // console.log("Document data:", docData);
                    currentUserObj.historyViewed = docData.historyViewed;
                    currentUserObj.tourbooked = docData.tourbooked;
                    currentUserObj.oldTours = docData.oldTours;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            console.log('user sign in');
            console.log(JSON.stringify(currentUserObj));
        } else {
            // User is signed out.
            currentUserObj.isLoggedIn = false;
            currentUserObj.email = '';
            currentUserObj.photoURL = '';
            currentUserObj.historyViewed = '';
            currentUserObj.tourbooked = ''
            currentUserObj.oldTours = '';
            console.log('user sign out');
            console.log(currentUserObj);
            window.localStorage.clear();
        }
    });
}

window.onload = function() {
    initApp();
};
// Initialize an instance of Cloud Firestore:
var db = firebase.firestore();



function submitSignUp(event) {
    // Khi người dùng submit form đăng ký    
    event.preventDefault();
    // get user input and validate
    let isAllValidated = true;
    let elem = document.getElementById('sign-up-name');
    if (!isValidated(['cannotEmpty'], elem)) isAllValidated = false;
    let fullName = elem.value;

    elem = document.getElementById('sign-up-phone');
    if (!isValidated(['cannotEmpty', 'isPhoneNumber'], elem)) isAllValidated = false;
    let phone = elem.value;

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
    alert("Chúng tôi đang tạo tài khoản cho bạn");
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        console.group('createUserWithEmailAndPassword');
        user = firebase.auth().currentUser;
        console.log(user);
        currentUserObj.fullName = fullName;
        currentUserObj.phone = phone;
        currentUserObj.email = email;
        currentUserObj.password = password;
        // user infomation được lưu vào database của firebase
        db.collection("users").doc(email).set(currentUserObj).then(function() {
                alert(`Bạn ${fullName} đã tạo tài khoản thành công.\n Email: ${email}.\n Số điện thoại: ${phone}.\n Password: ${password}.`);
                console.log('Tạo bản ghi thành công');
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        console.groupEnd();
    }).catch(function(error) {
        console.group('createUserWithEmailAndPassword()');
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('Mật khẩu của bạn quá ngắn');
        } else if (errorCode == 'auth/email-already-in-use') {
            alert('Địa chỉ email đã được sử dụng. Xin hãy chọn địa chỉ email khác');
        } else {
            console.log(errorMessage);
        }
        // [END_EXCLUDE]
        console.groupEnd();
    });
    // [END createwithemail]
    hidePopover('register-popover');
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
        let result = /^[0-9+\- ]+$/.test(elem.value);
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
    let toggleShow = true;
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