/* --------------------------
   Helper selector
   -------------------------- */
const $ = sel => document.querySelector(sel);

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

/* --------------------------
   Theme toggle
   -------------------------- */
const themeToggle = $('#themeToggle');
const root = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* --------------------------
   Mobile menu toggle
   -------------------------- */
$('#hamb')?.addEventListener('click', () => {
  const nav = document.querySelector('nav ul');
  if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    const nav = document.querySelector('nav ul');
    if (window.innerWidth <= 980 && nav) nav.style.display = 'none';
  });
});

/* --------------------------
   Reveal on scroll
   -------------------------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* --------------------------
   Contact form with EmailJS
   -------------------------- */
const contactForm = $('#contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all fields.');
    return;
  }

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    name: name,
    email: email,
    message: message
  })
  .then(() => {
    alert(`Thanks ${name}! Your message was sent.`);
    contactForm.reset();
  })
  .catch((error) => {
    alert('Failed to send message: ' + JSON.stringify(error));
  });
});

/* --------------------------
   Download Resume
   -------------------------- */
function downloadResume(e) {
  e && e.preventDefault();
  const a = document.createElement('a');
  a.href = 'https://drive.google.com/uc?export=download&id=1BUIMr5u_PoUUHMvbdTOZoMdGg453Bc9H';
  a.download = 'Praveen-Kumar-Resume.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
window.downloadResume = downloadResume;

/* --------------------------
   Smooth scroll offset
   -------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(ev) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    ev.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY -
      (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68) + 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
