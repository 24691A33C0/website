import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Coffee, Users, ShieldCheck, Smile, ArrowRight, Sun, BookOpen } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  const values = [
    {
      title: 'Comfort First',
      desc: 'Deep cushions, warm lighting, and zero sensory overload. We design every square foot so you immediately feel at ease.',
      icon: Heart
    },
    {
      title: 'Artisan Quality',
      desc: 'From freshly ground single-origin Arabica to sourdough pizzas and handmade dips, we never cut corners on flavor.',
      icon: Coffee
    },
    {
      title: 'Creative Energy',
      desc: 'A vibrant crossroad for designers, writers, students, and dreamers to spark ideas or daydream peacefully.',
      icon: Sparkles
    },
    {
      title: 'True Affordability',
      desc: 'Premium cafe aesthetics should not come with gatekept luxury pricing. Honest, accessible food for everyone.',
      icon: Smile
    },
    {
      title: 'Warm Hospitality',
      desc: 'Our staff welcomes you like a dear friend. Whether you stay for 10 minutes or 4 hours, you are always cherished.',
      icon: Users
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO / EDITORIAL HEADER */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) 1.5rem clamp(3rem, 5vw, 4.5rem) 1.5rem',
          backgroundColor: '#F5EDE3',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <span className="section-badge">Our Purpose & Heart</span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              lineHeight: 1.18,
              color: 'var(--color-forest)',
              marginBottom: '1.5rem'
            }}
          >
            We Built an Urban Sanctuary for Tired Minds
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              maxWidth: '720px',
              margin: '0 auto'
            }}
          >
            In a fast-paced city where everyone is rushing, Dynamic Stress Buster Cafe exists to gently remind you: <em>it is okay to slow down, take a deep breath, and savor the present moment.</em>
          </p>
        </div>
      </section>

      {/* 2. THE STORY BEHIND DYNAMIC STRESS BUSTER CAFE */}
      <section className="section-spacing">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="section-badge">Origin Story</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', marginBottom: '1.5rem', color: 'var(--color-forest)' }}>
                From High-Pressure Burnout to Mindful Respite
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}>
                Dynamic Stress Buster Cafe was conceptualized after seeing classmates, colleagues, and creators constantly overwhelmed by screen fatigue, back-to-back notifications, and sensory overload.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}>
                Traditional cafes often amplify that noise: loud industrial grinders, harsh blaring acoustics, uncomfortable metal stools, and implicit pressure to leave the second your cup is empty.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                We wanted something radically different. We combined the sensory benefits of biophilic greenery, acoustic sound dampening, artisanal comfort cooking, and genuinely empathetic hospitality to create a place that acts as a natural decompression chamber.
              </p>

              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#EAE1D3',
                  borderRadius: '16px',
                  borderLeft: '4px solid var(--color-terracotta)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                  "When you step through our wooden archway, we want you to physically feel your shoulders drop and your breath deepen."
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
                  — Founding Team Philosophy
                </div>
              </div>
            </div>

            {/* Editorial Image Collage */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Cafe sunny atmosphere"
                style={{
                  borderRadius: '24px',
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-xl)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  right: '-15px',
                  backgroundColor: 'var(--color-forest)',
                  color: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '18px',
                  maxWidth: '260px',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-terracotta)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#E0E8DF', lineHeight: 1.4 }}>
                  Dedicated to restorative calm, community warmth, and mindful comfort.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION AND VISION */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-forest)', color: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem'
            }}
          >
            {/* Mission */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-terracotta)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <Sun size={28} />
              </div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.8rem', color: 'var(--color-sage)', fontWeight: 700 }}>
                Our Mission
              </span>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.9rem', margin: '0.5rem 0 1.25rem 0' }}>
                Making Everyday Breaks More Refreshing & Enjoyable
              </h3>
              <p style={{ color: '#D4DDD3', fontSize: '1.05rem', lineHeight: 1.8 }}>
                To serve high quality, nourishing food and specialty coffee in an environment intentionally engineered to soothe the nervous system, alleviate mental strain, and restore everyday happiness.
              </p>
            </div>

            {/* Vision */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(168, 191, 163, 0.3)',
                  color: 'var(--color-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <Users size={28} />
              </div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.8rem', color: 'var(--color-sage)', fontWeight: 700 }}>
                Our Vision
              </span>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.9rem', margin: '0.5rem 0 1.25rem 0' }}>
                Becoming a Beloved Welcoming Community Space
              </h3>
              <p style={{ color: '#D4DDD3', fontSize: '1.05rem', lineHeight: 1.8 }}>
                To become the city's favorite third place—an unpretentious neighborhood sanctuary where loneliness turns into belonging, creative blocks turn into clarity, and strangers become friends over board games.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR FIVE CORE VALUES */}
      <section className="section-spacing" style={{ backgroundColor: '#FAF6EE' }}>
        <div className="container">
          <SectionHeading
            badge="The Pillars of Calm"
            title="Our Core Values"
            subtitle="The five principles that guide every recipe we brew, every table we arrange, and every smile we share."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {values.map((v, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '2.25rem 1.5rem',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(168, 191, 163, 0.35)',
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <v.icon size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW WE BRING PEOPLE TOGETHER */}
      <section className="section-spacing" style={{ backgroundColor: '#F3EAE0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ order: 2 }}>
              <span className="section-badge">Social Connection</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', marginBottom: '1.25rem', color: 'var(--color-forest)' }}>
                Where Real Life Happens Offline
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}>
                When was the last time you spent two uninterrupted hours talking to someone without checking your phone? Or laughed uncontrollably over a friendly game of Jenga?
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                We built Dynamic Stress Buster Cafe to rekindle real human presence. From communal sharing tables to analog book-exchange shelves, we make it effortless to meet friendly neighbors, share a pot of Masala Chai, and form memories that outlast the workday.
              </p>
              <Link to="/experiences" className="btn btn-primary">
                View Cafe Experiences <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ order: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                alt="Friends laughing together at the cafe"
                style={{
                  borderRadius: '24px',
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. INVITING CTA: "COME FIND YOUR HAPPY PLACE" */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 4.8vw, 3.5rem)', marginBottom: '1.25rem' }}>
            Come Find Your Happy Place
          </h2>
          <p style={{ color: '#D1DDD0', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            A warm booth, a fragrant cup of freshly pulled espresso, and a kind team are waiting to welcome you whenever you need a breather.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-terracotta btn-lg">
              Visit Us Today & Get Directions
            </Link>
            <Link to="/menu" className="btn btn-cream btn-lg">
              Preview Full Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
