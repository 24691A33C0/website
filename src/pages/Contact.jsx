import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoogleMapsSection from '../components/GoogleMapsSection';
import { businessConfig, getGoogleMapsUrl, getGoogleMapsDirectionsUrl } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required.';
    if (!formData.subject.trim()) errs.subject = 'Please select or provide a subject.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide a message (minimum 10 characters).';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    addToast('Your message has been sent to our cafe team!', 'success');
  };

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
            Always Here For You
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              marginBottom: '1rem'
            }}
          >
            Contact & Find Us
          </h1>
          <p style={{ color: '#D2DDD1', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
            Have a question about our menu, private gatherings, or study pods? Or simply need directions to our door? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. MAIN TWO-COLUMN CONTACT & FORM SECTION */}
      <section className="section-spacing">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem'
            }}
          >
            {/* Left Col: Contact Information */}
            <div>
              <span className="section-badge">Get in Touch</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.6rem)', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                We're Just Around the Corner
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Stop by for a warm cup, drop us an email, or call ahead. Our team is always ready with a welcoming smile.
              </p>

              {/* Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Address */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(201, 111, 74, 0.15)',
                      color: 'var(--color-terracotta)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                      Cafe Address
                    </h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {businessConfig.address}
                    </p>
                    <a
                      href={getGoogleMapsDirectionsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--color-terracotta)',
                        marginTop: '6px'
                      }}
                    >
                      Get Directions on Google Maps <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(23, 63, 53, 0.1)',
                      color: 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                      Phone & Table Queries
                    </h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Primary: <a href={`tel:${businessConfig.phone}`} style={{ color: 'var(--color-forest)', fontWeight: 600 }}>{businessConfig.phone}</a>
                    </p>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Direct Desk: <a href={`tel:${businessConfig.altPhone}`} style={{ color: 'var(--color-forest)' }}>{businessConfig.altPhone}</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(168, 191, 163, 0.3)',
                      color: 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                      Email Inquiries
                    </h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      General: <a href={`mailto:${businessConfig.email}`} style={{ color: 'var(--color-forest)', fontWeight: 600 }}>{businessConfig.email}</a>
                    </p>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Customer Care: <a href={`mailto:${businessConfig.supportEmail}`} style={{ color: 'var(--color-forest)' }}>{businessConfig.supportEmail}</a>
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(232, 220, 203, 0.6)',
                      color: 'var(--color-espresso)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                      Hours of Sanctuary
                    </h4>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      <div>{businessConfig.openingHours.weekdays}</div>
                      <div>{businessConfig.openingHours.weekends}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: 600, marginTop: '2px' }}>
                        {businessConfig.openingHours.kitchenCloses}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Channels */}
              <div>
                <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
                  Connect on Socials
                </h4>
                <div style={{ display: 'flex', gap: '12px' }}>
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
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-white)',
                        border: '1.5px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-forest)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-terracotta)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = 'var(--color-terracotta)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-white)';
                        e.currentTarget.style.color = 'var(--color-forest)';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                      }}
                    >
                      <s.icon size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Contact Message Form */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                borderRadius: '28px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {submitted ? (
                /* Success State */
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(46, 125, 50, 0.15)',
                      color: '#2e7d32',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto'
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
                    Thank You, {formData.name}!
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    We have received your message regarding "<strong>{formData.subject}</strong>". Our cafe team will get back to your email at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="btn btn-secondary"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <MessageSquare size={22} color="var(--color-terracotta)" />
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--color-forest)', margin: 0 }}>
                      Send Us a Note
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Sen"
                        className="form-control"
                      />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@email.com"
                          className="form-control"
                        />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91..."
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="form-control"
                      >
                        <option value="">Select inquiry topic...</option>
                        <option value="General Question">General Question / Feedback</option>
                        <option value="Group Reservation">Group Reservation / Birthday</option>
                        <option value="Study Pod Booking">Study Pod / Coworking Space</option>
                        <option value="Event Inquiry">Acoustic / Mindful Event Inquiry</option>
                        <option value="Catering or Bulk Orders">Catering or Bulk Orders</option>
                      </select>
                      {errors.subject && <div className="form-error">{errors.subject}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what's on your mind..."
                        className="form-control"
                      />
                      {errors.message && <div className="form-error">{errors.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOOGLE MAPS INTERACTIVE LOCATION SECTION */}
      <section className="section-spacing" style={{ backgroundColor: '#FAF6EE', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            badge="Interactive Location"
            title="Locate Dynamic Stress Buster Cafe"
            subtitle="Find your way to our botanical sanctuary. Click below for real-time turn-by-turn navigation."
          />

          <GoogleMapsSection />
        </div>
      </section>
    </div>
  );
}
