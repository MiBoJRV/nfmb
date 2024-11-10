document.addEventListener("DOMContentLoaded", () => {
// Функція для плавної прокрутки до елемента
    function scrollToElement(element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop
        });
    }

    document.querySelectorAll('.button-survey a').forEach(a => {
        a.addEventListener('click', function (event) {
            event.preventDefault();
            const surveyBlock = document.getElementById('survey');
            scrollToElement(surveyBlock);
        });
    });

    // Відслідковуємо кліки на посиланнях у меню
    document.querySelectorAll('header a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Видаляємо попереднє виділення активного посилання
            document.querySelectorAll('.menu a').forEach(a => {
                a.classList.remove('active');
            });

            // Додаємо стиль для виділення активного посилання
            this.classList.add('active');
            // Отримуємо ідентифікатор цільового елемента з атрибута href
            const targetId = this.getAttribute('href');
            // Знаходимо цільовий елемент за його ідентифікатором
            const targetElement = document.querySelector(targetId);
            // Викликаємо функцію прокрутки до цільового елемента
            scrollToElement(targetElement);
        });
    });

    // Знаходимо посилання на "Contact" у меню
    const contactLink = document.querySelector('header a[href="#contact"]');

    // Додаємо обробник подій для кліку на посилання "Contact"
    contactLink.addEventListener('click', function (e) {
        e.preventDefault(); // Зупиняємо перехід за замовчуванням

        // Видаляємо попереднє виділення активного посилання
        document.querySelectorAll('.menu a').forEach(a => {
            a.classList.remove('active');
        });

        // Додаємо стиль для виділення активного посилання "Contact"
        this.classList.add('active');

        // Отримуємо ідентифікатор цільового елемента з атрибута href
        const targetId = this.getAttribute('href').slice(1); // Видаляємо символ #

        // Знаходимо цільовий елемент за його ідентифікатором
        const targetElement = document.getElementById(targetId);

        // Перевіряємо, чи знайдено цільовий елемент
        if (targetElement) {
            // Викликаємо функцію прокрутки до цільового елемента
            scrollToElement(targetElement);
        }
    });

// logo scrollers
    const scrollers = document.querySelectorAll(".scroller");

    // Если пользователь не выбрал уменьшенное движение, добавляем анимацию
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            // добавляем data-animated="true" ко всем элементам .scroller на странице
            scroller.setAttribute("data-animated", true);

            // создаем массив из элементов внутри .scroller-inner
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            // Для каждого элемента в массиве клонируем его и добавляем три копии
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem.cloneNode(true)); // первая копия
            });
        });
    }

    // const buttonMobileMenu = document.querySelector('.button-mobile-menu');
    // const mobileContent = document.querySelector('.mobile-content');
    // const mobileMenuLinks = document.querySelectorAll('.mobile-content-menu a');
    //
    // let isMobileMenuOpen = false;
    //
    // // Функція для відкриття/закриття мобільного меню
    // function toggleMobileMenu() {
    //     if (isMobileMenuOpen) {
    //         mobileContent.classList.remove('open');
    //         document.body.style.overflow = '';
    //     } else {
    //         mobileContent.classList.add('open');
    //         document.body.style.overflow = 'hidden';
    //     }
    //     isMobileMenuOpen = !isMobileMenuOpen;
    // }
    //
    // // Обробник кліку на кнопку мобільного меню
    // buttonMobileMenu.addEventListener('click', function () {
    //     buttonMobileMenu.classList.toggle('open');
    //     toggleMobileMenu();
    // });
    //
    // // Обробник кліку на посилання в мобільному меню
    // mobileMenuLinks.forEach(function (link) {
    //     link.addEventListener('click', function () {
    //         toggleMobileMenu();
    //         buttonMobileMenu.classList.toggle('open');
    //     });
    // });

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

    // Dialog
    // const dialog = document.querySelector(".dialog");
    // const dialogBtns = document.querySelectorAll(".link a");
    // const dialogClose = document.querySelector(".dialog__close");
    // const dialogContent = document.querySelector(".dialog__content");
    // const body = document.querySelector('body');
    //
    // dialogBtns.forEach(btn => {
    //     btn.addEventListener("click", (event) => {
    //         event.preventDefault();
    //         dialog.style.display = "flex";
    //         body.style.overflow = 'hidden'
    //     });
    // });
    //
    // dialogClose.addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     hideDialog();
    // });
    //
    // body.addEventListener("click", (event) => {
    //     if (!dialogContent.contains(event.target) && dialog.contains(event.target)) {
    //         hideDialog();
    //     }
    // });
    // document.addEventListener('keydown', function (event) {
    //     if (event.key === "Escape") {
    //         hideDialog();
    //     }
    // });
    //
    // function hideDialog() {
    //     dialog.style.display = "none";
    //     body.style.overflow = 'auto';
    // }
});
