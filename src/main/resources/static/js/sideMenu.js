const openLnbMenu = () => {
    const lnbMenus = document.querySelectorAll(".lnb-menu");
    const lnbSubMenus = document.querySelectorAll(".lnb-submenu");
    let fullPathname = window.location.pathname;

    lnbMenus.forEach((lnbMenu, index) => {
        const menuItem = lnbMenu.querySelector(".lnb-menu-item");
        const originHref = menuItem.getAttribute("href");
        const subMenu = lnbMenu.querySelector(".lnb-submenu");
        const isOpen = sessionStorage.getItem(`side-menu-open-${index}`) === "open";

        if (isOpen) {
            menuItem.classList.add("on");
            if (subMenu) {
                subMenu.classList.add("on");
            }
        }

        if (fullPathname === originHref) {
            menuItem.classList.add("on");
            sessionStorage.setItem(`side-menu-open-${index}`, "open")
        } else {
            menuItem.classList.remove("on");
            sessionStorage.removeItem(`side-menu-open-${index}`)
        }

        lnbMenu.addEventListener("click", (e) => {
            if (subMenu) {
                subMenu.classList.toggle("active");
                sessionStorage.setItem(`side-menu-open-${index}`, "open")
            } else {
                sessionStorage.removeItem(`side-menu-open-${index}`)
            }
        })
    });

    lnbSubMenus.forEach((lnbSubMenu, index) => {
        const subMenuItem = lnbSubMenu.querySelector(".lnb-submenu-item");
        const subMenuLink = subMenuItem.getAttribute("href");

        if (fullPathname === subMenuLink) {
            lnbSubMenu.classList.add("active");
            subMenuItem.classList.add("on")
            sessionStorage.setItem(`sub-menu-open-${index}`, "open")
        } else {
            subMenuItem.classList.remove("on");
            sessionStorage.removeItem(`sub-menu-open-${index}`);
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    openLnbMenu();
});
