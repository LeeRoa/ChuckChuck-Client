const emailForm = document.getElementById("emailForm");
const verifyContainer = document.getElementById("verifyContainer");
const sendBtn = document.getElementById("sendBtn");
const verifyBtn = document.getElementById("verifyBtn")
const inputEmail = document.getElementById("inputEmail");
const timer = document.getElementById("timer");
const verifyCode = document.getElementById("verifyCode");
const checkEmail = document.getElementById("checkEmail");
const verifyError = document.getElementById("verifyError");
const resendBtn = document.getElementById("resendBtn");

let empEmail;

let code = "567892";

let totalSeconds = 120;
let intervalId = null;

const drawTwoMinute = () => {
    if (totalSeconds !== 0) {
        totalSeconds--;

        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;

        return timer.innerText = `${makeTwoDigit(min)}:${makeTwoDigit(sec)}`;

    } else {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            return timer.innerText = "00:00";
        }
    }
};

const handleTwoMinutes = () => {
    if (intervalId) return;
    intervalId = setInterval(drawTwoMinute, 1000);
};

const goToVerify = async() => {
    empEmail = inputEmail.value;

    if (!emailRegex.test(empEmail)) {
        drawErrorMessage(checkEmail, "이메일 형식이 아닙니다")
        return;
    }

    const isEmail = await getExistEmail(empEmail);

    if (isEmail) {
        drawErrorMessage(checkEmail, "중복된 이메일 입니다.")
        return;
    } else if (isEmail === "404") {
        return alert("통신오류")
    } else {
        await getValidCod(empEmail);
    }

    sendBtn.classList.add("off")
    verifyBtn.classList.add("on")
    inputEmail.readOnly = true;
    checkEmail.classList.remove("error", "on");
    checkEmail.style.display = "none";
    verifyContainer.classList.add("on");

    handleTwoMinutes();
}

const handleResendCode = () => {
    // 남은시간과 관계 없이 재전송 누르면 코드 재발송
    if (confirm("인증번호를 새로 받으시겠습니까?")) {
        alert("인증번호가 재 전송 되었습니다.");

        code = "789021";
        if (intervalId) {
            totalSeconds = 120;
            handleTwoMinutes();
        }
    } else {
        alert("인증번호 재전송 취소")
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalSeconds === 0) {
        verifyError.innerText = "인증시간 초과입니다. 인증번호 재발급 받으세요.";
        return;
    }

    if (verifyCode.value.trim() === "") {
        verifyError.innerText = "인증번호를 입력해 주세요.";
        return;
    } else if (!sixDigitRegex.test(verifyCode.value)) {
        verifyError.innerText = "6자리 숫자 인증번호를 입력해 주세요.";
        return
    } else if (verifyCode.value !== code) {
        verifyError.innerText = "인증번호가 일치하지 않습니다.";
        return;
    }

    if (verifyCode.value.trim() === code) {
        sessionStorage.setItem("empEmail", empEmail);
        location.href = "/join/set-password";
    }
};

const getExistEmail = async (empEmail) => {
    const response = await fetch(`${serverUrl}/emp`, {
        method: "GET",
        headers: {contentType: "application/json"},
    });
    try {
        if (response.status === 200) {
            const data = await response.json();
            if (data.resultCode === '0') {
                const isEmpEmail = data.empInfo.find(mail => mail.empEmail === empEmail)
                if (isEmpEmail === empEmail) return true
            }
        } else if (response.status === 404) {
            return "404"
        }
    } catch (error) {
        console.log(error);
    }
};

const getValidCod = async (empEmail) => {
    const response = await fetch(`${serverUrl}/emp/validate`, {
        method: "POST",
        headers: {contentType: "application/json"},
        body: JSON.stringify({ empEmail })
    })
    try {
        console.log(response)
        if (response.status === 200) {
            const data = response.json()
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

inputEmail.addEventListener("input", () => {
    handleBtnDisabled(inputEmail, sendBtn)
});
sendBtn.addEventListener("click", goToVerify)
emailForm.addEventListener("submit", handleSubmit);
resendBtn.addEventListener("click", handleResendCode);