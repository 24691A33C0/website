import React, { useState, useEffect } from 'react';
import { Sparkles, X, RotateCcw, Heart, Smile } from 'lucide-react';
import { playPopSound } from '../utils/audioEngine';

export default function StressReliefWidget({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('breathing'); // 'breathing' | 'bubblewrap'

  // Breathing state
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breathCount, setBreathCount] = useState(4);

  useEffect(() => {
    if (!isOpen || activeTab !== 'breathing') return;

    let timer;
    if (breathPhase === 'Inhale') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
      } else {
        setBreathPhase('Hold');
        setBreathCount(7);
      }
    } else if (breathPhase === 'Hold') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
      } else {
        setBreathPhase('Exhale');
        setBreathCount(8);
      }
    } else if (breathPhase === 'Exhale') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
      } else {
        setBreathPhase('Inhale');
        setBreathCount(4);
      }
    }

    return () => clearTimeout(timer);
  }, [isOpen, activeTab, breathPhase, breathCount]);

  // Bubble wrap state: 20 bubbles
  const [poppedBubbles, setPoppedBubbles] = useState({});

  const handlePop = (index) => {
    if (!poppedBubbles[index]) {
      playPopSound();
      setPoppedBubbles((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleResetBubbles = () => {
    setPoppedBubbles({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '1.75rem' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close widget">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-forest)', margin: 0 }}>
              Quick De-Stress Hub
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Take a 60-second pause to reset your nervous system
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-cream-subtle)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-border)'
          }}
        >
          <button
            onClick={() => setActiveTab('breathing')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'breathing' ? 'var(--color-forest)' : 'transparent',
              color: activeTab === 'breathing' ? '#FFFFFF' : 'var(--color-forest)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            4-7-8 Breathing Guide
          </button>
          <button
            onClick={() => setActiveTab('bubblewrap')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'bubblewrap' ? 'var(--color-forest)' : 'transparent',
              color: activeTab === 'bubblewrap' ? '#FFFFFF' : 'var(--color-forest)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Tactile Bubble Wrap
          </button>
        </div>

        {/* Tab 1: Breathing */}
        {activeTab === 'breathing' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 1.5rem auto',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  breathPhase === 'Inhale'
                    ? 'rgba(168, 191, 163, 0.4)'
                    : breathPhase === 'Hold'
                    ? 'rgba(201, 111, 74, 0.2)'
                    : 'rgba(23, 63, 53, 0.15)',
                border: `3px solid ${
                  breathPhase === 'Inhale'
                    ? 'var(--color-forest)'
                    : breathPhase === 'Hold'
                    ? 'var(--color-terracotta)'
                    : 'var(--color-sage-dark)'
                }`,
                transform:
                  breathPhase === 'Inhale'
                    ? 'scale(1.1)'
                    : breathPhase === 'Hold'
                    ? 'scale(1.1)'
                    : 'scale(0.9)',
                transition: 'transform 3.5s ease, background-color 0.8s ease'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-forest)'
                }}
              >
                {breathPhase}
              </span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-terracotta)' }}>
                {breathCount}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              <strong>Inhale (4s)</strong> through the nose • <strong>Hold (7s)</strong> the air • <strong>Exhale (8s)</strong> slow through the mouth.
            </p>
          </div>
        )}

        {/* Tab 2: Bubble Wrap */}
        {activeTab === 'bubblewrap' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Pop bubbles to release immediate tension!
              </span>
              <button
                onClick={handleResetBubbles}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <RotateCcw size={14} /> New Sheet
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '10px',
                padding: '14px',
                backgroundColor: 'rgba(168, 191, 163, 0.15)',
                borderRadius: '16px'
              }}
            >
              {Array.from({ length: 20 }).map((_, idx) => {
                const popped = poppedBubbles[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handlePop(idx)}
                    aria-label={`Bubble ${idx + 1}`}
                    style={{
                      height: '50px',
                      borderRadius: '50%',
                      border: popped ? '1px dashed #A8BFA3' : '2px solid rgba(23, 63, 53, 0.3)',
                      backgroundColor: popped ? 'rgba(232, 220, 203, 0.4)' : '#FFFFFF',
                      boxShadow: popped ? 'none' : 'inset 0 -3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.06)',
                      cursor: popped ? 'default' : 'pointer',
                      transform: popped ? 'scale(0.88)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
