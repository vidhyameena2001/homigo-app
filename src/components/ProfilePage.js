import React, { useEffect, useState } from 'react';

const ProfilePage = ({ isAuthenticated, userData, currentUserEmail, requestLogin, cancelOrder }) => {
  const [showCancelModal, setShowCancelModal] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      requestLogin('/profile');
    }
  }, [isAuthenticated, requestLogin]);

  if (!isAuthenticated) {
    return null; // Modal will be triggered by useEffect
  }

  const user = userData.find((u) => u.email === currentUserEmail);

  if (!user) {
    return <div className="profile-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>User not found</div>;
  }

  const orders = user.orders || [];

  // Helper to check if within 12 hours
  const isWithin12Hours = (timestamp) => {
    try {
      // Parse timestamp in format "9/8/2025, 4:31:09 am"
      const [datePart, timePart] = timestamp.split(', ');
      const [month, day, year] = datePart.split('/');
      const [time, period] = timePart.split(' ');
      let [hours, minutes, seconds] = time.split(':');
      hours = parseInt(hours);
      if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
      const bookingTime = new Date(year, month - 1, day, hours, minutes, seconds).getTime();
      const now = Date.now();
      const diffHours = (now - bookingTime) / (1000 * 60 * 60); // ms → hrs
      return diffHours <= 12;
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return false; // Don't show button if timestamp is invalid
    }
  };

  // Cancel handler
  const handleCancelClick = (orderId) => {
    setShowCancelModal(orderId);
  };

  const confirmCancel = (orderId) => {
    if (typeof cancelOrder === 'function') {
      cancelOrder(orderId); // Call the cancelOrder prop if it exists
      alert('Your booking has been cancelled.');
    } else {
      console.warn('cancelOrder is not a function. Please provide a valid cancelOrder function as a prop.');
      alert('Error: Unable to cancel booking. Please contact support.');
    }
    setShowCancelModal(null);
  };

  const closeModal = () => {
    setShowCancelModal(null);
  };

  return (
    <div className="profile-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>User Profile</h2>
      <div className="profile-details" style={{ marginBottom: '20px' }}>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone Number:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Service:</strong> {order.serviceName}</p>
              <p><strong>Date:</strong> {order.bookingDetails.date}</p>
              <p><strong>Time:</strong> {order.bookingDetails.fromTime} to {order.bookingDetails.toTime}</p>
              <p><strong>Address:</strong> {order.bookingDetails.address}</p>
              {order.bookingDetails.option && (
                <p><strong>Service Option:</strong> {order.bookingDetails.option}</p>
              )}
              {Object.keys(order.bookingDetails.equipment).length > 0 && (
                <p><strong>Equipment:</strong> {Object.keys(order.bookingDetails.equipment).filter((key) => order.bookingDetails.equipment[key]).join(', ')}</p>
              )}
              {order.bookingDetails.rooms && (
                <p><strong>Number of Rooms:</strong> {order.bookingDetails.rooms}</p>
              )}
              {order.bookingDetails.sqft && (
                <p><strong>Square Footage:</strong> {order.bookingDetails.sqft} sqft</p>
              )}
              {Object.keys(order.bookingDetails.extra).length > 0 && (
                <p><strong>Extra Details:</strong> {JSON.stringify(order.bookingDetails.extra)}</p>
              )}
              <p><strong>Total Price:</strong> {order.totalPrice}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered On:</strong> {new Date(order.timestamp).toLocaleString()}</p>
              {isWithin12Hours(order.timestamp) && order.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancelClick(order.orderId)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showCancelModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ marginBottom: '15px' }}>Confirm Cancellation</h3>
            <p style={{ marginBottom: '15px' }}>Are you sure you want to cancel order #{showCancelModal}?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={closeModal}
                style={{ padding: '8px 16px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                No, Keep Order
              </button>
              <button
                onClick={() => confirmCancel(showCancelModal)}
                style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;