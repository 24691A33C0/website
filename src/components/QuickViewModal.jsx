import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Clock, Flame, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal({ item, onClose }) {
  const { addToCart, currencySymbol } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleAdd = () => {
    addToCart(item, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', overflow: 'hidden' }}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {/* Image */}
          <div style={{ height: '320px', position: 'relative', backgroundColor: '#EDE4D8' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {item.tag && (
              <span
                className="badge"
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--color-terracotta)',
                  color: '#fff',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >
                {item.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <span className="veg-indicator" title="Vegetarian">
                  <span className="veg-indicator-dot" />
                </span>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage-dark)', fontWeight: 600 }}>
                  {item.category}
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--color-forest)' }}>
                {item.name}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'var(--color-terracotta)',
                  marginBottom: '1rem'
                }}
              >
                {currencySymbol}{item.price}
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#776E65', marginBottom: '1.5rem' }}>
                {item.prepTime && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={15} /> {item.prepTime}
                  </span>
                )}
                {item.calories && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Flame size={15} color="#C96F4A" /> {item.calories}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                  Quantity:
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    style={{
                      padding: '6px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-forest)'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 12px', fontWeight: 700, fontSize: '0.95rem' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    style={{
                      padding: '6px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-forest)'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--color-terracotta)', fontSize: '1.1rem' }}>
                  {currencySymbol}{item.price * quantity}
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  backgroundColor: added ? '#2e7d32' : 'var(--color-forest)'
                }}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Tray!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add {quantity} to Tray
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
