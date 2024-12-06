let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;
const inputPassword = document.getElementById("password")
const inputPasswordChk = document.getElementById("password-chk")
const errorWrap = document.querySelector(".message-wrap.error")

console.log("gk")

const checkPassword = () => {
    const passwordValue = inputPassword.value
    const passwordChkValue = inputPasswordChk.value

    if (passwordValue !== passwordChkValue) {
        return errorWrap.classList.add("on")
    } else {
        return errorWrap.classList.remove("on")
    }
}

inputPasswordChk.addEventListener("input", checkPassword);