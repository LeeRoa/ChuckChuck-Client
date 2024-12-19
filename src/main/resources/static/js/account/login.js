function onLogin(){
    const loginID = $('#login-form [name="loginID"]');
    if(loginID.val().trim()==="") {
        alert("아이디를 입력하세요.");
        loginID.focus();
        return;
    }
    const password = $('#login-form [name="password"]');
    if(password.val().trim()==="") {
        alert("패스워드를 입력하세요.");
        password.focus();
        return;
    }

    $('#login-form').submit();
}

