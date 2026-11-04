document.addEventListener('DOMContentLoaded', () => {
  // Navigation Drawer Toggle
  const openDrawerBtn = document.getElementById('openDrawerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const navDrawer = document.getElementById('navDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    navDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close others
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      }
    });
  });

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  // Smooth scroll to top when clicking "Inicio" or brand logo
  document.querySelectorAll('a[href="#inicio"]').forEach((inicioLink) => {
    inicioLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', '#inicio');
    });
  });

  window.addEventListener('scroll', () => {
    let current = 'inicio';
    const scrollY = window.scrollY + 140;

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  // Franchise Contact Form -> WhatsApp + Mailto handler
  const franchiseForm = document.getElementById('franchiseForm');
  const formFeedback = document.getElementById('formFeedback');

  if (franchiseForm) {
    franchiseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const city = document.getElementById('city').value.trim();
      const message = document.getElementById('message').value.trim();

      const textLines = [
        'Hola, me interesa recibir más información sobre la franquicia *Tostadas, Sabor y Más*.',
        `*Nombre:* ${name}`,
        `*Correo:* ${email}`,
        `*Teléfono:* ${phone}`,
      ];
      if (city) textLines.push(`*Ciudad de interés:* ${city}`);
      if (message) textLines.push(`*Mensaje:* ${message}`);

      const waUrl = `https://wa.me/527291092341?text=${encodeURIComponent(textLines.join('\n'))}`;

      if (formFeedback) {
        formFeedback.classList.add('visible');
      }

      window.open(waUrl, '_blank', 'noopener');
      franchiseForm.reset();
    });
  }

  // Instagram Manual Username & Password Space Handler
  const igForm = document.getElementById('instagramLoginForm');
  const igUsernameInput = document.getElementById('igUsername');
  const igPasswordInput = document.getElementById('igPassword');
  const toggleIgPwdBtn = document.getElementById('toggleIgPwd');
  const igFeedback = document.getElementById('igFeedback');
  const igProfileLinks = document.querySelectorAll('.ig-profile-link');
  const igDisplayLink = document.getElementById('igDisplayLink');
  const igButtonLink = document.getElementById('igButtonLink');

  function applyInstagramUsername(rawUser) {
    const cleanUser = rawUser.replace(/^@+/, '').trim();
    if (!cleanUser) return;
    const igUrl = `https://www.instagram.com/${encodeURIComponent(cleanUser)}/`;

    igProfileLinks.forEach((link) => {
      link.setAttribute('href', igUrl);
      if (link.textContent.trim().startsWith('Instagram:')) {
        link.textContent = `Instagram: @${cleanUser}`;
      }
    });

    if (igDisplayLink) {
      igDisplayLink.textContent = `@${cleanUser}`;
      igDisplayLink.setAttribute('href', igUrl);
    }

    if (igButtonLink) {
      igButtonLink.setAttribute('href', igUrl);
    }
  }

  // Restore saved Instagram username if previously configured
  const savedIgUser = localStorage.getItem('tostadas_ig_username');
  if (savedIgUser && igUsernameInput) {
    igUsernameInput.value = savedIgUser;
    applyInstagramUsername(savedIgUser);
  }

  if (toggleIgPwdBtn && igPasswordInput) {
    toggleIgPwdBtn.addEventListener('click', () => {
      const isPwd = igPasswordInput.getAttribute('type') === 'password';
      igPasswordInput.setAttribute('type', isPwd ? 'text' : 'password');
      toggleIgPwdBtn.textContent = isPwd ? 'Ocultar' : 'Ver';
    });
  }

  if (igForm) {
    igForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userVal = igUsernameInput ? igUsernameInput.value.trim() : '';
      if (userVal) {
        localStorage.setItem('tostadas_ig_username', userVal);
        applyInstagramUsername(userVal);
      }
      if (igFeedback) {
        igFeedback.classList.add('visible');
        setTimeout(() => {
          igFeedback.classList.remove('visible');
        }, 5000);
      }
    });
  }
});
