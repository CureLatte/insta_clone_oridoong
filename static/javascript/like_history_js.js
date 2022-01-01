function open_like_history(){
    if ($('.like_history_container').css('display')=='none'){
        $('.like_history_container').show();
        let follow_info = GET_follower_data();
        let test = []
        console.log(follow_info)
        follow_info.sort((a, b) => {
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0 ;
        });
        console.log(follow_info)
        // for(let i=0; i<=follow_info.length;i++){
        //     test.append(follow_info[i])
        // }

    }
    else{
        $('.like_history_container').hide();
    }


}

function GET_follower_data(){
    alert('GEt')
    $.ajax({
            type:'GET',
            url: '/profile_test_main/follow',
            data: {},
            success: function(response){
                let follow_info=response['data']['follow']
                return follow_info

            }

        })

}