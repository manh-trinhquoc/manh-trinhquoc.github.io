/*
Bài tập

Tạo trang Đăng ký tài khoản cho phép người dùng tạo tài khoản với các thông tin sau: 
Họ tên, ngày sinh, giới tính, địa chỉ, điện thoại, email, mật khẩu.

Yêu cầu

- Giao diện đẹp, rõ ràng.

- Khi người dùng bấm vào nút đăng ký thì chuyển qua trang thông báo đăng ký thành công, 
đồng thời hiển thị lại thông tin tài khoản người dùng (trường nào rỗng thì để trống).

Gợi ý

Khi truyền thông tin qua URL, sẽ có những giá trị đặc biệt bị encode cho hợp lệ 
ví dụ như dấu cách (khoảng trắng) sẽ bị convert thành %20. Để lấy được giá trị ban đầu 
ta sử dụng function decodeURIComponent(), ngược lại với nó là function encodeURIComponent()
*/

/*
Bài tập

Bổ sung thêm thông tin và validate cho trang Đăng ký tài khoản

Yêu cầu

Bổ sung thêm các trường: Số điện thoại, địa chỉ Facebook và kiểm tra tính hợp lệ 
của tất cả các trường trước khi người dùng đăng ký.
Khi người dùng bấm vào nút đăng ký nếu hợp lệ thì chuyển qua trang thông báo đăng ký thành công, 
đồng thời hiển thị lại thông tin tài khoản người dùng. Nếu người dùng nhập thông tin không hợp lệ 
thì thông báo những trường họ nhập sai và gợi ý thông tin cần nhập.
Giao diện đẹp, rõ ràng.
*/
console.group("initial.js");


let date = '<option value="date">Ngày </option>';
for (let i = 1; i <= 31; i++) {
    date += `<option value="${i}">${i}</option>`;
}
let month = '<option value="month">Tháng</option>';
for (let i = 1; i <= 12; i++) {
    month += `<option value="${i}">Tháng: ${i}</option>`;
}
let year = '<option value="year">Năm</option>';
for (let i = 2019; i >= 1905; i--) {
    year += `<option value="${i}">${i}</option>`;
}
document.getElementById('date').innerHTML = date;
document.getElementById('month').innerHTML = month;
document.getElementById('year').innerHTML = year;

console.groupEnd();