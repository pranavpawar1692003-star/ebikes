import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onFilterChange, selectedFilter }) => {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: 'clamp(14px, 3vw, 18px)',
      padding: 'clamp(14px, 3vw, 20px)',
      marginBottom: 'clamp(28px, 5vw, 40px)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr',
        gap: 'clamp(12px, 3vw, 14px)',
        alignItems: 'center'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.1rem',
            color: '#94a3b8'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search bikes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: 'clamp(11px, 2.5vw, 14px) clamp(11px, 2.5vw, 14px) clamp(11px, 2.5vw, 14px) clamp(44px, 9vw, 50px)',
              borderRadius: 'clamp(10px, 2vw, 12px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
              transition: 'all 0.2s ease',
              outline: 'none',
              color: '#f1f5f9',
              background: 'rgba(15, 23, 42, 0.5)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          style={{
            padding: 'clamp(11px, 2.5vw, 14px) clamp(14px, 3vw, 16px)',
            borderRadius: 'clamp(10px, 2vw, 12px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
            background: 'rgba(15, 23, 42, 0.5)',
            cursor: 'pointer',
            fontWeight: '500',
            color: '#cbd5e1',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#8b5cf6';
            e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="all">All Bikes</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="range-high">Range: High to Low</option>
          <option value="speed-high">Speed: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
