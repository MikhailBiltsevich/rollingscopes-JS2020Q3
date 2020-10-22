document.querySelector('.menu-icon-wrapper').onclick = function() {
    document.querySelector('.menu-icon').classList.toggle("menu-icon_active");
    document.querySelector('.menu').classList.toggle('menu_hidden');
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

document.querySelector(".menu__link_active").addEventListener("click", activeLinkClick);
document.querySelector(".logo").addEventListener("click", redirectToMainPage);