const monthTxt = document.querySelector(".month-year span:first-child")
const yearTxt = document.querySelector(".month-year span:last-child")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const daysContainer = document.querySelector(".days-container")

let holidaysCache = {}; // 공휴일 정보를 저장할 캐시 객체

const getHolidays = async (year, month) => {
    const cacheKey = `${year}-${month}`;

    // 이미 캐시된 데이터가 있으면 바로 반환
    if (holidaysCache[cacheKey]) {
        return holidaysCache[cacheKey];
    }

    const response = await fetch(`/api/holiday-data?year=${year}&month=${month}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    if (response.status === 200) {
        const data = await response.json()
        const {response: {header: {resultCode}}} = data;
        if (resultCode === "00") {
            const {response: {body: {items: {item}}}} = data;
            // 캐시 저장
            holidaysCache[cacheKey] = item;
            return item;
        } else if (resultCode === "30") {
            console.log("인증키오류")
        }
    } else {
        console.log("연결오류")
    }
}

const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
let dayWrap;
let dateNumSpan = "";
let dotSpan = "";

let tdate = new Date();
//
// let currYear = date.getFullYear()
// let currMonth = date.getMonth() + 1;

const monthArr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const drawCalender = async () => {
    // year = year !== undefined ? year : currYear;
    // month = month !== undefined ? month - 1 : currMonth;
    const year = tdate.getFullYear();
    const month = tdate.getMonth();

    // 현재 월
    let currDate = new Date(year, month, 1);
    let currDay = currDate.getDay();

    const lastDateArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 윤년
    let lastDate = "";
    if (isLeapYear(year)) lastDate = lastDateArr[1] = 29;

    lastDate = lastDateArr[month];

    // 7일 만들기
    let row = Math.ceil((currDay + lastDate) / 7);

    // 이전 달, 다음 달의 공휴일 정보 한 번에 가져오기
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 12 : month;
    const nextYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 1 : month + 2;

    const holidays = await Promise.all([
        getHolidays(year, month + 1), // 현재 달
        getHolidays(prevYear, prevMonth), // 이전 달
        getHolidays(nextYear, nextMonth), // 다음 달
    ]);

    const currentHolidays = holidays[0];
    const prevMonthHolidays = holidays[1];
    const nextMonthHolidays = holidays[2];

    // 1일 부터
    let dateNum = 1;
    let preMonthIndex = 0;
    let nextMonthIndex = 0;

    daysContainer.innerHTML = "";

    for (let i = 0; i < row; ++i) {
        const weekDayWrap = document.createElement("div")
        weekDayWrap.className = "weekday-wrap"
        for (let k = 0; k <= 6; ++k) {
            dayWrap = document.createElement("button")
            dayWrap.className = "day-wrap"
            dateNumSpan = document.createElement("span")
            dateNumSpan.className = "date-num"
            dotSpan = document.createElement("span")
            dotSpan.className = "schedule-dot"

            weekDayWrap.appendChild(dayWrap)
            dayWrap.appendChild(dateNumSpan)
            if (i === 0 && k < currDay) {
                const prevDates = getLastWeekPreMonth(year, month)
                if (preMonthIndex === k) {
                    const prevDate = prevDates[k].getDate();
                    const fullPrevDate = makeFullDate(prevDates[k])
                    printHolidays(prevMonthHolidays, fullPrevDate)
                    dayWrap.classList.add("prev-day")
                    dateNumSpan.innerText = prevDate
                    preMonthIndex++;
                }
            } else if (dateNum > lastDate) {
                const nextDates = getFirstWeekNextMonth(year, month)
                if (nextMonthIndex < nextDates.length) {
                    const nextDate = nextDates[nextMonthIndex].getDate();
                    const fullNextDate = makeFullDate(nextDates[nextMonthIndex])
                    printHolidays(nextMonthHolidays, fullNextDate)
                    dayWrap.classList.add("next-day")
                    dateNumSpan.textContent = nextDate
                    nextMonthIndex++;
                }
            } else {
                // 입력 된 연월일
                const enterDate = `${year}${makeTwoDigit(month+1)}${makeTwoDigit(dateNum)}`;
                const thisDate = `${date.getFullYear()}${makeTwoDigit(date.getMonth()+1)}${makeTwoDigit(date.getDate())}`;
                printHolidays(currentHolidays, enterDate)
                if (enterDate === thisDate) {
                    dayWrap.classList.add("cal-today");
                } else {
                    k === 6 || k === 0 ? dayWrap.classList.add("weekend") : "";
                }
                dateNumSpan.innerText = dateNum;
                ++dateNum;
            }
        }

        daysContainer.appendChild(weekDayWrap)
    }
    printDates(year, month)
}

const printHolidays = (holiday, date) => {
    let holidayStr
    if (holiday !== undefined) {
        if (Array.isArray(holiday)) {
            for (let i = 0; i < holiday.length; ++i) {
                holidayStr = holiday[i].locdate.toString()
                if (holidayStr === date) {
                    if (dayWrap.classList.contains("next") && dayWrap.classList.contains("prev")) {
                        dayWrap.classList.remove("next-day");
                        dayWrap.classList.remove("prev-day");
                    }
                    dayWrap.classList.add("holiday");
                    // dayWrap.appendChild(dotSpan);
                }
            }
        } else {
            holidayStr = holiday.locdate.toString()
            if (holidayStr === date) {
                if (dayWrap.classList.contains("next") && dayWrap.classList.contains("prev")) {
                    dayWrap.classList.remove("next-day");
                    dayWrap.classList.remove("prev-day");
                }
                dayWrap.classList.add("holiday");
                // dayWrap.appendChild(dotSpan);
            }

        }
    }
}

const getPrevMonth = async () => {
    tdate.setMonth(tdate.getMonth() - 1)
    await drawCalender()
}

const getLastWeekPreMonth = (year, month) => {
    if (month === 0) {
        year = year - 1;
        month = 12;
    }

    let prevMonth = new Date(`${year}-${month}`);

    prevMonth.setMonth(prevMonth.getMonth() + 1);
    prevMonth.setDate(0); // 마지막 날로 설정

    let prevMonthLastWeek = prevMonth.getDay();

    let previousDays = [];

    for (let i = 0; i <= prevMonthLastWeek; i++) {
        let previousDay = new Date(prevMonth);
        previousDay.setDate(prevMonth.getDate() - (prevMonthLastWeek - i));
        previousDays.push(previousDay);
    }

    return previousDays;
}

const getNextMonth = async () => {
    tdate.setMonth(tdate.getMonth() + 1)
    await drawCalender()
}

const getFirstWeekNextMonth = (year, month) => {
    let nextMonth = month === 11 ? 0 : month + 1;
    let yearForNextMonth = month === 11 ? year + 1 : year;

    let nextDayOfNextMonth = new Date(yearForNextMonth, nextMonth, 1);

    let nextDayOfWeek = nextDayOfNextMonth.getDay();

    let nextDays = [];

    for (let i = 0; i <= 6 - nextDayOfWeek; ++i) {
        let nextDay = new Date(nextDayOfNextMonth);
        nextDay.setDate(nextDayOfNextMonth.getDate() + i);
        nextDays.push(nextDay);
    }

    return nextDays;
}

const makeFullDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${makeTwoDigit(month)}${makeTwoDigit(day)}`
}

const printDates = (year, month) => {
    yearTxt.innerText = year;
    monthTxt.innerText = monthArr[month];
}

document.addEventListener("DOMContentLoaded", async () => {
    await drawCalender()
})

prevBtn.addEventListener("click", getPrevMonth)
nextBtn.addEventListener("click", getNextMonth)