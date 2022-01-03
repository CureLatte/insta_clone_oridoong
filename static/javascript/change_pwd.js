$(document).ready(function () {
            hide();
        });

function hide() {
    $('#change-box').hide()
}

function check_id_email() {
    $.ajax({
        type: 'POST',
        url: '/change_pwd/find-pwd',
        data: {find_id: $('#send-id').val(), find_email: $('#send-email').val()},
        success: function (response) {
            alert(response['msg'])
            $('#change-box').show()
        }
    });
}

function change_pwd() {
    $.ajax({
        type: 'POST',
        url: '/change_pwd/update-pwd',
        data: {give_new_pwd: $('#new_pwd').val(), find_id: $('#send-id').val()},
        success: function (response) {
            alert(response['msg'])
            location.href = "/"
        }
    });
}
