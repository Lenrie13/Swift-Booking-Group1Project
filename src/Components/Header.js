
import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/SwiftBookingImages/logo-images/logo2.jpeg';

// Gallery Images for each hotel
import neptuneGallery1 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery1.jpeg';
import neptuneGallery2 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery2.jpg';
import neptuneGallery3 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery3.jpg';
import neptuneGallery4 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery4.jpg';
import neptuneGallery5 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery5.jpg';
import neptuneGallery6 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery6.jpeg';
import neptuneGallery7 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery7.jpeg';
import neptuneGallery8 from '../assets/SwiftBookingImages/Neptune-BeachResort/Gallery/gallery8.jpeg';

import prideInnGallery1 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery1.jpeg';
import prideInnGallery2 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery2.jpeg';
import prideInnGallery3 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery3.jpeg';
import prideInnGallery4 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery4.jpeg';
import prideInnGallery5 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery5.jpeg';
import prideInnGallery6 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery6.jpeg';
import prideInnGallery7 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery7.jpeg';
import prideInnGallery8 from '../assets/SwiftBookingImages/PrideInn-BeachResort/Gallery/Gallery8.jpeg';

import sarovaGallery1 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery1.jpeg';
import sarovaGallery2 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery2.jpeg';
import sarovaGallery3 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery3.jpeg';
import sarovaGallery4 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery4.jpeg';
import sarovaGallery5 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery5.jpeg';
import sarovaGallery6 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery6.jpeg';
import sarovaGallery7 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery7.jpeg';
import sarovaGallery8 from '../assets/SwiftBookingImages/SarovaWhiteSands/Gallery/Gallery8.jpeg';

import voyagerGallery1 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery1.jpg';
import voyagerGallery2 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery2.avif';
import voyagerGallery3 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery3.jpg';
import voyagerGallery4 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery4.jpg';
import voyagerGallery5 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery5.jpg';
import voyagerGallery6 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery6.jpg';
import voyagerGallery7 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery7.jpg';
import voyagerGallery8 from '../assets/SwiftBookingImages/Voyager-BeachResort/Gallery/Gallery8.jpeg';

// Room Images for each hotel
import neptuneDeluxeRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/deluxe.jpeg';
import neptuneDoubleRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/double.jpeg';
import neptuneLuxuryRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/luxury.jpeg';
import neptuneSingleRoom from '../assets/SwiftBookingImages/Neptune-BeachResort/Rooms/single.jpg';

import prideInnDeluxeRoom from '../assets/SwiftBookingImages/PrideInn-BeachResort/Rooms/deluxe-rooms.jpeg';
import prideInnDoubleRoom from '../assets/SwiftBookingImages/PrideInn-BeachResort/Rooms/double-rooms.jpeg';
import prideInnLuxuryRoom from '../assets/SwiftBookingImages/PrideInn-BeachResort/Rooms/luxury-room1.jpeg';
import prideInnSingleRoom from '../assets/SwiftBookingImages/PrideInn-BeachResort/Rooms/single-room.jpeg';

import sarovaDeluxeRoom from '../assets/SwiftBookingImages/SarovaWhiteSands/Rooms/deluxe-rooms.jpeg';
import sarovaDoubleRoom from '../assets/SwiftBookingImages/SarovaWhiteSands/Rooms/double-rooms.jpeg';
import sarovaLuxuryRoom from '../assets/SwiftBookingImages/SarovaWhiteSands/Rooms/luxury-room.jpeg';
import sarovaSingleRoom from '../assets/SwiftBookingImages/SarovaWhiteSands/Rooms/single-rooms.jpeg';

import voyagerDeluxeRoom from '../assets/SwiftBookingImages/Voyager-BeachResort/Rooms/deluxe-rooms.jpg';
import voyagerDoubleRoom from '../assets/SwiftBookingImages/Voyager-BeachResort/Rooms/double-rooms.jpeg';
import voyagerLuxuryRoom from '../assets/SwiftBookingImages/Voyager-BeachResort/Rooms/luxury-rooms.jpg';
import voyagerSingleRoom from '../assets/SwiftBookingImages/Voyager-BeachResort/Rooms/single-rooms.jpeg';
import ListYourPropertyPage from './ListYourPropertyPage';

function Header({ setIsAuthenticated }) {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [hotels, setHotels] = useState([
        { id: 1, name: 'Neptune Beach Resort', location: 'Diani' },
        { id: 2, name: 'Pride Inn Beach Resort', location: 'Diani' },
        { id: 3, name: 'Sarova White Sands', location: 'Diani' },
        { id: 4, name: 'Voyager Beach Resort', location: 'Mombasa' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHotels, setFilteredHotels] = useState(hotels);
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        const filtered = hotels.filter((hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHotels(filtered);

        if (filtered.length === 1) {
            setSelectedHotel(filtered[0]);
        } else {
            setSelectedHotel(null);
        }
    }, [searchTerm, hotels]);

    // Define the handleSignOut function
    const handleSignOut = () => {
        // Add your sign out logic here
        setIsAuthenticated(false); // Update authentication status
        navigate('/'); // Redirect to the homepage or any other page
    };
    const handleListYourPropertyClick = () => {
        console.log('Navigating to List Your Property');
        navigate('/list-your-property');
      };
    
      const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/');
      };

    const handleRoomsClick = () => {
        console.log('Navigating to Rooms');
        navigate('/rooms');
    };
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
                    <input 
                        type="text" 
                        placeholder="Find a hotel..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='contact-info'>
                    <p>Call: +2547-09-367-433</p>
                </div>
                <button className='sign-out-button' onClick={handleSignOut}>
                    Sign out
                </button>
            </div>
            <nav className='nav-links'>
                <button className='nav-button'>Sign Up</button>
                <button className='nav-button'>Home</button>
                <button className='nav-button' onClick={handleRoomsClick}>Rooms</button>
                <button className='nav-button'>Gallery</button>
                <button className='nav-button'>Promotions</button>
                <button className='nav-button'>Reviews & Ratings</button>
                <button className='nav-button' onClick={handleListYourPropertyClick}>
                    List Your Property
                </button>
            </nav>


            {filteredHotels.length > 0 && (
                <div className='hotel-list'>
                    {filteredHotels.map((hotel) => (
                        <div key={hotel.id} className='hotel-item'>
                            <h3>{hotel.name}</h3>
                            {selectedHotel && selectedHotel.id === hotel.id && (
                                <div>
                                    {selectedHotel.name === 'Neptune Beach Resort' && (
                                        <div>
                                            <div className='hotel-gallery'>
                                                <h4>Gallery</h4>
                                                <div className='gallery-images'>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery1} alt="Gallery Image 1" />
                                                        <p>Beautiful view of the resort</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery2} alt="Gallery Image 2" />
                                                        <p>Luxurious pool area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery3} alt="Gallery Image 3" />
                                                        <p>Outdoor dining experience</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery4} alt="Gallery Image 4" />
                                                        <p>Scenic sunset view</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery5} alt="Gallery Image 5" />
                                                        <p>Elegant interiors</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery6} alt="Gallery Image 6" />
                                                        <p>Relaxing spa area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery7} alt="Gallery Image 7" />
                                                        <p>Beachfront view</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={neptuneGallery8} alt="Gallery Image 8" />
                                                        <p>Swimming pool area</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='hotel-rooms'>
                                                <h4>Rooms</h4>
                                                <div className='room-images'>
                                                    <div className='room-image'>
                                                        <img src={neptuneDeluxeRoom} alt="Deluxe Room" />
                                                        <p>Deluxe Room with stunning views</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={neptuneDoubleRoom} alt="Double Room" />
                                                        <p>Double Room for families</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={neptuneLuxuryRoom} alt="Luxury Room" />
                                                        <p>Luxury Room with premium amenities</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={neptuneSingleRoom} alt="Single Room" />
                                                        <p>Single Room for solo travelers</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedHotel.name === 'Pride Inn Beach Resort' && (
                                        <div>
                                            <div className='hotel-gallery'>
                                                <h4>Gallery</h4>
                                                <div className='gallery-images'>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery1} alt="Gallery Image 1" />
                                                        <p>Modern lobby area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery2} alt="Gallery Image 2" />
                                                        <p>Poolside relaxation</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery3} alt="Gallery Image 3" />
                                                        <p>Outdoor dining area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery4} alt="Gallery Image 4" />
                                                        <p>Beautiful garden</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery5} alt="Gallery Image 5" />
                                                        <p>Well-appointed rooms</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery6} alt="Gallery Image 6" />
                                                        <p>Luxurious spa</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery7} alt="Gallery Image 7" />
                                                        <p>Beachfront area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={prideInnGallery8} alt="Gallery Image 8" />
                                                        <p>Relaxing atmosphere</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='hotel-rooms'>
                                                <h4>Rooms</h4>
                                                <div className='room-images'>
                                                    <div className='room-image'>
                                                        <img src={prideInnDeluxeRoom} alt="Deluxe Room" />
                                                        <p>Deluxe Room with ocean view</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={prideInnDoubleRoom} alt="Double Room" />
                                                        <p>Double Room with extra space</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={prideInnLuxuryRoom} alt="Luxury Room" />
                                                        <p>Luxury Room with elegant design</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={prideInnSingleRoom} alt="Single Room" />
                                                        <p>Single Room with modern amenities</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedHotel.name === 'Sarova White Sands' && (
                                        <div>
                                            <div className='hotel-gallery'>
                                                <h4>Gallery</h4>
                                                <div className='gallery-images'>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery1} alt="Gallery Image 1" />
                                                        <p>Elegant entrance</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery2} alt="Gallery Image 2" />
                                                        <p>Serene poolside</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery3} alt="Gallery Image 3" />
                                                        <p>Luxurious lobby</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery4} alt="Gallery Image 4" />
                                                        <p>Stunning beach view</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery5} alt="Gallery Image 5" />
                                                        <p>Stylish room interiors</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery6} alt="Gallery Image 6" />
                                                        <p>Exclusive dining experience</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery7} alt="Gallery Image 7" />
                                                        <p>Relaxing spa area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={sarovaGallery8} alt="Gallery Image 8" />
                                                        <p>Vibrant atmosphere</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='hotel-rooms'>
                                                <h4>Rooms</h4>
                                                <div className='room-images'>
                                                    <div className='room-image'>
                                                        <img src={sarovaDeluxeRoom} alt="Deluxe Room" />
                                                        <p>Deluxe Room with premium features</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={sarovaDoubleRoom} alt="Double Room" />
                                                        <p>Double Room with comfortable beds</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={sarovaLuxuryRoom} alt="Luxury Room" />
                                                        <p>Luxury Room with high-end amenities</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={sarovaSingleRoom} alt="Single Room" />
                                                        <p>Single Room with modern furnishings</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedHotel.name === 'Voyager Beach Resort' && (
                                        <div>
                                            <div className='hotel-gallery'>
                                                <h4>Gallery</h4>
                                                <div className='gallery-images'>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery1} alt="Gallery Image 1" />
                                                        <p>Charming lobby</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery2} alt="Gallery Image 2" />
                                                        <p>Inviting pool area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery3} alt="Gallery Image 3" />
                                                        <p>Relaxing beachside</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery4} alt="Gallery Image 4" />
                                                        <p>Deluxe dining area</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery5} alt="Gallery Image 5" />
                                                        <p>Stylish interiors</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery6} alt="Gallery Image 6" />
                                                        <p>Tranquil spa</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery7} alt="Gallery Image 7" />
                                                        <p>Scenic sunset</p>
                                                    </div>
                                                    <div className='gallery-image'>
                                                        <img src={voyagerGallery8} alt="Gallery Image 8" />
                                                        <p>Luxurious relaxation area</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='hotel-rooms'>
                                                <h4>Rooms</h4>
                                                <div className='room-images'>
                                                    <div className='room-image'>
                                                        <img src={voyagerDeluxeRoom} alt="Deluxe Room" />
                                                        <p>Deluxe Room with sea view</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={voyagerDoubleRoom} alt="Double Room" />
                                                        <p>Double Room with spacious layout</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={voyagerLuxuryRoom} alt="Luxury Room" />
                                                        <p>Luxury Room with top-notch amenities</p>
                                                    </div>
                                                    <div className='room-image'>
                                                        <img src={voyagerSingleRoom} alt="Single Room" />
                                                        <p>Single Room with modern decor</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Header;
