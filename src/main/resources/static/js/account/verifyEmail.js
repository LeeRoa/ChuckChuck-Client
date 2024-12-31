const emailForm = document.getElementById("emailForm");
const verifyContainer = document.querySelector(".verify-container");
const messageTime = document.querySelector(".time");
const sendBtn = document.querySelector(".primary-btn");
const inputEmail = document.getElementById("inputEmail");
const verifyCode = document.getElementById("verifyCode");
const errorMessage1 = document.querySelector(".message.info");
const errorMessage2 = document.querySelector(".code-time-wrap > p:first-child");
const resendBtn = document.getElementById("resendBtn");

let emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

let code = "567892";

let totalSeconds = 120;
let intervalId = null;

const drawTwoMinute = () => {

    if (totalSeconds !== 0) {
        totalSeconds--;

        console.log(totalSeconds);

        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;

        const formatMin = min < 10 ? `0${min}` : min;
        const formatSec = sec < 10 ? `0${sec}` : sec;

        return messageTime.innerText = `${formatMin}:${formatSec}`;

    } else {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            return messageTime.innerText = "00:00";
        }
    }

};

const handleTwoMinute = () => {
    if (intervalId) return;
    intervalId = setInterval(drawTwoMinute, 1000);
};

const handleBtnDisabled = (e) => {
    inputEmail.value ? sendBtn.disabled = false : sendBtn.disabled = true;
};

const handleResendCode = () => {
    // 시간과 관계 없이 재전송 누르면 코드 재발송
    alert("인증번호가 재 전송 되었습니다.");

    code = "789021";
    if (intervalId) {
        totalSeconds = 120;
        handleTwoMinute();
    }
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(inputEmail.value)) {
        errorMessage1.classList.add("error");
        errorMessage1.classList.add("on");
        errorMessage1.innerText = "이메일 형식이 아닙니다.";
        return;
    }

    inputEmail.readOnly = true;
    errorMessage1.classList.remove("error");
    errorMessage1.classList.remove("on");
    errorMessage1.style.display = "none";
    verifyContainer.classList.add("on");
    errorMessage2.innerText = "2분 내로 인증을 완료해 주세요.";

    sendBtn.textContent = "인증하기";

    handleTwoMinute();

    if (totalSeconds === 0) {
        errorMessage2.innerText = "인증시간이 초과 되었습니다. 인증번호를 다시 발급 받으세요.";
        return;
    }

    if (verifyCode.value.trim() === "") {
        errorMessage2.innerText = "인증번호를 입력해 주세요.";
        return;
    } else if (verifyCode.value.length !== 6) {
        errorMessage2.innerText = "6자리 인증번호를 입력해 주세요.";
        return;
    } else if (verifyCode.value !== code) {
        errorMessage2.innerText = "인증번호가 일치하지 않습니다.";
        return;
    }

    if (verifyCode.value.trim() === code) {
        sessionStorage.setItem("userEmail", inputEmail.value);
        location.href = "/join/set-password";
    }
};

inputEmail.addEventListener("input", handleBtnDisabled);
emailForm.addEventListener("submit", handleSubmit);
resendBtn.addEventListener("click", handleResendCode);