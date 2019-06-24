function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); //Make a script DOM node
    script.src = url; //Set it's src to the provided URL
    document.body.appendChild(script); //Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

// Add js for responsive top nav
dynamicallyLoadScript('../lib/top-nav.js');

function showMap(id) {
    document.getElementById(id).toggleAttribute("hidden");
}

let eleSignUpForm = document.getElementById("sign-up");
let eleSignInForm = document.getElementById("sign-in");

function signIn() {
    if (eleSignInForm.hasAttribute("hidden")) {
        eleSignInForm.removeAttribute("hidden");
        eleSignUpForm.setAttribute("hidden", "");
    }
}

function signUp() {
    if (eleSignUpForm.hasAttribute("hidden")) {
        eleSignUpForm.removeAttribute("hidden");
        eleSignInForm.setAttribute("hidden", "");
    }
}