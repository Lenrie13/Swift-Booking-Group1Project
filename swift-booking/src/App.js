import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import HomePage from './Components/HomePage';
import BookingPage from './Components/BookingPage';
import PaymentForm from './Components/PaymentForm';
import HotelDetails from './Components/HotelDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState(null);

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
                  <LandingPageBody setIsAuthenticated={setIsAuthenticated} />
                </>
              ) : (
                <HomePage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/book-now" element={<BookingPage />} />
          {bookingData && (
            <Route path="/payment" element={<PaymentForm bookingData={bookingData} />} />
          )}
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
