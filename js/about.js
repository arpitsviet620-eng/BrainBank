/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
class Particle { constructor() { this.reset(); } reset() { this.x = Math.random() * W; this.y = Math.random() * H; this.size = Math.random() * 1.5 + 0.3; this.speedX = (Math.random() - 0.5) * 0.3; this.speedY = (Math.random() - 0.5) * 0.3; this.opacity = Math.random() * 0.4 + 0.1; this.color = Math.random() > 0.6 ? '249,115,22' : '59,130,246'; } update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(); } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.color},${this.opacity})`; ctx.fill(); } }
for (let i = 0; i < 120; i++) particles.push(new Particle());
function connectParticles() { for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } } }
function animate() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); connectParticles(); requestAnimationFrame(animate); }
animate();

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), 100); }); }, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── CUSTOM CURSOR ── */
(function () {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    if (!cursor || !cursorRing) return;

    let cx = 0, cy = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

    function animateCursor() {
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        rx += (cx - rx) * 0.12;
        ry += (cy - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .mission-card, .feature-item, .story-tag').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorRing.style.opacity = '1'; });
})();