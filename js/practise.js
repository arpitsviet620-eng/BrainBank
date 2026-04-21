const questionBank = {
    aptitude: [
        { q: "If 20% of a number is 80, what is 35% of that number?", opts: ["120", "130", "140", "150"], ans: 2, exp: "20% of x = 80 → x = 400. 35% of 400 = 140." },
        { q: "A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?", opts: ["32", "36", "40", "45"], ans: 1, exp: "Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/h." },
        { q: "What is the compound interest on ₹10,000 at 10% per annum for 2 years?", opts: ["₹2,000", "₹2,100", "₹2,200", "₹1,900"], ans: 1, exp: "CI = 10000(1.1²-1) = 10000 × 0.21 = ₹2,100." },
        { q: "The ratio of two numbers is 3:5. If each is increased by 10, the ratio becomes 5:7. Find the numbers.", opts: ["15 and 25", "20 and 30", "15 and 30", "10 and 20"], ans: 0, exp: "3x+10/5x+10 = 5/7 → 21x+70 = 25x+50 → 4x=20 → x=5. Numbers: 15, 25." },
        { q: "A can do a work in 12 days. B can do it in 15 days. In how many days can A and B together finish it?", opts: ["6⅔ days", "7 days", "7⅓ days", "6 days"], ans: 0, exp: "A+B per day = 1/12+1/15 = 9/60 = 3/20. Together = 20/3 = 6⅔ days." },
        { q: "Find the average of the first 20 odd numbers.", opts: ["18", "19", "20", "21"], ans: 2, exp: "First n odd numbers average = n. For n=20, average = 20." },
        { q: "A shopkeeper marks goods 40% above cost and gives 20% discount. Find profit%.", opts: ["12%", "14%", "16%", "18%"], ans: 0, exp: "SP = 1.4 × 0.8 = 1.12 CP. Profit = 12%." },
        { q: "Find the LCM of 12, 18, and 24.", opts: ["48", "60", "72", "36"], ans: 2, exp: "LCM(12,18,24) = 72." },
        { q: "If x² + 1/x² = 18, find x + 1/x.", opts: ["±√18", "±√20", "±√22", "±4"], ans: 1, exp: "(x+1/x)² = x²+2+1/x² = 18+2 = 20. So x+1/x = ±√20." },
        { q: "A boat goes 30 km upstream in 3 hours and 30 km downstream in 1.5 hours. Find the speed of the stream.", opts: ["5 km/h", "8 km/h", "10 km/h", "6 km/h"], ans: 0, exp: "Upstream=10, Downstream=20. Stream=(20-10)/2=5 km/h." },
    ],
    reasoning: [
        { q: "If A is brother of B, B is sister of C, C is father of D. How is A related to D?", opts: ["Uncle", "Nephew", "Father", "Grandfather"], ans: 0, exp: "A(brother of B, sister of C) → A is brother/sister of C (father of D). A is uncle of D." },
        { q: "Find the missing number: 2, 6, 12, 20, 30, __", opts: ["40", "42", "44", "46"], ans: 1, exp: "Differences: 4,6,8,10,12. Next = 30+12 = 42." },
        { q: "Arrange these words in a meaningful sequence: 1.Word 2.Sentence 3.Letter 4.Paragraph 5.Chapter", opts: ["3,1,2,4,5", "1,3,2,4,5", "3,2,1,4,5", "1,2,3,4,5"], ans: 0, exp: "Letter → Word → Sentence → Paragraph → Chapter." },
        { q: "If CLOUD is coded as DNPVE, how is RAIN coded?", opts: ["SCJO", "TBJO", "SCJP", "TBKP"], ans: 0, exp: "Each letter shifted +1. R→S, A→B... wait: C→D(+1),L→N(+2),O→P(+1),U→V(+1),D→E(+1). So +1 pattern: R→S,A→B,I→J,N→O = SBJO. Check: SCJO uses +1,+2,+1,+1 same as original." },
        { q: "Six friends sit in a circle facing center. P sits between Q and R. S sits opposite P. T sits between S and R. Who sits opposite Q?", opts: ["T", "R", "S", "U"], ans: 0, exp: "Arranging: P(Q,R), S opposite P, T between S and R → T sits opposite Q." },
        { q: "If 'MANGO' is written as 'OCPIQ', how is 'PEACH' written?", opts: ["RGCEJ", "RFCBI", "RGCBJ", "RFCEJ"], ans: 0, exp: "Each letter +2: P→R,E→G,A→C,C→E,H→J = RGCEJ." },
        { q: "A is taller than B. C is taller than A. D is taller than C but shorter than E. Who is the shortest?", opts: ["A", "B", "C", "D"], ans: 1, exp: "Order: E>D>C>A>B. B is shortest." },
        { q: "Find the odd one out: 121, 144, 169, 196, 225, 256, 288", opts: ["225", "256", "288", "196"], ans: 2, exp: "All others are perfect squares (11²,12²,13²,14²,15²,16²). 288 is not (17²=289)." },
        { q: "3 men can complete a job in 6 days. How many extra men are needed to complete it in 2 days?", opts: ["3", "6", "9", "4"], ans: 1, exp: "Total work = 18 man-days. For 2 days: 18/2 = 9 men. Extra = 9-3 = 6." },
        { q: "Pointing to a photograph, a man said 'Her father is the only son of my father.' How is the woman in the photo related to the man?", opts: ["Daughter", "Sister", "Niece", "Mother"], ans: 0, exp: "Only son of my father = myself. Her father = me. So she is my daughter." },
    ],
    verbal: [
        { q: "Choose the word most similar in meaning to 'EPHEMERAL':", opts: ["Permanent", "Transient", "Eternal", "Robust"], ans: 1, exp: "Ephemeral means lasting for a very short time — synonym: transient." },
        { q: "Choose the antonym of 'MAGNANIMOUS':", opts: ["Generous", "Petty", "Noble", "Brave"], ans: 1, exp: "Magnanimous means generous. Its antonym is petty/mean." },
        { q: "Fill in the blank: The committee ___ the proposal after a lengthy debate.", opts: ["ratified", "nullified", "ratifies", "ratify"], ans: 0, exp: "'Ratified' (past tense) correctly completes the sentence." },
        { q: "Identify the correctly spelled word:", opts: ["Accommodate", "Accomodate", "Acomodate", "Accomdate"], ans: 0, exp: "'Accommodate' — double 'c' and double 'm'." },
        { q: "Choose the word opposite in meaning to 'BELLIGERENT':", opts: ["Hostile", "Aggressive", "Peaceful", "Warlike"], ans: 2, exp: "Belligerent means hostile/aggressive. Antonym is peaceful." },
        { q: "Which sentence uses the correct form of the verb?", opts: ["He don't like pizza", "She don't know", "Neither of them are ready", "Each of the students has submitted their work"], ans: 3, exp: "'Each' takes a singular verb → 'has submitted' is correct." },
        { q: "The idiom 'Bite the bullet' means:", opts: ["To eat fast", "To endure pain stoically", "To shoot someone", "To be courageous"], ans: 1, exp: "'Bite the bullet' means to endure a painful situation bravely." },
        { q: "Choose the word most similar to 'VERBOSE':", opts: ["Silent", "Concise", "Wordy", "Brief"], ans: 2, exp: "Verbose means using more words than needed — synonym: wordy." },
        { q: "Rearrange to form a meaningful sentence: always / practice / makes / perfect", opts: ["Practice perfect makes always", "Perfect makes always practice", "Practice always makes perfect", "Always perfect practice makes"], ans: 2, exp: "'Practice always makes perfect' is the correct arrangement." },
        { q: "'Plethora' means:", opts: ["Shortage", "Abundance", "Balance", "Confusion"], ans: 1, exp: "Plethora means a large or excessive amount — abundance." },
    ],
    ds: [
        { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], ans: 1, exp: "Binary search halves the search space each time → O(log n)." },
        { q: "Which data structure uses LIFO (Last In First Out)?", opts: ["Queue", "Stack", "Linked List", "Tree"], ans: 1, exp: "A stack follows LIFO — the last element inserted is the first to be removed." },
        { q: "What is the worst-case time complexity of quicksort?", opts: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], ans: 2, exp: "Worst case (already sorted, bad pivot) = O(n²). Average case = O(n log n)." },
        { q: "Which traversal of a BST gives elements in sorted order?", opts: ["Preorder", "Postorder", "Inorder", "Level order"], ans: 2, exp: "Inorder traversal (Left-Root-Right) of a BST yields elements in ascending order." },
        { q: "The number of edges in a complete graph with n vertices is:", opts: ["n(n-1)", "n(n-1)/2", "n²", "n+1"], ans: 1, exp: "Complete graph: every pair connected → n(n-1)/2 edges." },
        { q: "Which sorting algorithm is stable and has O(n log n) worst case?", opts: ["Quicksort", "Heapsort", "Merge Sort", "Selection Sort"], ans: 2, exp: "Merge sort is stable and always O(n log n) in all cases." },
        { q: "What does a hash function do in a hash table?", opts: ["Sorts elements", "Maps keys to indices", "Searches elements", "Deletes elements"], ans: 1, exp: "A hash function converts a key into an array index for O(1) average access." },
        { q: "The depth of a complete binary tree with n nodes is:", opts: ["O(n)", "O(log n)", "O(n log n)", "O(√n)"], ans: 1, exp: "A complete binary tree with n nodes has depth = ⌊log₂n⌋ = O(log n)." },
        { q: "Which data structure is ideal for implementing a priority queue?", opts: ["Array", "Stack", "Heap", "Linked List"], ans: 2, exp: "A heap provides O(log n) insert/delete and O(1) peek for priority queues." },
        { q: "What is the space complexity of DFS on a graph with V vertices and E edges?", opts: ["O(V+E)", "O(V)", "O(E)", "O(1)"], ans: 1, exp: "DFS uses a stack of size O(V) in the worst case (linear chain graph)." },
    ],
    general: [
        { q: "Who is known as the 'Father of the Indian Constitution'?", opts: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Patel"], ans: 2, exp: "Dr. B.R. Ambedkar was the principal architect of the Indian Constitution." },
        { q: "Which planet is known as the Red Planet?", opts: ["Venus", "Jupiter", "Mars", "Saturn"], ans: 2, exp: "Mars appears red due to iron oxide (rust) on its surface." },
        { q: "What is the full form of 'URL'?", opts: ["Uniform Resource Locator", "Universal Resource Link", "Unique Resource Locator", "Uniform Reference Link"], ans: 0, exp: "URL = Uniform Resource Locator — the address of a web resource." },
        { q: "The 2024 Summer Olympics were held in:", opts: ["Tokyo", "Paris", "Los Angeles", "London"], ans: 1, exp: "The 2024 Summer Olympics were held in Paris, France." },
        { q: "Which is the smallest country in the world by area?", opts: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], ans: 2, exp: "Vatican City (0.44 km²) is the smallest internationally recognized state." },
        { q: "What does 'AI' stand for in technology?", opts: ["Automated Intelligence", "Artificial Intelligence", "Advanced Interface", "Augmented Integration"], ans: 1, exp: "AI = Artificial Intelligence — simulation of human intelligence by machines." },
        { q: "The speed of light in vacuum is approximately:", opts: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], ans: 1, exp: "Speed of light ≈ 3 × 10⁸ m/s (299,792,458 m/s exactly)." },
        { q: "Which is the largest ocean on Earth?", opts: ["Atlantic", "Indian", "Arctic", "Pacific"], ans: 3, exp: "The Pacific Ocean is the largest, covering about 165 million km²." },
        { q: "Who wrote 'A Brief History of Time'?", opts: ["Carl Sagan", "Stephen Hawking", "Neil deGrasse Tyson", "Richard Feynman"], ans: 1, exp: "Stephen Hawking wrote 'A Brief History of Time' (1988)." },
        { q: "The chemical symbol 'Au' represents:", opts: ["Silver", "Gold", "Aluminum", "Argon"], ans: 1, exp: "'Au' comes from the Latin 'Aurum' — it represents Gold." },
    ],
    dbms: [
        { q: "Which normal form eliminates transitive dependencies?", opts: ["1NF", "2NF", "3NF", "BCNF"], ans: 2, exp: "Third Normal Form (3NF) eliminates transitive functional dependencies." },
        { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "Structured Question Language"], ans: 0, exp: "SQL = Structured Query Language — used to manage relational databases." },
        { q: "Which command is used to remove all rows from a table without removing the table?", opts: ["DROP", "DELETE", "TRUNCATE", "REMOVE"], ans: 2, exp: "TRUNCATE removes all rows fast without logging individual deletions. Table structure remains." },
        { q: "In an ER diagram, a relationship between two entities of the same type is called:", opts: ["Binary", "Unary", "Ternary", "Recursive"], ans: 3, exp: "A recursive (or unary) relationship involves an entity related to itself." },
        { q: "Which JOIN returns only rows that have matching values in both tables?", opts: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"], ans: 2, exp: "INNER JOIN returns only rows with matching values in both tables." },
        { q: "ACID properties stand for:", opts: ["Atomicity, Consistency, Isolation, Durability", "Atomic, Correct, Isolation, Data", "Atomicity, Concurrency, Integrity, Durability", "Absolute, Consistency, Isolation, Data"], ans: 0, exp: "ACID = Atomicity, Consistency, Isolation, Durability — properties of transactions." },
        { q: "A primary key can contain NULL values.", opts: ["True", "False", "Only in MySQL", "Only in Oracle"], ans: 1, exp: "False. A primary key must be unique and NOT NULL." },
        { q: "Which of the following is a DDL command?", opts: ["INSERT", "UPDATE", "CREATE", "SELECT"], ans: 2, exp: "CREATE is a DDL (Data Definition Language) command. INSERT/UPDATE are DML." },
        { q: "The concept of ensuring that a child table cannot have a value not present in the parent table is called:", opts: ["Entity Integrity", "Referential Integrity", "Domain Integrity", "User Integrity"], ans: 1, exp: "Referential Integrity ensures foreign key values match primary key values in the parent table." },
        { q: "What is a deadlock in DBMS?", opts: ["A slow query", "Two transactions waiting for each other indefinitely", "A corrupted database", "A failed backup"], ans: 1, exp: "Deadlock occurs when two or more transactions wait indefinitely for each other to release locks." },
    ],
};

const catConfig = {
    aptitude: { name: 'Quantitative Aptitude', icon: '🧮', color: 'orange', time: 900 },
    reasoning: { name: 'Logical Reasoning', icon: '🧠', color: 'blue', time: 900 },
    verbal: { name: 'Verbal Ability', icon: '📖', color: 'green', time: 900 },
    ds: { name: 'Data Structures', icon: '💻', color: 'purple', time: 1200 },
    general: { name: 'General Knowledge', icon: '🌍', color: 'yellow', time: 600 },
    dbms: { name: 'DBMS & SQL', icon: '🗄️', color: 'rose', time: 1200 },
};

/* ══ QUIZ STATE ══ */
let quizState = { cat: '', questions: [], current: 0, score: 0, answered: [], timer: null, timeLeft: 0, startTime: 0 };

function startQuiz(cat) {
    const cfg = catConfig[cat];
    const qs = [...questionBank[cat]].sort(() => Math.random() - 0.5);

    quizState = { cat, questions: qs, current: 0, score: 0, answered: [], timer: null, timeLeft: cfg.time, startTime: Date.now() };

    // Setup header
    document.getElementById('quizCatIcon').textContent = cfg.icon;
    document.getElementById('quizCatIcon').className = `quiz-cat-icon cat-icon ${cfg.color}`;
    document.getElementById('quizCatName').textContent = cfg.name;

    // Dots
    const dots = document.getElementById('qDots');
    dots.innerHTML = qs.map((_, i) => `<div class="q-dot" id="dot-${i}"></div>`).join('');

    document.getElementById('quizView').style.display = 'block';
    document.getElementById('resultsView').classList.remove('show');
    document.getElementById('quizOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';

    loadQuestion(0);
    startTimer();
}

function loadQuestion(idx) {
    const q = quizState.questions[idx];
    const len = quizState.questions.length;

    document.getElementById('qNumber').textContent = `Question ${String(idx + 1).padStart(2, '0')}`;
    document.getElementById('qText').textContent = q.q;
    document.getElementById('progressLabel').textContent = `Question ${idx + 1} of ${len}`;
    document.getElementById('scoreLabel').textContent = `Score: ${quizState.score}`;
    document.getElementById('progressFill').style.width = `${((idx + 1) / len) * 100}%`;
    document.getElementById('explanationBox').classList.remove('show');

    // Mark dot active
    document.querySelectorAll('.q-dot').forEach((d, i) => {
        d.classList.remove('active');
        if (i < idx) {
            d.classList.add(quizState.answered[i] ? 'correct' : 'wrong');
        }
    });
    document.getElementById(`dot-${idx}`)?.classList.add('active');

    // Options
    const keys = ['A', 'B', 'C', 'D'];
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = q.opts.map((opt, i) => `
    <button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
      <span class="opt-key">${keys[i]}</span>${opt}
    </button>`).join('');

    document.getElementById('nextBtn').disabled = true;
}

function selectOption(idx) {
    const q = quizState.questions[quizState.current];
    const isLast = quizState.current === quizState.questions.length - 1;
    const correct = idx === q.ans;

    // Disable all options
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.ans) btn.classList.add('correct');
        if (i === idx && !correct) btn.classList.add('wrong');
    });

    // Track
    quizState.answered[quizState.current] = correct;
    if (correct) quizState.score++;

    // Update score
    document.getElementById('scoreLabel').textContent = `Score: ${quizState.score}`;

    // Show explanation
    document.getElementById('expText').textContent = q.exp;
    document.getElementById('explanationBox').classList.add('show');

    // Next button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = false;
    nextBtn.textContent = isLast ? 'Finish ✓' : 'Next →';
}

function nextQuestion() {
    const next = quizState.current + 1;
    if (next >= quizState.questions.length) {
        showResults();
    } else {
        quizState.current = next;
        loadQuestion(next);
    }
}

function showResults() {
    clearInterval(quizState.timer);
    const total = quizState.questions.length;
    const correct = quizState.score;
    const wrong = total - correct;
    const pct = Math.round((correct / total) * 100);
    const elapsed = Math.round((Date.now() - quizState.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

    document.getElementById('quizView').style.display = 'none';
    document.getElementById('resultsView').classList.add('show');

    document.getElementById('resultsPct').textContent = `${pct}%`;
    document.getElementById('resCorrect').textContent = correct;
    document.getElementById('resWrong').textContent = wrong;
    document.getElementById('resTime').textContent = timeStr;

    const titles = ['Keep Trying! 💪', 'Good Effort! 👍', 'Well Done! 🎉', 'Excellent! 🌟', 'Perfect Score! 🏆'];
    const subs = ['Every expert was once a beginner.', 'A little more practice will get you there!', 'You\'re getting better every day!', 'Outstanding performance! Push for 100%!', 'You nailed it! Try a harder category!'];
    const tier = pct < 40 ? 0 : pct < 60 ? 1 : pct < 80 ? 2 : pct < 100 ? 3 : 4;
    document.getElementById('resultsTitle').textContent = titles[tier];
    document.getElementById('resultsSub').textContent = subs[tier];

    // Animate circle
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - pct / 100);
    setTimeout(() => {
        document.getElementById('scoreArc').style.transition = 'stroke-dashoffset 1s ease';
        document.getElementById('scoreArc').setAttribute('stroke-dashoffset', offset);
    }, 200);

    // Retry
    document.getElementById('retryBtn').onclick = () => startQuiz(quizState.cat);
}

/* ── TIMER ── */
function startTimer() {
    const timerEl = document.getElementById('quizTimer');
    quizState.timer = setInterval(() => {
        quizState.timeLeft--;
        const m = Math.floor(quizState.timeLeft / 60);
        const s = quizState.timeLeft % 60;
        timerEl.textContent = `⏱ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        timerEl.classList.toggle('warning', quizState.timeLeft <= 60);
        if (quizState.timeLeft <= 0) { clearInterval(quizState.timer); showResults(); }
    }, 1000);
}

function closeQuiz() {
    clearInterval(quizState.timer);
    document.getElementById('quizOverlay').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('scoreArc').setAttribute('stroke-dashoffset', 326.7);
}

/* Close on overlay click */
document.getElementById('quizOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeQuiz();
});

/* Keyboard: Escape to close, 1-4 to select options */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuiz();
    if (['1', '2', '3', '4'].includes(e.key)) {
        const opt = document.getElementById(`opt-${parseInt(e.key) - 1}`);
        if (opt && !opt.disabled) opt.click();
    }
    if (e.key === 'Enter') {
        const nb = document.getElementById('nextBtn');
        if (!nb.disabled) nb.click();
    }
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40));

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 100); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── PARTICLE CANVAS ── */
(function () {
    const canvas = document.getElementById('bg-canvas'), ctx = canvas.getContext('2d');
    let W, H, P = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    class Pt { constructor() { this.r(); } r() { this.x = Math.random() * W; this.y = Math.random() * H; this.s = Math.random() * 1.5 + .3; this.vx = (Math.random() - .5) * .28; this.vy = (Math.random() - .5) * .28; this.o = Math.random() * .4 + .1; this.c = Math.random() > .6 ? '249,115,22' : '59,130,246'; } u() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.r(); } d() { ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.o})`; ctx.fill(); } }
    for (let i = 0; i < 100; i++)P.push(new Pt());
    function connect() { for (let i = 0; i < P.length; i++)for (let j = i + 1; j < P.length; j++) { const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 90) { ctx.beginPath(); ctx.strokeStyle = `rgba(59,130,246,${.05 * (1 - d / 90)})`; ctx.lineWidth = .5; ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke(); } } }
    function animate() { ctx.clearRect(0, 0, W, H); P.forEach(p => { p.u(); p.d(); }); connect(); requestAnimationFrame(animate); }
    animate();
})();