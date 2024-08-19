import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HotelDetails.css';

// Import gallery images
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

// Import room images
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

function HotelDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const hotelData = {
        1: {
            name: 'Neptune Beach Resort',
            gallery: [neptuneGallery1, neptuneGallery2, neptuneGallery3, neptuneGallery4, neptuneGallery5, neptuneGallery6, neptuneGallery7, neptuneGallery8],
            rooms: [
                { image: neptuneDeluxeRoom, description: 'Breath-taking Deluxe Room with stunning ocean views. Enjoy top-notch amenities and a private balcony.' },
                { image: neptuneDoubleRoom, description: 'Comfortable Double Room ideal for families or friends, featuring spacious interiors and modern decor.' },
                { image: neptuneLuxuryRoom, description: 'Elegant Luxury Suite with premium furnishings, air conditioning, perfect for a lavish stay with exceptional service.' },
                { image: neptuneSingleRoom, description: 'Cozy Single Room designed for solo travelers, offering comfort and functionality at an affordable rate.' }
            ]
        },
        2: {
            name: 'Pride Inn Beach Resort',
            gallery: [prideInnGallery1, prideInnGallery2, prideInnGallery3, prideInnGallery4, prideInnGallery5, prideInnGallery6, prideInnGallery7, prideInnGallery8],
            rooms: [
                { image: prideInnDeluxeRoom, description: 'Spacious Deluxe Room with modern amenities, perfect for a relaxing vacation.' },
                { image: prideInnDoubleRoom, description: 'Well-appointed Double Room offering comfort and convenience for guests.' },
                { image: prideInnLuxuryRoom, description: 'Luxury Suite with exquisite decor and superior comfort, ideal for a high-end experience.' },
                { image: prideInnSingleRoom, description: 'Single Room with all essential amenities, perfect for solo travelers.' }
            ]
        },
        3: {
            name: 'Sarova White Sands',
            gallery: [sarovaGallery1, sarovaGallery2, sarovaGallery3, sarovaGallery4, sarovaGallery5, sarovaGallery6, sarovaGallery7, sarovaGallery8],
            rooms: [
                { image: sarovaDeluxeRoom, description: 'Deluxe Room with a spacious layout and luxurious amenities for a comfortable stay.' },
                { image: sarovaDoubleRoom, description: 'Double Room featuring modern decor and ample space for a pleasant stay.' },
                { image: sarovaLuxuryRoom, description: 'Opulent Luxury Suite with premium features and stunning beachfront views.' },
                { image: sarovaSingleRoom, description: 'Single Room with modern amenities, designed for a comfortable solo stay.' }
            ]
        },
        4: {
            name: 'Voyager Beach Resort',
            gallery: [voyagerGallery1, voyagerGallery2, voyagerGallery3, voyagerGallery4, voyagerGallery5, voyagerGallery6, voyagerGallery7, voyagerGallery8],
            rooms: [
                { image: voyagerDeluxeRoom, description: 'Deluxe Room with beautiful ocean views and luxurious amenities.' },
                { image: voyagerDoubleRoom, description: 'Double Room with spacious interiors and modern conveniences.' },
                { image: voyagerLuxuryRoom, description: 'Luxury Suite offering a lavish experience with top-of-the-line amenities.' },
                { image: voyagerSingleRoom, description: 'Single Room designed for a relaxing stay with essential comforts.' }
            ]
        }
    };

    const selectedHotel = hotelData[id];

    if (!selectedHotel) {
        return <div>Hotel not found</div>;
    }

    const handleBookNow = () => {
        navigate(`/book/${id}`);
    };

    return (
        <div className='hotel-details'>
            <h2 className='selected-hotel-name'>{selectedHotel.name}</h2>
            <div className='hotel-gallery'>
                <h4 className='gallery-header'>Gallery</h4>
                <div className='gallery-images'>
                    {selectedHotel.gallery.map((image, index) => (
                        <div key={index} className='gallery-image'>
                            <img src={image} alt={`Gallery Image ${index + 1}`} />
                            <p>Experience the stunning views and luxurious ambiance at {selectedHotel.name}.</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='hotel-rooms'>
                <h4 className='rooms-header'>Rooms</h4>
                <div className='room-images'>
                    {selectedHotel.rooms.map((room, index) => (
                        <div key={index} className='room-image'>
                            <img src={room.image} alt={`Room ${index + 1}`} />
                            <p>{room.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className='book-now-button' onClick={handleBookNow}>
                Book Now
            </button>
        </div>
    );
}

export default HotelDetails;
