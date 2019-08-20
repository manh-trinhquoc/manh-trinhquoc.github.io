function showImage() {
    let innerHTML = '';

    for (let i = 1; i <= 12; i++) {
        innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2 ">
                    <img class="img-fluid img-thumbnail" src="img/img${i}.jpg" alt="image number ${i}" />
                </div>`;
    };

    $('.row').append(innerHTML);
    document.getElementsByTagName('button')[0].style.display = "none";
    document.getElementsByTagName('button')[1].style.display = "block";
}

function hideImage() {
    $('.row').html("");
    document.getElementsByTagName('button')[1].style.display = "none";
    document.getElementsByTagName('button')[0].style.display = "block";
}

document.getElementsByTagName('button')[0].onclick = showImage;

document.getElementsByTagName('button')[1].onclick = hideImage;
document.getElementsByTagName('button')[1].style.display = "none";