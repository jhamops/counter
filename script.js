const timerDisplay = document.getElementById('timerDisplay');
const messageDisplay = document.getElementById('message');
const themeToggleButton = document.getElementById('themeToggleButton');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const body = document.body;

const sakuraRightLight = document.getElementById('sakuraRightLight');
const sakuraRightDark = document.getElementById('sakuraRightDark');

const targetDate = new Date('2025-09-13T00:00:00').getTime(); // Medianoche del 13 de septiembre

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-theme');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        sakuraRightDark.style.display = 'block';
        sakuraRightLight.style.display = 'none';
    } else {
        body.classList.add('light-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        sakuraRightDark.style.display = 'none';
        sakuraRightLight.style.display = 'block';
    }
    localStorage.setItem('theme', theme); 
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        timerDisplay.innerHTML = "00<span class='timer-label'>Días</span> 00<span class='timer-label'>Horas</span> 00<span class='timer-label'>Minutos</span> 00<span class='timer-label'>Segundos</span>";
        messageDisplay.textContent = "¡El tiempo ha llegado!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = `
                <span>${String(days).padStart(2, '0')}<span class="timer-label">Días</span></span>
                <span>${String(hours).padStart(2, '0')}<span class="timer-label">Horas</span></span>
                <span>${String(minutes).padStart(2, '0')}<span class="timer-label">Minutos</span></span>
                <span>${String(seconds).padStart(2, '0')}<span class="timer-label">Segundos</span></span>
            `;
}

function createFallingLeaves(count) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('falling-leaf');
        leaf.style.left = `${90 + Math.random() * 10}vw`; 
        leaf.style.animationDelay = `${Math.random() * 10}s`; 
        leaf.style.animationDuration = `${8 + Math.random() * 4}s`;
        leaf.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
        fragment.appendChild(leaf);
    }
    document.body.appendChild(fragment);
}

createFallingLeaves(20); 


initializeTheme();

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();