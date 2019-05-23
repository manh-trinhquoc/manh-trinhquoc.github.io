// setTimeout(function() {
//     console.log('inline script');
//     $('.carousel').carousel('pause');
// }, 700);

$('#carouselExampleIndicators').on('slide.bs.carousel', function() {
    // console.log('inline script');
    $('.carousel').carousel('pause');
})