import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import HomePage from './Components/HomePage';
import BookingPage from './Components/BookingPage';
import PaymentForm from './Components/PaymentForm';
import ListYourPropertyPage from './Components/ListYourPropertyPage';
import RoomsPage from './Components/RoomsPage';

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
          <Route 
            path="/payment" 
            element={bookingData ? <PaymentForm bookingData={bookingData} /> : <Navigate to="/" />} 
          />
          <Route path="/list-your-property" element={<ListYourPropertyPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
