import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Wifi, Zap, BookOpen, Volume2, Smile, ArrowRight, X } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { EXPERIENCES, EXPERIENCE_AMENITIES } from '../data/experiencesData';
import { useToast } from '../context/ToastContext';

export default function Experiences() {
  const { addToast } = useToast();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    experienceTitle: 'Cozy Coffee Dates',
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    guests: '2',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleOpenBooking = (exp) => {
    setSelectedExperience(exp);
    setFormData((prev) => ({
      ...prev,
      experienceTitle: exp ? exp.title : 'General Cafe Reservation'
    }));
    setIsBookingOpen(true);
    setBookingSuccess(null);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required.';
    if (!formData.phone.trim() || formData.phone.length < 8) errors.phone = 'Valid phone number is required.';
    if (!formData.date) errors.date = 'Please select a date.';
    return errors;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const refCode = `DSBC-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmation = {
      ...formData,
      refCode,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBookingSuccess(confirmation);
    addToast(`Reservation demo confirmed! Reference: ${refCode}`, 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. HERO BANNER */}
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
            Curated Spaces for Every Mood
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              marginBottom: '1rem'
            }}
          >
            Cafe Experiences
          </h1>
          <p style={{ color: '#D2DDD1', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
            Whether you seek intimate quietude, an energizing creative workspace, or laughter over board games with dear friends, we have an environment crafted just for you.
          </p>
        </div>
      </section>

      {/* 2. THE 8 EXPERIENCES GRID */}
      <section className="section-spacing">
        <div className="container">
          <SectionHeading
            badge="Tailored For You"
            title="Choose Your Favorite Way to Unwind"
            subtitle="Click 'Reserve Experience' on any vibe to save your preferred zone or table in advance."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="cafe-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Image */}
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(23, 63, 53, 0.85)',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {exp.idealTime}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {exp.recommendedFor}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    {exp.title}
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-sage-dark)', fontWeight: 600, marginBottom: '0.85rem' }}>
                    {exp.subtitle}
                  </div>
                  <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                    {exp.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {exp.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: '#555', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={15} color="var(--color-terracotta)" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Reserve button */}
                  <button
                    onClick={() => handleOpenBooking(exp)}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem' }}
                  >
                    Reserve This Space <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAFE AMENITIES & ATMOSPHERE SPECS */}
      <section className="section-spacing" style={{ backgroundColor: '#F3EAE0' }}>
        <div className="container">
          <SectionHeading
            badge="Sanctuary Standards"
            title="The Dynamic Comfort Environment"
            subtitle="Engineered with subtle design touches that restore your mental clarity."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {EXPERIENCE_AMENITIES.map((am, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '2rem',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(23, 63, 53, 0.1)',
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  <Sparkles size={24} color="var(--color-terracotta)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{am.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {am.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOOKING MODAL (FUNCTIONAL DEMO) */}
      {isBookingOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px', padding: '2rem' }}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsBookingOpen(false)}
              aria-label="Close booking modal"
            >
              <X size={20} />
            </button>

            {bookingSuccess ? (
              /* Success Confirmation */
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
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
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                  Reservation Request Received!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Your spot for <strong>{bookingSuccess.experienceTitle}</strong> has been logged in our demo system.
                </p>

                {/* Receipt Card */}
                <div
                  style={{
                    backgroundColor: 'var(--color-cream-subtle)',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    border: '1.5px dashed var(--color-border)',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#777' }}>Reference ID:</span>
                    <strong style={{ color: 'var(--color-terracotta)' }}>{bookingSuccess.refCode}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#777' }}>Guest Name:</span>
                    <strong>{bookingSuccess.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#777' }}>Date & Time:</span>
                    <strong>{bookingSuccess.date} at {bookingSuccess.time}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#777' }}>Party Size:</span>
                    <strong>{bookingSuccess.guests} Guest(s)</strong>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.8rem',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}
                >
                  ⚠️ <strong>Demo Notice:</strong> This is a front-end simulation. No real charge has been made.
                </div>

                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Done
                </button>
              </div>
            ) : (
              /* Booking Form */
              <div>
                <span className="section-badge" style={{ marginBottom: '0.5rem' }}>Reserve Ahead</span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                  {formData.experienceTitle}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Reserve your table or quiet study pod. We hold reservations for 15 minutes past arrival time.
                </p>

                <form onSubmit={handleSubmitBooking}>
                  {/* Name and Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="form-control"
                      />
                      {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765..."
                        className="form-control"
                      />
                      {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="form-control"
                    />
                    {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                  </div>

                  {/* Date, Time, Guests */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Time Slot *</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="form-control"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                        <option value="19:00">07:00 PM</option>
                        <option value="20:30">08:30 PM</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Guests *</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="form-control"
                      >
                        <option value="1">1 Person (Solo pod)</option>
                        <option value="2">2 People (Duo booth)</option>
                        <option value="4">3-4 People</option>
                        <option value="6">5-6 People</option>
                        <option value="10">7-10 People (Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="form-group">
                    <label className="form-label">Special Preferences / Requests</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Near window plants, power outlet needed, birthday celebration..."
                      className="form-control"
                    />
                  </div>

                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#8A8279',
                      marginBottom: '1rem',
                      lineHeight: 1.4
                    }}
                  >
                    * Submissions are frontend demo only unless connected to official backend.
                  </div>

                  <button type="submit" className="btn btn-terracotta btn-lg" style={{ width: '100%' }}>
                    Confirm Demo Reservation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
