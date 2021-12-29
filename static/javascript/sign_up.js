function check_user_id(obj) {
    let user_id = obj.value

    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            user_id_give: user_id
        },
        success: function(response){
            let check_id = response['check_id']
            if(check_id) {
                $("#user-id-no").hide()
                $("#user-id-yes").show()
            } else{
                $("#user-id-yes").hide()
                $("#user-id-no").show()
            }
        }
    });
}

function check_pwd(obj) {
    let pwd = obj.value
    if(pwd.length == 0) {
        $("#pwd-yes").hide()
        $("#pwd-no").show()
    } else {
        $("#pwd-no").hide()
        $("#pwd-yes").show()
    }
}