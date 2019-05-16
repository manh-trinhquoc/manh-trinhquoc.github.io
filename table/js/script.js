/*
Bài tập

Tạo 1 trong các bảng dữ liệu với các thông tin sau:

- Bảng danh sách học viên (nhân viên, thành viên, ...) bao gồm: Ảnh chân dung, tên học viên, giới tính, email, số điện thoại, ...

- Bảng danh sách sản phẩm bao gồm: Ảnh sản phẩm, tên sản phẩm, mã sản phẩm, giá tiền, số lượng, ...

- Bảng danh sách bài viết bao gồm: Tiêu đề bài viết, danh mục, tác giả, ngày tạo, ngày xuất bản, trạng thái (bản nháp hoặc xuất bản), ...

 

Yêu cầu

- Trình bày đẹp, rõ ràng

- Khi di chuột lên dòng nào thì highlight dòng đó lên

- Có chức năng sort (sắp xếp lại dữ liệu trong bảng theo các cột)
*/

function displayTable(tableData) {
    let tableHeadElem = document.getElementById('table-head');
    let tableBodyElem = document.getElementById('table-body');

    let html = '<th>STT</th>';
    let count = 1;
    // // Hiển thị phần header của table
    // for (each of tableData.head) {
    //     html += `<th>${each}</th>`;
    // }
    // tableHeadElem.innerHTML = html;
    // Hiển thị phần body của table
    html = '';
    for (row of tableData.body) {
        html += `<tr><td>${count}</td>`;
        for (col in row) {
            if (col == 0) {
                html += `<td><img src="${row[col]}" alt="image"></td>`
            } else
                html += `<td>${row[col]}</td>`;
        }
        html += '</tr>';
        count++;
    }
    tableBodyElem.innerHTML = html;
}


let tableData;
// Tạo request lấy data từ file json sau đó hiển thị
var xmlhttp = new XMLHttpRequest();
var url = "/table/data/frontend3.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        tableData = JSON.parse(this.responseText);
        displayTable(tableData);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


function sortTableAscending(col) {
    tableData.body.sort((a, b) => {
        return a[col] > b[col] ? 1 : -1
    });
    displayTable(tableData);
}

function sortTableDecending(col) {
    tableData.body.sort((a, b) => {
        return a[col] < b[col] ? 1 : -1
    });
    displayTable(tableData);
}



let tableHeadElems = document.getElementsByTagName('th');
for (let index = 1; index < tableHeadElems.length - 1; index++) {
    tableHeadElems[index + 1].onclick = (function() {
        let checkStatus = 0;

        return function() {
            checkStatus++;
            if (checkStatus == 1) sortTableAscending(index);
            if (checkStatus == 2) {
                sortTableDecending(index);
                checkStatus = 0;
            }
            let status = checkStatus;
            console.log({ status, index })
        }
    })();
}