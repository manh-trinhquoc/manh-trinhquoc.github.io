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
            console.log("variable of" + queryString + " is not define")
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
        console.log(each[0] + ": " + this[each[0]]);
    }
    setInputSelected("#departure option", departure);
    setInputSelected("#destination option", destination);
    setInputSelected("#duration option", duration);
    setInputDateValue("#departure-date", this["departure-date"]);
    setInputChecked("#trip-type input", this["trip-type"]);
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
        console.log(allToursData);
        displayProduct(allToursData, window["page"]);
        // managePaginationAppearance();
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
                                <img src="${product.img[0]}" alt="demo image" />
                                <div class="card__sale">${product['sale-off']}</div>
                            </div>
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
    addPagination(productData, maxItemPerPage);
}

function managePaginationAppearance() {
    let url = window.location.href;
    let page = parseInt(url.split("=")[1]);
    if (!page) page = 1;
    let pageElements = document.getElementsByClassName('page-item');
    let lastPage = pageElements.length - 2;
    // console.log(pageElements);
    for (i in pageElements) {
        pageElements[i].className = "page-item";
        if (page == i) pageElements[i].classList.add('active');
    }
    pageElements[0].innerHTML = `<a class="page-link" href="?page=${page - 1}">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>`;
    pageElements[pageElements.length - 1].innerHTML = `<a class="page-link" href="?page=${page + 1}">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>`;
    if (page == 1) {
        pageElements[0].className = "page-item disabled";
    }
    if (page == lastPage) {
        pageElements[pageElements.length - 1].className = "page-item disabled";
    }
}

function addPagination(productData, maxItemPerPage) {
    let count = 0;
    let elem = `<li class="page-item"></li>`;
    for (id in productData) {
        let page = Math.floor(count / maxItemPerPage) + 1;
        let remain = count % maxItemPerPage;
        // console.log(remain);
        if (remain == 0) {
            elem += `<li class="page-item"><a class="page-link" href="?page=${page}">${page}</a></li>`;

        }
        count++;
    }
    elem += `<li class="page-item"></li>`;
    console.log(elem);
    $(".pagination").append(elem);

}