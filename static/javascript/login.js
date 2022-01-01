function login() {
    let username = $("#user_id").val()
    let password = $("#user_pw").val()

    if (username == "") {
        $("#help-id-login").text("아이디를 입력해주세요.")
        $("#user_id").focus()
        return;
    } else {
        $("#help-id-login").text("")
    }

    if (password == "") {
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#user_pw").focus()
        return;
    } else {
        $("#help-password-login").text("")
    }
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: {id_give: $('#user_id').val(), pw_give: $('#user_pw').val()},
        success: function (response) {
            if (response['result'] == 'success') {
                // 로그인이 정상적으로 되면, 토큰을 받아옵니다.
                // 이 토큰을 mytoken이라는 키 값으로 쿠키에 저장합니다.
                alert('로그인 완료!')
                $.cookie('mytoken', response['token']);

                window.location.href = '/index_page'
            } else {
                // 로그인이 안되면 에러메시지를 띄웁니다.
                $("#help-login").text('아이디 또는 비밀번호가 잘못 입력 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.')
            }
        }
    })
}


function check_id_nickname() {
    let id = $('#send-id').val()
    let nickname = $('#send-nickname').val()

    $.ajax({
        type: 'POST',
        url: '/login/find-pwd',
        data: {find_id: id, find_nickname: nickname},
        success: function (response) {
            alert(response['msg'])

        }
    });
}

function update_pwd() {
    let pwd = $('#new-pwd').val()
    let id = $('#send-id').val()

    $.ajax({
        type: 'POST',
        url: '/login/update-pwd',
        data: {new_pwd: pwd, find_id: id},
        success: function (response) {
            alert(response['msg'])

        }
    });
}