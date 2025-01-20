// server
const serverUrl = "https://localhost:28444";

// 이메일 정규
const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// 6자리 정규식
const sixDigitRegex = /^\d{6}$/;

// 비밀번호 정규
const regex_pwd = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,32}$/;
// 특수문자 허용 범위
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;


// 버튼 활성화
const handleBtnDisabled = (element, button) => {
    element.value ? button.disabled = false : button.disabled = true;
};

// 에러 메시지
const drawErrorMessage = (errorEle, string) => {
    errorEle.classList.add("error", "on");
    errorEle.innerText = string;
};

// 두자리 숫자 만들기
const makeTwoDigit = (num) => {
    return String(num).padStart(2, "0");
}