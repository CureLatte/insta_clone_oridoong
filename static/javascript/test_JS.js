function submit(){
    let user_id = $('#user-name').val()
    let user_password = $('#user-pwd').val()

    $.ajax({
        type: 'POST',
        url: '/login',
        data: {id: user_id, password: user_password },
        success: function(response){
            var user_check = response['user']
            console.log(user_check)
            console.log(window.location.href)
            if (user_check.length === 0){
                window.location.href= window.location.href + '/profile_main'
            }
            else{
                alert('아이디를 확인 해주세요!')
            }
        }
    })
}