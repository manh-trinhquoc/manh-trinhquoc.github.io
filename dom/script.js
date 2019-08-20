/*
Bài tập

Tạo 1 trang HTML với nội dung là 3 đoạn văn. Hãy viết các function có tác dụng như sau:

Bài 1. function changeFontSize(x): Thay đổi kích thước font chữ của cả 3 đoạn văn thành x pixels (x là một số nguyên).
*/
function changeFontSize(x) {
    let elements = document.getElementsByTagName("p");
    for (element of elements) {
        element.style.fontSize = x + "px";
    }

}

changeFontSize(15);

/*
function increaseFontSize(paragraph): Tăng kích thước font chữ của đoạn văn mong muốn (paragraph) 
lên 1 pixel so với kích thước hiện tại, kích thước tăng lên không được vượt quá 30 pixels 
(Sử dụng sau khi gọi hàm changeFontSize() hoặc dùng window.getComputedStyle).
*/
function increaseFontSize(paragraph) {
    let elem = document.getElementById(paragraph);
    let cssPropFontSize = window.getComputedStyle(elem, null).getPropertyValue("font-size");
    cssPropFontSize = parseInt(cssPropFontSize);
    if (cssPropFontSize >= 30) cssPropFontSize = 30;
    else cssPropFontSize++;
    elem.style.fontSize = cssPropFontSize + "px";
}

increaseFontSize("para-2");

/*
function decreaseFontSize(paragraph): Giảm kích thước font chữ của đoạn văn 
mong muốn (paragraph) xuống 1 pixels so với kích thước hiện tại, kích thước giảm xuống không vượt quá 10 pixels.
*/
function decreaseFontSize(paragraph) {
    let elem = document.getElementById(paragraph);
    let cssPropFontSize = window.getComputedStyle(elem, null).getPropertyValue("font-size");
    cssPropFontSize = parseInt(cssPropFontSize);
    if (cssPropFontSize <= 10) cssPropFontSize = 10;
    else cssPropFontSize--;
    elem.style.fontSize = cssPropFontSize + "px";
}

decreaseFontSize("para-3");

/*
function changeColor(): Đổi màu chữ của 3 đoạn văn theo thứ tự xanh, vàng, đỏ.
*/
function changeColor(...arr) {
    let defaultColor = ["blue", "yellow", "red"];
    for (index in defaultColor) {
        let elem = document.getElementById("para-" + (+index + 1));
        elem.style.color = arr[index] ? arr[index] : defaultColor[index];
    }
}

changeColor();
//changeColor("yellow", "orange");

/*
function changeBgColor(color): Thay đổi màu nền của trang thành màu color.
*/
function changeBgColor(color = "white") {
    let elements = document.getElementsByTagName("body");
    elements[0].style.backgroundColor = color;
}

changeBgColor("lightgrey");
// changeBgColor();
/*
function copyContent(paragraph1, paragraph2): Thay đổi nội dung của đoạn văn 
paragraph1 thành giống nội dung của đoạn văn paragraph2.
*/
function copyContent(paragraph1, paragraph2) {
    let elem1 = document.getElementById(paragraph1);
    let elem2 = document.getElementById(paragraph2);
    elem1.innerHTML = elem2.innerHTML;
}

copyContent("para-1", "para-2");