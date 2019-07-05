// Dựa vào url của trang để tick những lựa chọn đã được chọn.

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
        if (each.value.toLowerCase() == variable.toLowerCase()) {
            // console.log("set selected of " + queryString)
            each.setAttribute("selected", "");
            return;
        }
    }
    console.log("cannot find match value of " + queryString + " to set selected");
}

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

function setInputChecked(queryString, variable) {
    let elems = document.querySelectorAll(queryString);
    if (elems.length == 0) {
        console.log("cannot match elems of " + queryString);
        return;
    }
    for (each of elems) {
        if (!variable) {
            // console.log("variable of" + queryString + " is not define")
            return;
        }
        if (each.value.toLowerCase() == variable.toLowerCase()) {
            // console.log("set selected of " + queryString)
            each.setAttribute("checked", "");
            return;
        }
    }
    console.log("cannot find match value of " + queryString + " to set checked");
}

// Gọi các hàm tick lựa chọn
let URIDecoded = decodeURI(document.URL);
URIDecoded = URIDecoded.replace(/\+/g, " ");
let filterArr = [];
try {
    let filterArrFromURL = URIDecoded.split("?")[1].split("&");
    filterArr = filterArrFromURL.map(value => {
        return value.split("=");
    });
} catch {
    console.log("there is not any attribute in url");
}
// Tạo condition object có property và giá trị là attribute trên url
let filterConditionObj = {};
for (each of filterArr) {
    if (each[0] != 'trip-type') filterConditionObj[each[0]] = each[1];
    else {
        if (!filterConditionObj[each[0]]) filterConditionObj[each[0]] = [];
        filterConditionObj[each[0]].push(each[1]);

    }
}
console.log(filterConditionObj);
setInputSelected("#departure option", filterConditionObj.departure);
setInputSelected("#destination option", filterConditionObj.destination);
setInputSelected("#duration option", filterConditionObj.duration);
setInputDateValue("#departure-date", filterConditionObj["departure-date"]);
if (filterConditionObj['trip-type']) {
    for (each of filterConditionObj['trip-type']) {
        setInputChecked(`#${each}`, each);
    }
}

console.log('Kết thúc việc tick những lựa chọn đã được chọn');

// lấy data từ JSON và hiển thị kết quả lọc
function displayProduct(productData, page) {
    // Lấy số trang hiện tại
    if (!page) page = 1;
    // console.log(page);
    let maxItemPerRow = 3;
    let maxRow = 4;
    let maxItemPerPage = maxRow * maxItemPerRow;
    let elem = '<div class="row">';
    let countInProductData = 0;
    let countItemInRow = 0;
    let countRow = 0;
    let startAt = (page - 1) * maxItemPerPage;
    //     console.log(startAt);
    for (id in productData) {
        // console.log("id: " + id);
        if (countInProductData < startAt) {
            // Bỏ qua những item nằm ở trang < trang này
            countInProductData++;
            continue;
        }
        countInProductData++;
        countItemInRow++;
        let product = productData[id];
        elem +=
            `<div class="card">
                        <a href="detail-tour.html?id=${id}">
                            <div class="card__img">
                                <img src="${product.img[0]}" alt="demo image" />`
        if (product['sale-off'] < 0) {
            elem += `<div class="card__sale">${product['sale-off']}</div>`
        }

        elem += `</div>
                            <h4 class="card__country">${product.destination}</h4>
                            <h3 class="card__header">${product.name}</h3>
                            <h5 class="card__price">${product.price}</h5>
                            <h5 class="card__duration">Thời gian: ${product.day} ngày ${product.night} đêm</h5>
                            <h5 class="card__start-date">Khởi hành: ${product['departure-date']}</h5>
                        </a>
                    </div>`;
        if (countItemInRow >= maxItemPerRow) {
            countItemInRow = 0;
            elem += `</div><div class="row">`;
            countRow++;
        }
        if (countRow >= maxRow) {
            break;
        }
    }
    // Bổ sung thẻ card cho đủ số cột
    if (countRow < maxRow && countItemInRow > 0) {
        for (let i = countItemInRow; i < maxItemPerRow; i++) {
            elem += `<div class="card"></div>`;
        }
    }
    // Đóng thẻ .row
    elem += `</div>`
    document.getElementById('filter-result').innerHTML = elem;
    let numbOfProduct = Object.keys(productData).length
    let numbOfPage = Math.ceil(numbOfProduct / maxItemPerPage);
    return numbOfPage;
}

function addPagination(numbOfPage) {
    console.group("addPagination");
    let documentURL = document.URL;
    // lọc bỏ attribute page=1& đã thêm trước đó
    documentURL = documentURL.replace(/&?page=[0-9]*/g, "");
    // console.log('documentURL: ' + documentURL);
    // kiểm tra url đã có ? chưa để tạo url trong pagination
    let href = '';
    if (documentURL.search(/\?/) < 0) {
        href = documentURL + '?page=';
    } else {
        href = documentURL + '&page=';
    }
    // Thêm các trang
    let elem = '';
    if (numbOfPage > 1) {
        elem += `<a href="#" class="disable">&laquo;</a>`;
    }

    elem += `<a href="${href + 1}" class="active">1</a>`;
    for (let i = 2; i <= numbOfPage; i++) {
        elem += `<a href="${href + i}">${i}</a>`;
    }
    if (numbOfPage > 1) {
        elem += `<a href="${href + 2}">&raquo;</a>`;
    }
    document.getElementById('pagination').innerHTML = elem;
    console.groupEnd();
}

function managePaginationAppearance(currentPage) {
    console.group('managePaginationAppearance');
    if (!currentPage) currentPage = 1;
    let pageElements = document.querySelectorAll('#pagination a');
    let lastPage = pageElements.length - 2;
    // console.log(pageElements);
    for (let i = 0; i < pageElements.length; i++) {
        // console.log(i);
        // console.log(pageElements[i]);
        if (currentPage == i) pageElements[i].classList.add('active');
        else pageElements[i].classList.remove('active');
    }
    if (currentPage == 1) {
        pageElements[0].classList.add("disable");
    } else {
        pageElements[0].classList.remove("disable");
    }
    if (currentPage == lastPage) {
        pageElements[pageElements.length - 1].classList.add("disable");
    } else {
        pageElements[pageElements.length - 1].classList.remove("disable");
    }
    // modify content of pagination << and >>
    let url = document.URL;
    let href = url.replace(/page=[0-9]*/g, `page=${currentPage- 1}`);
    pageElements[0].setAttribute('href', href);
    href = url.replace(/page=[0-9]*/g, `page=${+currentPage+ 1}`);
    pageElements[pageElements.length - 1].setAttribute('href', href);
    console.groupEnd();
}

function filterCondition(productData, conditionObj) {
    // Lọc product với điều kiện tất cả condition phải thỏa mãn.
    // Bỏ qua trường hợp condition không tồn tại.
    console.group("filterCondition()");
    let newProductData = {};
    for (id in productData) {
        // console.group("id: " + id);
        let product = productData[id];
        let isProductPass = true;
        // console.log(JSON.stringify(newProductData));
        for (key in conditionObj) {
            // console.log("key: " + key);
            // console.log("conditionObj[key]: " + conditionObj[key]);
            // console.log("product[key]: " + product[key]);
            // debugger;
            if (!conditionObj[key] || conditionObj[key] == 'null') {
                // console.log('conditionObj[key] is undefine or null');
                continue;
            }
            if (!product[key]) {
                // console.log('product[key] is undefine');
                continue;
            }
            if (product[key] != conditionObj[key]) {
                // console.log('delete product: ' + id);
                isProductPass = false;
                break;
            }
        }
        if (!isProductPass) {
            // console.log('item is not added to new productData');
            // console.groupEnd();
            continue;
        }
        // console.log('item is added to newProductData');
        newProductData[id] = JSON.parse(JSON.stringify(productData[id]));
        // console.groupEnd();
    }

    console.groupEnd();
    return newProductData;
}

function filterConditionArr(productData, conditionArr) {
    // Lọc data với điều kiện đầu vào là 1 array
    console.group("filterConditionArr()");
    let newProductData = {};
    for (id in productData) {
        console.group("id: " + id);
        let productTripTypeValues = productData[id]['trip-type'];
        console.log("product[trip-type]: " + productTripTypeValues);
        console.log('conditionArr: ' + conditionArr);
        let isProductPass = true;
        // console.log(JSON.stringify(newProductData));
        if (productTripTypeValues) {
            isProductPass = isArrContain(conditionArr, productTripTypeValues)
        }

        if (!isProductPass) {
            console.log('item is not added to new productData');
            console.groupEnd();
            continue;
        }

        console.log('item is added to newProductData');
        newProductData[id] = JSON.parse(JSON.stringify(productData[id]));
        console.groupEnd();

    }

    console.groupEnd();
    return newProductData;
}

function isArrContain(smallArr, bigArr) {
    console.group('isArrContain');
    for (small of smallArr) {
        let isContain = false;
        for (big of bigArr) {
            if (small == big) {
                isContain = true;
                break;
            }
        }
        if (isContain == false) {
            console.groupEnd();
            return false;
        }

    }
    console.groupEnd();
    return true;
}

// Tạo request lấy data từ file json sau đó hiển thị
var xmlhttp = new XMLHttpRequest();
var url = "/thang-long-tour/json/tours.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let allToursData = JSON.parse(this.responseText);
        // console.log(JSON.stringify(allToursData));
        // console.log(allToursData);
        let conditionObj = {
            'departure': filterConditionObj['departure'],
            'destination': filterConditionObj['destination'],
            'departure-date': filterConditionObj['departure-date'],
            'duration': filterConditionObj['duration'],
        };
        let filterTours = filterCondition(allToursData, conditionObj);
        if (Array.isArray(filterConditionObj['trip-type'])) {
            filterTours = filterConditionArr(filterTours, filterConditionObj['trip-type']);
        }
        // console.log(filterTours);
        let numbOfPage = displayProduct(filterTours, filterConditionObj["page"]);
        addPagination(numbOfPage);
        managePaginationAppearance(filterConditionObj["page"]);
    }
};