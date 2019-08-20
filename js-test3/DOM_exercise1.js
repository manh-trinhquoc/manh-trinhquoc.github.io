// Mở www.google.com trong Chrome hoặc Firefox và mở console
//     Tìm logo Google và lưu trữ nó trong một biến.
let eleGoogleLogo = document.getElementById('hplogo');
//     Thay đổi logo của google thành logo của yahoo
eleGoogleLogo.setAttribute('src', 'https://i.kinja-img.com/gawker-media/image/upload/s--L6iEaMpg--/c_scale,f_auto,fl_progressive,q_80,w_800/18z6kfsmghumxpng.png');
eleGoogleLogo.setAttribute('srcset', '');

//     Tìm nút tìm kiếm Google và lưu trữ nó trong một biến.
let eleSearch = document.getElementsByClassName('gNO89b')[1];

//     Sửa đổi text của nút đó thành "Yahoo!"
eleSearch.setAttribute('value', "Yahoo!");
//     Luu lại các thao tác vào file DOM_exercise1.js
//     Chup lại ảnh màn hình sau khi sửa đổi và lưu vào DOM_exercise1.jpg hoặc .png