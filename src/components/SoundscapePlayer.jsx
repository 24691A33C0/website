import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, X, Music, CloudRain, Flame, Disc, Coffee } from 'lucide-react';
import { playSoundscapeTrack, stopSoundscape, setSoundscapeVolume } from '../utils/audioEngine';
import { useToast } from '../context/ToastContext';

export default function SoundscapePlayer({ isOpen, onClose }) {
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const { addToast } = useToast();

  const tracks = [
    { id: 'rain', name: 'Rain on Window', icon: CloudRain, desc: 'Gentle raindrops & soft window mist' },
    { id: 'fireplace', name: 'Warm Fireplace', icon: Flame, desc: 'Soft hearth crackles & warmth' },
    { id: 'zen', name: '432Hz Singing Bowl', icon: Disc, desc: 'Deep harmonic resonance & clarity' },
    { id: 'cafe', name: 'Cozy Cafe Murmur', icon: Coffee, desc: 'Comforting acoustic coffeehouse hum' }
  ];

  const handleSelectTrack = (trackId) => {
    if (activeTrack === trackId && isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
      setActiveTrack(null);
      addToast('Ambient audio paused', 'info');
    } else {
      playSoundscapeTrack(trackId);
      setSoundscapeVolume(volume);
      setActiveTrack(trackId);
      setIsPlaying(true);
      const track = tracks.find((t) => t.id === trackId);
      addToast(`Playing ambient: ${track.name}`, 'success');
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
    } else {
      const target = activeTrack || 'rain';
      playSoundscapeTrack(target);
      setSoundscapeVolume(volume);
      setActiveTrack(target);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setSoundscapeVolume(val);
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 950,
        backgroundColor: 'var(--color-forest-dark)',
        color: '#FFFFFF',
        borderRadius: '20px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        width: '320px',
        maxWidth: 'calc(100vw - 48px)',
        animation: 'slideUp 0.25s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={18} color="var(--color-terracotta-light)" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cafe Soundscape</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close soundscape widget"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '2px'
          }}
        >
          <X size={18} />
        </button>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#B6C4B4', marginBottom: '1rem', lineHeight: 1.4 }}>
        100% synthetic relaxing soundscapes powered by Web Audio API. Zero streaming data used.
      </p>

      {/* Track selector grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1.2rem' }}>
        {tracks.map((t) => {
          const isSelected = activeTrack === t.id && isPlaying;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectTrack(t.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 8px',
                borderRadius: '12px',
                backgroundColor: isSelected ? 'var(--color-terracotta)' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: isSelected ? '1px solid #FFFFFF' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              <Icon size={20} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Volume & Play Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-cream)',
            color: 'var(--color-forest)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
        </button>

        <Volume2 size={16} color="var(--color-sage)" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          style={{ flex: 1, accentColor: 'var(--color-terracotta)', cursor: 'pointer' }}
          aria-label="Soundscape volume"
        />
      </div>
    </div>
  );
}
