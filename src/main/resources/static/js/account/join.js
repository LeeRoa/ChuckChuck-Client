const joinForm =document.getElementById("join-form");
const inputEmail = document.getElementById('input-email')
const items = [...document.querySelectorAll('[name=check-agree]')];
const checkAll = document.getElementById("all-agree");
const nextBtn = document.getElementById("next-btn");
const errorMessage = document.querySelector(".error-message")
const inputYear = document.getElementById("birth-year")
const inputMonth = document.getElementById("birth-month")
const inputDate = document.getElementById("birth-date")

let emailRegex = '^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';

items.forEach((item) => {
    item.onchange = (e) => {
        handleCheckItem(items)
        checkAll.checked = items.every(check => check.checked);
    };
});

checkAll.onchange = (e) => {
    items.forEach(async (item) => {
        item.checked = e.target.checked;
    });
    handleCheckItem(items)
};

const handleCheckItem = (elements) => {
    if (elements.some((element) => element.id.includes("require") && !element.checked)) {
        nextBtn.classList.add("disabled");
        nextBtn.disabled = true;
    } else {
        nextBtn.classList.remove("disabled");
        nextBtn.disabled = false;
    }
}

const handleNumberLength = (e, length, date) => {
    let value = e.target.value;
    if (value < 0) return e.target.value = 0;

    if (value.length > length || value > 10000) {
        e.target.value = value.slice(0, length);
    }

    if (e.target.value > date) {
        return e.target.value = value.slice(0, 1);
    }
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (inputYear.value === "" || inputMonth.value === "" || inputDate.value === "") {
        return
    }

    if (inputYear.value.length < 4) {
        return
    }

    if (inputMonth.value.length < 2 || inputDate.value.length < 2) {
        return;
    }
}


inputYear.addEventListener("input", (e) => {
    handleNumberLength(e, 4)
});
inputMonth.addEventListener("input", (e) => {
    handleNumberLength(e, 2, 12)
});
inputDate.addEventListener("input", (e) => {
    handleNumberLength(e, 2, 31)
});
joinForm.addEventListener("submit", handleSubmit);