document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // CUSTOM CURSOR
    // ===========================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.animate(
                { left: `${e.clientX}px`, top: `${e.clientY}px` },
                { duration: 500, fill: "forwards" }
            );
        });
        const interactables = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-info-card, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hovering'));
        });
    }

    // ===========================
    // TYPED.JS
    // ===========================
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['Web Developer', 'Full-Stack Developer', 'AI Tool Creator', 'POS System Expert'],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            loop: true,
            contentType: 'html'
        });
    }

    // ===========================
    // SCROLL REVEAL
    // ===========================
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));

    // ===========================
    // MOBILE SIDEBAR TOGGLE
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    }

    // ===========================
    // SIDEBAR NAV ACTIVE STATE
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(n => n.classList.remove('active'));
                const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));

    // ===========================
    // CONTACT FORM
    // ===========================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                btn.style.background = '#27ae60';
                btn.style.opacity = '1';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ===========================
    // SMOOTH SCROLL FOR SIDEBAR LINKS
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close sidebar on mobile
                if (sidebar) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                    const icon = hamburger?.querySelector('i');
                    if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
                }
            }
        });
    });

    // Stats counter animation
    const statNums = document.querySelectorAll('.stat-num');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                const suffix = el.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const step = target / 30;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = Math.floor(current) + suffix;
                }, 60);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.8 });
    statNums.forEach(el => countObserver.observe(el));

});
