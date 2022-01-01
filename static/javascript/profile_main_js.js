
$(document).ready(function() {
    on_edit_profile_button()
});

function move_edit(){
   window.location.href='/edit_profile'
}

function more(){

    if($("#more_info").css("display") == "none"){
        $("#more_info").show();
    }
    else{
        $("#more_info").hide();

    }
}

function on_edit_profile_button(){
    if($("#edit_button").css("display") == "none"){
        $("#edit_button").show();
    }
    else{
        $("#more_info").hide();

    }
}

function load_post_content(){

}
