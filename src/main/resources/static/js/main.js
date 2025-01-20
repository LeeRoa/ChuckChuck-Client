// gnb 메뉴 클릭효과
const showGnbMenu = () => {
    const gnbMenus = document.querySelectorAll(".gnb-menu-btn");
    let fullURL = window.location.pathname;

    gnbMenus.forEach((menu, index) => {
        const originHref = menu.getAttribute("href");
        const isOpen = sessionStorage.getItem(`menu-open-${index}`) === "open";

        if (isOpen) {
            menu.classList.add("on");
        }

        if (fullURL === originHref) {
            menu.classList.add("on");
            sessionStorage.setItem(`menu-open-${index}`, "open")
        } else if (fullURL.includes("admin") && originHref.includes("admin")) {
            menu.classList.add("on");
            sessionStorage.setItem(`menu-open-${index}`, "open")
        } else {
            menu.classList.remove("on");
            sessionStorage.removeItem(`menu-open-${index}`);
        }
    })
}

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
            closeModal(modalClose)
        })
    })
})

// 숫자 두자리 만들기 01, 02
const makeTwoDigit = (num) => {
    return String(num).padStart(2, "0");
}

// let animation = lottie.loadAnimation({
//     container: document.getElementById('lottie-container'), // 애니메이션을 표시할 DOM 요소
//     // renderer: 'svg', // 렌더러 설정: svg, canvas, html
//     loop: true, // 반복 여부
//     autoplay: true, // 자동 시작 여부
//     path: '/lottie/Order-Complete.json' // 애니메이션 JSON 파일 경로
//     // path: 'https://lottie.host/embed/7aef8ddd-c148-4fef-bf7d-a0eb534e8438/S4lVZxubu7.lottie' // 애니메이션 JSON 파일 경로
// });
//
// console.log(animation);

document.addEventListener("DOMContentLoaded", () => {
    showGnbMenu();
})