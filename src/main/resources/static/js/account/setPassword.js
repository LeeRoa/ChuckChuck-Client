const passwordForm = document.getElementById("passwordForm");
const inputPassword = document.getElementById("password");
const inputPasswordChk = document.getElementById("passwordChk");
const notMatchPwMessage = document.getElementById("notMatchPw");
const invalidPwMessage = document.getElementById("isValidPw")

const nextBtn = document.getElementById("nextBtn");

const checkPassword = () => {
    const passwordValue = inputPassword.value;
    let passwordChkValue = inputPasswordChk.value;

    if (passwordValue !== passwordChkValue) {
        drawErrorMessage(notMatchPwMessage, "비밀번호가 일치하지 않습니다.");
        return false;
    } else {
        notMatchPwMessage.innerText = "";
        notMatchPwMessage.classList.remove("on", "error");
    }
    return passwordChkValue;
};

const handleSubmit = (e) => {
    e.preventDefault();
    let empPw = checkPassword();

    if (empPw) {
        if (!passwordRegex.test(empPw)) {
            invalidPwMessage.classList.add("invalid")
            return
        }
        sessionStorage.setItem("empPw", empPw)
        location.href = "/join/request-join"
    }
};


inputPasswordChk.addEventListener("input", checkPassword);
inputPassword.addEventListener("input", () => {
    handleBtnDisabled(inputPassword, nextBtn);
});
passwordForm.addEventListener("submit", handleSubmit);