import React from 'react';
import { useLocation } from 'react-router-dom';

function BookingForm() {
  const location = useLocation();
  const {
    arrivalDate,
    departureDate,
    guests,
    numberOfNights,
    name,
    age,
    address,
    idNumber,
    email,
    phoneNumber,
  } = location.state || {};

  return (
    <div className="booking-form">
      <h2>Booking Details</h2>
      <form>
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
            value={name || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber || ''}
            readOnly
          />
        </div>
        <button onSubmit type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
