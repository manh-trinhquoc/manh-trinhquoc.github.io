console.group("script-success.js")

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

firebase.auth().onAuthStateChanged(function(user) {
    console.group("auth state change");
    console.log(JSON.stringify(user));
    if (user) {
        // User is signed in.
        console.log("user log in");
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
        console.log("user log out");
    }
    console.groupEnd();
});

console.groupEnd();