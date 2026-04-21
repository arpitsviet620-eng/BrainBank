(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.28;
      this.speedY = (Math.random() - 0.5) * 0.28;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.6 ? '249,115,22' : '59,130,246';
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`; ctx.fill();
    }
  }

  for (let i = 0; i < 110; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 95) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${0.055 * (1 - dist / 95)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* NAVBAR SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
});

/* SCROLL REVEAL */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 120);
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

/* CHARACTER COUNTER */
const messageEl = document.getElementById('message');
const charCount = document.getElementById('charCount');
if (messageEl && charCount) {
  messageEl.addEventListener('input', () => {
    const len = messageEl.value.length;
    charCount.textContent = len;
    charCount.style.color = len > 450 ? '#F87171' : len > 350 ? '#FB923C' : '#E2E8F0';
  });
}

/* VALIDATION */
function showError(inputId, errorId, message) {
  const el = document.getElementById(inputId);
  const err = document.getElementById(errorId);
  if (!el || !err) return;
  el.classList.add('error'); el.classList.remove('valid');
  err.textContent = message; err.classList.add('show');
}
function clearError(inputId, errorId) {
  const el = document.getElementById(inputId);
  const err = document.getElementById(errorId);
  if (!el || !err) return;
  el.classList.remove('error'); el.classList.add('valid');
  err.textContent = ''; err.classList.remove('show');
}
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function validateForm() {
  let valid = true;
  const name    = document.getElementById('name')?.value.trim();
  const email   = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value;
  const message = document.getElementById('message')?.value.trim();

  if (!name || name.length < 2) { showError('name','nameError','Please enter your full name (min 2 chars).'); valid = false; }
  else clearError('name','nameError');

  if (!email || !validateEmail(email)) { showError('email','emailError','Please enter a valid email address.'); valid = false; }
  else clearError('email','emailError');

  if (!subject) { showError('subject','subjectError','Please select a subject.'); valid = false; }
  else clearError('subject','subjectError');

  if (!message || message.length < 10) { showError('message','messageError','Message must be at least 10 characters.'); valid = false; }
  else clearError('message','messageError');

  return valid;
}

/* BLUR VALIDATION */
document.getElementById('name')?.addEventListener('blur', () => {
  const val = document.getElementById('name').value.trim();
  if (!val || val.length < 2) showError('name','nameError','Please enter your full name.');
  else clearError('name','nameError');
});
document.getElementById('email')?.addEventListener('blur', () => {
  const val = document.getElementById('email').value.trim();
  if (!validateEmail(val)) showError('email','emailError','Invalid email address.');
  else clearError('email','emailError');
});
document.getElementById('subject')?.addEventListener('change', () => {
  const val = document.getElementById('subject').value;
  if (!val) showError('subject','subjectError','Please select a subject.');
  else clearError('subject','subjectError');
});
document.getElementById('message')?.addEventListener('blur', () => {
  const val = document.getElementById('message').value.trim();
  if (!val || val.length < 10) showError('message','messageError','Message must be at least 10 characters.');
  else clearError('message','messageError');
});

/* FORM SUBMIT */
const form         = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const successState = document.getElementById('successState');
const resetBtn     = document.getElementById('resetBtn');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  await new Promise(resolve => setTimeout(resolve, 1800)); // replace with real API call
  form.style.display = 'none';
  submitBtn.style.display = 'none';
  successState?.classList.add('show');
});

resetBtn?.addEventListener('click', () => {
  form.reset();
  form.style.display = 'block';
  if (submitBtn) { submitBtn.style.display = 'flex'; submitBtn.classList.remove('loading'); submitBtn.disabled = false; }
  successState?.classList.remove('show');
  if (charCount) { charCount.textContent = '0'; charCount.style.color = ''; }
  document.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('valid','error'));
  document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; el.classList.remove('show'); });
});

/* FOCUS EFFECT */
document.querySelectorAll('.input-wrap').forEach(wrap => {
  const input = wrap.querySelector('input, select, textarea');
  if (!input) return;
  input.addEventListener('focus', () => wrap.classList.add('focused'));
  input.addEventListener('blur',  () => wrap.classList.remove('focused'));
});