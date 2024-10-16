import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import './LandingPageBody.css';
import Deals from './Deals';
import ContactInfo from './ContactInfo';
import AboutUs from './AboutUs';

// Room data based on your previous room details
const roomDetails = {
  1: {
    name: 'Deluxe Room',
    price: 150,
    features: [
      'Breath-taking ocean views',
      'Private balcony',
      'Free WiFi',
      'Air conditioning',
      'Room service available',
      'King-sized bed',
      'Complimentary breakfast',
    ],
  },
  2: {
    name: 'Double Room',
    price: 100,
    features: [
      'Spacious interiors',
      'Modern decor',
      'Free WiFi',
      'Mini fridge',
      'Two queen-sized beds',
      'Ideal for families or friends',
      'Access to pool and gym',
    ],
  },
  3: {
    name: 'Luxury Room',
    price: 250,
    features: [
      'Premium furnishings',
      'Top-notch amenities',
      'Private jacuzzi',
      'Free WiFi',
      'Exceptional room service',
      'Oceanfront view',
      'Complimentary spa access',
    ],
  },
  4: {
    name: 'Single Room',
    price: 80,
    features: [
      'Cozy and comfortable',
      'Designed for solo travelers',
      'Free WiFi',
      'Mini bar',
      'Affordable rate',
      'Work desk available',
      'Access to hotel facilities',
    ],
  },
};

function LandingPageBody({ setIsAuthenticated, setSignedInUser }) {
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [hotels, setHotels] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Placeholder for additional user details
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:3000/hotels');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const calculateNumberOfNights = (arrivalDate, departureDate) => {
    if (!arrivalDate || !departureDate) return 0;
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const differenceInTime = departure.getTime() - arrival.getTime();
    return differenceInTime / (1000 * 3600 * 24); // Converts time difference from milliseconds to days
  };

  const handleBookNowClick = () => {
    if (arrivalDate && departureDate && guests) {
      const numberOfNights = calculateNumberOfNights(arrivalDate, departureDate);
      navigate('/book-now', { state: { arrivalDate, departureDate, numberOfNights, guests } });
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleGuestsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setGuests(value);
    }
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    setShowAbout(false);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
    setShowContactInfo(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setSignedInUser(undefined);
    navigate('/');
  };

  return (
    <div className="landing-page-body">
      <div className="landing-page-image-container">
        <img
          src={require('../assets/SwiftBookingImages/landing-page-image.webp')}
          alt="Landing Page"
          className="page-image"
        />
        {!showBookingForm && (
          <div className="booking-buttons">
            <div className="date-picker-container">
              <DatePicker
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
                placeholderText="Arrival"
                minDate={new Date()}
                customInput={
                  <button className="arrival-button">
                    Arrival <span className="calendar-icon">📅</span>
                  </button>
                }
              />
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                placeholderText="Departure"
                minDate={arrivalDate ? addDays(arrivalDate, 1) : new Date()}
                customInput={
                  <button className="departure-button">
                    Departure <span className="calendar-icon">📅</span>
                  </button>
                }
              />
            </div>
            <div className="guests-container">
              <button className="guests-button">
                Guests: {guests} <span className="guests-icon">👥</span>
              </button>
              <input
                type="number"
                value={guests}
                onChange={handleGuestsChange}
                className="guests-input"
                min="1"
              />
            </div>
            <button className="book-now" onClick={handleBookNowClick}>BOOK NOW!</button>
          </div>
        )}
        {showBookingForm && (
          <div className="additional-booking-form">
            <h2>Additional Booking Details</h2>
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
                  value={calculateNumberOfNights(arrivalDate, departureDate) || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="hotel">Select Hotel:</label>
                <select
                  id="hotel"
                  value={selectedHotel}
                  onChange={(e) => setSelectedHotel(e.target.value)}
                >
                  <option value="">Select Hotel</option>
                  {hotels.map(hotel => (
                    <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="room">Select Room Type:</label>
                <select
                  id="room"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  disabled={!selectedHotel}
                >
                  <option value="">Select Room Type</option>
                  {selectedHotel && hotels.find(hotel => hotel.id === selectedHotel)?.rooms.map(room => (
                    <option key={room.type} value={room.type}>{room.type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="roomDetails">Room Details:</label>
                <textarea
                  id="roomDetails"
                  value={selectedRoom ? `${roomDetails[selectedRoom]?.name}\nPrice: $${roomDetails[selectedRoom]?.price}\nFeatures:\n${roomDetails[selectedRoom]?.features.join(', ')}` : 'Please select a room'}
                  readOnly
                  rows={5}
                  className="w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="idNumber">ID Number:</label>
                <input
                  type="text"
                  id="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amountPayable">Amount Payable:</label>
                <input
                  type="text"
                  id="amountPayable"
                  value={
                    selectedHotel && selectedRoom
                      ? `${
                          (hotels.find(hotel => hotel.id === selectedHotel)?.rooms.find(room => room.type === selectedRoom)?.price || 0) * calculateNumberOfNights(arrivalDate, departureDate) * guests
                        }`
                      : 'Please select hotel and room type'
                  }
                  readOnly
                />
              </div>
              <button className="booking-form-submit-button" type="submit">Confirm Booking</button>
            </form>
          </div>
        )}
      </div>
      <Deals />
      
      
      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Swift Booking. All rights reserved.</p>
          <p>Follow us on:
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> |
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPageBody;