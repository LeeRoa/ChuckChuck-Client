//출퇴근 관리
const today = document.querySelector(".today");
const currentTime = document.querySelector(".current-time");
const punchInBtn = document.querySelector(".punch-in");

let currDate = new Date();

today.innerText = makeFullDateFormat(currDate).fullDateWithDay;


const updateTime = () => {
    currDate = new Date();

    const hour = makeTwoDigit(currDate.getHours());
    const minute = makeTwoDigit(currDate.getMinutes());
    const second = makeTwoDigit(currDate.getSeconds());

    currentTime.innerText = `${hour}:${minute}:${second}`;
};

updateTime();
setInterval(updateTime, 1000);

const electricCards = document.querySelectorAll(".electric-card");
const scheduleBox = document.querySelector(".dashboard-box.schedule");

// 달력 높이에 따라 전자결재카드 높이 맞추기
const setCardHeight = (element) => {
    const checkWidthAndHeight = () => {
        electricCards.forEach(card => {
            if (window.innerWidth <= 1439) {
                card.classList.remove("height");
            } else {
                if (element.offsetHeight === 401) {
                    card.classList.add("height");
                } else {
                    card.classList.remove("height");
                }
            }
        });
    };

    checkWidthAndHeight();

    window.addEventListener("resize", checkWidthAndHeight);
};


document.addEventListener("DOMContentLoaded", async () => {
    await drawCalender();
    await setCardHeight(scheduleBox);

    const getNextMonthDay = async () => {
        await getNextMonth();

        // 달력 높이에 따른 전자결재카드 높이
        await setCardHeight(scheduleBox);

    };

    const getPrevMonthDay = async () => {
        await getPrevMonth();

        // 달력 높이에 따른 전자결재카드 높이
        await setCardHeight(scheduleBox);
    };

    prevBtn.addEventListener("click", getPrevMonthDay);
    nextBtn.addEventListener("click", getNextMonthDay);
});