$('textarea:first').click(function () {
    $t = $(this).val().replace(/<br\s*\/?>/img, "x");
    $(this).html($t)
});

var fileInput = document.querySelector("#id-photo");

fileInput.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();

        img.onload = function () {
            canvas.width = 300;
            canvas.height = 300;
            ctx.drawImage(img, 0, 0, 300, 300);
        };
        img.src = event.target.result;

    };
    reader.readAsDataURL(e.target.files[0]);
}