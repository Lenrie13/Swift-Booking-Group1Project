import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import "./BookingPage.css"
import { useNavigate, useLocation } from 'react-router-dom';

const BookingPage = ({ setBookingData }) => {
    const [rooms, setRooms] = useState([]);
    const [roomPrices, setRoomPrices] = useState({});
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [deals, setDeals] = useState([]);
    const [amountPayable, setAmountPayable] = useState(0);
    const [hotelDeals, setHotelDeals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { arrivalDate, departureDate, numberOfNights, guests } = location.state || {};

    useEffect(() => {
        fetch('http://localhost:3000/hotels')
            .then(response => response.json())
            .then(data => setHotels(data))
            .catch(error => console.error('Error fetching hotels:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/deals')
            .then(response => response.json())
            .then(data => setDeals(data))
            .catch(error => console.error('Error fetching deals:', error));
    }, []);

    useEffect(() => {
        if (selectedHotelId) {
            fetch(`http://localhost:3000/hotels/${selectedHotelId}`)
                .then(response => response.json())
                .then(data => {
                    setRooms(data.rooms);
                    const prices = data.rooms.reduce((acc, room) => {
                        acc[room.type] = room.pricePerNight;
                        return acc;
                    }, {});
                    setRoomPrices(prices);

                    const applicableDeals = deals.filter(deal => deal.hotelId === selectedHotelId);
                    setHotelDeals(applicableDeals);
                })
                .catch(error => console.error('Error fetching hotel data:', error));
        }
    }, [selectedHotelId, deals]);

    const handleBookingSubmit = (data) => {
        setBookingData(data);
        navigate('/payment');
    };

    const calculateAmountPayable = (roomType, guests) => {
        const pricePerNight = roomPrices[roomType] || 0;
        let totalAmount = pricePerNight * numberOfNights * guests;
    
        const applicableDeals = hotelDeals.filter(deal => {
            const dealStartDate = new Date(deal.startDate);
            const dealEndDate = new Date(deal.endDate);
            const selectedArrivalDate = new Date(arrivalDate);
            const selectedDepartureDate = new Date(departureDate);
            return selectedArrivalDate >= dealStartDate && selectedDepartureDate <= dealEndDate;
        });
    
        if (applicableDeals.length > 0) {
            totalAmount *= (1 - applicableDeals[0].discount / 100);
        }
    
        return totalAmount;
    };
    return (
        <div className='booking-page-form'>
            <h1>Booking Form</h1> {/* Moved title to the top */}
            
            <h2>Select a Hotel</h2>
            <select onChange={(e) => setSelectedHotelId(parseInt(e.target.value))} value={selectedHotelId}>
                <option value="" disabled>Select a hotel</option>
                {hotels.map(hotel => (
                    <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                    </option>
                ))}
            </select>

            {selectedHotelId && (
                <>
                    <BookingForm 
                        onSubmit={handleBookingSubmit}
                        rooms={rooms}
                        calculateAmountPayable={calculateAmountPayable}
                        amountPayable={amountPayable}
                        setAmountPayable={setAmountPayable}
                        initialArrivalDate={arrivalDate}
                        initialDepartureDate={departureDate}
                        initialGuests={guests}
                        numberOfNights={numberOfNights}
                    />
                </>
            )}
        </div>
    );
};

export default BookingPage;
