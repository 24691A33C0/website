import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import SoundscapePlayer from './components/SoundscapePlayer';
import StressReliefWidget from './components/StressReliefWidget';

// Contexts
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import { Sparkles, Music } from 'lucide-react';

export default function App() {
  const [soundscapeOpen, setSoundscapeOpen] = useState(false);
  const [stressWidgetOpen, setStressWidgetOpen] = useState(false);

  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onOpenSoundscape={() => setSoundscapeOpen(true)} />

            <main style={{ flex: '1 0 auto' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />

            {/* Persistent Floating Zen / Ambient Trigger Dock */}
            <div
              style={{
                position: 'fixed',
                bottom: '24px',
                left: '24px',
                zIndex: 850,
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              {/* De-stress quick tool */}
              <button
                onClick={() => setStressWidgetOpen(true)}
                className="btn btn-terracotta btn-sm"
                style={{
                  boxShadow: '0 8px 24px rgba(201, 111, 74, 0.35)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '0.825rem'
                }}
                title="Open 60-Second De-Stress Breathing & Bubble Wrap Tool"
              >
                <Sparkles size={15} /> De-Stress Pause
              </button>

              {/* Ambient Soundscape trigger */}
              <button
                onClick={() => setSoundscapeOpen(!soundscapeOpen)}
                className="btn btn-cream btn-sm"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '0.825rem'
                }}
                title="Play Relaxing Cafe Soundscape"
              >
                <Music size={15} color="var(--color-forest)" /> Soundscape
              </button>
            </div>

            {/* Floating Modals and Panels */}
            <SoundscapePlayer isOpen={soundscapeOpen} onClose={() => setSoundscapeOpen(false)} />
            <StressReliefWidget isOpen={stressWidgetOpen} onClose={() => setStressWidgetOpen(false)} />

            {/* Return to top floating button */}
            <ScrollToTopButton />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}
