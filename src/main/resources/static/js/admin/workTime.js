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
            console.log($(item))
        }
        $(item).mouseenter(() => {
            $(item).find(".edit-btn-box").addClass("on");
            $(item).find(".edit-btn").click(() => {
                openModal();
            });
            const workTime = $(item).find("p");
            getEmpWorkInfo($(".before-time"), workTime);
        }).mouseleave(() => {
            $(item).find(".edit-btn-box").removeClass("on");
        });
        const empName = $(item).hasClass("emp-name");
        if (empName) {
            console.log($(item).text())
        }
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

const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
};

const getDate = (dayWraps) => {
    dayWraps.forEach((dayWrap) => {
        dayWrap.addEventListener("mouseenter", (e) => {
            dayWrap.classList.add("pick-date");
        })
        dayWrap.addEventListener("mouseleave", (e) => {
            dayWrap.classList.remove("pick-date");
        })
    })
}

const getWeekDay = (dayWraps) => {
    dayWraps.forEach((dayWrap) => {
        dayWrap.addEventListener("mouseenter", (e) => {
            const date = new Date();
            const day = date.getDay();
        })
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await drawCalender();
    const dayWraps = document.querySelectorAll(".day-wrap");
    await getDate(dayWraps)

    const getNextMonthDay = async () => {
        await getNextMonth()

        const dayWraps = document.querySelectorAll(".day-wrap");
        await getDate(dayWraps)
    };

    const getPrevMonthDay = async () => {
        await getPrevMonth()

        const dayWraps = document.querySelectorAll(".day-wrap");
        await getDate(dayWraps)
    };

    prevBtn.addEventListener("click", getPrevMonthDay);
    nextBtn.addEventListener("click", getNextMonthDay);
});