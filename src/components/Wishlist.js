import React from 'react';

const Wishlist = ({ wishlistItems, onClose, onRemoveFromWishlist, onAddToCart }) => {
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
            zIndex: 1000
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
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            ❤️ My Wishlist
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

                    {wishlistItems.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#a0aec0'
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>❤️</div>
                            <p style={{ fontSize: '1.2rem' }}>Your wishlist is empty</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
                            gap: 'clamp(16px, 3vw, 20px)'
                        }}>
                            {wishlistItems.map((bike) => (
                                <div key={bike.id} style={{
                                    background: '#f7fafc',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <button
                                        onClick={() => onRemoveFromWishlist(bike.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            border: 'none',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 10,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        ❤️
                                    </button>
                                    <img
                                        src={bike.image}
                                        alt={bike.name}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{ padding: '16px' }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            color: '#2d3748',
                                            marginBottom: '8px'
                                        }}>
                                            {bike.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '1.3rem',
                                            fontWeight: 'bold',
                                            color: '#667eea',
                                            marginBottom: '12px'
                                        }}>
                                            ${bike.price}
                                        </p>
                                        <button
                                            onClick={() => {
                                                onAddToCart(bike);
                                                onRemoveFromWishlist(bike.id);
                                            }}
                                            style={{
                                                width: '100%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                transition: 'transform 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
