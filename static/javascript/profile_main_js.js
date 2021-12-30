
$(document).ready(function() {

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
