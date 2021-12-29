function login() {
    let username = $("#user_id").val()
    let password = $("#user_pw").val()

    if (username == "") {
        $("#help-id-login").text("아이디를 입력해주세요.")
        alert("아이디를 입력해주세요.")
        $("#input-username").focus()
        return;
    } else {
        $("#help-id-login").text("")
    }

    if (password == "" && username != "") {
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        alert("비밀번호를 입력해주세요.")
        $("#input-password").focus()
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
                $.cookie('mytoken', response['token']);

                alert('로그인 완료!')
                window.location.href = '/'
            } else {
                // 로그인이 안되면 에러메시지를 띄웁니다.
                alert(response['msg'])
            }
        }
    })
}