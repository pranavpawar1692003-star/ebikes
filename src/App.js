
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BikeCard from './components/BikeCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import BikeDetails from './components/BikeDetails';
import OrderHistory from './components/OrderHistory';
import Wishlist from './components/Wishlist';
import Notification from './components/Notification';
import OrderConfirmation from './components/OrderConfirmation';
import Dashboard from './components/Dashboard';
import { bikes } from './data/bikes';
import { saveOrderToFirebase, getOrdersFromFirebase, deleteOrderFromFirebase } from './services/orderService';
import { addToWishlistFirebase, getWishlistFromFirebase, removeFromWishlistFirebase } from './services/wishlistService';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const result = await getWishlistFromFirebase();
        if (result.success) {
          setWishlistItems(result.wishlist);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    loadWishlist();
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const result = await getOrdersFromFirebase();
        if (result.success) {
          setOrders(result.orders);
        }
      } catch (error) {
        console.error('Error loading order history:', error);
      }
    };
    loadOrders();
  }, []);

  const filteredBikes = bikes.filter(bike => {
    return bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.description.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    switch (selectedFilter) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'range-high':
        return b.range - a.range;
      case 'speed-high':
        return b.maxSpeed - a.maxSpeed;
      default:
        return 0;
    }
  });

  const handleAddToCart = (bike) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === bike.id);
      if (existing) {
        return prev.map(item =>
          item.id === bike.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...bike, quantity: 1 }];
    });
    setNotification(`${bike.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleWishlist = async (bike) => {
    const isInWishlist = wishlistItems.some(item => item.id === bike.id);
    if (isInWishlist) {
      try {
        const result = await removeFromWishlistFirebase(bike.id);
        if (result.success) {
          setWishlistItems(prev => prev.filter(item => item.id !== bike.id));
          setNotification(`${bike.name} removed from wishlist!`);
        }
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        setNotification('Error removing from wishlist');
      }
    } else {
      try {
        const result = await addToWishlistFirebase(bike);
        if (result.success) {
          setWishlistItems(prev => [...prev, bike]);
          setNotification(`${bike.name} added to wishlist!`);
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        setNotification('Error adding to wishlist');
      }
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveFromWishlist = async (bikeId) => {
    try {
      const result = await removeFromWishlistFirebase(bikeId);
      if (result.success) {
        setWishlistItems(prev => prev.filter(item => item.id !== bikeId));
        setNotification('Item removed from wishlist!');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setNotification('Error removing from wishlist');
    }
  };

  const handleRemoveFromCart = (bikeId) => {
    setCartItems(prev => prev.filter(item => item.id !== bikeId));
    setNotification('Item removed from cart!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateQuantity = (bikeId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(bikeId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === bikeId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleConfirmOrder = async (orderInfo) => {
    try {
      const order = {
        ...orderInfo,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toISOString(),
        status: 'confirmed'
      };

      const result = await saveOrderToFirebase(order);
      if (result.success) {
        setOrderDetails(order);
        setCartItems([]);
        setShowCheckout(false);
        setShowOrderConfirmation(true);

        const ordersResult = await getOrdersFromFirebase();
        if (ordersResult.success) {
          setOrders(ordersResult.orders);
        }
      }
    } catch (error) {
      console.error('Error saving order:', error);
      setNotification('Error processing order');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleCloseOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setOrderDetails(null);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await deleteOrderFromFirebase(orderId);
      if (result.success) {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        setNotification('Order removed successfully!');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      setNotification('Error cancelling order');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }}>
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onOrderHistoryClick={() => setShowOrderHistory(true)}
        onWishlistClick={() => setShowWishlist(true)}
        wishlistCount={wishlistItems.length}
        onDashboardClick={() => setShowDashboard(true)}
      />

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 40px)'
      }}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setSelectedFilter}
          selectedFilter={selectedFilter}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(20px, 4vw, 28px)'
        }}>
          {filteredBikes.map(bike => (
            <BikeCard
              key={bike.id}
              bike={bike}
              onAddToCart={handleAddToCart}
              onViewDetails={setSelectedBike}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={wishlistItems.some(item => item.id === bike.id)}
            />
          ))}
        </div>

        {filteredBikes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.3 }}>🔍</div>
            <p style={{ fontSize: '1.3rem', fontWeight: '600', color: '#cbd5e1' }}>
              No bikes found
            </p>
            <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '8px' }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>

      {selectedBike && (
        <BikeDetails
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={() => setShowCart(false)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          onConfirmOrder={handleConfirmOrder}
        />
      )}

      {showOrderConfirmation && orderDetails && (
        <OrderConfirmation
          orderDetails={orderDetails}
          onClose={handleCloseOrderConfirmation}
        />
      )}

      {showOrderHistory && (
        <OrderHistory
          orders={orders}
          onClose={() => setShowOrderHistory(false)}
          onCancelOrder={handleCancelOrder}
        />
      )}

      {showWishlist && (
        <Wishlist
          wishlistItems={wishlistItems}
          onClose={() => setShowWishlist(false)}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      {showDashboard && (
        <Dashboard
          onClose={() => setShowDashboard(false)}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
