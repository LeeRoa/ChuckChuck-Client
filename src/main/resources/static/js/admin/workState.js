$(function () {
    // 일/주/월 클릭효과
    $('.date-btn').each((index, element) => {
        $(element).click((e) => {
            $('.date-btn').removeClass('on');
            $(element).addClass('on');
            if ($(element).hasClass("date-week") || $(element).hasClass("date-month")) {
                $('.week-month-wrap').addClass('on')
                $('.date-table').addClass('off')
            }
            if ($(element).hasClass("date-day")) {
                $('.week-month-wrap').removeClass('on')
                $('.date-table').removeClass('off')
            }
        });
    });

    // 달력 그림자
    $('.calender-card').addClass('shadow');

    // $(".calender-wrap").click((e) => {
    //     const dropCal = $('#calDrop');
    //     dropCal.addClass("on");
    // });

    // 부서 셀렉트박스 클릭
    $(".select-wrap").click(() => {
        $('.sel-options').toggleClass("active");
    });

    // 근무 목록 지각, 결근 글씨색
    $('.table-data').each((index, element) => {
        let text = $(element).text();  // 텍스트를 추출
        if (text === "지각" || text === "결근") {
            $(element).addClass("highlight");
        }
    });

    // 부서 목록 글씨색, 선택
    $('.sel-options p').each((index, item) => {
        $(item).click(() => {
            const selectTeam = $('.select-one');
            selectTeam.text($(item).text());
            selectTeam.css('color', 'black');
        });
    });
});


const editModal = document.getElementById("timeEditModal");
const BODY = document.body;
const empMameModal = document.querySelector(".emp-name-modal");
const editModalDate = document.getElementById("modalWorkDate");
const drawToday = document.getElementById("drawToday");
const tableContent = document.querySelectorAll(".table-content");
const editCancelBtn = document.getElementById("editCancelBtn");
const beforeTime = document.querySelector(".before-time");
const calenderWrap = document.getElementById("calenderWrap")
const dropCal = document.getElementById("calDrop")

let date = new Date();

tableContent.forEach(data => {
    const contents = data.querySelectorAll(".table-data");
    const empName = data.querySelector(".emp-name");
    contents.forEach(content => {
        const editBtn = content.querySelector(".edit-btn-box");
        const workTime = content.querySelector("p");
        content.addEventListener("mouseenter", () => {
            if (empName) {
                empMameModal.innerText = empName.textContent;
            }
            editModalDate.innerText = drawToday.textContent;
            if (workTime !== null) {
                beforeTime.innerText = workTime.textContent;
            }
            if (editBtn !== null) {
                editBtn.classList.add("on");
                editBtn.addEventListener("click", (e) => {
                    openEditModal();
                });
            }
        });
        content.addEventListener("mouseleave", () => {
            if (editBtn !== null) {
                editBtn.classList.remove("on");
            }
        });
    });
});

const openEditModal = () => {
    editModal.classList.add('open');
    BODY.classList.add("scroll");
};

const closeEditModal = () => {
    editModal.classList.remove('open');
    BODY.classList.remove("scroll");
};

editCancelBtn.addEventListener("click", closeEditModal);
drawToday.innerText = makeFullDateFormat(date).fullDateWithText;
calenderWrap.addEventListener("click", () => {
    dropCal.classList.add("showup")
})

// 달력 관련
const hoverDate = (dayWraps) => {
    dayWraps.forEach((dayWrap) => {
        dayWrap.addEventListener("mouseenter", (e) => {
            dayWrap.classList.add("pick-date");
        });
        dayWrap.addEventListener("mouseleave", (e) => {
            dayWrap.classList.remove("pick-date");
        });
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    const { year, month } = await drawCalender();
    const calCard = document.querySelector(".calender-card ");

    const clickDate = (dayWraps, year, currMonth) => {
        dayWraps.forEach((day) => {
            day.addEventListener("click", () => {
                const dateNumT = day.querySelector(".date-num");
                const dateNum = parseInt(dateNumT.textContent);
                let clickedDate = new Date(year, currMonth, dateNum);
                let prevM;
                let nextM;
                if (day.classList.contains("prev-day")) {
                    prevM = currMonth - 1;
                    console.log(prevM)
                    clickedDate = new Date(year, prevM, dateNum);
                }
                if (day.classList.contains("next-day")) {
                    nextM = currMonth + 1;
                    clickedDate = new Date(year, nextM, dateNum);
                }
                drawToday.innerText = makeFullDateFormat(clickedDate).fullDateWithText;
                setTimeout(() => {
                    dropCal.classList.remove("showup");
                }, 0);  // 0ms 지연
            });
        });
    }

    // 월단위호버
    // daysContainer.addEventListener("mouseenter", () => {
    //     daysContainer.classList.add("select-month")
    // })
    // daysContainer.addEventListener("mouseleave", () => {
    //     daysContainer.classList.remove("select-month")
    // })

    const dayWraps = document.querySelectorAll(".day-wrap");
    await hoverDate(dayWraps);
    await clickDate(dayWraps, year, month)

    const getNextMonthDay = async () => {
        const nextMonth = await getNextMonth();

        console.log(nextMonth)

        const date = new Date(nextMonth)
        const year = date.getFullYear()
        const setNextMonth = date.getMonth();

        console.log(year, setNextMonth)

        const dayWraps = document.querySelectorAll(".day-wrap");
        await hoverDate(dayWraps);
        await clickDate(dayWraps, year, setNextMonth)
    };

    const getPrevMonthDay = async () => {
        const prevMonth = await getPrevMonth();

        const date = new Date(prevMonth);
        const year = date.getFullYear()
        const setPrevMonth = date.getMonth();

        const dayWraps = document.querySelectorAll(".day-wrap");
        await hoverDate(dayWraps);
        await clickDate(dayWraps, year, setPrevMonth)
    };

    const weekWrap = document.querySelectorAll(".weekday-wrap");

    // 주단위 호버
    // weekWrap.forEach(week => {
    //     week.addEventListener("mouseenter", () => {
    //         week.classList.add("select-week")
    //     })
    //     week.addEventListener("mouseleave", () => {
    //         week.classList.remove("select-week")
    //     })
    //     week.addEventListener("click", () => {
    //         const clickedDate = week.querySelector("span")
    //         console.log(week)
    //         console.log(clickedDate)
    //     })
    // })

    prevBtn.addEventListener("click", getPrevMonthDay);
    nextBtn.addEventListener("click", getNextMonthDay);
});