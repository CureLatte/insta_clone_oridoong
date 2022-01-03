function check_id_nickname() {
    let id = $('#send-id').val()
    let nickname = $('#send-nickname').val()
    console.log(id,nickname)
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
            window.location.href='/'

        }
    });
}