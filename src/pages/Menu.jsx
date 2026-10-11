import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, X, ArrowUpDown, Coffee } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import FoodCard from '../components/FoodCard';
import QuickViewModal from '../components/QuickViewModal';
import { MENU_CATEGORIES, menuItems } from '../data/menuData';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'name'
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [moodFilter, setMoodFilter] = useState(null); // 'exhausted' | 'anxious' | 'celebrating' | 'focused'

  // Filter and Sort Logic
  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Mood quick recommendation filter
    if (moodFilter) {
      if (moodFilter === 'exhausted') {
        result = result.filter((item) =>
          item.name.toLowerCase().includes('latte') ||
          item.name.toLowerCase().includes('espresso') ||
          item.name.toLowerCase().includes('brownie') ||
          item.category === 'Signature Stress Buster Specials'
        );
      } else if (moodFilter === 'anxious') {
        result = result.filter((item) =>
          item.name.toLowerCase().includes('tea') ||
          item.name.toLowerCase().includes('hot chocolate') ||
          item.name.toLowerCase().includes('relaxation')
        );
      } else if (moodFilter === 'hungry') {
        result = result.filter((item) =>
          item.category === 'Pizza' ||
          item.category === 'Burgers and Sandwiches' ||
          item.category === 'Pasta' ||
          item.category === 'Combo Meals'
        );
      } else if (moodFilter === 'sweet') {
        result = result.filter((item) =>
          item.category === 'Desserts and Bakery' ||
          item.category === 'Milkshakes and Smoothies'
        );
      }
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: popularity
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, moodFilter]);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Menu Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          padding: '4.5rem 1.5rem 3.5rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '780px' }}>
          <span
            className="section-badge"
            style={{
              backgroundColor: 'rgba(168, 191, 163, 0.25)',
              color: 'var(--color-cream)',
              marginBottom: '1rem'
            }}
          >
            Handcrafted with Care
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              marginBottom: '1rem'
            }}
          >
            Our Digital Cafe Menu
          </h1>
          <p style={{ color: '#D2DDD1', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
            Every recipe is prepared to order using authentic beans, fresh ingredients, and pure comfort flavors. Explore over 50 gourmet beverages and mindful bites.
          </p>
        </div>
      </section>

      {/* Controls Container: Search, Mood Matcher, Category Pills, Sort */}
      <div className="container" style={{ marginTop: '-24px', position: 'relative', zIndex: 10 }}>
        {/* Search & Mood Matcher Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem'
          }}
        >
          {/* Top row: Search and Sort */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            {/* Search Bar */}
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9E968D'
                }}
              />
              <input
                type="text"
                placeholder="Search coffee, pizzas, desserts, pasta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{
                  paddingLeft: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-cream-subtle)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888'
                  }}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={18} color="var(--color-forest)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort Menu Items"
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'var(--color-cream-subtle)',
                  color: 'var(--color-forest)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Popular First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Quick Mood Matcher helper */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={16} color="var(--color-terracotta)" /> Mood Matcher:
            </span>
            {[
              { id: 'exhausted', label: '⚡ Need High Energy' },
              { id: 'anxious', label: '🌿 Calm My Nerves' },
              { id: 'hungry', label: '🍕 Big Comfort Meal' },
              { id: 'sweet', label: '🍰 Sweet Tooth Craving' }
            ].map((m) => {
              const active = moodFilter === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMoodFilter(active ? null : m.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: active ? '1.5px solid var(--color-terracotta)' : '1px solid var(--color-border)',
                    backgroundColor: active ? 'var(--color-terracotta)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--color-text-main)',
                    fontSize: '0.8rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {m.label} {active && '✕'}
                </button>
              );
            })}
            {moodFilter && (
              <button
                onClick={() => setMoodFilter(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-terracotta)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear Mood Filter
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '2.5rem',
            scrollbarWidth: 'thin'
          }}
        >
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMoodFilter(null); // reset mood when explicit category clicked
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid var(--color-forest)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-forest)' : 'var(--color-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-forest)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Count & Filter summary */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0 4px'
          }}
        >
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{filteredItems.length}</strong> delicious items
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>

          {(searchQuery || selectedCategory !== 'All' || moodFilter) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMoodFilter(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-terracotta)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onQuickView={setQuickViewItem} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: '24px',
              border: '1px solid var(--color-border)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201, 111, 74, 0.12)',
                color: 'var(--color-terracotta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <Coffee size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-forest)' }}>
              No items matched your search
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Try searching with different keywords or browse our 14 delicious categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMoodFilter(null);
              }}
              className="btn btn-primary"
            >
              Show All Menu Items
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewItem && (
        <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
      )}
    </div>
  );
}
