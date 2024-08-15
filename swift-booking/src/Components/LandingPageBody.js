import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageBody.css';

function LandingPageBody({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear user session or authentication state here
        setIsAuthenticated(false); // Update authentication state
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="landing-page-body">
            <div className="landing-page-image-container">
                <img
                    src={require('../assets/SwiftBookingImages/landing-page-image.webp')}
                    alt="Landing Page"
                    className="page-image"
                />
                <div className="booking-form">
                    <button className="arrival-button">Arrival</button>
                    <button className="departure-button">Departure</button>
                    <button className="guests-button">Guests</button>
                    <button className="book-now">BOOK NOW!</button>
                </div>
            </div>

            <div className="aboutUs">
                <h1>SWIFT BOOKING</h1>
                <div className="description">
                    <h2>ABOUT US</h2>
                    <p>
                        At Swift Booking, we enlist only the best hotels where you stay once
                        and carry memories forever. We help you see life from a different
                        perspective. Your quest for a refreshing environment to stay, relax,
                        and unwind starts and ends here. This is home away from home!
                    </p>
                </div>
            </div>

            <button className="sign-out-button" onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    );
}

export default LandingPageBody;
