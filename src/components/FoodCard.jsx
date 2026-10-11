import React, { useState } from 'react';
import { Plus, Eye, Clock, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ item, onQuickView }) {
  const { addToCart, currencySymbol } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80';

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(fallbackImage);
    }
  };

  return (
    <div
      className="cafe-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          height: '210px',
          overflow: 'hidden',
          backgroundColor: '#EBE5D8'
        }}
      >
        <img
          src={imgSrc}
          alt={item.name}
          onError={handleImageError}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Top Floating Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          {/* Veg badge */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
            title="100% Vegetarian"
          >
            <div className="veg-indicator">
              <div className="veg-indicator-dot" />
            </div>
          </div>

          {/* Special Tag */}
          {item.tag && (
            <span
              className={`badge ${
                item.tag === "Chef's Special"
                  ? 'badge-terracotta'
                  : item.tag === 'Bestseller'
                  ? 'badge-forest'
                  : 'badge-sage'
              }`}
              style={{
                backgroundColor:
                  item.tag === "Chef's Special"
                    ? 'var(--color-terracotta)'
                    : item.tag === 'Bestseller'
                    ? 'var(--color-forest)'
                    : '#4A6B56',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              {item.tag}
            </span>
          )}
        </div>

        {/* Quick View Button overlay */}
        <button
          onClick={() => onQuickView(item)}
          aria-label={`View details for ${item.name}`}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: 'rgba(250, 246, 238, 0.95)',
            color: 'var(--color-forest)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-forest)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(250, 246, 238, 0.95)';
            e.currentTarget.style.color = 'var(--color-forest)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Eye size={17} />
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '0.4rem' }}>
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--color-forest)',
              lineHeight: 1.3
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-terracotta)',
              whiteSpace: 'nowrap'
            }}
          >
            {currencySymbol}{item.price}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            flex: 1
          }}
        >
          {item.description}
        </p>

        {/* Prep & Calorie info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#8A8279',
            marginBottom: '1rem',
            borderTop: '1px dashed var(--color-border-subtle)',
            paddingTop: '0.65rem'
          }}
        >
          {item.prepTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {item.prepTime}
            </span>
          )}
          {item.calories && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={13} color="#C96F4A" /> {item.calories}
            </span>
          )}
        </div>

        {/* Add to Tray Button */}
        <button
          onClick={() => addToCart(item, 1)}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.7rem 1rem',
            fontSize: '0.875rem',
            borderRadius: '12px'
          }}
        >
          <Plus size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
