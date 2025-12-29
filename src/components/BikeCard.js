import { useState } from 'react';

const BikeCard = ({ bike, onAddToCart, onViewDetails, onToggleWishlist, isInWishlist }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: isHovered ? '0 20px 40px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ position: 'relative', overflow: 'hidden', height: '280px', background: 'rgba(15, 23, 42, 0.5)' }}>
                <img
                    src={bike.image}
                    alt={bike.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(bike);
                    }}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(30, 41, 59, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        color: isInWishlist ? '#ec4899' : '#94a3b8'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'rgba(30, 41, 59, 1)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    {isInWishlist ? '♥' : '♡'}
                </button>
            </div>
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#f1f5f9',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.3'
                    }}>
                        {bike.name}
                    </h3>
                    <div style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: '#a78bfa',
                        letterSpacing: '-0.02em'
                    }}>
                        ${bike.price}
                    </div>
                </div>
                <p style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {bike.description}
                </p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        background: 'rgba(139, 92, 246, 0.2)',
                        color: '#c4b5fd',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                        <span>⚡</span> {bike.range} km
                    </div>
                    <div style={{
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#a5b4fc',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}>
                        <span>🚀</span> {bike.maxSpeed} km/h
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => onViewDetails(bike)}
                        style={{
                            flex: 1,
                            background: 'rgba(30, 41, 59, 0.6)',
                            color: '#cbd5e1',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                            e.currentTarget.style.color = '#e9d5ff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                            e.currentTarget.style.color = '#cbd5e1';
                        }}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => onAddToCart(bike)}
                        style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;
