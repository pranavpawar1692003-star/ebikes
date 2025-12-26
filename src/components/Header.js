import React from 'react';

const Header = ({ cartCount, onCartClick, onOrderHistoryClick, onWishlistClick, wishlistCount, onDashboardClick }) => {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'clamp(12px, 3vw, 20px)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 14px)' }}>
          <div style={{
            width: 'clamp(36px, 8vw, 44px)',
            height: 'clamp(36px, 8vw, 44px)',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
            fontWeight: '700',
            color: '#f1f5f9',
            letterSpacing: '-0.02em'
          }}>
            VOLTRIDE
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={onWishlistClick}
            style={{
              background: wishlistCount > 0 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(30, 41, 59, 0.6)',
              color: wishlistCount > 0 ? '#ec4899' : '#cbd5e1',
              padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)';
              e.currentTarget.style.color = '#ec4899';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = wishlistCount > 0 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(30, 41, 59, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.color = wishlistCount > 0 ? '#ec4899' : '#cbd5e1';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>♡</span>
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </button>
          <button
            onClick={onDashboardClick}
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              color: '#cbd5e1',
              padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.color = '#a78bfa';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>📊</span>
            Dashboard
          </button>
          <button
            onClick={onOrderHistoryClick}
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              color: '#cbd5e1',
              padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.color = '#a78bfa';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
          >
            Orders
          </button>
          <button
            onClick={onCartClick}
            style={{
              position: 'relative',
              background: cartCount > 0 ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              padding: 'clamp(8px, 2vw, 10px) clamp(18px, 4vw, 24px)',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🛒</span>
            Cart
            {cartCount > 0 && (
              <span style={{
                background: 'rgba(255, 255, 255, 0.25)',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                fontWeight: '700'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
