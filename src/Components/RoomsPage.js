import React, { useState } from 'react';
import './RoomsPage.css'; // Import the CSS file for styling

const RoomsPage = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleHotelClick = (hotel) => {
    console.log("Hotel clicked:", hotel); // Log the hotel data for debugging
    setSelectedHotel(hotel);
  };

  return (
    <div className="rooms-page">
      <h1>Hotels and Rooms</h1>
      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h2>{hotel.name}</h2>
              <img src={hotel.gallery[0]} alt={hotel.name} className="hotel-image" />
              <p>{hotel.description}</p>
              <button onClick={() => handleHotelClick(hotel)}>View Details</button>
            </div>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>

      {selectedHotel && (
        <div className="hotel-details">
          <h2>{selectedHotel.name}</h2>
          <p><strong>Location:</strong> {selectedHotel.location}</p>
          <p><strong>Description:</strong> {selectedHotel.description}</p>
          <p><strong>Amenities:</strong> {selectedHotel.amenities.join(', ')}</p>
          <p><strong>Pricing:</strong> Starting at {selectedHotel.pricing.currency} {selectedHotel.rooms[0].pricePerNight} per night</p>

          <div className="promotions">
            <h3>Promotions</h3>
            {selectedHotel.promotions.length > 0 ? (
              <ul>
                {selectedHotel.promotions.map((promo, index) => (
                  <li key={index}>
                    <h4>{promo.title}</h4>
                    <p>{promo.description}</p>
                    <p><strong>Valid Until:</strong> {promo.validUntil}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No current promotions.</p>
            )}
          </div>

          <div className="rooms">
            <h3>Available Rooms</h3>
            <div className="room-list">
              {selectedHotel.rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <h4>{room.type}</h4>
                  <img src={room.image} alt={room.type} className="room-image" />
                  <p>{room.description}</p>
                  <p><strong>Price per Night:</strong> {selectedHotel.pricing.currency} {room.pricePerNight}</p>
                  <p><strong>Available:</strong> {room.available ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
