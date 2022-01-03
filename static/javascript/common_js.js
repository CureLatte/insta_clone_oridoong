$(document).ready(function () {
    load_user_info_profile();
})


//  like_history 부분
function open_like_history(obj) {
    if ($('#like_history_container_id').css('display') === 'block') {
        console.log('unvisible!')
        $('#like_history_container_id').hide();

    }
    else{
        console.log('visible!')
        $('#like_history_container_id').show();
        $('.header_more_container').hide();
        GET_follower_data();
        }
    }


function GET_follower_data() {
    $.ajax({
        type: 'GET',
        url: '/profile_test_main/follow',
        data: {},
        success: function (response) {
            let follow_info = response['data']['feed']
            // let test_file = [
            //     {follow_time: "2022-01-02 17:32:14", user_id: "test3"},
            //     {follow_time: "2022-01-01 17:32:14", user_id: "test2"},
            //     {follow_time: "2022-01-02 17:32:14", user_id: "test1"}
            // ]
            // let all_info = follow_info.concat(test_file)

            follow_info.sort(function (a, b) { // 오름차순
                return a.follow_time > b.follow_time ? -1 : a.follow_time < b.follow_time ? 1 : 0;
            });
            console.log(follow_info)
            var now = new Date();
            console.log(now.getDate())

            $('#like_history_wrapper').empty()
            for(let i=0; i<follow_info.length;i++){
                let row = follow_info[i]
                let date = parseInt(now.getDate()) - parseInt(row['follow_time'].split(' ')[0].split('-')[2])
                let temp_html=`<div class="like_history_row">
                                    <div class="like_history_row_header">
                                        ${row['follow_time'].split(' ')[0].split('-')[1]}월${row['follow_time'].split(' ')[0].split('-')[2]}일
                                    </div>
                                    <div class="like_history_row_main">
                                        <div class="like_history_profile">
                                      
                                        </div>
                                        <div class="like_history_content">
                                            <p>${row['user_id']}님이 회원님을 팔로우하기 시작했습니다.   ${date}일전</p>
                                        </div>
                                        <div class="like_history_follow_wrapper">
                                            <button onclick="follow(this)" class="like_history_follow" name="${row['user_id']}">팔로우</button>
                                        </div>
                                    </div>
                                </div>`
                // $("#nd01").css({"background":"url(img.png)"});
                $('#like_history_wrapper').append(temp_html)
            }
        }
    })
}

// more 부분

function open_header_more() {
    if ($('.header_more_container').css('display') === 'none') {
        $('.header_more_container').show();
        $('.like_history_container').hide();
    } else {
        $('.header_more_container').hide();
    }
}


function load_user_info_profile() {
    $.ajax({
        type: 'GET',
        url: '/index_page/header/profile',
        data: {},
        success: function (response) {
            let user_info_for_profile = response['user_info']['avatar']
            let filepath = '../static/images/user/' + user_info_for_profile
            $('#index_main_header_profile').attr('src', filepath)
        }
    })
}

function more_logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/'
}