document.querySelector('.menu-icon-wrapper').onclick = function() {
    document.querySelector('.menu-icon').classList.toggle("menu-icon_active");
    document.querySelector('.menu').classList.toggle('menu_hidden');
}