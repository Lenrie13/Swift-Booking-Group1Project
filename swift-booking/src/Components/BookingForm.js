import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = ({ onSubmit, deals = [] }) => {
  const location = useLocation();
  const {
    arrivalDate,
    departureDate,
    guests,
    numberOfNights,
    name: locationName,
    age: locationAge,
    address,
    idNumber: locationIdNumber,
    email: locationEmail,
    phoneNumber: locationPhoneNumber,
  } = location.state || {};

  const [formData, setFormData] = useState({
    name: locationName || '',
    idNumber: locationIdNumber || '',
    phoneNumber: locationPhoneNumber || '',
    age: locationAge || '',
    email: locationEmail || '',
    roomType: '',
    additionalServices: '',
    totalCost: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoomTypeChange = (e) => {
    const selectedRoomType = e.target.value;
  
    const selectedDeal = deals.length > 0
      ? deals.find((deal) => deal.roomType === selectedRoomType)
      : null;
  
    const discountedPrice = selectedDeal
      ? selectedDeal.price - (selectedDeal.price * selectedDeal.discountPercentage / 100)
      : 0;
  
    setFormData({
      ...formData,
      roomType: selectedRoomType,
      totalCost: discountedPrice,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <div className="booking-form">
      <h2>Booking Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="arrivalDate">Arrival Date:</label>
          <input
            type="text"
            id="arrivalDate"
            value={arrivalDate ? arrivalDate.toDateString() : ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="text"
            id="departureDate"
            value={departureDate ? departureDate.toDateString() : ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="text"
            id="guests"
            value={guests || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfNights">Number of Nights:</label>
          <input
            type="text"
            id="numberOfNights"
            value={numberOfNights || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="ID Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomType">Room Type:</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleRoomTypeChange}
            required
          >
            <option value="">Select Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="deluxe">Deluxe Room</option>
            <option value="luxury">Luxury Suite</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="additionalServices">Additional Services:</label>
          <input
            type="text"
            id="additionalServices"
            name="additionalServices"
            value={formData.additionalServices}
            onChange={handleChange}
            placeholder="Additional Services"
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCost">Total Cost:</label>
          <input
            type="text"
            id="totalCost"
            name="totalCost"
            value={formData.totalCost}
            readOnly
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
