var body = document.body;
var themeToggle = document.querySelector('.theme-toggle');
var backToTopBtn = document.querySelector('.back-to-top');
var cursor = document.querySelector('.cursor');
var images = document.querySelectorAll('.image-container img');
var header = document.querySelector('header');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (icon.classList.contains('bi-moon-fill')) {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'dark');
        themeToggle.title = 'Switch to Dark Mode, click c to toggle';
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
        localStorage.setItem('theme', 'light');
        themeToggle.title = 'Switch to Light Mode, click c to toggle';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');

    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.title = 'Switch to Light Mode, click c to toggle';
    } else {
        document.body.classList.remove('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.title = 'Switch to Dark Mode, click c to toggle';
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function updateCursor(e) {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
};

function enlargeCursor() {
    if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }
}

function resetCursor() {
    if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}

function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.75) {
            element.classList.add('.active');
        } else {
            element.classList.remove('.active');
        }
    });
};

function initAnimations() {
    const imageContainer2 = document.querySelectorAll('.image-container-2');
    const Lines = document.querySelectorAll('.welcome-line , .join-us-line , .footer-line');
    
    imageContainer2.forEach((imageContainer2, index) => {
        imageContainer2.classList.add('scale-in');
        imageContainer2.style.transitionDelay = `${index * 0.2}s`;
    });

    Lines.forEach((element, index) => {
        element.classList.add('.fade-in');
        element.style.transitionDelay = `${index * 0.2}s`;
    });
}

document.addEventListener('DOMContentLoaded' , () => {
    if (cursor) {
        document.addEventListener('mousemove' , updateCursor);
    
        const interactiveElements = document.querySelectorAll('a, button, .carousel-control-next-icon, .carousel-control-prev-icon');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter' , enlargeCursor);
            element.addEventListener('mouseleave' , resetCursor);
        });
    };

    initAnimations();
    addScrollAnimations();
});

window.addEventListener('scroll' , () => {
    addScrollAnimations();
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

document.addEventListener('keydown' , e => {
    if (e.key === 'f') {
        document.body.requestFullscreen()
            .then(() => {
                console.log("Fullscreen mode activated");
                body.style.overflowY = "scroll";
                body.style.overflowX = "hidden";
                body.style.scrollbarWidth = "thin";
                body.style.scrollbarColor = "var(--scrollbar-color) var(--scrollbar-bg-color)";
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
            })
            .catch(err => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
    } else if (e.key === 'c') {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('bi-moon-fill')) {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
            themeToggle.title = 'Switch to Dark Mode';
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
            themeToggle.title = 'Switch to Light Mode';
        }
    } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            document.exitFullscreen()
                .then(() => {
                    console.log("Exited fullscreen mode");
                    body.style.overflowY = "hidden";
                    body.style.overflowX = "hidden";
                    body.style.scrollbarWidth = "none";
                })
                .catch(err => {
                    console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
                });
        }
    } else if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        alert("View Source is disabled on this page.");
    }
});

function sanitizeInput(input) {
    return input.replace(/<script.*?>.*?<\/script>/gi, '')
                .replace(/<[^>]+>/g, '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded' , () => {
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    document.addEventListener('dragstart' , event => {
        event.preventDefault();
    })
})