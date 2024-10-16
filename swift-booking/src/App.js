import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import HomePage from './Components/HomePage';
import BookingPage from './Components/BookingPage';
import PaymentForm from './Components/PaymentForm';
import HotelDetails from './Components/HotelDetails';
import ContactInfo from './Components/ContactInfo';
import AboutUs from './Components/AboutUs';
import { BookingManagement } from './Components/BookingManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [signedInUser, setSignedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Conditionally render Header based on authentication status */}
        {isAuthenticated && (
          <Header setIsAuthenticated={setIsAuthenticated} setSignedInUser={setSignedInUser} />
        )}

        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <LandingPageBody setIsAuthenticated={setIsAuthenticated} setSignedInUser={setSignedInUser} />
              ) : (
                <HomePage setIsAuthenticated={setIsAuthenticated} setSignedInUser={setSignedInUser} />
              )
            }
          />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          
          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route path="/book-now" element={<BookingPage setBookingData={setBookingData} />} />
              <Route path="/manage-booking" element={<BookingManagement signedInUser={signedInUser} />} />
              {bookingData && <Route path="/payment" element={<PaymentForm bookingData={bookingData} signedInUser={signedInUser} />} />}
            </>
          )}

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
