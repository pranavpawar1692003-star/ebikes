import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onClose, onProceedToCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(12px, 3vw, 20px)',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)',
        borderRadius: 'clamp(16px, 4vw, 24px)',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.4)',
        border: '1px solid rgba(139, 92, 246, 0.2)'
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
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🛒 Shopping Cart
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                fontSize: '2rem',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                    paddingBottom: '20px',
                    marginBottom: '20px'
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontWeight: 'bold',
                        color: '#f1f5f9',
                        fontSize: '1.1rem',
                        marginBottom: '12px'
                      }}>
                        {item.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            color: 'white',
                            border: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.6)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.4)';
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#f1f5f9',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            color: 'white',
                            border: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.6)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.4)';
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '8px'
                      }}>
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f87171',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#f87171'}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '2px solid rgba(139, 92, 246, 0.3)',
                paddingTop: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <span style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#cbd5e1'
                  }}>
                    Total:
                  </span>
                  <span style={{
                    fontSize: '2.2rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onProceedToCheckout}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: 'white',
                    padding: '18px',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.5)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 92, 246, 0.7)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
                  }}
                >
                  💳 Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
