/* ═══════════════════════════════════════
   BrainBank — resource.js
   Fetches from /documents/ folder index
═══════════════════════════════════════ */

/* ── CONFIG: maps folder names to display labels ── */
const COURSE_CONFIG = {
    'btech-cse': { label: 'B.Tech CSE', color: '#3B82F6' },
    'btech-ai': { label: 'B.Tech AI/ML', color: '#A855F7' },
    'btech-ece': { label: 'B.Tech ECE', color: '#22C55E' },
    'btech-mech': { label: 'B.Tech Mech', color: '#F43F5E' },
    'bca': { label: 'BCA', color: '#FB923C' },
    'mca': { label: 'MCA', color: '#60A5FA' },
};

const TYPE_CONFIG = {
    notes: { label: 'Notes', icon: '📄', color: 'var(--blue-light)' },
    pyq: { label: 'PYQ Papers', icon: '📝', color: 'var(--orange-light)' },
    video: { label: 'Video Lectures', icon: '▶️', color: '#FB7185' },
};

/* ── STATE ── */
let allResources = [];
let activeCourse = 'all';
let activeType = 'all';
let searchQuery = '';
let isGridView = true;

/* ══════════════════════════════
   FETCH FROM documents/ FOLDER
   ══════════════════════════════
   Reads /documents/manifest.json — a simple index file you maintain.
   This is the most reliable approach for static file servers.
   Format of manifest.json is shown below.
*/
async function loadResources() {
    showSkeleton();
    try {
        const res = await fetch('../documents/manifest.json');
        if (!res.ok) throw new Error('manifest.json not found');
        const manifest = await res.json();
        allResources = buildResourceList(manifest);
    } catch (err) {
        console.warn('manifest.json not found, using auto-scan fallback:', err.message);
        allResources = await autoScanFolders();
    }
    renderAll();
    updateCourseCounts();
}

/* ── BUILD FROM MANIFEST ──
   manifest.json example:
   {
     "btech-cse": {
       "notes": [
         { "file": "DSA-Notes.pdf", "title": "Data Structures & Algorithms", "desc": "Complete DSA notes", "subject": "DSA", "semester": "Sem 3", "size": "4.2 MB" }
       ],
       "pyq": [
         { "file": "DSA-PYQ-2023.pdf", "title": "DSA PYQ 2023", "desc": "Previous year paper", "subject": "DSA", "semester": "Sem 3", "size": "1.1 MB", "year": "2023" }
       ],
       "video": [
         { "file": null, "url": "https://youtube.com/playlist?list=xxx", "title": "DSA Full Course", "desc": "60+ lectures", "subject": "DSA", "semester": "Sem 3", "duration": "42 hrs" }
       ]
     }
   }
*/
function buildResourceList(manifest) {
    const list = [];
    let id = 1;
    Object.entries(manifest).forEach(([course, types]) => {
        Object.entries(types).forEach(([type, files]) => {
            files.forEach(item => {
                list.push({
                    id: id++,
                    course,
                    type,
                    title: item.title || item.file?.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '') || 'Untitled',
                    desc: item.desc || '',
                    subject: item.subject || course.toUpperCase(),
                    semester: item.semester || '',
                    size: item.size || null,
                    year: item.year || null,
                    duration: item.duration || null,
                    file: item.file || null,
                    url: item.url || null,
                    path: item.file ? `../documents/${course}/${type}/${item.file}` : null,
                });
            });
        });
    });
    return list;
}

/* ── AUTO-SCAN FALLBACK ──
   If no manifest.json, tries to fetch a directory listing.
   Works on Apache/Nginx with directory listing enabled.
   Falls back to demo data if that also fails.
*/
async function autoScanFolders() {
    const list = [];
    let id = 1;
    for (const [course] of Object.entries(COURSE_CONFIG)) {
        for (const type of ['notes', 'pyq', 'video']) {
            try {
                const res = await fetch(`../documents/${course}/${type}/`);
                if (!res.ok) continue;
                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = [...doc.querySelectorAll('a[href]')]
                    .map(a => a.getAttribute('href'))
                    .filter(h => h && !h.startsWith('?') && !h.startsWith('/') && h !== '../' && /\.(pdf|docx|pptx|mp4)$/i.test(h));

                links.forEach(file => {
                    const clean = decodeURIComponent(file).replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '');
                    list.push({
                        id: id++, course, type,
                        title: clean, desc: '',
                        subject: course.toUpperCase().replace('-', ''),
                        semester: '', size: null, year: null, duration: null,
                        file, url: null,
                        path: `../documents/${course}/${type}/${file}`,
                    });
                });
            } catch (e) { /* folder may not exist */ }
        }
    }
    // If nothing found at all, load demo data
    return list.length > 0 ? list : getDemoData();
}

/* ── DEMO DATA (shown when no documents folder exists) ── */
function getDemoData() {
    return [
        { id: 1, course: 'btech-cse', type: 'notes', title: 'Data Structures & Algorithms', desc: 'Arrays, trees, graphs, sorting & searching with examples.', subject: 'DSA', semester: 'Sem 3', size: '4.2 MB', year: null, duration: null, file: 'DSA-Notes.pdf', path: '../documents/btech-cse/notes/DSA-Notes.pdf' },
        { id: 2, course: 'btech-cse', type: 'notes', title: 'Operating Systems', desc: 'Process management, scheduling, deadlocks and file systems.', subject: 'OS', semester: 'Sem 4', size: '3.8 MB', year: null, duration: null, file: 'OS-Notes.pdf', path: '../documents/btech-cse/notes/OS-Notes.pdf' },
        { id: 3, course: 'btech-cse', type: 'notes', title: 'Database Management Systems', desc: 'ER models, SQL, normalization and transaction management.', subject: 'DBMS', semester: 'Sem 4', size: '5.1 MB', year: null, duration: null, file: 'DBMS-Notes.pdf', path: '../documents/btech-cse/notes/DBMS-Notes.pdf' },
        { id: 4, course: 'btech-cse', type: 'notes', title: 'Computer Networks', desc: 'OSI model, TCP/IP, routing protocols and network security.', subject: 'CN', semester: 'Sem 5', size: '4.6 MB', year: null, duration: null, file: 'CN-Notes.pdf', path: '../documents/btech-cse/notes/CN-Notes.pdf' },
        { id: 5, course: 'btech-cse', type: 'pyq', title: 'DSA Previous Year Paper 2023', desc: 'Full question paper with solutions and exam pattern analysis.', subject: 'DSA', semester: 'Sem 3', size: '1.2 MB', year: '2023', duration: null, file: 'DSA-PYQ-2023.pdf', path: '../documents/btech-cse/pyq/DSA-PYQ-2023.pdf' },
        { id: 6, course: 'btech-cse', type: 'pyq', title: 'DBMS End Sem 2022', desc: 'Previous year end semester questions with marking scheme.', subject: 'DBMS', semester: 'Sem 4', size: '0.9 MB', year: '2022', duration: null, file: 'DBMS-PYQ-2022.pdf', path: '../documents/btech-cse/pyq/DBMS-PYQ-2022.pdf' },
        { id: 7, course: 'btech-cse', type: 'video', title: 'DSA Full Course Playlist', desc: '60+ lectures covering all data structures from scratch.', subject: 'DSA', semester: 'Sem 3', size: null, year: null, duration: '42 hrs', file: null, url: 'https://youtube.com' },
        { id: 8, course: 'btech-cse', type: 'video', title: 'DBMS Crash Course', desc: 'Complete DBMS with SQL practicals and normalization explained.', subject: 'DBMS', semester: 'Sem 4', size: null, year: null, duration: '18 hrs', file: null, url: 'https://youtube.com' },
        { id: 9, course: 'btech-ai', type: 'notes', title: 'Machine Learning Fundamentals', desc: 'Supervised, unsupervised, regression, classification, clustering.', subject: 'ML', semester: 'Sem 5', size: '6.2 MB', year: null, duration: null, file: 'ML-Notes.pdf', path: '../documents/btech-ai/notes/ML-Notes.pdf' },
        { id: 10, course: 'btech-ai', type: 'notes', title: 'Deep Learning & Neural Networks', desc: 'CNN, RNN, LSTM, transformers and deep learning architectures.', subject: 'DL', semester: 'Sem 6', size: '7.4 MB', year: null, duration: null, file: 'DL-Notes.pdf', path: '../documents/btech-ai/notes/DL-Notes.pdf' },
        { id: 11, course: 'btech-ai', type: 'pyq', title: 'ML End Sem 2023', desc: 'Previous year machine learning paper with model answers.', subject: 'ML', semester: 'Sem 5', size: '1.1 MB', year: '2023', duration: null, file: 'ML-PYQ-2023.pdf', path: '../documents/btech-ai/pyq/ML-PYQ-2023.pdf' },
        { id: 12, course: 'btech-ai', type: 'video', title: 'ML with Python Full Course', desc: 'Complete ML course with scikit-learn, pandas and real projects.', subject: 'ML', semester: 'Sem 5', size: null, year: null, duration: '36 hrs', file: null, url: 'https://youtube.com' },
        { id: 13, course: 'btech-ece', type: 'notes', title: 'Signals & Systems', desc: 'Continuous/discrete signals, Fourier transforms, LTI systems.', subject: 'SS', semester: 'Sem 3', size: '4.4 MB', year: null, duration: null, file: 'SS-Notes.pdf', path: '../documents/btech-ece/notes/SS-Notes.pdf' },
        { id: 14, course: 'btech-ece', type: 'notes', title: 'Digital Electronics', desc: 'Boolean algebra, logic gates, flip-flops and sequential circuits.', subject: 'DE', semester: 'Sem 3', size: '3.9 MB', year: null, duration: null, file: 'DE-Notes.pdf', path: '../documents/btech-ece/notes/DE-Notes.pdf' },
        { id: 15, course: 'btech-ece', type: 'pyq', title: 'Signals & Systems 2023', desc: 'Complete end semester paper with solutions.', subject: 'SS', semester: 'Sem 3', size: '0.8 MB', year: '2023', duration: null, file: 'SS-PYQ-2023.pdf', path: '../documents/btech-ece/pyq/SS-PYQ-2023.pdf' },
        { id: 16, course: 'btech-mech', type: 'notes', title: 'Engineering Thermodynamics', desc: 'Laws of thermodynamics, heat engines, entropy and cycles.', subject: 'Thermo', semester: 'Sem 4', size: '5.0 MB', year: null, duration: null, file: 'Thermo-Notes.pdf', path: '../documents/btech-mech/notes/Thermo-Notes.pdf' },
        { id: 17, course: 'btech-mech', type: 'pyq', title: 'Thermodynamics PYQ 2023', desc: 'Previous year paper with detailed solutions.', subject: 'Thermo', semester: 'Sem 4', size: '0.9 MB', year: '2023', duration: null, file: 'Thermo-PYQ.pdf', path: '../documents/btech-mech/pyq/Thermo-PYQ.pdf' },
        { id: 18, course: 'bca', type: 'notes', title: 'Web Technologies', desc: 'HTML, CSS, JavaScript, PHP and MySQL for web development.', subject: 'WT', semester: 'Sem 4', size: '4.1 MB', year: null, duration: null, file: 'WT-Notes.pdf', path: '../documents/bca/notes/WT-Notes.pdf' },
        { id: 19, course: 'bca', type: 'pyq', title: 'Web Tech End Sem 2023', desc: 'BCA web technologies previous year paper.', subject: 'WT', semester: 'Sem 4', size: '0.7 MB', year: '2023', duration: null, file: 'WT-PYQ-2023.pdf', path: '../documents/bca/pyq/WT-PYQ-2023.pdf' },
        { id: 20, course: 'bca', type: 'video', title: 'Web Dev Bootcamp', desc: 'HTML to React and Node.js — complete web development course.', subject: 'WT', semester: 'Sem 4', size: null, year: null, duration: '48 hrs', file: null, url: 'https://youtube.com' },
        { id: 21, course: 'mca', type: 'notes', title: 'Advanced Java', desc: 'Core Java, JSP, Servlets, Spring Boot and enterprise apps.', subject: 'Java', semester: 'Sem 2', size: '5.5 MB', year: null, duration: null, file: 'Java-Notes.pdf', path: '../documents/mca/notes/Java-Notes.pdf' },
        { id: 22, course: 'mca', type: 'pyq', title: 'Advanced Java 2023', desc: 'MCA advanced Java previous year examination paper.', subject: 'Java', semester: 'Sem 2', size: '0.85 MB', year: '2023', duration: null, file: 'Java-PYQ-2023.pdf', path: '../documents/mca/pyq/Java-PYQ-2023.pdf' },
        { id: 23, course: 'mca', type: 'video', title: 'Java Full Stack Course', desc: 'Spring Boot, React, REST APIs and microservices architecture.', subject: 'Java', semester: 'Sem 2', size: null, year: null, duration: '60 hrs', file: null, url: 'https://youtube.com' },
    ];
}

/* ══════════════════════════════
   FILTER & RENDER
   ══════════════════════════════ */
function getFiltered() {
    return allResources.filter(r => {
        const matchCourse = activeCourse === 'all' || r.course === activeCourse;
        const matchType = activeType === 'all' || r.type === activeType;
        const matchSearch = !searchQuery ||
            r.title.toLowerCase().includes(searchQuery) ||
            r.desc.toLowerCase().includes(searchQuery) ||
            r.subject.toLowerCase().includes(searchQuery) ||
            r.course.toLowerCase().includes(searchQuery);
        return matchCourse && matchType && matchSearch;
    });
}

function renderCard(r) {
    const isVideo = r.type === 'video';
    const typeLabel = TYPE_CONFIG[r.type]?.label || r.type;
    const typeIcon = TYPE_CONFIG[r.type]?.icon || '📁';
    const actionBtn = isVideo
        ? `<a href="${r.url || '#'}" target="_blank" class="watch-btn">▶ Watch</a>`
        : `<a href="${r.path || '#'}" download="${r.file || ''}" class="download-btn" data-title="${r.title}">⬇ Download</a>`;

    const meta = isVideo
        ? `<span class="meta-tag">🕐 ${r.duration || 'N/A'}</span><span class="meta-tag">🎬 Lecture</span>`
        : `<span class="meta-tag">📦 ${r.size || 'N/A'}</span>${r.year ? `<span class="meta-tag">📅 ${r.year}</span>` : ''}`;

    const semStr = [r.subject, r.semester].filter(Boolean).join(' · ');

    return `
    <div class="res-card" data-type="${r.type}" data-id="${r.id}">
      <div class="res-card-top">
        <div class="res-icon res-icon-${r.type}">${typeIcon}</div>
        <span class="res-type-badge badge-${r.type}">${typeLabel}</span>
      </div>
      <div class="res-card-body">
        <div class="res-title" title="${r.title}">${r.title}</div>
        <div class="res-desc">${r.desc || 'No description available.'}</div>
      </div>
      <div class="res-card-meta">${meta}</div>
      <div class="res-card-footer">
        <span class="res-subject">${semStr}</span>
        ${actionBtn}
      </div>
    </div>`;
}

function renderAll() {
    const filtered = getFiltered();
    const container = document.getElementById('resourcesContainer');
    const info = document.getElementById('resultsInfo');

    info.innerHTML = `Showing <strong>${filtered.length}</strong> resource${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No resources found</h3>
        <p>Try a different course, type, or search term.</p>
      </div>`;
        return;
    }

    const groups = { notes: [], pyq: [], video: [] };
    filtered.forEach(r => { if (groups[r.type]) groups[r.type].push(r); });

    const gridClass = isGridView ? 'resource-grid' : 'resource-grid list-view';
    let html = '';

    Object.entries(groups).forEach(([type, items]) => {
        if (!items.length) return;
        if (activeType !== 'all' && activeType !== type) return;
        const cfg = TYPE_CONFIG[type];
        html += `
      <div class="section-divider">
        <span class="divider-label" style="color:${cfg.color}">${cfg.label}</span>
        <div class="divider-line"></div>
        <span class="divider-count">${items.length} items</span>
      </div>
      <div class="${gridClass}">${items.map(renderCard).join('')}</div>`;
    });

    container.innerHTML = html;
    attachDownloadListeners();
}

/* ── DOWNLOAD FEEDBACK ── */
function attachDownloadListeners() {
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const orig = this.innerHTML;
            this.innerHTML = '⏳ Preparing...';
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.innerHTML = '✓ Downloaded!';
                this.style.background = 'rgba(34,197,94,0.15)';
                this.style.borderColor = 'rgba(34,197,94,0.35)';
                this.style.color = '#4ADE80';
                setTimeout(() => {
                    this.innerHTML = orig;
                    this.style.cssText = '';
                }, 2000);
            }, 800);
        });
    });
}

/* ── SKELETON LOADER ── */
function showSkeleton() {
    document.getElementById('resourcesContainer').innerHTML = `
    <div class="resource-grid">
      ${Array(6).fill(0).map(() => `
        <div class="res-card skeleton-card">
          <div class="sk sk-icon"></div>
          <div class="sk sk-title"></div>
          <div class="sk sk-desc"></div>
          <div class="sk sk-desc" style="width:60%"></div>
          <div class="sk sk-footer"></div>
        </div>`).join('')}
    </div>`;
}

/* ── COURSE COUNT UPDATE ── */
function updateCourseCounts() {
    document.querySelectorAll('.course-btn[data-course]').forEach(btn => {
        const course = btn.dataset.course;
        const count = course === 'all'
            ? allResources.length
            : allResources.filter(r => r.course === course).length;
        const badge = btn.querySelector('.course-count');
        if (badge) badge.textContent = count;
    });
}

/* ══════════════════════════════
   EVENT LISTENERS
   ══════════════════════════════ */
document.getElementById('courseList').addEventListener('click', e => {
    const btn = e.target.closest('.course-btn');
    if (!btn) return;
    document.querySelectorAll('.course-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCourse = btn.dataset.course;
    renderAll();
});

document.getElementById('typeFilters').addEventListener('click', e => {
    const btn = e.target.closest('.type-btn');
    if (!btn) return;
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.type;
    renderAll();
});

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    searchClear.classList.toggle('show', searchQuery.length > 0);
    renderAll();
});
searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.remove('show');
    renderAll();
});

document.getElementById('gridViewBtn').addEventListener('click', () => {
    isGridView = true;
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
    renderAll();
});
document.getElementById('listViewBtn').addEventListener('click', () => {
    isGridView = false;
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('gridViewBtn').classList.remove('active');
    renderAll();
});

window.addEventListener('scroll', () =>
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40)
);

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 120);
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── PARTICLE CANVAS ── */
(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    class P {
        constructor() { this.r(); }
        r() { this.x = Math.random() * W; this.y = Math.random() * H; this.s = Math.random() * 1.5 + 0.3; this.vx = (Math.random() - .5) * .28; this.vy = (Math.random() - .5) * .28; this.o = Math.random() * .4 + .1; this.c = Math.random() > .6 ? '249,115,22' : '59,130,246'; }
        u() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.r(); }
        d() { ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.o})`; ctx.fill(); }
    }
    for (let i = 0; i < 100; i++) particles.push(new P());
    function connect() { for (let i = 0; i < particles.length; i++)for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 90) { ctx.beginPath(); ctx.strokeStyle = `rgba(59,130,246,${.05 * (1 - d / 90)})`; ctx.lineWidth = .5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } }
    function animate() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.u(); p.d(); }); connect(); requestAnimationFrame(animate); }
    animate();
})();

/* ── INIT ── */
loadResources();