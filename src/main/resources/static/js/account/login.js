function onLogin(){
    const loginID = $('#loginForm [name="empEmail"]').val().trim();
    const password = $('#loginForm [name="empPw"]').val().trim();
    const errorMessage = $('.message.error')
    errorMessage.removeClass('on')
    if(loginID==="" || password==="") {
        errorMessage.addClass('on')
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/loginProcess',
        data: {empEmail: loginID, empPw: password},
        success : function(data) {
            if(data === "0"){
                $('#loginForm').submit();
            }else{
                errorMessage.addClass('on');
            }

        }
    });

}