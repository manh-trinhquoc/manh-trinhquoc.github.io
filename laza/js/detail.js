// Tạo request lấy data từ file json sau đó hiển thị
var xmlhttp = new XMLHttpRequest();
var url = "/laza/data/products.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let productData = JSON.parse(this.responseText);
        // console.log(JSON.stringify(productData));
        displayProduct(productData);
    }
};

function displayProduct(productData) {
    let url = window.location.href;
    // console.log(url);
    let id = url.split("=")[1];
    // console.log(id)
    let product = productData[id];
    console.log(JSON.stringify(product));
    let elemIndicator = '';
    let elemInner = '';
    let elemCarouselImg = '';
    let images = product.img;
    for (imgNo in images) {
        // console.log(imgNo);
        if (imgNo == 0) {
            elemIndicator += `<li data-target="#carouselExampleIndicators" data-slide-to="${imgNo}" class="active"></li>`;
            elemInner += `<div class="carousel-item active">
                    <img src="${images[imgNo]}" class="d-block w-100" alt="product picture">
                </div>`;
        } else {
            elemIndicator += `<li data-target="#carouselExampleIndicators" data-slide-to="${imgNo}"></li>`;
            elemInner += `<div class="carousel-item">
                    <img src="${images[imgNo]}" class="d-block w-100" alt="product picture">
                </div>`;
        }
        elemCarouselImg += `<div class="col-md padding-small">
                        <img class="img-fluid img-thumbnail" src="${images[imgNo]}" alt="product picture" />
                    </div>`


    }
    // console.log(elemInner);
    // console.log(elemIndicator);
    $(".carousel-indicators").append(elemIndicator);
    $(".carousel-inner").append(elemInner);
    $("#carousel-img").append(elemCarouselImg);
    // console.log(JSON.stringify(elem));

    let elemProductDetail = `<h2 class="text-center"> ${product.name.toUpperCase()}</h2>
                    <p class="text-center price">Giá sản phẩm: ${product.price}</p>
                    <p class="text-center">Danh mục: ${product.category}</p>`;
    $(".product-detail").append(elemProductDetail);

    displayDescription(product.link);
}

function displayDescription(link) {
    // Tạo request lấy data từ file json sau đó hiển thị
    var xmlhttp = new XMLHttpRequest();
    var url = link;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            $(".product-description").append(this.responseText);
        }
    };
}