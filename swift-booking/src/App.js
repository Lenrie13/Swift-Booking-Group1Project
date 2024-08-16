import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import Promotions from './Components/Promotions';
import HomePage from './Components/HomePage';
import BookingForm from './Components/BookingForm';
import PaymentForm from './Components/PaymentForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Function to handle form submission
  const handleBookingSubmit = (formData) => {
    setBookingData(formData);
    // Redirect to payment form
    alert(`Please proceed to payment for ${formData.roomType} room.`);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Header setIsAuthenticated={setIsAuthenticated} />
                  <Promotions />
                  <LandingPageBody setIsAuthenticated={setIsAuthenticated} />
                </>
              ) : (
                <HomePage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/book-now"
            element={<BookingForm onSubmit={handleBookingSubmit} />}
          />
          {bookingData && (
            <Route
              path="/payment"
              element={<PaymentForm bookingData={bookingData} />}
            />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
