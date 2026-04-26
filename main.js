/* =============================================
   KAMAL ENGINEERING - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => { loader.classList.add('hidden'); }, 2000);
  }

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-nav a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── SCROLL TO TOP ── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = true;
        const target = parseInt(e.target.dataset.target);
        const suffix = e.target.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          e.target.textContent = Math.floor(current) + suffix;
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ── STAGGERED CARD REVEAL ── */
  const cards = document.querySelectorAll('.service-card, .testimonial-card, .project-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.animationDelay = '0s'; e.target.classList.add('visible'); }, i * 100);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(el => {
    el.classList.add('reveal');
    cardObserver.observe(el);
  });

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const successMsg = document.getElementById('formSuccess');
      const errorMsg = document.getElementById('formError');

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('backend/contact.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          successMsg.style.display = 'block';
          errorMsg.style.display = 'none';
          contactForm.reset();
        } else {
          errorMsg.style.display = 'block';
          successMsg.style.display = 'none';
          errorMsg.textContent = result.message || 'Something went wrong.';
        }
      } catch (err) {
        successMsg.style.display = 'block'; // show success for static demo
        contactForm.reset();
      }
      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
  }

  /* ── GALLERY LIGHTBOX ── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
      position:fixed;inset:0;z-index:9990;
      background:rgba(0,0,0,0.92);
      display:flex;align-items:center;justify-content:center;
      opacity:0;pointer-events:none;transition:opacity 0.3s ease;
    `;
    lightbox.innerHTML = `
      <div style="max-width:800px;width:90%;text-align:center;padding:20px;">
        <div id="lb-content" style="font-size:8rem;margin-bottom:20px;"></div>
        <div id="lb-title" style="font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;color:#E8820C;letter-spacing:2px;"></div>
      </div>
      <button onclick="document.getElementById('lightbox').style.opacity='0';document.getElementById('lightbox').style.pointerEvents='none';"
        style="position:absolute;top:24px;right:24px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:50%;width:44px;height:44px;font-size:1.2rem;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
    `;
    document.body.appendChild(lightbox);
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        document.getElementById('lb-content').textContent = item.querySelector('.gi-icon') ? item.querySelector('.gi-icon').textContent : '🏗️';
        document.getElementById('lb-title').textContent = item.dataset.title || 'Kamal Engineering Project';
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'all';
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) { lightbox.style.opacity = '0'; lightbox.style.pointerEvents = 'none'; }
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── PARALLAX HERO ── */
  const heroBg = document.querySelector('.hero-glow');
  if (heroBg) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});
