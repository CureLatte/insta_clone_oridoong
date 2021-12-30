
$(document).ready(function() {
    load_info()

});

function load_info(){
    $.ajax({
        type: "POST",
        url: "/profile_main/load_info",
        data: {user_id: 'kyoung'},
        success: function(response){
            console.log(response['user_info'][0])
            let avatar_path = response['user_info'][0]['avatar'].split('\\')
            let filename = avatar_path[avatar_path.length -1]
            let new_file_path = '../static/images/user/' + filename
            console.log(new_file_path)
            $("#avatar").attr("src", new_file_path);

            let username = response['user_info'][0]['username']
            $("#nickname").append(`<p>${username}</p>`);

            let name = response['user_info'][0]['name']
            $("#name").append(`<p>${name}</p>`);

            let bio = response['user_info'][0]['bio']
            $("#bio").append(`<p>${bio}</p>`);

            let email = response['user_info'][0]['email']
            $("#email").append(`<div> Email : ${email}</div>`);

            let number = response['user_info'][0]['phone_number']
            $("#phone_number").append(`<p>phone : ${number}</p>`);

            let gender = response['user_info'][0]['gender']
            $("#gender").append(`<p>gender : ${gender}</p>`);
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


function more(){
    if ($("#more_info").display == none){
        alert('hide')
    }
}
