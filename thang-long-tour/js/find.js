// Dựa vào url của trang để tick những lựa chọn đã được chọn.
let filterArrFromURL = document.URL.split("?")[1].split("&");
let filterArr = filterArrFromURL.map(value => {
    return value.split("=");
});
for (each of filterArr) {
    // Tạo biến toàn cục có tên và giá trị là attribute trên url
    this[each[0]] = each[1];
    console.log(each[0] + ": " + this[each[0]]);
}

function setInputSelected(queryString, variable) {
    let elems = document.querySelectorAll(queryString);
    if (elems.length == 0) {
        console.log("cannot match elems of " + queryString);
        return;
    }
    for (each of elems) {
        if (!variable) {
            console.log("variable of" + queryString + " is not define")
            return;
        }
        if (each.value == variable) {
            // console.log("set selected of " + queryString)
            each.setAttribute("selected", "");
            return;
        }
    }
    console.log("cannot find match value of " + queryString + " to set selected");
}

setInputSelected("#departure option", departure);
setInputSelected("#destination option", destination);
setInputSelected("#duration option", duration);

function setInputDateValue(queryString, variable) {
    let elems = document.querySelectorAll(queryString);
    if (elems.length == 0) {
        console.log("cannot match elems of " + queryString);
        return;
    }
    for (each of elems) {
        if (!variable) {
            console.log("variable of" + queryString + " is not define")
            return;
        }
        each.setAttribute("value", variable);
    }
}

setInputDateValue("#departure-date", this["departure-date"]);

function setInputChecked(queryString, variable) {
    let elems = document.querySelectorAll(queryString);
    if (elems.length == 0) {
        console.log("cannot match elems of " + queryString);
        return;
    }
    for (each of elems) {
        if (!variable) {
            console.log("variable of" + queryString + " is not define")
            return;
        }
        if (each.value == variable) {
            // console.log("set selected of " + queryString)
            each.setAttribute("checked", "");
            return;
        }
    }
    console.log("cannot find match value of " + queryString + " to set checked");
}

setInputChecked("#trip-type input", this["trip-type"]);