// gnb 메뉴 클릭효과
const gnbMenus = document.querySelectorAll(".gnb-menu-btn");

gnbMenus.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.add("on");
        gnbMenus.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("on");
            }
        })
    })
})