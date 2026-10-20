/* ==========================================================================
   1. PRELOADER
   ========================================================================== */
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 500);
});

/* ==========================================================================
   1.1. PARTÍCULAS DE FONDO GLOBAL (toda la página)
   ========================================================================== */
const bgParticles = document.getElementById('bgParticles');
if (bgParticles) {
  const bgParticleCount = 40;

  for (let i = 0; i < bgParticleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 25}s`;
    particle.style.animationDuration = `${Math.random() * 15 + 15}s`;

    bgParticles.appendChild(particle);
  }
}

/* ==========================================================================
   2. CURSOR PERSONALIZADO Y EFECTO HOVER
   ========================================================================== */
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .glass-card, .gallery-item, .character-card');
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.borderColor = '#ffffff';
    });
    elem.addEventListener('mouseleave', () => {
      follower.style.width = '30px';
      follower.style.height = '30px';
      follower.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    });
  });
}

/* ==========================================================================
   3. NAVBAR FIX Y MENÚ HAMBURGUESA
   ========================================================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ==========================================================================
   3.1. INDICADOR DE SECCIÓN ACTIVA EN EL NAVBAR
   ========================================================================== */
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navSections = Array.from(navAnchorLinks)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (navAnchorLinks.length && navSections.length) {
  const setActiveLink = (id) => {
    navAnchorLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
    });
  };

  const navSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { threshold: 0.35, rootMargin: '-40% 0px -40% 0px' });

  navSections.forEach(section => navSpyObserver.observe(section));
}

/* ==========================================================================
   4. GENERADOR DE PARTÍCULAS SUTILES EN HERO
   ========================================================================== */
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

    particlesContainer.appendChild(particle);
  }
}

/* ==========================================================================
   5. EFECTO PARALLAX EN EL HERO
   ========================================================================== */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  if (heroBg && scrollPos < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollPos * 0.3}px) scale(1.05)`;
  }
});

/* ==========================================================================
   6. ANIMACIONES DE APARICIÓN (INTERSECTION OBSERVER)
   ========================================================================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(reveal => revealObserver.observe(reveal));

/* ==========================================================================
   6.1. ANIMACIÓN ESCALONADA DE LAS TARJETAS DE CREADORES
   ========================================================================== */
const creatorCards = document.querySelectorAll('.creator-card');

const creatorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = [...creatorCards].indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 150);
      creatorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

creatorCards.forEach(card => creatorObserver.observe(card));

/* ==========================================================================
   7. CONTADORES DE ESTADÍSTICAS ANIMADOS
   ========================================================================== */
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const rawTarget = stat.getAttribute('data-target');
        const startValue = stat.getAttribute('data-start');
        const hasPercent = rawTarget.includes('%');
        const hasPlus = rawTarget.includes('+');
        const target = parseInt(rawTarget);

        let count = startValue ? parseInt(startValue) : 0;
        const steps = 30;
        const increment = Math.max(1, Math.ceil((target - count) / steps));

        const updateCount = () => {
          count += increment;
          if (count > target) count = target;

          let formattedText = count;
          if (hasPlus) formattedText = `+${count}`;
          if (hasPercent) formattedText = `${count}%`;
          if (startValue) formattedText = `${startValue} - ${count}`;

          stat.textContent = formattedText;

          if (count < target) {
            setTimeout(updateCount, 40);
          }
        };
        updateCount();
      });
    }
  });
}, { threshold: 0.5 });

const impactSection = document.getElementById('impacto');
if (impactSection) statsObserver.observe(impactSection);

/* ==========================================================================
   8. LIGHTBOX DE LA GALERÍA
   ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const triggers = document.querySelectorAll('.lightbox-trigger');

if (lightbox && lightboxImg && lightboxClose) {
  triggers.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

/* ==========================================================================
   9. MODAL DE PERSONAJES ("MÁS")
   ========================================================================== */
const openCharactersBtn = document.getElementById('openCharactersBtn');
const closeCharactersBtn = document.getElementById('closeCharactersBtn');
const charactersModal = document.getElementById('charactersModal');

if (openCharactersBtn && charactersModal && closeCharactersBtn) {
  openCharactersBtn.addEventListener('click', () => {
    charactersModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeCharactersBtn.addEventListener('click', () => {
    charactersModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  charactersModal.addEventListener('click', (e) => {
    if (e.target === charactersModal) {
      charactersModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   10. BOTÓN VOLVER ARRIBA
   ========================================================================== */
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}