/* ══════════════════════════════════════
   CUSTOM CURSOR - UNIVERSAL
══════════════════════════════════════ */

// Create cursor elements if they don't exist
function initializeCursor() {
    // Check if cursor elements already exist
    if (!document.getElementById('cursor')) {
        const cursor = document.createElement('div');
        cursor.id = 'cursor';
        cursor.className = 'cursor';
        document.body.insertBefore(cursor, document.body.firstChild);
    }
    
    if (!document.getElementById('cursorRing')) {
        const cursorRing = document.createElement('div');
        cursorRing.id = 'cursorRing';
        cursorRing.className = 'cursor-ring';
        document.body.insertBefore(cursorRing, document.body.firstChild);
    }

    // Hide default cursor
    document.body.style.cursor = 'none';
}

// Initialize cursor on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCursor);
} else {
    initializeCursor();
}

// Cursor animation logic
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { 
    cx = e.clientX; 
    cy = e.clientY; 
});

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

// Add hover effects to interactive elements
function addCursorHoverEffects() {
    const interactiveSelectors = 'a, button, input[type="button"], input[type="submit"], .clickable, [role="button"], .course-card, .feat-card, .testi-card';
    
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => { 
            cursor.classList.add('hovered'); 
            cursorRing.classList.add('hovered'); 
        });
        
        el.addEventListener('mouseleave', () => { 
            cursor.classList.remove('hovered'); 
            cursorRing.classList.remove('hovered'); 
        });
    });
}

// Add hover effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCursorHoverEffects);
} else {
    addCursorHoverEffects();
}

// Re-apply hover effects when new content is dynamically added
const observer = new MutationObserver(() => {
    addCursorHoverEffects();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
