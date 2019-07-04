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
try {
    let URIDecoded = decodeURI(document.URL);
    URIDecoded = URIDecoded.replace(/\+/g, " ");
    let filterArrFromURL = URIDecoded.split("?")[1].split("&");
    let filterArr = filterArrFromURL.map(value => {
        return value.split("=");
    });
    for (each of filterArr) {
        // Tạo biến toàn cục có tên và giá trị là attribute trên url
        this[each[0]] = each[1];
        // console.log(each[0] + ": " + this[each[0]]);
    }
    setInputSelected("#departure option", departure);
    setInputSelected("#destination option", destination);
    setInputSelected("#duration option", duration);
    setInputDateValue("#departure-date", this["departure-date"]);
    for (let i = 1; i <= 7; i++) {
        setInputChecked("#trip-type input", this[`trip-type-${i}`]);
    }

} catch {
    console.log("there is not any attribute in url");
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
        let numbOfPage = displayProduct(allToursData, window["page"]);
        addPagination(numbOfPage);
        managePaginationAppearance(window["page"]);
    }
};

function displayProduct(productData, page) {
    // Lấy số trang hiện tại
    if (!page) page = 1;
    // console.log(page);
    let maxItemPerRow = 3;
    let maxRow = 2;
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
                            <h5 class="card__duration">Thời gian: ${product.duration.day} ngày ${product.duration.night} đêm</h5>
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
    if (countRow < maxRow) {
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