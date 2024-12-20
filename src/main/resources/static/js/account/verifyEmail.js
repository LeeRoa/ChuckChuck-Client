const emailForm = document.getElementById("joinForm");
const verifyContainer = document.querySelector(".verify-container")
const messageTime = document.querySelector(".time");
const sendBtn = document.querySelector(".primary-btn");
const inputEmail = document.getElementById("inputEmail");
const verifyCode = document.getElementById("verifyCode")
const errorMessage = document.querySelector(".code-time-wrap > p:first-child")

let emailRegex = '^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';

const handleBtnDisabled = (e) => {
    if (inputEmail.value) {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    inputEmail.readOnly = true;
    verifyContainer.classList.add("on");
    sendBtn.textContent = "인증하기"

    if (verifyCode.value.trim() === "") {
        errorMessage.innerText = "인증번호를 입력해 주세요"
        return
    } else if (verifyCode.value.length !== 6) {
        errorMessage.innerText = "6자리 인증번호를 입력해 주세요"
        return
    } else if (verifyCode.value !== "567892") {
        errorMessage.innerText = "인증번호가 일치하지 않습니다."
        return
    }

    if (verifyCode.value.trim() === "567892") {
        alert("인증번호일치")
    }
}

inputEmail.addEventListener("input", handleBtnDisabled);
emailForm.addEventListener("submit", handleSubmit)