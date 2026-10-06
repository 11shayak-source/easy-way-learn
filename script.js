// Intersection Observer for Scroll Animations
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => observer.observe(el));

// Canvas Ambient Tricolor Particle Animation
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const colors = ['rgba(255, 153, 51, 0.6)', 'rgba(255, 255, 255, 0.4)', 'rgba(19, 136, 8, 0.6)'];
    for(let i=0; i<40; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 100 + 50,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < -p.radius || p.x > width + p.radius) p.vx *= -1;
        if(p.y < -p.radius || p.y > height + p.radius) p.vy *= -1;
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateCanvas();

// AI Chatbot Logic
const botWindow = document.getElementById('botWindow');
const botHistory = document.getElementById('botHistory');

function toggleBot() {
    botWindow.style.display = botWindow.style.display === 'flex' ? 'none' : 'flex';
}

function sendMsg(msg) {
    // User Message HTML
    botHistory.innerHTML += `
        <div class="bg-[rgba(255,255,255,0.1)] p-3 rounded-2xl rounded-tr-sm text-sm text-white ml-8 shadow-md border border-[rgba(255,255,255,0.05)]">
            ${msg}
        </div>
    `;
    botHistory.scrollTop = botHistory.scrollHeight;

    // Typing Indicator
    const typingId = 'typing-' + Date.now();
    botHistory.innerHTML += `
        <div id="${typingId}" class="text-xs text-gray-500 ml-2 mt-2 italic">EazyBot is typing...</div>
    `;
    botHistory.scrollTop = botHistory.scrollHeight;

    // Bot Response Generation
    setTimeout(() => {
        document.getElementById(typingId).remove();
        let reply = "";
        
        if(msg.includes('price')) {
            reply = "Our basic models start at ₹299 and ₹499. Premium starts from ₹2,999 and ₹5,999. These models include full e-commerce and UPI integration! 🚀";
        } else if(msg.includes('started')) {
            reply = "You can get started right away! Please mention this number <strong>7596 909 888</strong> to call or WhatsApp our counselors. 📞";
        }

        botHistory.innerHTML += `
            <div class="bg-[rgba(19,136,8,0.1)] border border-[rgba(19,136,8,0.3)] p-3 rounded-2xl rounded-tl-sm text-sm text-gray-200 mr-8 shadow-lg">
                🤖 ${reply}
            </div>
        `;
        botHistory.scrollTop = botHistory.scrollHeight;
    }, 800);
}
