import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = ({ userData, setUserData, currentUserEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};
  const { serviceName, form, totalPrice, isHomeCleaning } = bookingDetails || {};

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null); // null, "processing", "success"

  // Validate payment form inputs
  const validate = () => {
    const errs = {};

    if (!paymentForm.cardName.trim()) {
      errs.cardName = 'Cardholder name is required';
    }

    if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s+/g, ''))) {
      errs.cardNumber = 'Card number must be 16 digits';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.expiry)) {
      errs.expiry = 'Expiry date must be in MM/YY format';
    } else {
      const [month, year] = paymentForm.expiry.split('/');
      const expiryDate = new Date(`20${year}`, month);
      const now = new Date();
      if (expiryDate < now) {
        errs.expiry = 'Card is expired';
      }
    }

    if (!/^\d{3}$/.test(paymentForm.cvv)) {
      errs.cvv = 'CVV must be 3 digits';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle input changes for payment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'cardNumber') {
      val = value.replace(/\D/g, '');
      val = val.match(/.{1,4}/g)?.join(' ').substr(0, 19) || '';
    }

    setPaymentForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  // Save order to userData
  const saveOrder = () => {
    const order = {
      orderId: Date.now().toString(), // Unique ID based on timestamp
      serviceName,
      bookingDetails: form,
      totalPrice,
      status: 'Confirmed',
      timestamp: new Date().toISOString(),
    };

    const updatedUserData = userData.map((user) =>
      user.email === currentUserEmail
        ? { ...user, orders: [...(user.orders || []), order] }
        : user
    );

    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setPaymentStatus('processing');
      setTimeout(() => {
        setPaymentStatus('success');
        saveOrder(); // Save order after successful payment
      }, 2000);
    }
  };

  // Navigate back to home after successful payment
  const handleFinish = () => {
    navigate('/', { replace: true });
  };

  if (!bookingDetails) return <p>No booking details found.</p>;

  return (
    <div className="payment-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Payment for {serviceName}</h2>

      {/* Display Booking Details */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Booking Details</h3>
        <p><strong>Address:</strong> {form.address}</p>
        <p><strong>Date:</strong> {form.date}</p>
        <p><strong>From Time:</strong> {form.fromTime}</p>
        <p><strong>To Time:</strong> {form.toTime}</p>
        {form.option && <p><strong>Service Option:</strong> {form.option}</p>}
        {Object.keys(form.equipment).length > 0 && (
          <p><strong>Equipment:</strong> {Object.keys(form.equipment).filter((key) => form.equipment[key]).join(', ')}</p>
        )}
        {Object.keys(form.extra).length > 0 && (
          <p><strong>Extra Details:</strong> {JSON.stringify(form.extra)}</p>
        )}
        {form.rooms && isHomeCleaning && <p><strong>Number of Rooms:</strong> {form.rooms}</p>}
        {form.sqft && isHomeCleaning && <p><strong>Square Footage:</strong> {form.sqft} sqft</p>}
        <h3>Total Amount: {totalPrice}</h3>
      </div>

      {/* Payment Form */}
      {paymentStatus === null && (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Cardholder Name:
              <input
                type="text"
                name="cardName"
                value={paymentForm.cardName}
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder="John Doe"
              />
            </label>
            {errors.cardName && (
              <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardName}</div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handleChange}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                style={{ width: '100%' }}
              />
            </label>
            {errors.cardNumber && (
              <div style={{ color: 'red', fontSize: '12px' }}>{errors.cardNumber}</div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label>
                Expiry Date (MM/YY):
                <input
                  type="text"
                  name="expiry"
                  value={paymentForm.expiry}
                  onChange={handleChange}
                  maxLength={5}
                  placeholder="MM/YY"
                  style={{ width: '100%' }}
                />
              </label>
              {errors.expiry && (
                <div style={{ color: 'red', fontSize: '12px' }}>{errors.expiry}</div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label>
                CVV:
                <input
                  type="password"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handleChange}
                  maxLength={3}
                  placeholder="123"
                  style={{ width: '100%' }}
                />
              </label>
              {errors.cvv && (
                <div style={{ color: 'red', fontSize: '12px' }}>{errors.cvv}</div>
              )}
            </div>
          </div>

          <p><strong>Amount to pay:</strong> {totalPrice}</p>

          <button type="submit" disabled={paymentStatus === 'processing'}>
            Pay Now
          </button>
        </form>
      )}

      {paymentStatus === 'processing' && <p>Processing payment...</p>}

      {paymentStatus === 'success' && (
        <>
          <p>Payment successful! Thank you for your booking.</p>
          <button onClick={handleFinish}>Finish</button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;