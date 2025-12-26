import React from 'react';

const BikeDetails = ({ bike, onClose, onAddToCart }) => {
  if (!bike) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(16px, 3vw, 24px)',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)',
        borderRadius: 'clamp(20px, 4vw, 28px)',
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        animation: 'slideUp 0.3s ease'
      }}>
        <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: '700',
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              {bike.name}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                transition: 'all 0.2s ease'
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
          <img
            src={bike.image}
            alt={bike.name}
            style={{
              width: '100%',
              height: 'clamp(240px, 40vw, 340px)',
              objectFit: 'cover',
              borderRadius: '18px',
              marginBottom: '24px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}
          />
          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight: '1.6',
            marginBottom: '28px'
          }}>
            {bike.description}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: 'clamp(12px, 3vw, 14px)',
            marginBottom: 'clamp(24px, 4vw, 32px)'
          }}>
            <div style={{
              background: 'rgba(139, 92, 246, 0.15)',
              padding: 'clamp(18px, 4vw, 22px)',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '500' }}>Price</p>
              <p style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: '700', color: '#a78bfa' }}>${bike.price}</p>
            </div>
            <div style={{
              background: 'rgba(99, 102, 241, 0.15)',
              padding: 'clamp(18px, 4vw, 22px)',
              borderRadius: '16px',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '500' }}>Range</p>
              <p style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: '700', color: '#a5b4fc' }}>{bike.range} km</p>
            </div>
            <div style={{
              background: 'rgba(236, 72, 153, 0.15)',
              padding: 'clamp(18px, 4vw, 22px)',
              borderRadius: '16px',
              border: '1px solid rgba(236, 72, 153, 0.3)'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '500' }}>Max Speed</p>
              <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.7rem)', fontWeight: '700', color: '#f9a8d4' }}>{bike.maxSpeed} km/h</p>
            </div>
            <div style={{
              background: 'rgba(34, 211, 238, 0.15)',
              padding: 'clamp(18px, 4vw, 22px)',
              borderRadius: '16px',
              border: '1px solid rgba(34, 211, 238, 0.3)'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '500' }}>Battery</p>
              <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.7rem)', fontWeight: '700', color: '#67e8f9' }}>{bike.battery}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onAddToCart(bike);
              onClose();
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: 'white',
              padding: 'clamp(14px, 3vw, 18px)',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
