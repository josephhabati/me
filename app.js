/* =============================================
   NAVBAR — scroll + active + hamburger
   ============================================= */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

// Scroll shadow
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  highlightActiveLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinksEl.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity  = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id], .hero[id]');

function highlightActiveLink() {
  const scrollY = window.scrollY + 80;
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
highlightActiveLink();

/* =============================================
   INTERSECTION OBSERVER — fade-up animations
   ============================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Patch: add visible class logic
const styleEl = document.createElement('style');
styleEl.textContent = `
  .skill-card.visible,
  .project-card.visible,
  .timeline-item.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleEl);

/* =============================================
   CONTACT FORM — Formspree AJAX submission
   ============================================= */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const errorMsg   = document.getElementById('formError');
const submitBtn  = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

function showStatus(el) {
  successMsg.style.display = 'none';
  errorMsg.style.display   = 'none';
  el.style.display = 'flex';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

if (form) {
  // Keep _replyto in sync with the email field
  const emailInput = document.getElementById('email');
  const replyTo    = form.querySelector('input[name="_replyto"]');
  if (emailInput && replyTo) {
    emailInput.addEventListener('input', () => { replyTo.value = emailInput.value; });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Guard: remind user to replace placeholder ID
    if (form.action.includes('YOUR_FORM_ID')) {
      alert('⚠️  Please replace YOUR_FORM_ID in the form action with your Formspree endpoint.\nSee the setup instructions in the README.');
      return;
    }

    // Show loading state
    submitBtn.disabled   = true;
    submitText.style.display   = 'none';
    submitSpinner.style.display = 'inline';

    try {
      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showStatus(successMsg);
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        console.error('Formspree error:', json);
        showStatus(errorMsg);
      }
    } catch (err) {
      console.error('Network error:', err);
      showStatus(errorMsg);
    } finally {
      submitBtn.disabled        = false;
      submitText.style.display   = 'inline';
      submitSpinner.style.display = 'none';
    }
  });
}

/* =============================================
   TERMINAL TYPEWRITER (optional subtle effect)
   ============================================= */
function typewriterEffect(el, text, speed = 60) {
  let i = 0;
  el.textContent = '';
  const id = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(id);
  }, speed);
}
