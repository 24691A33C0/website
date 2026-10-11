import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageLightbox({ item, items, onClose, onSelect }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(15, 28, 24, 0.92)' }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '920px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          style={{
            position: 'absolute',
            top: '-50px',
            right: '0',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
        >
          <X size={22} />
        </button>

        {/* Image Frame with Navigation Arrows */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Caption & Counter */}
        <div
          style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            color: '#FFFFFF',
            width: '100%',
            padding: '0 1rem'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-sage)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {item.category} • {currentIndex + 1} of {items.length}
          </div>
          <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', marginBottom: '6px' }}>
            {item.title}
          </h3>
          <p style={{ color: '#D2D9D0', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
