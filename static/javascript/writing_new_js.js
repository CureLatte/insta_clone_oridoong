// $('textarea:first').click(function () {
//     $t = $(this).val().replace(/<br\s*\/?>/img, "x");
//     $(this).html($t)
// });
//
// var fileInput = document.querySelector("#id-photo");
//
// fileInput.addEventListener('change', handleImage, false);
// var canvas = document.getElementById('imageCanvas');
// var ctx = canvas.getContext('2d');
//
// function handleImage(e) {
//     var reader = new FileReader();
//     reader.onload = function (event) {
//         var img = new Image();
//
//         img.onload = function () {
//             canvas.width = 300;
//             canvas.height = 300;
//             ctx.drawImage(img, 0, 0, 300, 300);
//         };
//         img.src = event.target.result;
//
//     };
//     reader.readAsDataURL(e.target.files[0]);
// }

function posting() {
    let photo = $('#preview_writing_image')[0].files[0]
    let desc = $('#desc').val()
    let form_data = new FormData()

    form_data.append("photo_give", photo)
    form_data.append("desc_give", desc)

    $.ajax({
        type: "POST",
        url: "/writing_new",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
            window.location.reload()
        }
    });
}

function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
            const previewImage = document.getElementById("preview_writing_image")
            previewImage.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}

const inputImage = document.getElementById("input_writing_image")
inputImage.addEventListener("change", e => {
    readImage(e.target)
})