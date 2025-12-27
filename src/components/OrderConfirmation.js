import React from 'react';

const OrderConfirmation = ({ orderDetails, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1002,
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        textAlign: 'center',
        padding: '48px 32px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '3rem'
        }}>
          ✓
        </div>

        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px'
        }}>
          Order Confirmed!
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: '#718096',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Thank you for your purchase, <strong>{orderDetails.name}</strong>!<br />
          Your order has been successfully placed.
        </p>

        <div style={{
          background: '#f7fafc',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '16px'
          }}>
            Order Details
          </h3>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#718096' }}>Order Number:</span>
            <span style={{ fontWeight: 'bold', color: '#2d3748', marginLeft: '8px' }}>
              #{orderDetails.orderNumber}
            </span>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#718096' }}>Email:</span>
            <span style={{ fontWeight: '600', color: '#2d3748', marginLeft: '8px' }}>
              {orderDetails.email}
            </span>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#718096' }}>Phone:</span>
            <span style={{ fontWeight: '600', color: '#2d3748', marginLeft: '8px' }}>
              {orderDetails.phone}
            </span>
          </div>
          <div>
            <span style={{ color: '#718096' }}>Shipping Address:</span>
            <span style={{ fontWeight: '600', color: '#2d3748', marginLeft: '8px' }}>
              {orderDetails.address}, {orderDetails.city}, {orderDetails.zipCode}
            </span>
          </div>
        </div>

        {/* Order Items List */}
        <div style={{
          background: '#f7fafc',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '16px'
          }}>
            Ordered Items
          </h3>
          {orderDetails.items && orderDetails.items.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontWeight: 'bold',
                  color: '#2d3748',
                  fontSize: '1.1rem',
                  marginBottom: '4px'
                }}>
                  {item.name}
                </h4>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                  Quantity: {item.quantity} × ${item.price}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    ⚡ {item.range} km
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    🚀 {item.maxSpeed} km/h
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
 
          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #cbd5e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#2d3748'
            }}>
              Total Amount:
            </span>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ${orderDetails.total}
            </span>
          </div>
        </div>

        <p style={{
          fontSize: '0.95rem',
          color: '#a0aec0',
          marginBottom: '24px'
        }}>
          A confirmation email has been sent to <strong>{orderDetails.email}</strong>
        </p>

        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 48px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
