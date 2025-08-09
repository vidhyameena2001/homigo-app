import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingFormConfig from './config/bookingFormConfig';

const BookingPage = ({ services }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const service = services.find((s) => s.id.toString() === id);
  const config = bookingFormConfig[service?.id] || {};

  // Initialize equipment with all options checked by default
  const initialEquipment = config.equipments?.reduce((acc, eq) => {
    acc[eq.name] = true;
    return acc;
  }, {}) || {};

  const [form, setForm] = useState({
    address: '',
    date: '',
    fromTime: '',
    toTime: '',
    option: '',
    equipment: initialEquipment,
    extra: {},
    rooms: '', // New field for number of rooms
    sqft: '',  // New field for square footage
  });

  const [errors, setErrors] = useState({});

  if (!service) return <p>Service not found.</p>;

  // Check if the service is a home cleaning service
  const isHomeCleaning = [101, 102, 103, 104, 105, 106, 108].includes(Number(id));

  // Function to parse price and remove currency or "/month"
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === null || priceStr === undefined) return 0;
    const strValue = String(priceStr);
    const cleanedPrice = strValue.replace(/[^0-9.]/g, '');
    return parseFloat(cleanedPrice) || 0;
  };

  // Calculate duration in hours between fromTime and toTime
  const calculateDuration = () => {
    if (!form.fromTime || !form.toTime) return 0;
    const from = new Date(`1970-01-01T${form.fromTime}:00`);
    const to = new Date(`1970-01-01T${form.toTime}:00`);
    if (to <= from) return 0;
    const diffMs = to - from;
    return diffMs / (1000 * 60 * 60);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = parsePrice(service.price); // Base price

    // Adjust price based on service options
    if (form.option && config.serviceOptions?.length > 0) {
      const optionMultipliers = {
        'Full Home': 1.5,
        'Deep Clean': 1.2,
        'Both': 1.8,
      };
      const multiplier = optionMultipliers[form.option] || 1;
      total *= multiplier;
    }

    // Adjust price based on duration (₹500 per hour)
    const duration = calculateDuration();
    if (duration > 0) {
      const hourlyRate = 500;
      total += duration * hourlyRate;
    }

    // Adjust price for home cleaning services based on rooms and sqft
    if (isHomeCleaning) {
      const rooms = parseInt(form.rooms) || 0;
      const sqft = parseFloat(form.sqft) || 0;

      // Add ₹500 per room beyond 2 rooms
      if (rooms > 2) {
        total += (rooms - 2) * 500;
      }

      // Add ₹1 per sqft for areas above 500 sqft
      if (sqft > 500) {
        total += (sqft - 500) * 1;
      }
    }

    return total.toFixed(2);
  };

  // Validate form inputs
  const validateForm = () => {
    const errs = {};
    if (!form.address.trim()) {
      errs.address = 'Address is required';
    }
    if (!form.date) {
      errs.date = 'Date is required';
    }
    if (!form.fromTime) {
      errs.fromTime = 'From time is required';
    }
    if (!form.toTime) {
      errs.toTime = 'To time is required';
    } else if (form.fromTime && form.toTime) {
      const from = new Date(`1970-01-01T${form.fromTime}:00`);
      const to = new Date(`1970-01-01T${form.toTime}:00`);
      if (to <= from) {
        errs.toTime = 'To time must be after From time';
      }
    }
    if (isHomeCleaning) {
      if (!form.rooms || parseInt(form.rooms) <= 0) {
        errs.rooms = 'Number of rooms must be a positive number';
      }
      if (!form.sqft || parseFloat(form.sqft) <= 0) {
        errs.sqft = 'Square footage must be a positive number';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckbox = (equipment) => {
    setForm((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [equipment]: !prev.equipment[equipment],
      },
    }));
  };

  const handleExtraField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      extra: { ...prev.extra, [name]: value },
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert('Please correct the errors in the form.');
      return;
    }
    const totalPrice = calculateTotalPrice();
    alert(`Booking confirmed for ${service.name} with total amount ₹${totalPrice}`);
    console.log({ ...form, totalPrice });

    navigate('/payment', {
      state: {
        bookingDetails: {
          serviceName: service.name,
          form,
          totalPrice: `₹${totalPrice}`,
        },
      },
    });
  };

  return (
    <div className="booking">
      <div className="booking-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h2>Booking: {service.name}</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Address:</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          {errors.address && <div style={{ color: 'red', fontSize: '12px' }}>{errors.address}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Date:</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          {errors.date && <div style={{ color: 'red', fontSize: '12px' }}>{errors.date}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>From Time:</label>
            <input
              name="fromTime"
              type="time"
              value={form.fromTime}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
            {errors.fromTime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.fromTime}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label>To Time:</label>
            <input
              name="toTime"
              type="time"
              value={form.toTime}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
            {errors.toTime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.toTime}</div>}
          </div>
        </div>

        {isHomeCleaning && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Number of Rooms:</label>
              <input
                type="number"
                name="rooms"
                value={form.rooms}
                onChange={handleChange}
                min="1"
                style={{ width: '100%' }}
                placeholder="e.g., 3"
              />
              {errors.rooms && <div style={{ color: 'red', fontSize: '12px' }}>{errors.rooms}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Square Footage (sqft):</label>
              <input
                type="number"
                name="sqft"
                value={form.sqft}
                onChange={handleChange}
                min="1"
                step="0.01"
                style={{ width: '100%' }}
                placeholder="e.g., 1000"
              />
              {errors.sqft && <div style={{ color: 'red', fontSize: '12px' }}>{errors.sqft}</div>}
            </div>
          </>
        )}

        {config.serviceOptions?.length > 0 && (
          <>
            <h4>Service Options:</h4>
            {config.serviceOptions.map((opt) => (
              <label key={opt} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  onChange={handleChange}
                  checked={form.option === opt}
                />
                {opt}
              </label>
            ))}
          </>
        )}

        {config.equipments?.length > 0 && (
          <>
            <h4>Required Equipment:</h4>
            {config.equipments.map((eq) => (
              <label key={eq.name} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={!!form.equipment[eq.name]}
                  onChange={() => handleCheckbox(eq.name)}
                />
                {eq.name}
              </label>
            ))}
          </>
        )}

        {config.extraFields?.length > 0 && (
          <>
            <h4>Extra Details:</h4>
            {config.extraFields.map((field) => {
              if (field.type === 'radio') {
                return (
                  <div key={field.name} style={{ marginBottom: '15px' }}>
                    <p>{field.label}:</p>
                    {field.options.map((opt) => (
                      <label key={opt} style={{ display: 'block', marginBottom: '5px' }}>
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          onChange={handleExtraField}
                          checked={form.extra[field.name] === opt}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );
              }
              return (
                <div key={field.name} style={{ marginBottom: '15px' }}>
                  <label>{field.label}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    onChange={handleExtraField}
                    value={form.extra[field.name] || ''}
                    style={{ width: '100%' }}
                  />
                </div>
              );
            })}
          </>
        )}

        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Total Price: ₹{calculateTotalPrice()}
        </div>

        <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingPage;