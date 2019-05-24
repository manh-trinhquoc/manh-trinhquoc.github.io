// Tạo request lấy data từ file json sau đó hiển thị
var xmlhttp = new XMLHttpRequest();
var url = "/laza/data/products.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let productData = JSON.parse(this.responseText);
        console.log(JSON.stringify(productData));
        displayProduct(productData);
        managePaginationAppearance();
    }
};

function displayProduct(productData) {
    let url = window.location.href;
    // console.log(url);
    let page = parseInt(url.split("=")[1]);
    if (!page) page = 1;
    // console.log(page);
    let maxItemPerPage = 2;
    let elem = '';
    let count = 0;
    let startAt = (page - 1) * maxItemPerPage;
    //     console.log(startAt);
    for (id in productData) {
        if (count < startAt) {
            count++;
            continue;
        }
        if (count >= startAt + maxItemPerPage) break;
        count++;
        let product = productData[id];
        elem +=
            `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2 ">
                <a href="html/detail.html?id=${id}" target="_blank">
                    <img class="img-fluid img-thumbnail" src="${product.img[0]}" alt="product image" />
                    <p class="text-center no-decoration">${product.name}</p>
                    <p class="text-center price no-decoration">${product.price}</p>
                </a>
            </div>`
    }

    $(".row").append(elem);
    addPagination(productData, maxItemPerPage);
}

function managePaginationAppearance() {
    let url = window.location.href;
    let page = parseInt(url.split("=")[1]);

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