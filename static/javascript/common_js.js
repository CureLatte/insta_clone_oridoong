$(document).ready(function(){
    load_user_info_profile();
})

// container를 제외한 나머지 부분을 누르면 사라지기!
// $(document).mouseup(function (e) {
//     let dialogPopup = $("#more_container");
//     if (dialogPopup.has(e.target).length === 0 ) {
//         $("#more_container").hide();
//     }
//     let like_history = $("#like_history_container_id");
//     if (like_history.has(e.target).length === 0) {
//         $("#like_history_container_id").hide();
//     }
// });


//  like_history 부분
function open_like_history(){
    if ($('#like_history_container_id').css('display')==='block'){
        $('.like_history_container').hide();

    }
    else{
        $('.like_history_container').show();
        GET_follower_data();
    }


}

function GET_follower_data(){
    $.ajax({
            type:'GET',
            url: '/profile_test_main/follow',
            data: {},
            success: function(response){
                let follow_info=response['data']['follow']
                let test_file=[
                    {follow_time: "2022-01-05 17:32:14", user_id: "test3"},
                    {follow_time: "2022-01-01 17:32:14", user_id: "test2"},
                    {follow_time: "2022-01-02 17:32:14", user_id: "test1"}
                ]
                let all_info = follow_info.concat(test_file)
                // let follower_info=response['data']['follower']
                console.log('follow_info!')
                console.log(all_info)
            }
        })
}

// more 부분

function open_header_more(){
    if($('.header_more_container').css('display')==='none'){
        $('.header_more_container').show();
        $('.like_history_container').hide();
    }
    else{
        $('.header_more_container').hide();
    }
}


function load_user_info_profile(){
    $.ajax({
        type: 'GET',
        url: '/index_page/header/profile',
        data:{},
        success: function(response){
            let user_info_for_profile= response['user_info']['avatar']
            let filepath = '../static/images/user/'+ user_info_for_profile
            $('#index_main_header_profile').attr('src',filepath)
        }
    })
}

function more_logout(){
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/'
}