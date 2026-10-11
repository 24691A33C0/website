import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream)',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '540px' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 111, 74, 0.15)',
            color: 'var(--color-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <Coffee size={46} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '4.5rem',
            fontWeight: 800,
            color: 'var(--color-forest)',
            lineHeight: 1,
            display: 'block',
            marginBottom: '0.5rem'
          }}
        >
          404
        </span>

        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-forest)', marginBottom: '1rem' }}>
          Looks Like This Page Took a Coffee Break
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Don't worry, stress not! The cozy nook or dish you were searching for might have moved, but warm coffee and comfort bites are just a click away.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Home Sanctuary
          </Link>
          <Link to="/menu" className="btn btn-secondary btn-lg">
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
