//출퇴근 관리
const today = document.querySelector(".today");
const currentTime = document.querySelector(".current-time");
const punchInBtn = document.querySelector(".punch-in");

let date = new Date();
let year = date.getFullYear();
let month = makeTwoDigit(date.getMonth() + 1);
let day = makeTwoDigit(date.getDate());
let week = date.getDay();

let weekdays = ['일', '월', '화', '수', '목', '금', '토']

today.innerText = `${year}년 ${month}월 ${day}일(${weekdays[week]})`;


const updateTime = () => {
    date = new Date();

    const hour = makeTwoDigit(date.getHours());
    const minute = makeTwoDigit(date.getMinutes());
    const second = makeTwoDigit(date.getSeconds());

    currentTime.innerText = `${hour}:${minute}:${second}`;
}

updateTime()
setInterval(updateTime,1000)

document.addEventListener("DOMContentLoaded", async () => {
    await drawCalender();

    prevBtn.addEventListener("click", getPrevMonth);
    nextBtn.addEventListener("click", getNextMonth);
});