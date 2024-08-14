import React from 'react'
import "./Header.css";
import logo from '../assets/SwiftBookingImages/logo-images/logo2.jpeg';


function Header() {
    return (
        <header className='header'>
            <div className='top-header-elements-container'>
                <div className='logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='app-name'>
                    <h1>Swift Booking</h1>
                </div>
                <div className='search-bar'>
                    <input type="text" placeholder="Find a hotel..." />
                    {/* <button>Search</button> */}
                </div>
                <div className='contact-info'>
                    <p>Call: +2547-09-367-433</p>
                </div>
                <button className='book-now-header'>Book Now!</button>
            </div>
            <nav className='nav-links'>
                <button className='nav-button'>Sign Up</button>
                <button className='nav-button'>Home</button>
                <button className='nav-button'>Rooms</button>
                <button className='nav-button'>Gallery</button>
                <button className='nav-button'>Promotions</button>
                <button className='nav-button'>Reviews & Ratings</button>
                <button className='nav-button'>Contact Us</button>
                {/* <a href='#'>Home</a>
                <a href='#'>Rooms</a>
                <a href='#'>Gallery</a>
                <a href='#'>Promotions</a>
                <a href='#'>Reviews & Ratings</a>
                <a href='#'>Contact Us</a> */}
            </nav>
        </header>
    )
}

export default Header