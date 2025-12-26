import React from 'react';

const OrderHistory = ({ orders, onClose, onCancelOrder }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(16px, 3vw, 24px)',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'clamp(20px, 4vw, 28px)',
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '28px'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: '700',
              color: '#0a0a0a',
              letterSpacing: '-0.02em'
            }}>
              Order History
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ×
            </button>
          </div>

          {orders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#9ca3af'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.3 }}>📦</div>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151' }}>No orders yet</p>
              <p style={{ fontSize: '0.95rem', color: '#9ca3af', marginTop: '8px' }}>
                Start shopping to see your orders here!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {orders.map((order, index) => (
                <div key={index} style={{
                  background: order.status === 'cancelled' ? '#fef2f2' : '#fafafa',
                  borderRadius: '18px',
                  padding: '24px',
                  border: order.status === 'cancelled' ? '1px solid #fecaca' : '1px solid rgba(0, 0, 0, 0.06)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em'
                      }}>
                        Order #{order.orderNumber}
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '1.6rem',
                        fontWeight: '700',
                        color: order.status === 'cancelled' ? '#ef4444' : '#10b981',
                        marginBottom: '8px',
                        letterSpacing: '-0.02em'
                      }}>
                        ${order.total}
                      </p>
                      <span style={{
                        background: order.status === 'cancelled'
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {order.status === 'cancelled' ? '✕ Cancelled' : '✓ Completed'}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px'
                    }}>
                      Customer Details
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 'repeat(2, 1fr)',
                      gap: 'clamp(8px, 2vw, 12px)',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                    }}>
                      <div>
                        <span style={{ color: '#6b7280' }}>Name: </span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>{order.name}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Email: </span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>{order.email}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Phone: </span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>{order.phone}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Address: </span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>
                          {order.city}, {order.zipCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: order.status !== 'cancelled' ? '16px' : '0' }}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px'
                    }}>
                      Items Ordered ({order.items.length})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {order.items.map((item) => (
                        <div key={item.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'white',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                              background: '#f3f4f6'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontWeight: '600',
                              color: '#111827',
                              fontSize: '0.95rem',
                              marginBottom: '4px'
                            }}>
                              {item.name}
                            </p>
                            <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                              Qty: {item.quantity} × ${item.price}
                            </p>
                          </div>
                          <p style={{
                            fontWeight: '700',
                            color: '#10b981',
                            fontSize: '1.05rem'
                          }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          onCancelOrder(order.id);
                        }
                      }}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        color: '#ef4444',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid #ef4444',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        marginTop: '16px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#ef4444';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#ef4444';
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default OrderHistory;
