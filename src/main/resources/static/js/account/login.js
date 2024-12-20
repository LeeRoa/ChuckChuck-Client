function onLogin(){
    const loginID = $('#loginForm [name="loginID"]');
    const password = $('#loginForm [name="password"]');
    const errorMessage = $('.message.error')
    errorMessage.removeClass('on')
    if(loginID.val().trim()==="" || password.val().trim()==="") {
        errorMessage.addClass('on')
        return;
    }
    $('#loginForm').submit();
}