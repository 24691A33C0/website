import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { businessConfig } from '../config/businessConfig';

export default function Navbar({ onOpenSoundscape }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: isScrolled ? 'rgba(250, 246, 238, 0.96)' : 'var(--color-cream)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 4px 20px rgba(23, 63, 53, 0.08)' : 'none',
          borderBottom: '1px solid var(--color-border-subtle)',
          transition: 'all 0.25s ease'
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--nav-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(23, 63, 53, 0.2)'
              }}
            >
              <Coffee size={22} color="#FAF6EE" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-forest)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em'
                }}
              >
                Dynamic Stress Buster
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-terracotta)',
                  fontWeight: 700
                }}
              >
                Artisan Cafe & Sanctuary
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.75rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-forest)' : 'var(--color-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2.5px',
                          backgroundColor: 'var(--color-terracotta)',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Ambient Soundscape shortcut */}
            {onOpenSoundscape && (
              <button
                onClick={onOpenSoundscape}
                className="btn-icon"
                title="Mindful Ambient Soundscapes"
                aria-label="Ambient Soundscapes"
                style={{
                  background: 'rgba(168, 191, 163, 0.3)',
                  border: 'none',
                  color: 'var(--color-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={18} />
              </button>
            )}

            {/* Shopping Cart Icon with Badge */}
            <Link
              to="/cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(23, 63, 53, 0.08)',
                color: 'var(--color-forest)',
                transition: 'all 0.2s ease'
              }}
              aria-label={`View Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag size={20} />
              {totalItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--color-terracotta)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(201, 111, 74, 0.4)'
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Prominent "Order Now" Button */}
            <Link
              to="/menu"
              className="btn btn-primary btn-sm desktop-order-btn"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              Order Now
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height)',
            backgroundColor: 'var(--color-cream)',
            zIndex: 850,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-terracotta)' : 'var(--color-forest)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(23, 63, 53, 0.08)'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/menu"
              className="btn btn-terracotta btn-lg"
              style={{ width: '100%' }}
            >
              Explore Full Menu & Order
            </Link>
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)'
              }}
            >
              {businessConfig.phone} • Open Daily from 8:00 AM
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles helper */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-order-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
