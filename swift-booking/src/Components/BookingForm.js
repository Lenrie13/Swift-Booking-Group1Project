import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
    age: '',
    email: '',
    roomType: '',
    additionalServices: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          onChange={handleChange}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
