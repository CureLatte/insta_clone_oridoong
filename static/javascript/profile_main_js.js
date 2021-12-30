
$(document).ready(function() {
    load_info()

});

function load_info(){
    $.ajax({
        type: "POST",
        url: "/profile_main/load_info",
        data: {user_id: 'kyoung'},
        success: function(response){
            let avatar_path = response['user_info'][0]['avatar'].split('\\')
            let filename = avatar_path[avatar_path.length -1]
            let new_file_path = '../static/images/' + filename

            $("#avatar").attr("src", new_file_path);


            let username = response['user_info'][0]['username']
            $("#name").append(`<p>${username}</p>`);

            let email = response['user_info'][0]['email']
            $("#email").append(`<p>${email}</p>`);

            let number = response['user_info'][0]['phone_number']
            $("#phone_number").append(`<p>${number}</p>`);

            let gender = response['user_info'][0]['gender']
            $("#gender").append(`<p>${gender}</p>`);
        }
    })

}

function move_edit(){
    $.ajax({
        type: 'GET',
        url: '/profile_main/move_edit',
        data: {},
        success: function (response) {

        }
    })
}

function move_add(){
    $.ajax({
        type: 'GET',
        url: '/profile_main/move_add',
        data: {},
        success: function (response) {
            alert('이동!')
        }
    })

}

