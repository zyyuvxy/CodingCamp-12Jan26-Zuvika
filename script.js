const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}


document.querySelectorAll('a[href^="0"]').forEach (anchor =>{
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
})

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else{
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

const nameModal = document.getElementById('nameModal');
const userNameInput = document.getElementById('userName');
const submitNameBtn = document.getElementById('submitName');
const greetingElement = document.querySelector('.hero h1');

window.addEventListener('load', () => {
    const savedName = localStorage.getItem('portfolioUserName');
    if (!savedName) {
        nameModal.style.display = 'flex';
    } else {
        updateGreeting(savedName);
    }
});

if (submitNameBtn) {
    submitNameBtn.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            localStorage.setItem('portfolioUserName', userName);
            nameModal.style.display = 'none';
            updateGreeting(userName);
        } else {
            alert('Please enter your name!');
            userNameInput.focus();
        }
    });
}

if (userNameInput) {
    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (submitNameBtn) submitNameBtn.click();
        }
    });
}

function updateGreeting(name) {
    if (greetingElement) {
        greetingElement.innerHTML = `Hi ${name}!`;
    }
}

const savedName = localStorage.getItem('portfolioUserName');
if (savedName && greetingElement) {
    updateGreeting(savedName);
}

window.addEventListener('click', (e) => {
    if (nameModal && e.target === nameModal) {
        if (!localStorage.getItem('portfolioUserName')) {
            localStorage.setItem('portfolioUserName', 'Guest');
            updateGreeting('Guest');
        }
        nameModal.style.display = 'none';
    }
});

let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});