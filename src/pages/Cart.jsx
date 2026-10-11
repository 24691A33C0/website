import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Sparkles, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import SectionHeading from '../components/SectionHeading';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    taxAmount,
    deliveryFee,
    taxPercent,
    grandTotal,
    currencySymbol
  } = useCart();

  const { addToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(null);

  // Demo Checkout form state
  const [checkoutData, setCheckoutData] = useState({
    diningOption: 'Dine-In', // 'Dine-In' | 'Takeaway'
    tableNumber: 'Table 7 (Garden Solarium)',
    customerName: '',
    phone: '',
    specialInstructions: ''
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'STRESSBUSTER' || code === 'FIRSTSIP') {
      const discount = Math.round(subtotal * 0.15); // 15% off
      setPromoDiscount(discount);
      setPromoMessage('✨ 15% Mindfulness Discount applied!');
      addToast('Promo code applied: 15% off!', 'success');
    } else {
      setPromoDiscount(0);
      setPromoMessage('Invalid promo code. Try "STRESSBUSTER" or "FIRSTSIP".');
      addToast('Invalid promo code', 'error');
    }
  };

  const handleProceedCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutOpen(true);
    setCheckoutComplete(null);
  };

  const handleCompleteDemoOrder = (e) => {
    e.preventDefault();
    if (!checkoutData.customerName.trim()) {
      addToast('Please enter your name for the tray receipt', 'error');
      return;
    }

    const orderNumber = `DSB-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalAmount = Math.max(0, grandTotal - promoDiscount);

    const receipt = {
      orderNumber,
      customerName: checkoutData.customerName,
      diningOption: checkoutData.diningOption,
      tableNumber: checkoutData.tableNumber,
      items: [...cartItems],
      totalPaid: finalAmount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCheckoutComplete(receipt);
    clearCart();
    addToast('Demo order registered successfully!', 'success');
  };

  const finalPayable = Math.max(0, grandTotal - promoDiscount);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. CART BANNER */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          padding: '4rem 1.5rem 3rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '0.5rem' }}>
            Your De-Stress Tray
          </h1>
          <p style={{ color: '#D2DDD1', fontSize: '1.1rem', margin: 0 }}>
            Review your comfort food selections, adjust quantities, and place your table order.
          </p>
        </div>
      </section>

      {/* 2. CART CONTENT */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '24px',
              padding: '4.5rem 2rem',
              textAlign: 'center',
              maxWidth: '650px',
              margin: '0 auto',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(23, 63, 53, 0.08)',
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <ShoppingBag size={38} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
              Your tray is currently empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Looks like you haven't picked your comfort beverages or bites yet. Explore our 14 delicious categories and treat yourself!
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Our Digital Menu
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left Col: Cart Items List */}
            <div style={{ flex: '1 1 60%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)', margin: 0 }}>
                  Selected Items ({cartItems.length})
                </h3>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-terracotta)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trash2 size={15} /> Clear All
                </button>
              </div>

              {/* Items Table / Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: 'var(--color-white)',
                      borderRadius: '18px',
                      padding: '1.25rem',
                      border: '1px solid var(--color-border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '1.25rem'
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        backgroundColor: '#EBE5D8'
                      }}
                    />

                    {/* Title & Category */}
                    <div style={{ flex: '1 1 200px' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage-dark)', fontWeight: 600 }}>
                        {item.category}
                      </span>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', margin: '2px 0 4px 0' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
                        {currencySymbol}{item.price} each
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        style={{
                          padding: '6px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-forest)'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 10px', fontWeight: 700, fontSize: '0.95rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        style={{
                          padding: '6px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-forest)'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Subtotal for line */}
                    <div style={{ minWidth: '70px', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-forest)' }}>
                      {currencySymbol}{item.price * item.quantity}
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      style={{
                        background: 'rgba(201, 111, 74, 0.1)',
                        border: 'none',
                        color: 'var(--color-terracotta)',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  to="/menu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-forest)',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  <ArrowLeft size={16} /> Continue Shopping / Add More Items
                </Link>
              </div>
            </div>

            {/* Right Col: Order Summary & Checkout Card */}
            <div style={{ flex: '1 1 340px' }}>
              <div
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'sticky',
                  top: '100px'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                  Order Summary
                </h3>

                {/* Calculation Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Items Subtotal</span>
                    <strong>{currencySymbol}{subtotal}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      Applicable GST / Taxes ({taxPercent}%)
                    </span>
                    <span style={{ color: '#888' }}>
                      {taxAmount > 0 ? `${currencySymbol}${taxAmount}` : '₹0 (Demo)'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Dining / Service Fee</span>
                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>
                      {deliveryFee > 0 ? `${currencySymbol}${deliveryFee}` : 'Free'}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                      <span>Mindfulness Promo (15%)</span>
                      <span>-{currencySymbol}{promoDiscount}</span>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: '1.5px dashed var(--color-border)',
                      paddingTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--color-forest)'
                    }}
                  >
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--color-terracotta)' }}>{currencySymbol}{finalPayable}</span>
                  </div>
                </div>

                {/* Promo code form */}
                <form onSubmit={handleApplyPromo} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Promo code (STRESSBUSTER)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 0.9rem' }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0.65rem 1rem' }}>
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div
                      style={{
                        fontSize: '0.78rem',
                        marginTop: '6px',
                        color: promoDiscount > 0 ? '#15803d' : '#b91c1c',
                        fontWeight: 500
                      }}
                    >
                      {promoMessage}
                    </div>
                  )}
                </form>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="btn btn-terracotta btn-lg"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  Proceed to Checkout ({currencySymbol}{finalPayable})
                </button>

                <div
                  style={{
                    backgroundColor: 'var(--color-cream-subtle)',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    color: '#8A8279',
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} color="var(--color-terracotta)" style={{ flexShrink: 0 }} />
                  <span>Frontend demo simulation: No actual financial charge will be executed.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. DEMO CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px', padding: '2rem' }}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close checkout modal"
            >
              <X size={20} />
            </button>

            {checkoutComplete ? (
              /* Receipt Simulation */
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
                  Demo Order Placed!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{checkoutComplete.customerName}</strong>! Your comfort order has been sent to the barista bar.
                </p>

                {/* Receipt Card */}
                <div
                  style={{
                    backgroundColor: 'var(--color-cream-subtle)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1.5px dashed var(--color-border)',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#777' }}>Order Token:</span>
                    <strong style={{ color: 'var(--color-terracotta)' }}>{checkoutComplete.orderNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#777' }}>Service Type:</span>
                    <strong>{checkoutComplete.diningOption} ({checkoutComplete.tableNumber})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#777' }}>Placed At:</span>
                    <span>{checkoutComplete.timestamp}</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0', paddingTop: '8px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '6px' }}>Items Summary:</div>
                    {checkoutComplete.items.map((i, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.825rem', marginBottom: '3px' }}>
                        <span>{i.quantity}x {i.name}</span>
                        <span>{currencySymbol}{i.price * i.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: 'var(--color-forest)' }}>
                    <span>Simulated Total:</span>
                    <span style={{ color: 'var(--color-terracotta)' }}>{currencySymbol}{checkoutComplete.totalPaid}</span>
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
                  ⚠️ <strong>Notice:</strong> This is a front-end simulation. No actual online payment has been processed.
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Return to Cafe
                </button>
              </div>
            ) : (
              /* Checkout Details Form */
              <div>
                <span className="section-badge" style={{ marginBottom: '0.5rem' }}>Demo Order</span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                  Complete Your Order
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Confirm your table and diner details.
                </p>

                <form onSubmit={handleCompleteDemoOrder}>
                  {/* Dining Option */}
                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['Dine-In', 'Takeaway'].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setCheckoutData({ ...checkoutData, diningOption: opt })}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '10px',
                            border: checkoutData.diningOption === opt ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                            backgroundColor: checkoutData.diningOption === opt ? 'rgba(23, 63, 53, 0.08)' : 'var(--color-white)',
                            fontWeight: 600,
                            color: 'var(--color-forest)',
                            cursor: 'pointer'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diner Name & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Diner Name *</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.customerName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })}
                        placeholder="e.g. Rahul"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Table / Spot</label>
                      <input
                        type="text"
                        value={checkoutData.tableNumber}
                        onChange={(e) => setCheckoutData({ ...checkoutData, tableNumber: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Kitchen Notes</label>
                    <input
                      type="text"
                      value={checkoutData.specialInstructions}
                      onChange={(e) => setCheckoutData({ ...checkoutData, specialInstructions: e.target.value })}
                      placeholder="e.g. Less sugar, oat milk, extra napkins..."
                      className="form-control"
                    />
                  </div>

                  {/* Payment simulation picker */}
                  <div className="form-group">
                    <label className="form-label">Simulated Payment Method</label>
                    <select className="form-control" defaultValue="upi">
                      <option value="upi">UPI / QR Scan at Counter (Demo)</option>
                      <option value="card">Credit / Debit Card (Demo)</option>
                      <option value="cash">Cash on Tray Delivery (Demo)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-terracotta btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Place Demo Order ({currencySymbol}{finalPayable})
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
