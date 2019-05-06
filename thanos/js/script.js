var imageDataArray = [];
var canvasCount = 35;

document.getElementsByClassName("aside__ok")[0].onclick = function() {
    let userInput = document.getElementsByClassName("aside__user-input")[0].value;
    let asideDialogue = document.getElementsByClassName("aside__dialogue")[0];

    userInput = parseInt(userInput);
    if (isNaN(userInput)) {
        asideDialogue.innerHTML = "Số bạn vừa nhập không hợp lệ. Hãy nhập số từ 1-10";
        return;
    }
    let contents = document.getElementsByClassName("card__cover-" + userInput);
    html2canvas(contents[0]).then(canvas => {
        //capture all div data as image
        ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixelArr = imageData.data;
        createBlankImageData(imageData);
        //put pixel info to imageDataArray (Weighted Distributed)
        for (let i = 0; i < pixelArr.length; i += 4) {
            //find the highest probability canvas the pixel should be in
            let p = Math.floor((i / pixelArr.length) * canvasCount);
            let a = imageDataArray[weightedRandomDistrib(p)];
            a[i] = pixelArr[i];
            a[i + 1] = pixelArr[i + 1];
            a[i + 2] = pixelArr[i + 2];
            a[i + 3] = pixelArr[i + 3];
        }
        //create canvas for each imageData and append to target element
        for (let i = 0; i < canvasCount; i++) {
            let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
            c.classList.add("dust");


            let cardImg = document.getElementsByClassName("card__img-" + userInput)[0];
            document.getElementsByClassName("card-" + userInput)[0].insertBefore(c, cardImg);

            // document.getElementsByTagName("body")[0].append(c);
        }
        //clear all children except the canvas
        document.getElementsByClassName("card-" + userInput)[0].removeChild(contents[0]);
        //apply animation
        let canvasElements = document.getElementsByClassName("dust");
        for (let i = 0; i < canvasElements.length; i++) {
            let elem = canvasElements[i];
            animateBlur(elem, 0.9, 2000);
            animateTransform(elem, 150, -150, chance.integer({ min: -15, max: 15 }), 1000 + (100 * i));
        }

    });
}


function weightedRandomDistrib(peak) {
    var prob = [],
        seq = [];
    for (let i = 0; i < canvasCount; i++) {
        prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
        seq.push(i);
    }
    return chance.weighted(seq, prob);
}

function animateBlur(elem, radius, duration) {
    elem.style.transition = "filter " + duration + "ms linear";
    elem.style.filter = "blur(" + radius + "px)";
}

function animateTransform(elem, sx, sy, angle, duration) {
    // sx = 200;
    // sy = -200;
    // angle = 30;
    // duration = 2000;
    elem.style.transition += ", transform " + duration + "ms linear , opacity " + (duration - 500) + "ms linear";
    elem.style.transform = "translate(" + sx + "px, " + sy + "px) rotate(" + angle + "deg) translate3d(0,0,0) translateZ(0.0001px)";
    elem.style.opacity = "1";
}

function createBlankImageData(imageData) {
    for (let i = 0; i < canvasCount; i++) { //canvasCount = 35
        let arr = new Uint8ClampedArray(imageData.data);
        for (let j = 0; j < arr.length; j++) {
            arr[j] = 0;
        }
        imageDataArray.push(arr);
    }
}

function newCanvasFromImageData(imageDataArray, w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    tempCtx = canvas.getContext("2d");
    tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);

    return canvas;
}