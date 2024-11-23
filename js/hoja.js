    const navbar = document.getElementById('navtarpui');
    const navInitialOffset = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= navInitialOffset) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('prendas');
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInContainer = false;
    const images = [
        'img/rp-1.png',
        'img/rp-2.png',
        'img/rp-3.png',
        'img/rp-4.png',
        'img/rp-5.png',
        'img/rp-6.png',
        'img/rp-7.png',
        'img/rp-8.png',
        'img/rp-9.png',
        'img/rp-10.png',
        'img/rp-11.png',
        'img/rp-12.png',
        'img/rp-13.png',
        'img/rp-14.png',
        'img/rp-15.png'
    ];

    let lastMouseX = -Infinity;
    let lastMouseY = -Infinity;
    let minDistance = 50;

    function createFallingImage(x, y) {
        if (Math.abs(x - lastMouseX) < minDistance && Math.abs(y - lastMouseY) < minDistance) {
            return;
        }
        lastMouseX = x;
        lastMouseY = y;

        const image = document.createElement('img');
        image.className = 'falling-image';

        const randomImage = images[Math.floor(Math.random() * images.length)];
        image.src = randomImage;

        image.style.left = `${x - 150}px`;
        image.style.top = `${y - 150}px`;

        const containerCenter = container.offsetWidth / 2;
        const distanceFromCenter = x - containerCenter;
        const maxRotation = 45;

        const rotationPercentage = distanceFromCenter / containerCenter;
        const rotation = rotationPercentage * maxRotation;

        const duration = 2;

        const animation = image.animate([
            { transform: `rotate(${rotation}deg)`, opacity: 0 },
            { transform: `rotate(${rotation}deg)`, opacity: 1, offset: 0.2 },
            { transform: `translateY(${container.offsetHeight - y + 100}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: duration * 700,
            easing: 'ease-in'
        });

        container.appendChild(image);

        animation.onfinish = () => {
            image.remove();
        };
    }

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseenter', () => {
        isMouseInContainer = true;
        startCreatingImages();
    });

    container.addEventListener('mouseleave', () => {
        isMouseInContainer = false;
    });

    let lastImageTime = 0;
    function startCreatingImages() {
        if (!isMouseInContainer) return;

        const now = Date.now();
        if (now - lastImageTime >= 500) {
            createFallingImage(mouseX, mouseY);
            lastImageTime = now;
        }

        requestAnimationFrame(startCreatingImages);
    }
});

document.body.style.overflow = "hidden";
        document.querySelector('.line').addEventListener('animationend', () => {
            document.body.style.overflow = "auto";
        });

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const contador = document.querySelector('.contador');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    let currentIndex = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            }
        });
        contador.textContent = `${currentIndex + 1} / ${cards.length}`;
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    updateCards();
});
const boxes = document.querySelectorAll('.gif-box');
const modal = document.querySelector('.video-modal');
const video = document.querySelector('video');
const close = document.querySelector('.close');

const videos = [
    'video/clip1.mp4',
    'video/clip2.mp4',
    'video/clip3.mp4',
    'video/clip4.mp4',
    'video/clip5.mp4'
];

let scrollPosition;

function disableScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo('#sec2', scrollPosition);
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        disableScroll();
        video.src = videos[index];
        modal.style.display = 'block';
        video.play();
    });
});

function closeModal() {
    modal.style.display = 'none';
    video.pause();
    video.src = '';
    enableScroll();
}

close.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    document.documentElement.style.scrollBehavior = 'auto';
    
    window.scrollTo(0, scrollPosition);
    
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
}