function dynamicallyLoadScript(url, defer = true, async = false) {
    var script = document.createElement("script"); //Make a script DOM node
    script.src = url; //Set it's src to the provided URL
    if (defer) script.setAttribute('defer', '');
    if (async) script.setAttribute('async', '');
    document.head.appendChild(script); //Add it to the end of the head section of the page
}

// Add responsive top nav library
dynamicallyLoadScript('/thang-long-tour/comp/top-nav.js')

// Các hàm bật/tắt popover
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
// Các hàm chung thông thường
function convertDataObjToArr(dataObj) {
    let dataArr = [];
    for (id in dataObj) {
        let item = dataObj[id];
        item.id = id;
        dataArr.push(item);
    }
    return dataArr;
}

function convertDataArrToObj(dataArr) {
    let dataObj = {};
    for (each of dataArr) {
        let id = each.id;
        delete each.id;
        dataObj[id] = each;
    }
    return dataObj;
}

// Các hàm hiển thị tour lên màn hình
function displayTours(productData, page, elemID, maxItemPerRow = 3, maxRow = 4) {
    // Khai báo hiển thị dữ liệu từ data
    // Lấy số trang hiện tại
    if (!page) page = 1;
    // console.log(page);
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
    document.getElementById(elemID).innerHTML = elem;
    let numbOfProduct = Object.keys(productData).length
    let numbOfPage = Math.ceil(numbOfProduct / maxItemPerPage);
    return numbOfPage;
}

function displayPlaces(productData, elemID, maxItemPerRow = 3, maxRow = 4) {
    // Khai báo hiển thị dữ liệu từ data
    let maxItemPerPage = maxRow * maxItemPerRow;
    let elem = '<div class="row">';
    let countInProductData = 0;
    let countItemInRow = 0;
    let countRow = 0;

    for (id in productData) {
        countInProductData++;
        countItemInRow++;
        let product = productData[id];
        elem +=
            `<div class="card">
                        <a href="detail-place.html?id=${id}">
                            <div class="card__img">
                                <img src="${product.img[0]}" alt="demo image" />
                             </div>
                            <h4 class="card__country">${product.location}</h4>
                            <h3 class="card__header-full">${product.name.toLowerCase()}</h3>
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
    document.getElementById(elemID).innerHTML = elem;
}

function displayBlogs(productData, elemID, maxItemPerRow = 3, maxRow = 4) {
    // Khai báo hiển thị dữ liệu từ data
    let maxItemPerPage = maxRow * maxItemPerRow;
    let elem = '<div class="row">';
    let countInProductData = 0;
    let countItemInRow = 0;
    let countRow = 0;

    for (id in productData) {
        countInProductData++;
        countItemInRow++;
        let product = productData[id];
        elem +=
            `<div class="card">
                        <a href="detail-blog.html?id=${id}">
                            <div class="card__img">
                                <img src="${product.img[0]}" alt="demo image" />
                             </div>
                            <h4 class="card__upload-date">${product['upload-date']}</h4>
                            <h3 class="card__header-full">${product.name.toLowerCase()}</h3>
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
    document.getElementById(elemID).innerHTML = elem;
}