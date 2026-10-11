/* ==========================================================================
   DYNAMIC STRESS BUSTER CAFE — INTERACTIVE STRESS RELIEF WIDGET
   Features:
   1. Interactive Bubble Wrap Popper with satisfying audio feedback
   2. 4-7-8 Guided Breathing Circle with animated pulse & chimes
   3. Quick Mindful Grounding prompt
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStressModal();
});

function initStressModal() {
  // Check if modal container already exists, else create it
  if (!document.getElementById('stressModal')) {
    const modalHTML = `
      <div class="stress-buster-dock">
        <button class="dock-trigger" id="openStressModalBtn" aria-label="Open Instant Stress Relief Widget">
          <span style="font-size: 1.25rem;">🫧</span>
          <span>Instant De-Stress</span>
        </button>
      </div>

      <div class="modal-overlay" id="stressModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-box">
          <button class="modal-close" id="closeStressModalBtn" aria-label="Close dialog">&times;</button>
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <span class="vibe-tag">Sensory Playground</span>
            <h3 id="modalTitle" style="font-size: 1.6rem; font-weight: 800; margin-top: 4px;">Instant Stress Buster</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
              Take a pause, reset your nervous system, and release mental tension.
            </p>
          </div>

          <!-- Tab Navigation inside Modal -->
          <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <button class="btn btn-secondary active-tab-btn" id="tabBubbleBtn" style="padding: 6px 16px; font-size: 0.84rem;">
              🫧 Bubble Wrap
            </button>
            <button class="btn btn-secondary" id="tabBreathBtn" style="padding: 6px 16px; font-size: 0.84rem;">
              🫁 4-7-8 Breathing
            </button>
            <button class="btn btn-secondary" id="tabGroundBtn" style="padding: 6px 16px; font-size: 0.84rem;">
              🌿 5-4-3-2-1 Zen
            </button>
          </div>

          <!-- Tab 1: Bubble Wrap -->
          <div id="tabBubbleContent">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600;">
              <span>Popped: <strong id="popCount" style="color: var(--brand-amber);">0</strong> / 24</span>
              <button id="resetBubblesBtn" style="color: var(--brand-amber); text-decoration: underline; font-size: 0.82rem;">Reset Sheet</button>
            </div>
            <div class="bubble-grid" id="bubbleGrid">
              <!-- Dynamically rendered 24 bubbles -->
            </div>
            <p style="font-size: 0.78rem; text-align: center; color: var(--text-muted);">
              Click or tap each bubble for tactile sensory satisfaction.
            </p>
          </div>

          <!-- Tab 2: 4-7-8 Breathing -->
          <div id="tabBreathContent" style="display: none;">
            <div class="breathing-container">
              <div class="breath-circle" id="breathCircle">
                <span id="breathPhase">Inhale</span>
              </div>
              <div style="margin-top: 1.5rem; text-align: center;">
                <h5 id="breathCounter" style="font-size: 1.4rem; font-weight: 800; color: var(--brand-amber);">4</h5>
                <p id="breathGuide" style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                  Breathe in gently through your nose...
                </p>
              </div>
              <div style="margin-top: 1.25rem;">
                <button class="btn btn-primary" id="toggleBreathBtn" style="padding: 8px 20px; font-size: 0.88rem;">
                  Start Breathwork
                </button>
              </div>
            </div>
          </div>

          <!-- Tab 3: Grounding Sensory Anchor -->
          <div id="tabGroundContent" style="display: none;">
            <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.9rem; line-height: 1.7;">
              <h4 style="font-weight: 700; margin-bottom: 8px; color: var(--brand-matcha);">The 5-4-3-2-1 Sensory Reset:</h4>
              <ul style="padding-left: 1.2rem; color: var(--text-secondary);">
                <li><strong>5 Things:</strong> Look around and notice 5 things you can see.</li>
                <li><strong>4 Things:</strong> Notice 4 textures you can physically touch right now.</li>
                <li><strong>3 Sounds:</strong> Listen closely for 3 distinct ambient sounds.</li>
                <li><strong>2 Scents:</strong> Notice 2 scents (coffee grounds, fresh rain).</li>
                <li><strong>1 Taste:</strong> Savor 1 taste on your tongue or take a sip of water.</li>
              </ul>
            </div>
            <div style="text-align: center; margin-top: 1.25rem;">
              <button class="btn btn-matcha" id="groundDoneBtn" style="padding: 8px 24px; font-size: 0.88rem;">
                I feel grounded ✨
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Element handles
  const modal = document.getElementById('stressModal');
  const openBtn = document.getElementById('openStressModalBtn');
  const closeBtn = document.getElementById('closeStressModalBtn');
  const bubbleGrid = document.getElementById('bubbleGrid');
  const popCountEl = document.getElementById('popCount');
  const resetBubblesBtn = document.getElementById('resetBubblesBtn');

  // Tabs
  const tabBubbleBtn = document.getElementById('tabBubbleBtn');
  const tabBreathBtn = document.getElementById('tabBreathBtn');
  const tabGroundBtn = document.getElementById('tabGroundBtn');
  const tabBubbleContent = document.getElementById('tabBubbleContent');
  const tabBreathContent = document.getElementById('tabBreathContent');
  const tabGroundContent = document.getElementById('tabGroundContent');

  let poppedCount = 0;

  // Open/Close
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      window.soundEngine && window.soundEngine.init();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      stopBreathing();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      stopBreathing();
    }
  });

  // Switch tabs
  function switchTab(activeBtn, showContent) {
    [tabBubbleBtn, tabBreathBtn, tabGroundBtn].forEach(b => {
      b.style.background = 'var(--bg-secondary)';
      b.style.borderColor = 'var(--border-subtle)';
      b.style.color = 'var(--text-secondary)';
    });
    activeBtn.style.background = 'var(--bg-card)';
    activeBtn.style.borderColor = 'var(--brand-amber)';
    activeBtn.style.color = 'var(--brand-amber)';

    tabBubbleContent.style.display = 'none';
    tabBreathContent.style.display = 'none';
    tabGroundContent.style.display = 'none';
    showContent.style.display = 'block';

    if (showContent !== tabBreathContent) {
      stopBreathing();
    }
  }

  tabBubbleBtn.addEventListener('click', () => switchTab(tabBubbleBtn, tabBubbleContent));
  tabBreathBtn.addEventListener('click', () => switchTab(tabBreathBtn, tabBreathContent));
  tabGroundBtn.addEventListener('click', () => switchTab(tabGroundBtn, tabGroundContent));

  // Bubble Wrap creation
  function generateBubbles() {
    bubbleGrid.innerHTML = '';
    poppedCount = 0;
    popCountEl.textContent = '0';

    for (let i = 0; i < 24; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble-cell';
      bubble.addEventListener('click', () => {
        if (!bubble.classList.contains('popped')) {
          bubble.classList.add('popped');
          poppedCount++;
          popCountEl.textContent = poppedCount;
          if (window.soundEngine) {
            window.soundEngine.playPopSound(0.05, 520 + Math.random() * 300);
          }
          if (poppedCount === 24) {
            showToast('🎉 All bubbles popped! Tension released.');
            if (window.soundEngine) window.soundEngine.playChime(640);
          }
        }
      });
      bubbleGrid.appendChild(bubble);
    }
  }

  generateBubbles();
  resetBubblesBtn.addEventListener('click', generateBubbles);

  // Breathing Exercise Logic
  const breathCircle = document.getElementById('breathCircle');
  const breathPhase = document.getElementById('breathPhase');
  const breathCounter = document.getElementById('breathCounter');
  const breathGuide = document.getElementById('breathGuide');
  const toggleBreathBtn = document.getElementById('toggleBreathBtn');

  let breathInterval = null;
  let isBreathingActive = false;

  function runBreathingCycle() {
    let currentStep = 'inhale'; // inhale (4s) -> hold (7s) -> exhale (8s)
    let secondsLeft = 4;

    function tick() {
      breathCounter.textContent = secondsLeft;
      secondsLeft--;

      if (secondsLeft < 0) {
        if (currentStep === 'inhale') {
          currentStep = 'hold';
          secondsLeft = 7;
          breathPhase.textContent = 'Hold';
          breathGuide.textContent = 'Hold your breath softly. Relax your shoulders.';
          breathCircle.classList.remove('expand');
          breathCircle.classList.add('hold');
          if (window.soundEngine) window.soundEngine.playChime(440);
        } else if (currentStep === 'hold') {
          currentStep = 'exhale';
          secondsLeft = 8;
          breathPhase.textContent = 'Exhale';
          breathGuide.textContent = 'Release smoothly through your mouth, letting go of stress...';
          breathCircle.classList.remove('hold');
          breathCircle.classList.remove('expand');
          if (window.soundEngine) window.soundEngine.playChime(330);
        } else if (currentStep === 'exhale') {
          currentStep = 'inhale';
          secondsLeft = 4;
          breathPhase.textContent = 'Inhale';
          breathGuide.textContent = 'Breathe in gently through your nose...';
          breathCircle.classList.add('expand');
          if (window.soundEngine) window.soundEngine.playChime(528);
        }
      }
    }

    // Initial state
    breathPhase.textContent = 'Inhale';
    breathGuide.textContent = 'Breathe in gently through your nose...';
    breathCircle.classList.add('expand');
    if (window.soundEngine) window.soundEngine.playChime(528);
    secondsLeft = 4;
    tick();

    breathInterval = setInterval(tick, 1000);
  }

  function startBreathing() {
    isBreathingActive = true;
    toggleBreathBtn.textContent = 'Pause Breathing';
    toggleBreathBtn.classList.replace('btn-primary', 'btn-secondary');
    runBreathingCycle();
  }

  function stopBreathing() {
    isBreathingActive = false;
    clearInterval(breathInterval);
    if (toggleBreathBtn) {
      toggleBreathBtn.textContent = 'Start Breathwork';
      toggleBreathBtn.classList.replace('btn-secondary', 'btn-primary');
    }
    if (breathCircle) {
      breathCircle.classList.remove('expand', 'hold');
      breathPhase.textContent = 'Ready';
      breathCounter.textContent = '—';
      breathGuide.textContent = 'Press start when you are ready to begin.';
    }
  }

  if (toggleBreathBtn) {
    toggleBreathBtn.addEventListener('click', () => {
      if (isBreathingActive) {
        stopBreathing();
      } else {
        startBreathing();
      }
    });
  }

  const groundDoneBtn = document.getElementById('groundDoneBtn');
  if (groundDoneBtn) {
    groundDoneBtn.addEventListener('click', () => {
      showToast('🌿 Mindful awareness restored. You are centered.');
      if (window.soundEngine) window.soundEngine.playChime(528);
      modal.classList.remove('active');
    });
  }
}

// Global Toast Notification Helper
function showToast(message, duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

window.showToast = showToast;
