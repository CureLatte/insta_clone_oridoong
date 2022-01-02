function open_like_history(){
    if ($('.like_history_container').css('display')=='none'){
        $('.like_history_container').show();


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
    window.location.href = '/profile_main/' + obj.alt;

}

function more_header_on(){

}