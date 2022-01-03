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

                    for (let i = 0; i < like_user.length; i++) {
                        if (like_user[i] === login_user) {
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
                                            <p><b><strong>${login_user}</strong></b></p>
                                            <input onclick="see_comment()" type="button" id="all-comment" style="color: #747577; background-color: white; border: none;" value="댓글 모두 보기">
                                        </div>
                                        <div id="comment-box">
                                            <input type="text" id="comment-text" placeholder="댓글 달기..." />
                                            <input onclick="post_comment(${i})" type="button" id="comment-post" value="게시">
                                            <div id="comment-list">
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                `
                    $("#content-wrapper").append(temp_html);
                    index++;
                }
            }

            let user_id = response[2];
            for(let i = 0; i < user_id.length; i++) {
                let user_name = user_id[i]["user_name"]
                let user_bio = user_id[i]["bio"]
                let avata = user_id[i]["avatar"]
                let temp_html = ``;
                temp_html = `
                                    <ul>
                                        <li>
                                            <div>
                                                <img src="/static/images/user/${avata}")
                                                <h5>${user_name}</h5>
                                                <p>${user_bio}</p>
                                            </div>
                                            <span onclick="follow(this)" name="${user_name}">
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
    let name_by_id = obj.getAttribute('name');
    let follow = obj.innerText;

    if(follow === "팔로우"){
        obj.innerText = "팔로우 취소"
    } else {
        obj.innerText = "팔로우"
    }

    $.ajax({
        type: "POST",
        url: "/index_page/post",
        data: {"user_name_id_give": name_by_id, "follow": follow},
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

// 댓글 온오프 버튼
function see_comment() {
    if ($("#comment-list").css('display') == 'none') {
        $("#comment-list").show();
    }else {
        $("#comment-list").hide();
    }
}

// 댓글 작성
function post_comment(index) {
    let user_name = document.querySelectorAll(".post-left-wrapper p")[index].textContent
    let post_img = document.querySelectorAll(".image_box")[index].style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1').split("/")
    post_img = post_img[post_img.length-1]

    $.ajax({
        type: "POST",
        url: "/index_page/comment",
        data: {comment_give: $('#comment-text').val(),post_give: post_img , user_id_give: user_name},
        success: function (response) {
            console.log(response)
        }
    })
}

// 댓글 가져오기
function comment_list() {
    $.ajax({
        type: "GET",
        url: "/index_page/comment",
        data: {},
        success: function (response) {
            let rows = response['comments']['container'][0]['comment'];

            for (let i = 0; i < rows.length; i++) {



            }
        }
    })
}
