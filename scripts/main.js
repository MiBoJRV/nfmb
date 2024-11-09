document.addEventListener("DOMContentLoaded", () => {
//mobile menu
const buttonMobileMenu = document.querySelector('.button-mobile-menu');
const mobileContent = document.querySelector('.mobile-content');
const mobileMenuLinks = document.querySelectorAll('.mobile-content a');

let isMobileMenuOpen = false;

// Функція для відкриття/закриття мобільного меню
function toggleMobileMenu() {
    mobileContent.classList.toggle('open');
    document.body.style.overflow = mobileContent.classList.contains('open') ? 'hidden' : '';
}

// Обробник кліку на кнопку мобільного меню
buttonMobileMenu.addEventListener('click', function () {
    toggleMobileMenu();
    buttonMobileMenu.classList.toggle('open');

});

// Обробник кліку на посилання в мобільному меню
mobileMenuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        toggleMobileMenu();
        buttonMobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Забираємо overflow: hidden
    });
});



});
