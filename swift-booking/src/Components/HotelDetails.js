import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HotelDetails.css';

// Import room images
import neptuneDeluxeRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/deluxe.jpeg';
import neptuneDoubleRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/double.jpeg';
import neptuneLuxuryRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/luxury.jpeg';
import neptuneSingleRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/single.jpg';

// Sample room data with detailed features
const roomData = {
  1: {
    name: 'Deluxe Room',
    image: neptuneDeluxeRoom,
    features: [
      'Breath-taking ocean views',
      'Private balcony',
      'Free WiFi',
      'Air conditioning',
      'Room service available',
      'King-sized bed',
      'Complimentary breakfast',
    ],
    price: 150,
  },
  2: {
    name: 'Double Room',
    image: neptuneDoubleRoom,
    features: [
      'Spacious interiors',
      'Modern decor',
      'Free WiFi',
      'Mini fridge',
      'Two queen-sized beds',
      'Ideal for families or friends',
      'Access to pool and gym',
    ],
    price: 100,
  },
  3: {
    name: 'Luxury Suite',
    image: neptuneLuxuryRoom,
    features: [
      'Premium furnishings',
      'Top-notch amenities',
      'Private jacuzzi',
      'Free WiFi',
      'Exceptional room service',
      'Oceanfront view',
      'Complimentary spa access',
    ],
    price: 250,
  },
  4: {
    name: 'Single Room',
    image: neptuneSingleRoom,
    features: [
      'Cozy and comfortable',
      'Designed for solo travelers',
      'Free WiFi',
      'Mini bar',
      'Affordable rate',
      'Work desk available',
      'Access to hotel facilities',
    ],
    price: 80,
  },
};

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedRoom = roomData[id];

  // State for booking details - defined at the top level
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    stayDuration: 1,
  });

  // State for modal visibility
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Check if selectedRoom is not found, return early
  if (!selectedRoom) {
    return <div className="text-center text-red-600">Room not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleBookNow = async () => {
    // Prepare booking details to send to the backend
    const bookingData = {
      user_id: 1,  // Replace with the actual user ID from your app's state
      hotel_id: parseInt(id),
      check_in_date: '2024-10-20',  // You can modify this to be dynamically set based on user input
      check_out_date: '2024-10-25', // Same for check-out date
      total_price: selectedRoom.price * bookingDetails.stayDuration
    };

    try {
      const response = await fetch('http://127.0.0.1:5001/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking successful:', result);
        // Redirect or perform other actions after booking
        navigate('/payment'); // Navigate to payment page
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBookNow();
  };

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='container mx-auto p-4'>
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <img 
            src={selectedRoom.image} 
            alt={selectedRoom.name} 
            className='room-image' 
          />
          <div className='room-details'>
            <h2 className='room-name'>{selectedRoom.name}</h2>
            <div className='room-features mb-4'>
              <h4 className='features'>Amenities:</h4>
              <ul className='feature-details'>
                {selectedRoom.features.map((feature, index) => (
                  <li key={index} className='text-gray-800'>{feature}</li>
                ))}
              </ul>
              <p className='font-semibold text-xl text-gray-800'>
                <span className='room-price'>Price per night:</span> <span className='text-blue-600'>${selectedRoom.price}</span>
              </p>
            </div>
            <div className='booking-form'>
              <button 
                className='book-now-btn'
                onClick={() => setShowBookingForm(true)}
              >
                Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className='booking-section'>
          <div className='booking-form'>
            <h4 className='complete-booking'>Complete Your Booking</h4>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={bookingDetails.fullName}
                onChange={handleInputChange}
                required
                className='fullname-field'
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bookingDetails.email}
                onChange={handleInputChange}
                required
                className='email-field'
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={bookingDetails.phone}
                onChange={handleInputChange}
                required
                className='phone-field'
              />
              <input
                type="number"
                name="stayDuration"
                placeholder="Stay Duration (Nights)"
                value={bookingDetails.stayDuration}
                onChange={handleInputChange}
                required
                className='stay-duration'
              />
              <button 
                type="submit"
                className='confirm-booking-button'
              >
                Confirm Booking
              </button>
              <button 
                type="button"
                onClick={() => setShowBookingForm(false)}
                className='cancel-booking-button'
              >
                Cancel Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelDetails;
