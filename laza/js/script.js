// Tạo request lấy data từ file json sau đó hiển thị
var xmlhttp = new XMLHttpRequest();
var url = "data/products.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let productData = JSON.parse(this.responseText);
        console.log(JSON.stringify(productData));
        displayProduct(productData);
    }
};

function displayProduct(productData) {
    let elem = '';
    for (id in productData) {
        let product = productData[id];
        // console.log(JSON.stringify(product));
        elem +=
            `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2 ">
                <a href="html/detail.html?id=${id}" target="_blank">
                    <img class="img-fluid img-thumbnail" src="${product.img[0]}" alt="product image" />
                    <p class="text-center no-decoration">${product.name}</p>
                    <p class="text-center price no-decoration">${product.price}</p>
                </a>
            </div>`
    }
    // console.log(JSON.stringify(elem));
    $(".row").append(elem);
}