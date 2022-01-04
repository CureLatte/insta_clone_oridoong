function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

function like(data) {
    console.log(document.getElementById(`${data.alt}likey`).innerText)
    let likey = Number(document.getElementById(`${data.alt}likey`).innerText.split('명')[0])
    console.log()
    if (data.attributes[3].value === 'like@3x.png') {
        data.setAttribute('src', 'like@4x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey + 1)}명`
    } else {
        data.setAttribute('src', 'like@3x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey - 1)}명`
    }
}

function like_test(){

}

function poster_remove(obj) {

    Swal.fire({
        title: '정말로 삭제 하시겠습니까?',
        text: "다시 되돌릴 수 없습니다. 신중하세요.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            let test = document.querySelectorAll(".image_box img")[obj.alt]
            console.log(test)
            let photo = document.querySelectorAll(".image_box img")[obj.alt].src;

            photo = photo.split("/");
            photo = photo[photo.length - 1];

            $.ajax({
                type: "POST",
                url: "/poster_remove",
                data: {"photo": photo},
                success: function () {
                    window.location.reload();
                }
            });
        }
    })


}