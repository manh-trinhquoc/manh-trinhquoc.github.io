function dynamicallyLoadScript(url, defer = true, async = false) {
    var script = document.createElement("script"); //Make a script DOM node
    script.src = url; //Set it's src to the provided URL
    if (defer) script.setAttribute('defer', '');
    if (async) script.setAttribute('async', '');
    document.head.appendChild(script); //Add it to the end of the head section of the page
}

// Add responsive top nav library
dynamicallyLoadScript('/thang-long-tour/comp/top-nav.js');