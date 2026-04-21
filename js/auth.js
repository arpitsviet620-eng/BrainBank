/* ══════════════════════════════════════════
   THREE.JS — TORUS KNOT + FLOATING SHAPES
══════════════════════════════════════════ */
(function () {
    const cv = document.getElementById('cv');
    const rn = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
    rn.setPixelRatio(Math.min(devicePixelRatio, 2));
    rn.setSize(innerWidth, innerHeight);

    const sc = new THREE.Scene();
    const cm = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .1, 500);
    cm.position.set(0, 0, 32);

    const mo = { x: 0, y: 0 };
    window.addEventListener('mousemove', e => {
        mo.x = (e.clientX / innerWidth - .5) * 2;
        mo.y = -(e.clientY / innerHeight - .5) * 2;
    });

    /* ── MAIN TORUS KNOT (blue) ── */
    const tk1g = new THREE.TorusKnotGeometry(5, 1.1, 200, 24, 2, 3);
    const tk1w = new THREE.Mesh(tk1g, new THREE.MeshPhongMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: .12 }));
    const tk1s = new THREE.Mesh(tk1g, new THREE.MeshPhongMaterial({ color: 0x1D4ED8, wireframe: false, transparent: true, opacity: .04, side: THREE.DoubleSide }));
    tk1w.position.set(-16, 2, -8); tk1s.position.set(-16, 2, -8);
    sc.add(tk1w); sc.add(tk1s);

    /* ── SECONDARY TORUS KNOT (orange) ── */
    const tk2g = new THREE.TorusKnotGeometry(3, .7, 140, 18, 3, 5);
    const tk2w = new THREE.Mesh(tk2g, new THREE.MeshPhongMaterial({ color: 0xF97316, wireframe: true, transparent: true, opacity: .11 }));
    tk2w.position.set(17, -3, -12); sc.add(tk2w);

    /* ── MINI RING (top right) ── */
    const rg = new THREE.TorusGeometry(3.5, .4, 16, 60);
    const rm = new THREE.Mesh(rg, new THREE.MeshPhongMaterial({ color: 0x60A5FA, wireframe: true, transparent: true, opacity: .16 }));
    rm.position.set(14, 10, -6); rm.rotation.x = Math.PI / 3; sc.add(rm);

    /* ── FLOATING SHAPES ── */
    const shapes = [];
    const geos = [
        new THREE.OctahedronGeometry(1, 0), new THREE.IcosahedronGeometry(.9, 0),
        new THREE.TetrahedronGeometry(1.1, 0), new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.OctahedronGeometry(.6, 1),
    ];
    const pal = [
        { c: 0x60A5FA, o: .18 }, { c: 0xF97316, o: .14 }, { c: 0x3B82F6, o: .2 },
        { c: 0xFB923C, o: .12 }, { c: 0x93C5FD, o: .16 }, { c: 0xFCA5A5, o: .1 },
    ];
    for (let i = 0; i < 24; i++) {
        const p = pal[i % pal.length];
        const m = new THREE.Mesh(geos[i % geos.length],
            new THREE.MeshPhongMaterial({ color: p.c, wireframe: true, transparent: true, opacity: p.o }));
        m.position.set((Math.random() - .5) * 80, (Math.random() - .5) * 60, (Math.random() - .5) * 35 - 5);
        const s = Math.random() * 1.8 + .3; m.scale.setScalar(s);
        m.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
        m.userData = { rx: (Math.random() - .5) * .008, ry: (Math.random() - .5) * .008, fy: Math.random() * .0008 + .0003, fo: Math.random() * Math.PI * 2 };
        sc.add(m); shapes.push(m);
    }

    /* ── PARTICLES ── */
    const pg = new THREE.BufferGeometry();
    const pp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000 * 3; i++) pp[i] = (Math.random() - .5) * 140;
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    sc.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x3B82F6, size: .09, transparent: true, opacity: .25 })));

    /* ── LIGHTS ── */
    sc.add(new THREE.AmbientLight(0xffffff, .3));
    const l1 = new THREE.PointLight(0x3B82F6, 2.8, 90); l1.position.set(-20, 15, 10); sc.add(l1);
    const l2 = new THREE.PointLight(0xF97316, 2.2, 90); l2.position.set(20, -10, 15); sc.add(l2);
    const l3 = new THREE.PointLight(0x60A5FA, 1.4, 70); l3.position.set(0, 22, -8); sc.add(l3);

    /* ── ANIMATE ── */
    let t = 0;
    function anim() {
        requestAnimationFrame(anim); t += .016;
        /* Rotate torus knots */
        tk1w.rotation.x += .003; tk1w.rotation.y += .006;
        tk1s.rotation.x += .003; tk1s.rotation.y += .006;
        tk2w.rotation.x -= .005; tk2w.rotation.z += .007;
        rm.rotation.z += .008;
        /* Float shapes */
        shapes.forEach(m => {
            m.rotation.x += m.userData.rx;
            m.rotation.y += m.userData.ry;
            m.position.y += Math.sin(t * m.userData.fy * 60 + m.userData.fo) * .011;
        });
        /* Mouse parallax */
        cm.position.x += (mo.x * 3 - cm.position.x) * .035;
        cm.position.y += (mo.y * 2 - cm.position.y) * .035;
        cm.lookAt(sc.position);
        rn.render(sc, cm);
    }
    anim();

    window.addEventListener('resize', () => {
        cm.aspect = innerWidth / innerHeight;
        cm.updateProjectionMatrix();
        rn.setSize(innerWidth, innerHeight);
    });
})();

/* ══════════════════════════════════════════
   CURSOR TRAIL
══════════════════════════════════════════ */
(function () {
    const tcv = document.getElementById('trail-cv');
    const ctx = tcv.getContext('2d');
    tcv.width = innerWidth; tcv.height = innerHeight;
    window.addEventListener('resize', () => { tcv.width = innerWidth; tcv.height = innerHeight; });

    const particles = [];
    let mx = innerWidth / 2, my = innerHeight / 2;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    class P {
        constructor() { this.reset(); }
        reset() {
            this.x = mx; this.y = my;
            this.vx = (Math.random() - .5) * 1.5; this.vy = (Math.random() - .5) * 1.5;
            this.life = 1; this.decay = Math.random() * .04 + .02;
            this.r = Math.random() * 2.5 + .5;
            this.hue = Math.random() > .5 ? '249,115,22' : '59,130,246';
        }
        update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay; this.r *= .97; }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.hue},${this.life * .6})`; ctx.fill();
        }
    }

    let frame = 0;
    function animTrail() {
        requestAnimationFrame(animTrail);
        ctx.clearRect(0, 0, tcv.width, tcv.height);
        frame++;
        if (frame % 2 === 0) for (let i = 0; i < 3; i++) particles.push(new P());
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].life <= 0) particles.splice(i, 1);
            else particles[i].draw();
        }
    }
    animTrail();
})();

/* ══════════════════════════════════════════
   MAGNETIC CURSOR
══════════════════════════════════════════ */
const dot = document.getElementById('cdot'), ring = document.getElementById('cring');
let cx = 0, cy = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
(function loop() {
    dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
    rx += (cx - rx) * .12; ry += (cy - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,input,select').forEach(el => {
    const isBtn = el.tagName === 'BUTTON' && el.classList.contains('sub-btn');
    el.addEventListener('mouseenter', () => {
        dot.classList.add('hov');
        ring.classList.add(isBtn ? 'btn-hov' : 'hov');
    });
    el.addEventListener('mouseleave', () => {
        dot.classList.remove('hov');
        ring.classList.remove('hov', 'btn-hov');
    });
});

/* ══════════════════════════════════════════
   FLIP CARD
══════════════════════════════════════════ */
const stage = document.getElementById('stage');
function flip() { stage.classList.add('flipped'); }
function unflip() { stage.classList.remove('flipped'); }

/* TOGGLE PILL track sizing */
function posTrack(pillId, which) {
    const pill = document.getElementById(pillId);
    const track = document.getElementById('track-' + pillId.split('-')[1]);
    const btns = [...pill.querySelectorAll('.toggle-btn')];
    const activeBtn = btns[which];
    const offset = which === 0 ? 0 : activeBtn.offsetLeft - pill.offsetLeft - 4;
    track.style.width = activeBtn.offsetWidth + 'px';
    track.style.transform = `translateX(${offset}px)`;
}

/* init pill positions */
window.addEventListener('load', () => {
    posTrack('pill-login', 0);
    posTrack('pill-signup', 1);
});

/* ══════════════════════════════════════════
   URL PARAM
══════════════════════════════════════════ */
if (new URLSearchParams(location.search).get('mode') === 'signup') flip();

/* ══════════════════════════════════════════
   PW TOGGLE
══════════════════════════════════════════ */
document.getElementById('leye').onclick = () => { const p = document.getElementById('lp'); p.type = p.type === 'password' ? 'text' : 'password'; };
document.getElementById('seye').onclick = () => { const p = document.getElementById('sp'); p.type = p.type === 'password' ? 'text' : 'password'; };

/* ══════════════════════════════════════════
   PW STRENGTH
══════════════════════════════════════════ */
document.getElementById('sp').addEventListener('input', function () {
    const v = this.value, w = document.getElementById('strW');
    if (!v) { w.style.display = 'none'; return; } w.style.display = 'block';
    let s = 0;
    if (v.length >= 8) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
    const cls = ['s1', 's2', 's3', 's4'], lbl = ['Weak', 'Fair', 'Good', 'Strong'], col = ['#F43F5E', '#F97316', '#FB923C', '#22C55E'];
    for (let i = 1; i <= 4; i++) { const b = document.getElementById('b' + i); b.className = 'str-bar'; if (i <= s) b.classList.add(cls[s - 1]); }
    const l = document.getElementById('sLbl'); l.textContent = lbl[s - 1] || 'Weak'; l.style.color = col[s - 1] || '#F43F5E';
});

/* ══════════════════════════════════════════
   SIGNUP SIDE SCROLL UI
══════════════════════════════════════════ */
(function () {
    const scrollCol = document.getElementById('signupScrollCol');
    const fill = document.getElementById('signupSideFill');
    const thumb = document.getElementById('signupSideThumb');
    const meta = document.getElementById('signupSideMeta');
    const dots = [...document.querySelectorAll('[data-signup-dot]')];
    const sideTrack = document.querySelector('.signup-side-track');
    const signupFace = document.querySelector('.face.back');

    if (!scrollCol || !fill || !thumb || !meta || !dots.length || !sideTrack) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validators = [
        { id: 'sfn', valid: (el) => el.value.trim().length > 0 },
        { id: 'sln', valid: (el) => el.value.trim().length > 0 },
        { id: 'se', valid: (el) => emailRegex.test(el.value.trim()) },
        { id: 'sc', valid: (el) => !!el.value },
        { id: 'sp', valid: (el) => el.value.length >= 8 },
        { id: 'ck', valid: (el) => el.checked },
    ];

    const focusStep = { sfn: 0, sln: 0, se: 1, sc: 2, sp: 3, ck: 4, signupBtn: 5 };

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function completionRatio() {
        let validCount = 0;
        validators.forEach(({ id, valid }) => {
            const el = document.getElementById(id);
            if (el && valid(el)) validCount++;
        });
        return validCount / validators.length;
    }

    function scrollRatio() {
        const maxScroll = scrollCol.scrollHeight - scrollCol.clientHeight;
        if (maxScroll <= 0) return 0;
        return clamp(scrollCol.scrollTop / maxScroll, 0, 1);
    }

    function setScrollFromTrack(clientY) {
        const rect = sideTrack.getBoundingClientRect();
        const relativeY = clamp(clientY - rect.top, 0, rect.height);
        const ratio = rect.height <= 0 ? 0 : relativeY / rect.height;
        const maxScroll = scrollCol.scrollHeight - scrollCol.clientHeight;
        scrollCol.scrollTop = ratio * Math.max(0, maxScroll);
    }

    function setFocusDot(stepIndex) {
        dots.forEach((dot, i) => dot.classList.toggle('focus', i === stepIndex));
    }

    function paint() {
        const complete = completionRatio();
        const scrolled = scrollRatio();
        const uiRatio = clamp((complete * .68) + (scrolled * .32), .08, 1);
        const completionPercent = Math.round(complete * 100);

        fill.style.height = `${uiRatio * 100}%`;
        thumb.style.top = `${uiRatio * 100}%`;
        meta.textContent = `${completionPercent}%`;

        const onCount = Math.max(1, Math.round(complete * dots.length));
        dots.forEach((dot, i) => dot.classList.toggle('on', i < onCount));
    }

    Object.entries(focusStep).forEach(([id, step]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('focus', () => setFocusDot(step));
        el.addEventListener('blur', () => setTimeout(() => setFocusDot(-1), 80));
    });

    if (signupFace) {
        signupFace.addEventListener('wheel', (e) => {
            const canScroll = scrollCol.scrollHeight > scrollCol.clientHeight;
            if (!canScroll) return;
            e.preventDefault();
            scrollCol.scrollTop += e.deltaY;
        }, { passive: false });
    }

    let dragging = false;
    sideTrack.addEventListener('pointerdown', (e) => {
        dragging = true;
        setScrollFromTrack(e.clientY);
        sideTrack.setPointerCapture(e.pointerId);
        e.preventDefault();
    });

    sideTrack.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        setScrollFromTrack(e.clientY);
    });

    const stopDrag = () => { dragging = false; };
    sideTrack.addEventListener('pointerup', stopDrag);
    sideTrack.addEventListener('pointercancel', stopDrag);
    sideTrack.addEventListener('lostpointercapture', stopDrag);

    scrollCol.addEventListener('scroll', paint);
    scrollCol.addEventListener('input', paint, true);
    scrollCol.addEventListener('change', paint, true);
    window.addEventListener('resize', paint);

    paint();
})();

/* ══════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════ */
const eRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function setF(id, eid, ok, msg) {
    const el = document.getElementById(id), er = document.getElementById(eid);
    if (!el || !er) return ok;
    el.classList.toggle('err', !ok); el.classList.toggle('ok', ok);
    er.textContent = msg; er.classList.toggle('show', !ok); return ok;
}

/* Login blur */
document.getElementById('le').addEventListener('blur', () => setF('le', 'leErr', eRe.test(document.getElementById('le').value.trim()), 'Valid email required.'));
document.getElementById('lp').addEventListener('blur', () => setF('lp', 'lpErr', document.getElementById('lp').value.length >= 6, 'Minimum 6 characters.'));

function valLogin() {
    let ok = true;
    ok = setF('le', 'leErr', eRe.test(document.getElementById('le').value.trim()), 'Valid email required.') && ok;
    ok = setF('lp', 'lpErr', document.getElementById('lp').value.length >= 6, 'Minimum 6 characters.') && ok;
    return ok;
}

document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault(); if (!valLogin()) return;
    const btn = document.getElementById('loginBtn');
    btn.classList.add('ld'); btn.disabled = true;
    await new Promise(r => setTimeout(r, 1600));
    btn.classList.remove('ld'); btn.disabled = false;
    window.location.href = './index.html';
});

/* Signup blur */
['sfn', 'sln', 'se', 'sc', 'sp'].forEach(id => document.getElementById(id)?.addEventListener('blur', valSignup));

function valSignup() {
    let ok = true;
    ok = setF('sfn', 'sfnErr', document.getElementById('sfn').value.trim().length > 0, 'Required.') && ok;
    ok = setF('sln', 'slnErr', document.getElementById('sln').value.trim().length > 0, 'Required.') && ok;
    ok = setF('se', 'seErr', eRe.test(document.getElementById('se').value.trim()), 'Valid email required.') && ok;
    ok = setF('sc', 'scErr', !!document.getElementById('sc').value, 'Select a course.') && ok;
    ok = setF('sp', 'spErr', document.getElementById('sp').value.length >= 8, 'Minimum 8 characters.') && ok;
    const ck = document.getElementById('ck'), cke = document.getElementById('ckErr');
    if (!ck.checked) { cke.classList.add('show'); ok = false; } else { cke.classList.remove('show'); }
    return ok;
}

document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault(); if (!valSignup()) return;
    const btn = document.getElementById('signupBtn');
    btn.classList.add('ld'); btn.disabled = true;
    await new Promise(r => setTimeout(r, 1800));
    btn.classList.remove('ld'); btn.disabled = false;
    unflip();
    setTimeout(() => alert('🎉 Account created! Welcome to BrainBank!'), 400);
});