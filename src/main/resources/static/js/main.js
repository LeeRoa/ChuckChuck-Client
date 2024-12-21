// gnb 메뉴 클릭효과
const gnbMenus = document.querySelectorAll(".gnb-menu-btn");

gnbMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.add("on");
        gnbMenus.forEach((otherMenu) => {
            if (otherMenu !== menu) {
                otherMenu.classList.remove("on");
            }
        })
    })
})

// 헤더 모달창
const inviteIcon = document.querySelector(".gnb-icon.invite")
const alarmIcon = document.querySelector(".gnb-icon.alarm")
const inviteModal = document.getElementById("inviteModal")
const alarmModal = document.getElementById("alarmModal")
const modalClose = document.querySelectorAll(".close-modal")

let icons = [inviteIcon, alarmIcon];
let modals = [inviteModal, alarmModal];

const closeModal = (modal) => {
    modal.classList.remove("on");
}

const openModal = (modal) => {
    modal.classList.toggle("on");
}

icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        if (icon.classList.contains("invite")) {
            openModal(inviteModal);
            closeModal(alarmModal);
        }
        if (icon.classList.contains("alarm")) {
            openModal(alarmModal);
            closeModal(inviteModal);
        }
    });
});

modalClose.forEach((btn) => {
    btn.addEventListener("click", () => {
        modals.forEach((modal) => {
            const modalClose = modal.classList.contains("on") ? inviteModal : alarmModal;
            modalClose.classList.remove("on");
        })
    })
})

// 메인 - 출퇴근 관리
const today = document.querySelector(".today");
const currentTime = document.querySelector(".current-time");
const punchInBtn = document.querySelector(".punch-in");

const printDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    let weekdays = ['일', '월', '화', '수', '목', '금', '토']

    today.innerText = `${year}년 ${month}월 ${day}일(${weekdays[week]})`;
    currentTime.innerText = `${hour}:${minute}:${second}`;
}

printDate();