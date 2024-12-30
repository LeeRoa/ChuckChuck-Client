const emailForm = document.getElementById("joinForm");
const verifyContainer = document.querySelector(".verify-container")
const messageTime = document.querySelector(".time");
const sendBtn = document.querySelector(".primary-btn");
const inputEmail = document.getElementById("inputEmail");
const verifyCode = document.getElementById("verifyCode")
const errorMessage1 = document.querySelector(".message.info");
const errorMessage2 = document.querySelector(".code-time-wrap > p:first-child")

let emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

let totalSeconds = 120;
let intervalId;

const drawTwoMinute = () => {
    if (totalSeconds > 120) {

        clearInterval(intervalId);
        console.log("2분초과")
        return
    }

    totalSeconds--;

    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    const formatMin = min < 10 ? `0${min}` : min;
    const formatSec = sec < 10 ? `0${sec}` : sec;

    return messageTime.innerText = `${formatMin}:${formatSec}`;
}

intervalId = setInterval(drawTwoMinute,1000)

const handleBtnDisabled = (e) => {
    inputEmail.value ? sendBtn.disabled = false : sendBtn.disabled = true;
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(inputEmail.value)) {
        errorMessage1.classList.add("error");
        errorMessage1.classList.add("on");
        errorMessage1.innerText = "이메일 형식이 아닙니다."
        return;
    }

    inputEmail.readOnly = true;
    errorMessage1.classList.remove("error");
    errorMessage1.classList.remove("on");
    errorMessage1.style.display = "none";
    verifyContainer.classList.add("on");

    // drawTwoMinute(totalSeconds)
    sendBtn.textContent = "인증하기";


    if (verifyCode.value.trim() === "") {
        errorMessage2.innerText = "인증번호를 입력해 주세요";
        return;
    } else if (verifyCode.value.length !== 6) {
        errorMessage2.innerText = "6자리 인증번호를 입력해 주세요";
        return;
    } else if (verifyCode.value !== "567892") {
        errorMessage2.innerText = "인증번호가 일치하지 않습니다.";
        return;
    }

    if (verifyCode.value.trim() === "567892") {
        alert("인증번호일치")
    }
}

inputEmail.addEventListener("input", handleBtnDisabled);
emailForm.addEventListener("submit", handleSubmit)