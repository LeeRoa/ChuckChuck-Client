const joinForm = document.getElementById("joinForm");
const items = [...document.querySelectorAll('[name=check-agree]')];
const checkAll = document.getElementById("allAgree");
const nextBtn = document.getElementById("next-btn");
const errorMessage = document.querySelector(".message");
const inputName = document.getElementById("inputName");
const inputYear = document.getElementById("birthYear")
const inputMonth = document.getElementById("birthMonth")
const inputDate = document.getElementById("birthDate")

const handleCheckItem = (elements) => {
    if (elements.some((element) => element.id.includes("require") && !element.checked)) {
        nextBtn.classList.add("disabled");
        nextBtn.disabled = true;
    } else {
        nextBtn.classList.remove("disabled");
        nextBtn.disabled = false;
    }
};

items.forEach((item) => {
    item.onchange = () => {
        handleCheckItem(items);
        checkAll.checked = items.every(check => check.checked);
    };
});

checkAll.onchange = (e) => {
    items.forEach((item) => {
        item.checked = e.target.checked;
    });
    handleCheckItem(items);
};

const handleNumberLength = (e, length, date) => {
    let value = e.target.value;

    if (value < 0) return e.target.value = 0;

    if (value.length > length || value > 10000) {
        e.target.value = value.slice(0, length);
    }

    if (value > date) {
        e.target.value = value.slice(0, 1);
    }
};

inputYear.addEventListener("input", (e) => {
    handleNumberLength(e, 4);
});
inputMonth.addEventListener("input", (e) => {
    handleNumberLength(e, 2, 12);
});
inputDate.addEventListener("input", (e) => {
    handleNumberLength(e, 2, 31);
});

const handleSubmit = (e) => {
    e.preventDefault();

    const empName = inputName.value;
    const birthYear = inputYear.value;
    const birthMonth = inputMonth.value;
    const birthDate = inputDate.value;

    errorMessage.classList.remove("on");

    if (empName === "") {
        drawErrorMessage(errorMessage, "이름을 입력해 주세요.");
        return;
    }

    if (scRegex.test(empName) || trimRegex.test(empName)) {
        drawErrorMessage(errorMessage, "사용할 수 없는 이릅니다.");
        return;
    }

    if (birthYear === "" || birthMonth === "" || birthDate === "") {
        return;
    }

    if (birthYear.length < 4) {
        return;
    }

    if (birthMonth.length < 1 || birthDate.length < 1) {
        return;
    }

    const format = (value) => value.length === 1 ? `0${value}` : value;
    const empBirth = `${birthYear}-${format(birthMonth)}-${format(birthDate)}`;

    sessionStorage.setItem("empName", empName);
    sessionStorage.setItem("empBirth", empBirth);

    location.href = "/join/verify-email";
};

joinForm.addEventListener("submit", handleSubmit);