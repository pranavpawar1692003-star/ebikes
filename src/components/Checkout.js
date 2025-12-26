import React, { useState } from 'react';

const Checkout = ({ cartItems, onClose, onConfirmOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1; // 10% tax
  const shipping = 50; // Fixed shipping
  const grandTotal = total + tax + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmOrder(formData, grandTotal, cartItems);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(12px, 3vw, 20px)',
      zIndex: 1001
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'clamp(16px, 4vw, 24px)',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
      }}>
        <div style={{ padding: 'clamp(20px, 5vw, 32px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              💳 Checkout
            </h2>
            <button
              onClick={onClose}
              style={{
                background: '#f7fafc',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#718096',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.color = '#2d3748';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f7fafc';
                e.currentTarget.style.color = '#718096';
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
            gap: 'clamp(20px, 5vw, 32px)'
          }}>
            {/* Order Summary */}
            <div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '16px'
              }}>
                Order Summary
              </h3>
              <div style={{
                background: '#f7fafc',
                borderRadius: '16px',
                padding: '20px'
              }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#2d3748' }}>{item.name}</p>
                      <p style={{ fontSize: '0.9rem', color: '#718096' }}>Qty: {item.quantity}</p>
                    </div>
                    <p style={{ fontWeight: 'bold', color: '#667eea' }}>
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #cbd5e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#718096' }}>Subtotal:</span>
                    <span style={{ fontWeight: '600' }}>₹{total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#718096' }}>Tax (10%):</span>
                    <span style={{ fontWeight: '600' }}>₹{tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: '#718096' }}>Shipping:</span>
                    <span style={{ fontWeight: '600' }}>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '2px solid #cbd5e0'
                  }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2d3748' }}>Total:</span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '16px'
              }}>
                Shipping Information
              </h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      fontSize: '1rem',
                      transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      fontSize: '1rem',
                      transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      fontSize: '1rem',
                      transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '600',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      fontSize: '1rem',
                      transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? '1fr' : '1fr 1fr', gap: 'clamp(10px, 2vw, 12px)', marginBottom: 'clamp(20px, 4vw, 24px)' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontWeight: '600',
                      color: '#4a5568',
                      fontSize: '0.9rem'
                    }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        fontSize: '1rem',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontWeight: '600',
                      color: '#4a5568',
                      fontSize: '0.9rem'
                    }}>
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        fontSize: '1rem',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 20px rgba(72, 187, 120, 0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(72, 187, 120, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(72, 187, 120, 0.4)';
                  }}
                >
                  ✓ Confirm Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
