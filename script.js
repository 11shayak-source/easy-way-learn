// Extreme Bouncy Intersection Observer
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Replay animation continuously on scroll for "extreme" feel
            entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

// Added .reveal-right just in case you use it on other pages
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// Dark Canvas Particles for Light Background
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    // Navy, Saffron, and Green colors optimized for a white background
    const colors = ['rgba(0, 0, 128, 0.25)', 'rgba(255, 153, 51, 0.3)', 'rgba(19, 136, 8, 0.25)'];
    
    for(let i = 0; i < 45; i++) { // Increased particle count slightly
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 90 + 40,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.8, // Increased velocity for more extreme movement
            vy: (Math.random() - 0.5) * 0.8
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

// AI Chatbot Logic (Light Theme Adaptation)
const botWindow = document.getElementById('botWindow');
const botHistory = document.getElementById('botHistory');

function toggleBot() {
    botWindow.style.display = botWindow.style.display === 'flex' ? 'none' : 'flex';
}

function sendMsg(msg) {
    // User Message HTML (Navy Bubble)
    botHistory.innerHTML += `
        <div class="bg-[var(--navy)] p-3 rounded-2xl rounded-tr-sm text-sm text-white ml-8 shadow-md border border-[rgba(0,0,128,0.2)]">
            ${msg}
        </div>
    `;
    botHistory.scrollTop = botHistory.scrollHeight;

    // Typing Indicator
    const typingId = 'typing-' + Date.now();
    botHistory.innerHTML += `
        <div id="${typingId}" class="text-xs text-gray-500 ml-2 mt-2 italic font-semibold">EazyBot is typing...</div>
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
        } else {
            reply = "I'm here to help! You can check our course fees or contact us directly at 7596 909 888.";
        }

        // Bot Message HTML (White Bubble)
        botHistory.innerHTML += `
            <div class="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 mr-8 shadow-md font-semibold">
                🤖 ${reply}
            </div>
        `;
        botHistory.scrollTop = botHistory.scrollHeight;
    }, 800);
}