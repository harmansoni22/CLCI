var header = document.querySelector('#header');
var lastScroll = window.scrollY;

window.addEventListener('scroll' , () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down - hide navbar
        header.style.top = "-20%";
    } else {
        // Scrolling up or at top - show navbar
        header.style.top = "0";
    }

    lastScroll = currentScroll;
});