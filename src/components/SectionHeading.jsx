import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
  lightMode = false
}) {
  return (
    <div
      className={`section-header ${centered ? '' : 'left-aligned'} ${className}`}
      style={{
        textAlign: centered ? 'center' : 'left',
        maxWidth: centered ? '720px' : '100%',
        margin: centered ? '0 auto 3.5rem auto' : '0 0 2.5rem 0'
      }}
    >
      {badge && (
        <span
          className="section-badge"
          style={{
            backgroundColor: lightMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(168, 191, 163, 0.35)',
            color: lightMode ? '#FAF6EE' : 'var(--color-forest)'
          }}
        >
          {badge}
        </span>
      )}
      <h2
        style={{
          color: lightMode ? '#FFFFFF' : 'var(--color-forest)',
          marginBottom: '0.85rem'
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: lightMode ? '#D1DCD0' : 'var(--color-text-muted)',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
