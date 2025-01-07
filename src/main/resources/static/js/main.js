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

document.addEventListener("DOMContentLoaded", () => {
    showGnbMenu();
})