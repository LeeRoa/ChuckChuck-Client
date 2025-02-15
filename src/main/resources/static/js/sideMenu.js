const openLnbMenu = () => {
    const myProfileLNB = document.querySelector(".lnb-container.my-profile")
    const adminLNB = document.querySelector(".lnb-container.admin")
    const lnbMenus = document.querySelectorAll(".lnb-menu");
    const lnbSubMenus = document.querySelectorAll(".lnb-submenu");
    let fullPathname = window.location.pathname;
    const avatarWrap = document.querySelector(".avatar-wrap")

    if (fullPathname.includes("/user")) {
        myProfileLNB.classList.add("active")
        adminLNB.classList.add("inactive")
        avatarWrap.classList.toggle("border")
    }

    if (fullPathname.includes("/admin")) {
        myProfileLNB.classList.remove("active")
        adminLNB.classList.remove("inactive")
    }

    console.log("fullPath", fullPathname)

    lnbMenus.forEach((lnbMenu, index) => {
        const menuItem = lnbMenu.querySelector(".lnb-menu-item");
        const lnbHref = menuItem.getAttribute("href");
        const subMenu = lnbMenu.querySelector(".lnb-submenu");
        // const subMenuHref = subMenu.getAttribute("href");
        const isOpen = sessionStorage.getItem(`side-menu-open-${index}`) === "open";

        console.log("오리진HREF", lnbHref)

        if (isOpen) {
            menuItem.classList.add("on");
            if (subMenu) {
                subMenu.classList.add("on");
            }
        }

        if (fullPathname === lnbHref) {
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

    lnbSubMenus.forEach((lnbSubMenu) => {
        const subMenuItems = lnbSubMenu.querySelectorAll(".lnb-submenu-item");
        subMenuItems.forEach((item, index) => {
            const subMenuLink = item.getAttribute("href");

            if (fullPathname === subMenuLink) {
                lnbSubMenu.classList.add("active");
                item.classList.add("on")
                sessionStorage.setItem(`sub-menu-open-${index}`, "open")
            } else {
                item.classList.remove("on");
                sessionStorage.removeItem(`sub-menu-open-${index}`);
            }
        })
    });
};

document.addEventListener("DOMContentLoaded", () => {
    openLnbMenu();
});
