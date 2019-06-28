function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); //Make a script DOM node
    script.src = url; //Set it's src to the provided URL
    document.body.appendChild(script); //Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

// Add responsive top nav
dynamicallyLoadScript('/thang-long-tour/comp/top-nav.js');

function showMap(id) {
    document.getElementById(id).toggleAttribute("hidden");
}



let eleTopnavPopover = document.getElementById("topnav");

function signIn() {
    let eleSignUpForm = document.getElementById("sign-up");
    let eleSignInForm = document.getElementById("sign-in");
    if (eleSignInForm.hasAttribute("hidden")) {
        eleSignInForm.removeAttribute("hidden");
        eleSignUpForm.setAttribute("hidden", "");
    }
    document.getElementById("sign-in-btn").classList.remove("deactive");;
    document.getElementById("sign-up-btn").classList.add("deactive");
    event.stopPropagation()
}

function signUp() {
    let eleSignUpForm = document.getElementById("sign-up");
    let eleSignInForm = document.getElementById("sign-in");
    if (eleSignUpForm.hasAttribute("hidden")) {
        eleSignUpForm.removeAttribute("hidden");
        eleSignInForm.setAttribute("hidden", "");
    }
    document.getElementById("sign-up-btn").classList.remove("deactive");;
    document.getElementById("sign-in-btn").classList.add("deactive");
    event.stopPropagation()
}

function togglePopover(id) {
    let elePopover = document.getElementById(id);
    elePopover.toggleAttribute("hidden");
}

function hidePopover(id) {
    console.group("hidePopover");
    console.trace();
    console.groupEnd();
    let elePopover = document.getElementById(id);
    elePopover.setAttribute("hidden", "");
    event.stopPropagation()
}

function showPopover(id) {
    console.group("showPopover");
    console.trace();
    console.groupEnd();
    let elePopover = document.getElementById(id);
    elePopover.removeAttribute("hidden");
    event.stopPropagation()
}