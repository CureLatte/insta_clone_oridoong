$(document).ready(function () {
    edit_profile();
});

function edit_profile() {
    $.ajax({
        type: 'GET',
        url: '/edit_profile_get',
        data: {},
        success: function (response) {
            let user_info = response['user_info'];
            let user_avatar = user_info["avatar"]
            var jbSplit = user_avatar.split('\\');
            var get_user_avarar = jbSplit[jbSplit.length - 1]
            var def_user_avatar_url = "/static/images/user/" + get_user_avarar
            document.getElementById("preview_image").src = def_user_avatar_url

            $.each(user_info, function (index, obj) {
                $("#" + index).val(obj);
            })
        }
    });
}
//사진 미리보기
function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
            const previewImage = document.getElementById("preview_image")
            previewImage.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}
const inputImage = document.getElementById("input_image")
inputImage.addEventListener("change", e => {
    readImage(e.target)
})
// ajax
function save_update_profile() {
    let name = $("#name").val()
    console.log(name)
    let username = $("#username").val()
    let email = $("#email").val()
    let phone_number = $("#phone_number").val()
    let gender = $("#gender").val();
    let avatar = $("#input_image").val();
    let file = $('#file')[0].files[0]
    let bio = $("#bio").val();
    //아바타 부분 url split   
    var jb_split = avatar.split('\\');
    var get_user_avarar = jb_split[jb_split.length - 1]

    console.log("Asdgasdhgg")
    if (avatar == "") {
        var hi = $("#preview_image").attr('src');
        hoho = hi.split('/');
        hihi = hoho[hoho.length - 1];

        $.ajax({
            type: "POST",
            url: "/edit_profile",
            data: {
                "name_receive": name,
                "username_receive": username,
                "email_receive": email,
                "phone_number_receive": phone_number,
                "gender_receive": gender,
                "avatar_receive": hihi,
                "file_receive": file,
                "bio_receive": bio,
            },
            success: function (response) {
                alert(response["msg"])
                window.location.reload("/")
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "/edit_profile",
            data: {
                "name_receive": name,
                "username_receive": username,
                "email_receive": email,
                "phone_number_receive": phone_number,
                "gender_receive": gender,
                "avatar_receive": get_user_avarar,
                "file_receive": file,
                "bio_receive": bio,
            },
            success: function (response) {
                alert(response["msg"])
                window.location.reload("/")
            }
        });
    }

}


// 회원탈퇴 팝업창
$(function () {
    //----- OPEN
    $('.pop_btn').on('click', function (e) {
        $('.warnin_pop').fadeIn(100);
        e.preventDefault();
    });

    //----- CLOSE
    $('.popup-close').on('click', function (e) {
        $('.warnin_pop').fadeOut(100);
        e.preventDefault();
    });
});


function sign_out() {
    $.ajax({
        type: 'GET',
        url: '/sign_out',
        data: {},
        success: function (response) {
            alert(response["msg"]);
            $.removeCookie('mytoken');
            window.location.href = "/";
        }
    });
}
