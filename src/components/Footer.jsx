import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube, ArrowUpRight, Heart } from 'lucide-react';
import { businessConfig, getGoogleMapsUrl } from '../config/businessConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-forest-dark)',
        color: '#EAE6DF',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        borderTop: '4px solid var(--color-terracotta)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Coffee size={22} />
              </div>
              <div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', margin: 0 }}>
                  Dynamic Stress Buster
                </h3>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--color-sage)' }}>
                  CAFE & URBAN SANCTUARY
                </span>
              </div>
            </div>
            <p style={{ color: '#B6C4B4', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Your everyday escape from urban stress. Savor specialty roasts, soulful comfort food, cozy botanical nooks, and unhurried moments designed to recharge mind and spirit.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: Instagram, href: businessConfig.socials.instagram, label: 'Instagram' },
                { icon: Facebook, href: businessConfig.socials.facebook, label: 'Facebook' },
                { icon: Twitter, href: businessConfig.socials.twitter, label: 'Twitter' },
                { icon: Youtube, href: businessConfig.socials.youtube, label: 'YouTube' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#E8DCCB',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-terracotta)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#E8DCCB';
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.15rem' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Full Menu', path: '/menu' },
                { name: 'About & Our Story', path: '/about' },
                { name: 'Cafe Experiences & Bookings', path: '/experiences' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Contact & Directions', path: '/contact' },
                { name: 'Your Shopping Tray', path: '/cart' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    style={{
                      color: '#B6C4B4',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-terracotta-light)')}
                    onMouseLeave={(e) => (e.target.style.color = '#B6C4B4')}
                  >
                    <span>›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.15rem' }}>
              Opening Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#B6C4B4', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={20} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#FFF', fontWeight: 600 }}>Monday – Friday</div>
                  <div>8:00 AM – 11:00 PM</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={20} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#FFF', fontWeight: 600 }}>Saturday – Sunday</div>
                  <div>7:30 AM – 11:30 PM</div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(168, 191, 163, 0.12)',
                  border: '1px solid rgba(168, 191, 163, 0.25)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  color: 'var(--color-sage)'
                }}
              >
                ☕ High-speed Wi-Fi and study corners available all day. Kitchen closes 30 mins before closing.
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Directions */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.15rem' }}>
              Find Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#B6C4B4', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={20} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <div>{businessConfig.displayAddress}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <a href={`tel:${businessConfig.phone}`} style={{ color: '#B6C4B4' }}>
                  {businessConfig.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <a href={`mailto:${businessConfig.email}`} style={{ color: '#B6C4B4' }}>
                  {businessConfig.email}
                </a>
              </div>
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-terracotta btn-sm"
                style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
              >
                Get Directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#8E9E8C'
          }}
        >
          <div>
            © {currentYear} {businessConfig.cafeName}. All rights reserved. Crafted with care for mindful living.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>Crafted for stress relief</span>
            <span style={{ color: 'var(--color-terracotta)' }}>•</span>
            <span>Non-commercial demo project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
