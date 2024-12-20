const findPwForm = document.getElementById("findPwForm")
const inputEmail = document.getElementById("inputFindPw")
const errorMessage = document.querySelector(".message.info")
const verifyContainer = document.querySelector(".verify-container")
const verifyCode = document.getElementById("verifyCode")
const codeErrorMessage = document.querySelector(".code-time-wrap > p:first-child")
const sendBtn = document.querySelector(".primary-btn")

let emailSubmitted = false;

const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailSubmitted) {
        if (inputEmail.value.trim() === "") {
            errorMessage.classList.remove("info")
            errorMessage.classList.add("error", "on")
            errorMessage.innerText = "이메일을 입력하세요."
            return
        }

        inputEmail.readOnly = true;
        verifyContainer.classList.add("on");
        codeErrorMessage.innerText = "2분 내로 인증을 완료해주세요."
        sendBtn.textContent = "인증하기"
        emailSubmitted = true;
        return
    }

    if (verifyCode.value.trim() === "") {
        codeErrorMessage.innerText = "인증번호를 입력해 주세요"
        return
    } else if (verifyCode.value.length !== 6) {
        codeErrorMessage.innerText = "6자리 인증번호를 입력해 주세요"
        return
    } else if (verifyCode.value !== "567892") {
        codeErrorMessage.innerText = "인증번호가 일치하지 않습니다."
        return
    }

    if (verifyCode.value.trim() === "567892") {
        location.href = "/login/find-pw/reset-password"
    }
}


findPwForm.addEventListener("submit", handleSubmit)