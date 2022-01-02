$(document).ready(function(){
    load_user_info_profile();

})

$(document).mouseup(function (e) {
    let dialogPopup = $("#more_container");
    if (dialogPopup.has(e.target).length === 0 ) {
        $("#more_container").hide();

    }

    let like_history = $("#like_history_container");
    if (dialogPopup.has(e.target).length === 0) {
        $("#like_history_container").hide();
    }
});


//  like_history 부분
function open_like_history(){
    if ($('.like_history_container').css('display')==='none'){
        $('.like_history_container').show();
        $('.header_more_container').hide();
        let test = []
        // for(let i=0; i<=follow_info.length;i++){
        //     test.append(follow_info[i])
        // }

    }
    else{
        $('.like_history_container').hide();
    }

    GET_follower_data();
}

function GET_follower_data(){
    $.ajax({
            type:'GET',
            url: '/profile_test_main/follow',
            data: {},
            success: function(response){
                let follow_info=response['data']
                let follower_info=response['data']

            }
        })
}

function profile_main(obj) {
    window.location.href = '/profile_main/' +obj.alt;

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

function check_more_header_other() {
    let more_btn = document.getElementById('index_main_header_profile');

    dialog.showModal();

    $(document).mouseup(function (e) {
        let dialogPopup = $("#index_main_header_profile");
        if (dialogPopup.has(e.target).length === 0) {
            $("#index_main_header_profile").hide();
        }
    });
}
