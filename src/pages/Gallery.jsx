import React, { useState, useMemo } from 'react';
import { Maximize2, Sparkles, Filter } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ImageLightbox from '../components/ImageLightbox';
import { GALLERY_CATEGORIES, galleryItems } from '../data/galleryData';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems;
    return galleryItems.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. HERO HEADER */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          padding: '4.5rem 1.5rem 3.5rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span
            className="section-badge"
            style={{
              backgroundColor: 'rgba(168, 191, 163, 0.25)',
              color: 'var(--color-cream)',
              marginBottom: '1rem'
            }}
          >
            Visual Moments & Atmosphere
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              marginBottom: '1rem'
            }}
          >
            The Visual Sanctuary
          </h1>
          <p style={{ color: '#D2DDD1', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
            Take a visual tour through our hand-poured coffee art, sunny botanical interiors, sizzling comfort dishes, and warm community smiles.
          </p>
        </div>
      </section>

      {/* 2. GALLERY CONTROLS & CATEGORY PILLS */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid var(--color-forest)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-forest)' : 'var(--color-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-forest)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. MASONRY / EDITORIAL GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
            alignItems: 'start'
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxItem(item);
                }
              }}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#E6DFD4',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: item.aspect === 'tall' ? '380px' : item.aspect === 'wide' ? '240px' : '300px',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              {/* Gradient & Caption Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 44, 37, 0.9) 0%, rgba(15, 44, 37, 0.15) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--color-sage)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '4px'
                      }}
                    >
                      {item.category}
                    </span>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '4px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#D4DDD3', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
                      {item.caption}
                    </p>
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      backdropFilter: 'blur(4px)'
                    }}
                    title="Click to zoom"
                  >
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LIGHTBOX MODAL */}
      {activeLightboxItem && (
        <ImageLightbox
          item={activeLightboxItem}
          items={filteredItems}
          onClose={() => setActiveLightboxItem(null)}
          onSelect={(item) => setActiveLightboxItem(item)}
        />
      )}
    </div>
  );
}
