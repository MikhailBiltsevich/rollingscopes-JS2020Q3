function toggleMenu() {
    document.querySelector(".menu-icon-wrapper").classList.toggle("menu-icon-wrapper_active");
    document.querySelector('.menu').classList.toggle('menu_active');
    document.querySelector('.outside-cover').classList.toggle('outside-cover_active');
}

function activeLinkClick() {
    window.scrollTo(0, 0);
    if(document.querySelector(".menu_active")) {
        toggleMenu();
    }
}

function redirectToMainPage() {
    window.location.href = "/pages/main/index.html";
}

function outsideClick(event) {
    let outsideCover = document.querySelector(".outside-cover");
    if (event.target == outsideCover) {
        toggleMenu();
    }
}

document.querySelector(".menu__link_active").addEventListener("click", activeLinkClick);
document.querySelector(".logo").addEventListener("click", redirectToMainPage);
document.querySelector('.menu-icon-wrapper').addEventListener("click", toggleMenu);

window.addEventListener("click", outsideClick);