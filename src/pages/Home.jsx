import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, Heart, Sparkles, ShieldCheck, Clock, Users, BookOpen, Star, Mail, Check, Leaf, Smile } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import FoodCard from '../components/FoodCard';
import QuickViewModal from '../components/QuickViewModal';
import { menuItems } from '../data/menuData';
import { testimonials } from '../data/testimonialsData';
import { useToast } from '../context/ToastContext';

export default function Home() {
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const { addToast } = useToast();

  // Signature and Bestsellers
  const bestsellers = menuItems.filter((i) => i.tag === 'Bestseller' || i.popularity >= 96).slice(0, 4);
  const signatureSpecials = menuItems.filter((i) => i.category === 'Signature Stress Buster Specials').slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
    addToast('Thank you for subscribing! Check your inbox for cozy perks.', 'success');
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--color-cream)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Heading and CTAs */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(168, 191, 163, 0.35)',
                  color: 'var(--color-forest)',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  letterSpacing: '0.04em'
                }}
              >
                <Sparkles size={16} color="var(--color-terracotta)" />
                <span>Urban Sanctuary & Mindful Roastery</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.7rem, 5.5vw, 4.4rem)',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                  color: 'var(--color-forest)'
                }}
              >
                Sip. Relax. <br />
                <span style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>Recharge.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-muted)',
                  marginBottom: '2.25rem',
                  maxWidth: '520px'
                }}
              >
                Your everyday escape from stress, served one delicious moment at a time. Handcrafted coffees, soothing comfort dishes, and warm botanical corners designed to restore your peace.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Link to="/menu" className="btn btn-primary btn-lg">
                  Explore Our Menu <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-secondary btn-lg">
                  Discover Our Cafe
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Leaf size={20} color="#2e7d32" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    Biophilic Green Space
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Coffee size={20} color="var(--color-terracotta)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    Single Origin Roasts
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smile size={20} color="var(--color-forest)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    Zero Hurry Philosophy
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Feature Card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                  border: '8px solid #FFFFFF'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                  alt="Dynamic Stress Buster Cafe relaxing botanical interior"
                  style={{ width: '100%', height: '520px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(23, 63, 53, 0.45) 0%, transparent 60%)'
                  }}
                />
              </div>

              {/* Overlapping Feature Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  left: 'clamp(-10px, 4%, 20px)',
                  backgroundColor: 'var(--color-white)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '20px',
                  boxShadow: '0 15px 35px rgba(23, 63, 53, 0.15)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  maxWidth: '340px'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(201, 111, 74, 0.15)',
                    color: 'var(--color-terracotta)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Coffee size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                    Signature Pick
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '1.05rem' }}>
                    Relaxation Lavender Latte
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Oat milk, lavender blossom & nutmeg • ₹189
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION TO CAFE CONCEPT */}
      <section className="section-spacing" style={{ backgroundColor: '#F4ECE1' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
                alt="Cafe seating and plants"
                style={{ borderRadius: '20px', width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <img
                src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
                alt="Latte art preparation"
                style={{ borderRadius: '20px', width: '100%', height: '240px', objectFit: 'cover', marginTop: '2rem' }}
              />
            </div>

            <div>
              <SectionHeading
                badge="The Philosophy"
                title="A Sanctuary Designed to Soften the City"
                subtitle="In a world that never stops rushing, we engineered a space where time graciously slows down."
                centered={false}
              />
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.75 }}>
                Dynamic Stress Buster Cafe was born from a simple realization: modern life is overwhelming. Between endless screen notifications, relentless deadlines, and noisy urban streets, the human nervous system needs a pause button.
              </p>
              <p style={{ marginBottom: '2rem', lineHeight: 1.75 }}>
                Here, every detail is intentional. Our acoustics are calibrated to eliminate harsh echoes; our warm lighting simulates late golden afternoon sunshine; and our comfort food is prepared with unhurried warmth.
              </p>
              <Link to="/about" className="btn btn-terracotta">
                Read Our Story & Values <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE STRESS BUSTER SPECIALS */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <SectionHeading
            badge="Created for Peace of Mind"
            title="Signature Stress Buster Specials"
            subtitle="Thoughtfully crafted beverages and sharing plates curated to elevate your mood and comfort your senses."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {signatureSpecials.map((item) => (
              <FoodCard key={item.id} item={item} onQuickView={setQuickViewItem} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" className="btn btn-secondary btn-lg">
              View All 50+ Menu Creations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS SECTION (HORIZONTAL / GRID HIGHLIGHTS) */}
      <section className="section-spacing" style={{ backgroundColor: '#FAF6EE', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="section-badge">Customer Favorites</span>
              <h2 style={{ color: 'var(--color-forest)', margin: 0 }}>The Daily Bestsellers</h2>
            </div>
            <Link to="/menu" style={{ color: 'var(--color-terracotta)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              Explore Full Menu <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {bestsellers.map((item) => (
              <FoodCard key={item.id} item={item} onQuickView={setQuickViewItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. "YOUR HAPPY PLACE" — AMBIENCE & NOOKS */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-forest)', color: '#FFFFFF' }}>
        <div className="container">
          <SectionHeading
            badge="Atmosphere & Design"
            title="Your Happy Place in Every Corner"
            subtitle="Step into a realm of soothing greenery, tactile textures, analog library walls, and golden ambient warmth."
            lightMode={true}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                title: 'Cozy Botanical Nooks',
                desc: 'Surrounded by living air-purifying foliage and hanging rattan swings for restorative reading.',
                image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Ergonomic Work & Study',
                desc: 'Universal surge-protected plugs at each seat, 300 Mbps fiber internet, and warm task lights.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Community Board Games',
                desc: 'Over 40 curated analog tabletop games to spark spontaneous joy and laughter with friends.',
                image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Unrushed Social Spaces',
                desc: 'Comfortable booths and communal oak tables built for heartwarming reunions and heartfelt chats.',
                image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#C0CEC0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/experiences" className="btn btn-terracotta btn-lg">
              Explore All 8 Experiences & Reserve a Spot <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. "WHY YOU'LL LOVE US" SECTION */}
      <section className="section-spacing" style={{ backgroundColor: '#FAF6EE' }}>
        <div className="container">
          <SectionHeading
            badge="The Stress-Free Promise"
            title="Why You'll Love Dynamic Stress Buster Cafe"
            subtitle="Thoughtfully engineered hospitality designed to leave you feeling lighter and more energized."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                icon: Coffee,
                title: 'Artisan Ingredients',
                desc: 'Single-origin specialty beans, organic dairy, pure Belgian chocolate, and stone-baked pizza crusts.'
              },
              {
                icon: Leaf,
                title: 'Biophilic Ambience',
                desc: 'Natural daylight, oxygen-rich indoor plants, and natural timber elements that lower stress cortisol levels.'
              },
              {
                icon: Clock,
                title: 'No-Rush Hospitality',
                desc: 'Never worry about being rushed out. Study, finish your novel, chat with friends, or simply exist.'
              },
              {
                icon: Heart,
                title: 'Empathetic Service',
                desc: 'A warm, radiant team that understands when you need friendly recommendations or quiet privacy.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '2.25rem 1.75rem',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(168, 191, 163, 0.35)',
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <item.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="section-spacing" style={{ backgroundColor: '#F3EAE0' }}>
        <div className="container">
          <SectionHeading
            badge="Stories of Calm"
            title="Loved by Coffee Seekers & Thinkers"
            subtitle="Read reflections from visitors who found their grounding at Dynamic Stress Buster Cafe."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {testimonials.map((test) => (
              <div
                key={test.id}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '22px',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                {/* Rating stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: '#EAB308' }}>
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#EAB308" />
                  ))}
                </div>

                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-forest)' }}>
                  "{test.title}"
                </h4>

                <p style={{ fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--color-text-muted)', flex: 1, marginBottom: '1.5rem' }}>
                  {test.comment}
                </p>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <img
                    src={test.avatar}
                    alt={test.name}
                    style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '0.95rem' }}>
                      {test.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      {test.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROMOTIONAL BANNER: "Take a Break. Treat Yourself." */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          padding: '4.5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '820px'
          }}
        >
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              color: 'var(--color-sage)',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}
          >
            Mindful Moments Everyday
          </span>
          <h2
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              marginBottom: '1.25rem',
              lineHeight: 1.2
            }}
          >
            Take a Break. Treat Yourself.
          </h2>
          <p
            style={{
              color: '#D8E2D7',
              fontSize: '1.15rem',
              lineHeight: 1.7,
              marginBottom: '2.25rem'
            }}
          >
            Leave your deadlines at the door. Indulge in our Stress Buster Hot Chocolate or a warm Brownie with Ice Cream while resting your mind in a cocoon of greenery.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/menu" className="btn btn-terracotta btn-lg">
              Explore Our Digital Menu
            </Link>
            <Link to="/contact" className="btn btn-cream btn-lg">
              Find Directions & Hours
            </Link>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SUBSCRIPTION SECTION */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '28px',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              maxWidth: '840px',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201, 111, 74, 0.15)',
                color: 'var(--color-terracotta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <Mail size={26} />
            </div>

            <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-forest)' }}>
              Join the Mindful Cafe Circle
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '580px', margin: '0 auto 2rem auto' }}>
              Subscribe to receive weekly mindfulness prompts, seasonal beverage recipes, secret menu previews, and invites to acoustic community sessions.
            </p>

            {newsletterSubscribed ? (
              <div
                style={{
                  backgroundColor: 'rgba(168, 191, 163, 0.3)',
                  color: 'var(--color-forest)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 600
                }}
              >
                <Check size={20} color="#2e7d32" />
                <span>You're in! Welcome to our sanctuary newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: '520px', margin: '0 auto' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="form-control"
                    style={{ flex: 1, minWidth: '240px' }}
                    aria-label="Email Address"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <div className="form-error" style={{ textAlign: 'left', marginTop: '8px' }}>
                    {newsletterError}
                  </div>
                )}
                <div style={{ fontSize: '0.8rem', color: '#999086', marginTop: '10px' }}>
                  Zero spam. Only peace, warmth, and fresh brews. Unsubscribe anytime.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewItem && (
        <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
      )}
    </div>
  );
}
