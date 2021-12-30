
// 아이디 중복 체크
function check_user_id(obj) {
    let user_id = $(obj).val();
    let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;

    if(!(regExp.test(user_id))){
        check_on_off(obj, false);
        return
    }

    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            user_id_give: user_id
        },
        success: function(response){
            let check_id = response['check_id'];

            check_on_off(obj, check_id);
        }
    });
}

// 패스워드 체크
function check_pwd(obj) {
    let value = $(obj).val();
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;

    check_on_off(obj, regExp.test(value));
}

// 핸드폰 번호 체크
function check_phone(obj) {
    let value = $(obj).val();
    let regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    check_on_off(obj, regExp.test(value));
}

// 이메일 체크
function check_email(obj) {
    let value = $(obj).val();
    let regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    check_on_off(obj, regExp.test(value));
}

// 값이 비었는지 확인
function check_empty(obj) {
    let obj_val = $(obj).val();
    let obj_bool = (obj_val.length !== 0);

    check_on_off(obj, obj_bool);
}

// obj 받아서 이미지 on/off
function check_on_off(obj, is_visible){
    let obj_id = obj.id;
    let value = obj.value;

    if(value.length === 0) {
        $("#" + obj_id + "-no").hide();
        $("#" + obj_id + "-yes").hide();
    }
    else if(is_visible) {
        $("#" + obj_id + "-no").hide();
        $("#" + obj_id + "-yes").show();
    } else {
        $("#" + obj_id + "-yes").hide();
        $("#" + obj_id + "-no").show();
    }

    check_sign_up_button();

}

// 모든 조건을 확인 후 만족하면 버튼 활성화
function check_sign_up_button(){
    let get_input = $("#input-wrapper [type=text]");
    let input_count = 0;

    if($("#pwd-yes").is(":visible")){
        input_count += 1;
    }

    $.each(get_input, function (index, obj){
        if($("#" + obj.id + "-yes").is(":visible")){
            input_count += 1;
        }
    })

    let gender = $("#gender option:selected").val();

    if((input_count > 5) && (gender != "")) {
        $("#sign-up-button").attr('disabled', false);
    } else {
        $("#sign-up-button").attr('disabled', true);
    }
}

// 가입버튼
function sign_up() {
    let get_input = $("#input-wrapper [type=text]");
    let user_dict = {};

    $.each(get_input, function (index, obj){
        obj.id = obj.id.replace('-', '_');
        user_dict[obj.id] = obj.value;
    })
    user_dict['pwd'] = $("#pwd").val();
    user_dict['gender'] = $("#gender option:selected").val();

    $.ajax({
        type: "POST",
        url: "/sign_up/save",
        data: user_dict,
        success: function(response){
            alert(response['msg']);
            window.location.href = "/";
        }
    });

}
