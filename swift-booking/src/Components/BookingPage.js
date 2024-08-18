import React, { useState, useEffect, useMemo } from 'react';
import BookingForm from './BookingForm';
import "./BookingPage.css"
import { useNavigate, useLocation } from 'react-router-dom';

const BookingPage = ({ setBookingData }) => {
    const [rooms, setRooms] = useState([]);
    const [roomPrices, setRoomPrices] = useState({});
    const [selectedHotel, setSelectedHotel] = useState();
    const [hotels, setHotels] = useState([]);
    const [deals, setDeals] = useState([]);
    const [amountPayable, setAmountPayable] = useState(0);
    const [hotelDeals, setHotelDeals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { arrivalDate, departureDate, numberOfNights, guests } = location.state || {};

    const onSelectHotel=(e)=>{
        const hotel = hotels.find((hotel)=>hotel.id === e.target.value);
        setSelectedHotel(hotel);
    }

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
        if (selectedHotel) {
            fetch(`http://localhost:3000/hotels/${selectedHotel.id}`)
                .then(response => response.json())
                .then(data => {
                    setRooms(data.rooms);
                    const prices = data.rooms.reduce((acc, room) => {
                        acc[room.type] = room.pricePerNight;
                        return acc;
                    }, {});
                    setRoomPrices(prices);

                    const applicableDeals = deals.filter(deal => deal.hotelId === selectedHotel.id);
                    setHotelDeals(applicableDeals);
                })
                .catch(error => console.error('Error fetching hotel data:', error));
        }
    }, [selectedHotel, deals]);

    const handleBookingSubmit = (data) => {
        setBookingData(data);
        navigate('/payment',{state:{...data}});
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
            <select onChange={onSelectHotel} value={selectedHotel?.name??''}>
                <option value="" disabled>Select a hotel</option>
                {hotels.map(hotel => (
                    <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                    </option>
                ))}
            </select>

            {selectedHotel && (
                <>
                    <BookingForm 
                        onSubmit={handleBookingSubmit}
                        rooms={rooms}
                        calculateAmountPayable={calculateAmountPayable}
                        amountPayable={amountPayable}
                        setAmountPayable={setAmountPayable}
                        initialArrivalDate={arrivalDate}
                        initialDepartureDate={departureDate}
                        numberOfGuests={guests}
                        numberOfNights={numberOfNights}
                        selectedHotel={selectedHotel}
                        deals={deals}
                    />
                </>
            )}
        </div>
    );
};

export default BookingPage;
