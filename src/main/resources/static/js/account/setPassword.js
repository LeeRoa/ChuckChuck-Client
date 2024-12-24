let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;
const inputPassword = document.getElementById("password")
const inputPasswordChk = document.getElementById("passwordChk")
const errorMessage = document.querySelector(".message.error")
const nextBtn = document.querySelector(".primary-btn")

const regex_pwd = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,32}$/

const checkPassword = () => {
    const passwordValue = inputPassword.value
    const passwordChkValue = inputPasswordChk.value

    if (passwordValue !== passwordChkValue) {
        return errorMessage.classList.add("on")
    } else {
        return errorMessage.classList.remove("on")
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