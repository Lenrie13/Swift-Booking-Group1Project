import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onSubmit, deals = [] }) => { // Default deals to an empty array
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
    age: '',
    email: '',
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

    // Check if deals array is not empty and find the selected deal
    const selectedDeal = deals.length > 0
      ? deals.find((deal) => deal.roomType === selectedRoomType)
      : null;

    // Apply discount if there's a deal, otherwise set price to 0
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
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
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
          <option value="suite">Luxury Suite</option>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
