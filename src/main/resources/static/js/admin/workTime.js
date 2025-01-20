$(function () {
    $('.date-btn').each((index, element) => {
        $(element).click((e) => {
            $('.date-btn').removeClass('on');
            $(element).addClass('on');
        });
    });

    const drawToday = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = makeTwoDigit(date.getMonth() + 1);
        const day = makeTwoDigit(date.getDate());

        return `${year}년 ${month}월 ${day}일`;
    };

    $('.get-today').text(drawToday());

    $('.calender-card').addClass('shadow');

    $(".calender-wrap").click((e) => {
        const dropCal = $('.cal-drop');
        dropCal.addClass("on");
    });

    $(".select-wrap").click(() => {
        $('.sel-options').toggleClass("active");
    });

    $('.table-data').each((index, element) => {
        let text = $(element).text();  // 텍스트를 추출
        if (text === "지각" || text === "결근") {
            $(element).addClass("highlight");
        }
    });

    $('.sel-options p').each((index, item) => {
        $(item).click(() => {
            const selectTeam = $('.select-one');
            selectTeam.text($(item).text());
            selectTeam.css('color', 'black');
        });
    });

    $(".table-data").each((index, item) => {
        if (index === 0) {
            console.log($(item));
        }
        $(item).mouseenter(() => {
            $(item).find(".edit-btn-box").addClass("on");
            $(item).find(".edit-btn").click(() => {
                openModal();
            });
            const workTime = $(item).find("p");
            const empName = $(item).find(".emp-name");
            if (empName.length) {
                console.log(empName.text());
            }
            getEmpWorkInfo($(".before-time"), workTime);
        }).mouseleave(() => {
            $(item).find(".edit-btn-box").removeClass("on");
        });
        // const empName = $(item).hasClass("emp-name");
        // if (empName) {
        //     console.log($(item).text())
        // }
    });

    $("#editCancelBtn").on("click", (e) => {
        closeModal();
    });

    const openModal = () => {
        $('#timeEditModal').addClass('open');
    };

    const closeModal = () => {
        $('#timeEditModal').removeClass('open');
    };

    const getEmpWorkInfo = (editEle, element) => {
        editEle.text($(element).text());
    };
});

const getDate = (dayWraps) => {
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
    await drawCalender();
    const calCard = document.querySelector(".calender-card ");
    let currMonth;
    const getYearMonth = () => {
        const YM = calCard.querySelector(".month-year");
        const month = YM.querySelector("span:first-child");
        const year = YM.querySelector("span:last-child");
        console.log(month)
        return {
            year: parseInt(year.textContent),
            month: month.textContent,
        };
    };
    getYearMonth()
    const {year, month} = getYearMonth()

    for (let i = 0; i < monthArr.length; ++i) {
        if (monthArr[i] === month) {
            currMonth = i;
        }
    }

    daysContainer.addEventListener("click", () => {
        daysContainer.classList.add("select-month")
    })

    console.log(daysContainer)

    console.log(currMonth, typeof currMonth)
    console.log(new Date(2024, 2, 0).getDate());

    const dayWraps = document.querySelectorAll(".day-wrap");
    await getDate(dayWraps);

    const getNextMonthDay = async () => {
        await getNextMonth();

        const dayWraps = document.querySelectorAll(".day-wrap");
        await getDate(dayWraps);
        getYearMonth()
    };

    const getPrevMonthDay = async () => {
        await getPrevMonth();

        const dayWraps = document.querySelectorAll(".day-wrap");
        await getDate(dayWraps);
        getYearMonth()
    };

    const weekWrap = document.querySelectorAll(".weekday-wrap")

    // dayWraps.forEach((day) => {
    //     day.addEventListener("click", () => {
    //         const dateNum = day.querySelector("span");
    //         const dateText = parseInt(dateNum.textContent)
    //         console.log(year, month, dateText)
    //         let currMonth = "";
    //         for (let i = 0; i < monthArr.length; ++i) {
    //           if (monthArr[i] === month) {
    //               currMonth = i;
    //           }
    //         }
    //         console.log(currMonth)
    //         weekWrap.forEach(week => {
    //             const clickedDate = week.querySelector("span")
    //             console.log(clickedDate)
    //         })
    //     });
    // });

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