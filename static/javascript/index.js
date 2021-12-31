$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/index_page/post",
        data: {},
        success: function (response) {
            let rows = response['all_photo'];

            for (let i = 0; i < rows.length; i++){
                let photo = rows[i]['photo'];
                let name = rows[i]['name'];
                let temp_html = ``;

                if (photo) {
                    temp_html = `
                                <div class="content">
                                    <section class="con">
                                        <div class="userInfo">
                                            <a href="#" onclick="profile_main(this)" >
                                                <h4>${name}</h4>
                                            </a>
                                            <div class="is_pointer">
                                                <img src="../static/images/more@3x.png" onclick="opendia()" alt="">
                                            </div>
                                        </div>
                                        <div class="image_box"></div>
                                            <div class="left-wrapper">
                                                <img src="../static/images/like@3x.png" onclick="like(this)" alt="${name}">
                                                <img class="icon-2" src="../static/images/comment@3x.png">
                                                <img src="../static/images/dm@3x.png">
                                                <img class="right-wrapper" src="../static/images/favorite@3x.png">
                                            </div>
                        
                                        <div class="comment">
                                            <h4><strong>${name}</strong>님 외 <strong id="${name}likey">0명</strong>이 좋아합니다.</h4>
                                            <p><strong>돈통</strong> : 안녕하세요</p>
                                            <span>2시간 전</span>
                                        </div>
                                    </section>
                                </div>
                                `
                    $("#content-wrapper").append(temp_html)
                }

            }
        }
    });
})

function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

function like(data) {
    let likey = Number(document.getElementById(`${data.alt}likey`).innerText.split('명')[0])
    if (data.attributes[0].value === '../static/images/like@3x.png') {
        data.setAttribute('src', '../static/images/like@4x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey + 1)}명`
    } else {
        data.setAttribute('src', '../static/images/like@3x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey - 1)}명`
    }
}

function opendia() {
    let dialog = document.getElementById('dialog');

    if(typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert('예기치 못한 오류')
    }
    dialog.addEventListener('cancel', function onClose() {
        window.location.reload()
    });
}

function profile_main(obj) {
    window.location.href='/profile_main/' + obj.innerText;
}