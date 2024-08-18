import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import './LandingPageBody.css';
import Deals from './Deals';

function LandingPageBody({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [hotels, setHotels] = useState([]);

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
            </div>
            <Deals />
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
