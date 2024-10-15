import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/SwiftBookingImages/logo-images/logo2.jpeg';

function Header({ setIsAuthenticated, setSignedInUser}) {
    const navigate = useNavigate();
    const [hotels] = useState([
        { id: 1, name: 'Deluxe Room', location: 'Diani' },
        { id: 2, name: 'Double Room', location: 'Diani' },
        { id: 3, name: 'Luxury Room', location: 'Diani' },
        { id: 4, name: 'Single Room', location: 'Mombasa' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isHotelNameVisible, setHotelNameVisible] = useState(false);

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setSignedInUser(undefined);
        navigate('/');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setHotelNameVisible(event.target.value.length > 0);
    };

    const handleHotelClick = (hotelId) => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <header className='header'>
            <div className='logo-container'>
                <img src={logo} alt='Logo' className='logo' />
                <div className='site-name'>Swift Booking</div>
            </div>
            <div className='search-bar-container'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {isHotelNameVisible && (
                    <div className='hotel-names'>
                        {hotels
                            .filter(hotel =>
                                hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(hotel => (
                                <div
                                    key={hotel.id}
                                    className='hotel-name'
                                    onClick={() => handleHotelClick(hotel.id)}
                                >
                                    {hotel.name}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className='sign-out-button-container'>
                <button onClick={handleSignOut} className='sign-out-button'>
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export default Header;
