import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Info } from 'lucide-react';
import { businessConfig, getGoogleMapsUrl, getGoogleMapsDirectionsUrl } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

export default function GoogleMapsSection() {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const mapsSearchUrl = getGoogleMapsUrl();
  const directionsUrl = getGoogleMapsDirectionsUrl();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(businessConfig.address);
    setCopied(true);
    addToast('Address copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe Google Maps embed using encoded query
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    businessConfig.address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Notice bar if placeholder */}
      {businessConfig.isPlaceholderAddress && (
        <div
          style={{
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            padding: '10px 18px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid #FDE68A'
          }}
        >
          <Info size={16} style={{ flexShrink: 0 }} />
          <span>
            <strong>Location Notice:</strong> Official cafe premises address is currently a demonstration placeholder. Easily update in <code>src/config/businessConfig.js</code>.
          </span>
        </div>
      )}

      {/* Map display area */}
      <div style={{ position: 'relative', height: '380px', width: '100%', backgroundColor: '#E2DFD8' }}>
        <iframe
          title="Dynamic Stress Buster Cafe Location Map"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Quick Action Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            pointerEvents: 'none'
          }}
        >
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-terracotta btn-sm"
            style={{ pointerEvents: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          >
            <Navigation size={16} /> Get Driving Directions
          </a>
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cream btn-sm"
            style={{ pointerEvents: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          >
            <ExternalLink size={16} /> Open in Google Maps
          </a>
        </div>
      </div>

      {/* Address Bar & Copy action */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#FAF7F2'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '650px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-forest)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <MapPin size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '1rem' }}>
              {businessConfig.cafeName}
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              {businessConfig.address}
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyAddress}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>
    </div>
  );
}
