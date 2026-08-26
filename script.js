// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');

if (saved) root.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== Timeline reveal on scroll =====
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      const delay = parseInt(item.dataset.index || 0) * 100;
      setTimeout(() => item.classList.add('visible'), delay);
      observer.unobserve(item);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => observer.observe(item));

// ===== Smooth active nav link highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
