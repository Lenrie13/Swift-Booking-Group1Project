import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HotelDetails.css";

// Import room images
import neptuneDeluxeRoom from "../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/deluxe.jpeg";
import neptuneDoubleRoom from "../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/double.jpeg";
import neptuneLuxuryRoom from "../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/luxury.jpeg";
import neptuneSingleRoom from "../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/single.jpg";

// Sample room data with detailed features
const roomData = {
  1: {
    name: "Deluxe Room",
    image: neptuneDeluxeRoom,
    features: [
      "Breath-taking ocean views",
      "Private balcony",
      "Free WiFi",
      "Air conditioning",
      "Room service available",
      "King-sized bed",
      "Complimentary breakfast",
    ],
    price: 10,
  },
  2: {
    name: "Double Room",
    image: neptuneDoubleRoom,
    features: [
      "Spacious interiors",
      "Modern decor",
      "Free WiFi",
      "Mini fridge",
      "Two queen-sized beds",
      "Ideal for families or friends",
      "Access to pool and gym",
    ],
    price: 100,
  },
  3: {
    name: "Luxury Suite",
    image: neptuneLuxuryRoom,
    features: [
      "Premium furnishings",
      "Top-notch amenities",
      "Private jacuzzi",
      "Free WiFi",
      "Exceptional room service",
      "Oceanfront view",
      "Complimentary spa access",
    ],
    price: 250,
  },
  4: {
    name: "Single Room",
    image: neptuneSingleRoom,
    features: [
      "Cozy and comfortable",
      "Designed for solo travelers",
      "Free WiFi",
      "Mini bar",
      "Affordable rate",
      "Work desk available",
      "Access to hotel facilities",
    ],
    price: 80,
  },
};

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedRoom = roomData[id];

  const [bookingDetails, setBookingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    stayDuration: 1,
  });

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  if (!selectedRoom) {
    return <div className="text-center text-red-600">Room not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleBookNow = async () => {
    const bookingData = {
      user_id: "1", // Replace with the actual user ID from your app's state
      hotel_id: id,
      total_price: selectedRoom.price * bookingDetails.stayDuration,
      room_type: selectedRoom.name,
      room_id: id,
      check_in_date: bookingDetails.checkInDate,
      check_out_date: bookingDetails.checkOutDate,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking created:", result);
        setBookingId(result.booking_id);
        initializePayment(result.booking_id);
      } else {
        console.error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  const initializePayment = async (bookingId) => {
    const paymentData = {
      email: bookingDetails.email,
      amount: selectedRoom.price * bookingDetails.stayDuration,
      callback_url: `${window.location.origin}/payment/callback`,
      booking_id: bookingId,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/payments/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Payment initialized:", result);
        // Redirect to Paystack payment page
        window.location.href = result.authorization_url;
      } else {
        console.error("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Error during payment initialization:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBookNow();
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/payments/paystack/verify/${reference}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Payment verified:", result);
        if (result.status === "success") {
          // Payment successful, update UI or redirect
          navigate("/booking-confirmation");
        } else {
          // Payment failed, handle accordingly
          console.error("Payment verification failed");
        }
      } else {
        console.error("Failed to verify payment");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.name}
            className="room-image"
          />
          <div className="room-details">
            <h2 className="room-name">{selectedRoom.name}</h2>
            <div className="room-features mb-4">
              <h4 className="features">Amenities:</h4>
              <ul className="feature-details">
                {selectedRoom.features.map((feature, index) => (
                  <li key={index} className="text-gray-800">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-xl text-gray-800">
                <span className="room-price">Price per night:</span>{" "}
                <span className="text-blue-600">${selectedRoom.price}</span>
              </p>
            </div>
            <div className="booking-form">
              <button
                className="book-now-btn"
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
        <div className="booking-section">
          <div className="booking-form">
            <h4 className="complete-booking">Complete Your Booking</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={bookingDetails.fullName}
                onChange={handleInputChange}
                required
                className="fullname-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bookingDetails.email}
                onChange={handleInputChange}
                required
                className="email-field"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={bookingDetails.phone}
                onChange={handleInputChange}
                required
                className="phone-field"
              />
              <input
                type="date"
                name="checkInDate"
                placeholder="Check-in Date"
                value={bookingDetails.checkInDate}
                onChange={handleInputChange}
                required
                className="check-in-date"
              />
              <input
                type="date"
                name="checkOutDate"
                placeholder="Check-out Date"
                value={bookingDetails.checkOutDate}
                onChange={handleInputChange}
                required
                className="check-out-date"
              />
              <input
                type="number"
                name="stayDuration"
                placeholder="Stay Duration (Nights)"
                value={bookingDetails.stayDuration}
                onChange={handleInputChange}
                required
                className="stay-duration"
              />
              <button type="submit" className="confirm-booking-button">
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="cancel-booking-button"
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
