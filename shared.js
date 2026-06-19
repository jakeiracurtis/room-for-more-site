// shared.js — injects nav, footer, and ticker + handles mobile menu
(function () {
  const currentPage = document.body.dataset.page || '';

  const NAV_HTML = `
<nav class="nav" role="navigation" aria-label="Main">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">ROOM <span>FOR</span> MORE</a>
    <ul class="nav__links" role="list">
      <li><a href="about.html" ${currentPage==='about'?'class="active"':''}>About</a></li>
      <li><a href="programs.html" ${currentPage==='programs'?'class="active"':''}>Programs</a></li>
      <li><a href="blog.html" ${currentPage==='blog'?'class="active"':''}>The Room</a></li>
      <li><a href="get-involved.html" ${currentPage==='involved'?'class="active"':''}>Get Involved</a></li>
    </ul>
    <a href="donate.html" class="nav__donate">Donate</a>
    <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false" id="hamburger">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav__mobile" id="mobileMenu" role="dialog" aria-label="Mobile navigation">
    <a href="about.html">About</a>
    <a href="programs.html">Programs</a>
    <a href="blog.html">The Room</a>
    <a href="get-involved.html">Get Involved</a>
    <a href="donate.html" style="color:var(--orange);">Donate →</a>
  </div>
</nav>`;

  const TICKER_HTML = `
<div class="ticker" aria-hidden="true">
  <div class="ticker__track">
    ${Array(2).fill(['MORE ACCESS','MORE EXPOSURE','MORE OPPORTUNITY','MORE CONFIDENCE','MORE POSSIBILITY','MORE REPRESENTATION','MORE COMMUNITY','MORE FUTURES'].map(t=>`<span class="ticker__item">${t}<span class="ticker__dot"></span></span>`).join('')).join('')}
  </div>
</div>`;

  const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__top">
      <div>
        <div class="footer__brand-name">ROOM <span>FOR</span> MORE</div>
        <p class="footer__tagline">Creating space for young people of color to see, believe, and become more. A 501(c)(3) nonprofit serving Greater Richmond, VA.</p>
        <div class="footer__social">
          <a href="#" class="footer__social-icon" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="footer__social-icon" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="footer__social-icon" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Organization</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#mission">Mission & Values</a></li>
          <li><a href="about.html#board">Board of Directors</a></li>
          <li><a href="blog.html">The Room</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Programs</h4>
        <ul>
          <li><a href="programs.html#career">Career Exploration</a></li>
          <li><a href="programs.html#entrepreneurship">Entrepreneurship</a></li>
          <li><a href="programs.html#college">College & Career</a></li>
          <li><a href="programs.html#creative">Creative Development</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Get Involved</h4>
        <ul>
          <li><a href="get-involved.html#volunteer">Volunteer</a></li>
          <li><a href="get-involved.html#mentor">Mentor</a></li>
          <li><a href="get-involved.html#partner">Partner With Us</a></li>
          <li><a href="donate.html">Donate</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">© 2025 Room For More · 501(c)(3) Nonprofit · Richmond, Virginia · info@roomformore.org</span>
      <span class="footer__copy">Empowering youth of color, grades 6–12</span>
    </div>
  </div>
</footer>`;

  // Inject nav
  const navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = NAV_HTML;

  // Inject ticker
  const tickerTarget = document.getElementById('ticker-placeholder');
  if (tickerTarget) tickerTarget.outerHTML = TICKER_HTML;

  // Inject footer
  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = FOOTER_HTML;

  // Mobile menu toggle
  document.addEventListener('click', function(e) {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    if (btn.contains(e.target)) {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    } else if (!menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Donation tier selection
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.tier-card');
    if (!card) return;
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const amountInput = document.getElementById('donation-amount');
    if (amountInput) {
      const amount = card.dataset.amount;
      amountInput.value = amount ? '$' + amount : '';
    }
  });

  // Program accordion
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.program-full__header');
    if (!header) return;
    const panel = header.closest('.program-full');
    panel.classList.toggle('open');
  });

  // Email signup
  document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('email-form')) {
      e.preventDefault();
      const input = e.target.querySelector('input[type="email"]');
      const btn = e.target.querySelector('.btn');
      if (!input || !btn) return;
      btn.textContent = 'You\'re in ✦';
      btn.style.background = 'var(--teal)';
      input.value = '';
      input.placeholder = 'Thanks for joining the movement';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.placeholder = 'your@email.com';
      }, 4000);
    }
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();
