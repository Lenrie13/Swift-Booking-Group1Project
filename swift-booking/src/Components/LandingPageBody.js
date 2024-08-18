import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import './LandingPageBody.css';
import Deals from './Deals';
import ContactInfo from './ContactInfo';
import AboutUs from './AboutUs';

function LandingPageBody({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [hotels, setHotels] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showGuestsInput, setShowGuestsInput] = useState(false);
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

  const calculateNumberOfNights = () => {
    return departureDate && arrivalDate ? 
      Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24)) : 0;
  };

  const handleBookNowClick = () => {
    if (arrivalDate && departureDate && guests) {
      setShowBookingForm(true);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
  };

  const handleGuestsButtonClick = () => {
    setShowGuestsInput(!showGuestsInput);
  };

  const handleConfirmBooking = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const bookingData = {
      arrivalDate,
      departureDate,
      guests,
      selectedHotel,
      selectedRoom,
      name,
      age,
      address,
      idNumber,
      email,
      phoneNumber,
      amountPayable: selectedHotel && selectedRoom
        ? `${
            (hotels.find(hotel => hotel.id === selectedHotel)?.rooms.find(room => room.type === selectedRoom)?.price || 0) * calculateNumberOfNights() * guests
          }`
        : 'Please select hotel and room type'
    };
  
    try {
      // Post booking data to the server
      await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      // Clear form fields after successful booking
      setArrivalDate(null);
      setDepartureDate(null);
      setGuests(1);
      setSelectedHotel('');
      setSelectedRoom('');
      setName('');
      setAge('');
      setAddress('');
      setIdNumber('');
      setEmail('');
      setPhoneNumber('');
  
      // Optionally hide the booking form
      setShowBookingForm(false);
  
      alert('Booking confirmed successfully!');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('There was an error confirming your booking. Please try again.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
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
          <div className="booking-form">
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
              <button className="guests-button" onClick={handleGuestsButtonClick}>
                {guests} Guests
              </button>
              {showGuestsInput && (
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="guests-input"
                />
              )}
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
                  value={calculateNumberOfNights() || ''}
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
                  type="text"
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
                  value={selectedHotel && selectedRoom
                    ? `${
                        (hotels.find(hotel => hotel.id === selectedHotel)?.rooms.find(room => room.type === selectedRoom)?.price || 0) * calculateNumberOfNights() * guests
                      }`
                    : 'Please select hotel and room type'}
                  readOnly
                />
              </div>
              <button onClick={handleConfirmBooking}>Confirm Booking</button>
            </form>
          </div>
        )}
        <button className="contact-button" onClick={handleContactClick}>
          {showContactInfo ? 'Hide Contact Info' : 'Show Contact Info'}
        </button>
        {showContactInfo && <ContactInfo />}
        <button className="about-button" onClick={handleAboutClick}>
          {showAbout ? 'Hide About Us' : 'Show About Us'}
        </button>
        {showAbout && <AboutUs />}
      </div>
    </div>
  );
}

export default LandingPageBody;
