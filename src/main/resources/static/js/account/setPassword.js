let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;
const inputPassword = document.getElementById("password")
const inputPasswordChk = document.getElementById("password-chk")
const errorWrap = document.querySelector(".message-wrap.error")
const nextBtn = document.querySelector(".primary-btn")

const checkPassword = () => {
    const passwordValue = inputPassword.value
    const passwordChkValue = inputPasswordChk.value

    if (passwordValue !== passwordChkValue) {
        return errorWrap.classList.add("on")
    } else {
        return errorWrap.classList.remove("on")
    }
}

const handleBtnDisabled = (e) => {
    if (inputPassword.value) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

inputPasswordChk.addEventListener("input", checkPassword);
inputPassword.addEventListener("input", handleBtnDisabled);