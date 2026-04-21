(function () {
    const canvas = document.getElementById('three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Create floating shapes
    const shapes = [];
    const geometries = [
        new THREE.OctahedronGeometry(1.2, 0),
        new THREE.TetrahedronGeometry(1.4, 0),
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.TorusGeometry(0.9, 0.35, 8, 16),
    ];
    const matOrange = new THREE.MeshPhongMaterial({ color: 0xF97316, wireframe: true, transparent: true, opacity: 0.12 });
    const matBlue = new THREE.MeshPhongMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: 0.1 });

    for (let i = 0; i < 28; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = i % 3 === 0 ? matOrange.clone() : matBlue.clone();
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40
        );
        const s = Math.random() * 1.5 + 0.5;
        mesh.scale.set(s, s, s);
        mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
        mesh.userData = {
            rx: (Math.random() - 0.5) * 0.008,
            ry: (Math.random() - 0.5) * 0.008,
            floatSpeed: Math.random() * 0.0008 + 0.0003,
            floatAmp: Math.random() * 2 + 1,
            floatOffset: Math.random() * Math.PI * 2,
        };
        scene.add(mesh);
        shapes.push(mesh);
    }

    // Ambient + point lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl1 = new THREE.PointLight(0xF97316, 1.5, 60);
    pl1.position.set(-15, 15, 10);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x3B82F6, 1.2, 60);
    pl2.position.set(15, -10, 15);
    scene.add(pl2);

    // Particle field
    const pGeo = new THREE.BufferGeometry();
    const pCount = 800;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 120;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x3B82F6, size: 0.12, transparent: true, opacity: 0.35 });
    scene.add(new THREE.Points(pGeo, pMat));

    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.016;

        shapes.forEach(m => {
            m.rotation.x += m.userData.rx;
            m.rotation.y += m.userData.ry;
            m.position.y += Math.sin(t * m.userData.floatSpeed * 60 + m.userData.floatOffset) * 0.012;
        });

        camera.position.x += (mouse.x * 3 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
function animCursor() {
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.course-card,.feat-card,.testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
});

/* ══════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════ */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

/* ══════════════════════════════════════
   HERO ANIMATIONS (CSS + JS sequenced)
══════════════════════════════════════ */
function animHero() {
    const pill = document.getElementById('heroPill');
    const title = document.getElementById('heroTitle');
    const typed = document.getElementById('typedWrap');
    const desc = document.getElementById('heroDesc');
    const cta = document.getElementById('heroCta');
    const stats = document.getElementById('heroStats');
    const right = document.getElementById('heroRight');

    const els = [pill, title, typed, desc, cta, stats, right];
    els.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        }, 200 + i * 150);
        el.style.transform = 'translateY(30px)';
    });
}
window.addEventListener('load', animHero);

/* ══════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════ */
const phrases = ['Notes for Every Subject', 'PYQ Papers with Solutions', 'Video Lecture Playlists', 'Practice Tests & Quizzes', 'Free Downloads Always'];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function typeLoop() {
    const phrase = phrases[pIdx];
    if (!deleting) {
        typedEl.textContent = phrase.slice(0, ++cIdx);
        if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
        typedEl.textContent = phrase.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 300); return; }
    }
    setTimeout(typeLoop, deleting ? 45 : 75);
}
setTimeout(typeLoop, 1500);

/* ══════════════════════════════════════
   MARQUEE CONTENT
══════════════════════════════════════ */
const marqueeItems = [
    '🚀 BrainBank 2025 — All New Resources Added',
    '📚 500+ Notes, PYQs & Video Lectures',
    '🎯 Practice Aptitude, Reasoning & Technical Questions',
    '⬇️ Free Downloads — No Sign-Up Required',
    '🏆 98% Student Satisfaction Rate',
    '📊 6+ Courses · B.Tech CSE · AI/ML · ECE · BCA · MCA',
];
const track = document.getElementById('marqueeTrack');
const content = [...marqueeItems, ...marqueeItems].map(item =>
    `<span class="marquee-item"><span>•</span> ${item}</span>`
).join('');
track.innerHTML = content;

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const srObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('up'); });
}, { threshold: 0.1 });
document.querySelectorAll('.sr').forEach(el => srObs.observe(el));

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
function animateCount(el, target, suffix) {
    const dur = 1800;
    const start = Date.now();
    const step = () => {
        const progress = Math.min((Date.now() - start) / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.innerHTML = `${Math.floor(eased * target)}<span>${suffix}</span>`;
        if (progress < 1) requestAnimationFrame(step);
    };
    step();
}

const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.innerHTML.match(/<span>(.*?)<\/span>/)?.[1] || '';
        animateCount(el, target, suffix);
        counterObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObs.observe(el));

/* ══════════════════════════════════════
   VANILLA TILT (course cards)
══════════════════════════════════════ */
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8, speed: 400, glare: true, 'max-glare': 0.1, perspective: 1000,
});

/* ══════════════════════════════════════
   HERO CARD TILT (mouse-driven)
══════════════════════════════════════ */
const tiltCard = document.getElementById('tiltCard');
if (tiltCard) {
    document.addEventListener('mousemove', e => {
        const rect = tiltCard.getBoundingClientRect();
        const cx2 = rect.left + rect.width / 2;
        const cy2 = rect.top + rect.height / 2;
        const dx = (e.clientX - cx2) / 20;
        const dy = (e.clientY - cy2) / 20;
        tiltCard.style.transform = `perspective(800px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    });
    tiltCard.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
        tiltCard.style.transition = 'transform 0.5s ease';
    });
}