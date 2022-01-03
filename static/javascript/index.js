$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/index_page/post",
        data: {},
        success: function (response) {
            let rows = response[0]['all_photo'];
            let login_user = response[1];
            let index = 0;

            document.getElementById('user-home').alt = login_user;

            for (let i = 0; i < rows.length; i++) {
                let photo = rows[i]['container'][0]['photo'];
                let photo_like = rows[i]['container'][0]['like'];
                let avatar = rows[i]['avatar'];
                let user_name = rows[i]['user_name']
                let name = rows[i]['name'];
                let like_user = rows[i]['container'][0]['like_user']

                let temp_image_html = ``;
                let temp_html = ``;

                temp_image_html = `<img src="../static/images/like@3x.png" onclick="like(this)" alt="${name},${photo}">`;

                    for(let i = 0; i < like_user.length; i++) {
                        if(like_user[i] === login_user){
                            temp_image_html = `<img src="../static/images/like@4x.png" onclick="like(this)" alt="${name},${photo}">`;
                            break;
                        }
                    }

                if (photo) {
                    temp_html = `
                                <div class="content">
                                    <section class="con">
                                        <div class="userInfo">
                                            <div class="post-left-wrapper">
                                                <img src="static/images/user/${avatar}" onclick="profile_main(this)" alt="${name}"/>
                                                <p>${user_name}</p>
                                            </div>
                                            <div class="is_pointer">
                                                <img src="../static/images/more@3x.png"">
                                            </div>
                                        </div>
                                        <div class="image_box" style="background-image: url('/static/images/post-contents/${photo}')"></div>
                                            <div class="left-wrapper">
                                                ${temp_image_html}
                                                <img class="icon-2" src="../static/images/comment@3x.png">
                                                <img src="../static/images/dm@3x.png">
                                                <img class="right-wrapper" src="../static/images/favorite@3x.png">
                                            </div>
                        
                                        <div class="comment">
                                            <h4><strong>${login_user}</strong>님 외 <strong id="${name}like">${photo_like}명</strong>이 좋아합니다.</h4>
                                        </div>
                                    </section>
                                </div>
                                `
                    $("#content-wrapper").append(temp_html);
                    index++;
                }
            }
        }
    });
    $.ajax({
        type: "GET",
        url: "/index_page/post",
        data: {},
        success: function (response) {
            user_id = response[2];

            for (var i = 0; i < user_id.length; i++) {
                let user = user_id[i]["user_id"]
                let user_bio = user_id[i]["bio"]
                let temp_html = ``;
                temp_html = `
                                    <ul>
                                        <li>
                                            <div>
                                                <h5>${user}</h5>
                                                <p>${user_bio}</p>
                                            </div>
                                            <span onclick="follow(this)" name="${user}">
                                                팔로우
                                            </span>
                                        </li>
                                    </ul>
                                    `
                $(".recommend").append(temp_html)
            }

        }
    });
})

function follow(obj) {
    var name_by_id = obj.getAttribute('name');
    $.ajax({
        type: "POST",
        url: "/index_page/post",
        data: { "user_name_id_give": name_by_id },
        success: function (response) {
            alert(response["msg"])
        }
    });
}


function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

// 하트 버튼
function like(data) {
    let name = data.alt.split(',')[0];
    let photo = data.alt.split(',')[1];
    let like = Number(document.getElementById(`${name}like`).innerText.split('명')[0]);
    let like_count;
    let login_user = document.getElementById('user-home').alt;

    if (data.attributes[0].value === '../static/images/like@3x.png') {
        like_count = like + 1;
        login_user = login_user + ",1";
        data.setAttribute('src', '../static/images/like@4x.png');
    } else {
        like_count = like - 1;
        login_user = login_user + ",0";
        data.setAttribute('src', '../static/images/like@3x.png');
    }

    $.ajax({
        type: "POST",
        url: "/main/user_like",
        data: {'photo': photo, 'like_count': like_count, 'login_user': login_user},
        success: function (response) {
            document.getElementById(`${name}like`).innerText = `${String(response['user_like'])}명`;
        }
    });
}

// 헤더 홈 버튼
function profile_main(obj) {
    window.location.href = '/profile_main/' + obj.alt;
}
