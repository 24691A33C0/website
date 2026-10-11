/* ==========================================================================
   DYNAMIC STRESS BUSTER CAFE — MAIN APPLICATION SCRIPT
   Handles: Theme Toggle, Mobile Nav, Persistent Ambient Player Dock,
   Cart Drawer / Wishlist, and Shared UI Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initAmbientPlayerUI();
  initCartSystem();
  highlightActiveNav();
});

/* ==========================================================================
   THEME TOGGLE (Daylight Warm Roast <-> Midnight Lounge)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('dsbc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    updateThemeBtnIcon(btn, savedTheme);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('dsbc_theme', nextTheme);
      themeToggleBtns.forEach(b => updateThemeBtnIcon(b, nextTheme));
      if (window.soundEngine) window.soundEngine.playPopSound(0.04, 750);
      showToast(nextTheme === 'dark' ? '🌙 Midnight Lounge Activated' : '☀️ Warm Roast Daylight Activated');
    });
  });
}

function updateThemeBtnIcon(btn, theme) {
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggleBtn.innerHTML = '&#9776;';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   ACTIVE LINK HIGHLIGHT
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   PERSISTENT AMBIENT SOUND PLAYER DOCK
   ========================================================================== */
function initAmbientPlayerUI() {
  if (!document.getElementById('ambientPlayerBar')) {
    const playerHTML = `
      <div class="ambient-player-bar" id="ambientPlayerBar" role="region" aria-label="Ambient Sound Player">
        <button class="player-btn" id="soundPlayToggle" aria-label="Play or pause ambient sound">
          <span id="playIcon">▶</span>
        </button>
        <div class="player-title-info">
          <span class="sound-title" id="currentSoundLabel">Rain on Window</span>
          <span class="sound-state" id="soundStatusText">Click to listen</span>
        </div>
        <select class="sound-select" id="soundTrackSelect" aria-label="Select ambient sound track">
          <option value="rain">🌧️ Cozy Rain</option>
          <option value="fire">🪵 Warm Hearth</option>
          <option value="zen">🧘 Zen Singing Bowl</option>
          <option value="cafe">☕ Cafe Murmur</option>
        </select>
        <input type="range" id="soundVolRange" min="0" max="1" step="0.05" value="0.4" style="width: 60px; accent-color: var(--brand-amber); cursor: pointer;" aria-label="Volume">
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', playerHTML);
  }

  const playToggle = document.getElementById('soundPlayToggle');
  const playIcon = document.getElementById('playIcon');
  const trackSelect = document.getElementById('soundTrackSelect');
  const soundLabel = document.getElementById('currentSoundLabel');
  const soundStatusText = document.getElementById('soundStatusText');
  const volRange = document.getElementById('soundVolRange');

  const trackNames = {
    rain: '🌧️ Rain on Window',
    fire: '🪵 Warm Hearth Fire',
    zen: '🧘 Zen Singing Bowl',
    cafe: '☕ Cozy Cafe Murmur'
  };

  if (playToggle) {
    playToggle.addEventListener('click', () => {
      const active = window.soundEngine.toggle(trackSelect.value);
      if (active) {
        playIcon.innerHTML = '⏸';
        soundStatusText.textContent = 'Playing ambient loop';
        soundLabel.textContent = trackNames[trackSelect.value];
        showToast(`🎶 Playing: ${trackNames[trackSelect.value]}`);
      } else {
        playIcon.innerHTML = '▶';
        soundStatusText.textContent = 'Paused';
      }
    });
  }

  if (trackSelect) {
    trackSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      soundLabel.textContent = trackNames[selected];
      if (window.soundEngine.isPlaying) {
        window.soundEngine.play(selected);
        playIcon.innerHTML = '⏸';
        soundStatusText.textContent = 'Playing ambient loop';
        showToast(`🎶 Switched to: ${trackNames[selected]}`);
      }
    });
  }

  if (volRange) {
    volRange.addEventListener('input', (e) => {
      window.soundEngine.setVolume(parseFloat(e.target.value));
    });
  }
}

/* ==========================================================================
   CART / WISHLIST SYSTEM (LOCAL STORAGE BASED)
   ========================================================================== */
function initCartSystem() {
  window.cartItems = JSON.parse(localStorage.getItem('dsbc_cart') || '[]');
  updateCartBadge();
}

function addToCart(itemId) {
  if (!window.CAFE_MENU) return;
  const item = window.CAFE_MENU.find(m => m.id === itemId);
  if (!item) return;

  window.cartItems.push({
    id: item.id,
    name: item.name,
    price: item.price,
    time: Date.now()
  });

  localStorage.setItem('dsbc_cart', JSON.stringify(window.cartItems));
  updateCartBadge();
  if (window.soundEngine) window.soundEngine.playPopSound(0.06, 880);
  showToast(`☕ Added "${item.name}" to your de-stress tray!`);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = window.cartItems ? window.cartItems.length : 0;
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

window.addToCart = addToCart;
