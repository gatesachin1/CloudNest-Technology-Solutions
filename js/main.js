(function () {
  'use strict';

  /* ── Navbar scroll state ── */
  const navbar  = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backTop.classList.toggle('visible', y > 400);
  }, { passive: true });

  /* ── Mobile menu ── */
  function toggleMenu() {
    const menu   = document.getElementById('mobileMenu');
    const burger = document.getElementById('hamburger');
    const open   = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    const burger = document.getElementById('hamburger');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  window.toggleMenu = toggleMenu;
  window.closeMenu  = closeMenu;

  document.addEventListener('click', (e) => {
    const menu   = document.getElementById('mobileMenu');
    const burger = document.getElementById('hamburger');
    if (!menu.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });

  /* ── Reveal on scroll ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ── Active nav highlight ── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navAs.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.style.background = '';
      a.style.color      = '';
      if (active && navbar.classList.contains('scrolled')) {
        a.style.background = 'var(--brand-50)';
        a.style.color      = 'var(--brand-700)';
      } else if (active) {
        a.style.background = 'rgba(255,255,255,0.12)';
        a.style.color      = 'white';
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Progress bar fill animation (reads data-width attribute) ── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-fill').forEach(fill => {
          const target = fill.getAttribute('data-width') || '100%';
          fill.style.width = '0';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            fill.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
            fill.style.width = target;
          }));
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.dashboard-card').forEach(c => progressObserver.observe(c));

  /* ── Animated stat counters ── */
  function animateCounter(el) {
    const target  = parseFloat(el.getAttribute('data-count'));
    const suffix  = el.getAttribute('data-suffix') || '';
    const isFloat = target % 1 !== 0;
    const duration = 1600;
    let startTs = null;
    function step(now) {
      if (!startTs) startTs = now;
      const p     = Math.min((now - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.floor(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ── CTA WhatsApp form submission ── */
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name     = ctaForm.cta_name.value.trim();
      const phone    = ctaForm.cta_phone.value.trim();
      const business = ctaForm.cta_business.value || 'a business';
      const plan     = ctaForm.cta_plan.value     || 'your services';
      const msg = `Hi CloudNest! I'm ${name} from ${business}. I'm interested in ${plan}. My contact number is ${phone}. Please get in touch!`;
      window.open('https://wa.me/917875255254?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
    });
  }

  /* ── Tilt effect on dashboard card (desktop only) ── */
  const dashCard = document.querySelector('.dashboard-card');
  if (dashCard && window.innerWidth > 768) {
    dashCard.addEventListener('mousemove', (e) => {
      const rect = dashCard.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      dashCard.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-14px)`;
    });
    dashCard.addEventListener('mouseleave', () => {
      dashCard.style.transform = '';
      dashCard.style.transition = 'transform 0.6s var(--ease-out)';
    });
    dashCard.addEventListener('mouseenter', () => {
      dashCard.style.transition = 'transform 0.12s linear';
    });
  }

})();
