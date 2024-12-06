const emailForm = document.getElementById("join-email-form");
const verificationCodeWrap = document.querySelector(".verification-code-wrap")
const messageWrap = document.querySelector(".message-wrap.error")
const errorMessageTime = document.querySelector(".time");
const sendBtn = document.querySelector(".primary-btn");
const inputEmail = document.getElementById("input-email");

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
    verificationCodeWrap.classList.add("on");
    messageWrap.classList.add("on");
    sendBtn.textContent = "인증하기"
}

inputEmail.addEventListener("input", handleBtnDisabled);
emailForm.addEventListener("submit", handleSubmit)