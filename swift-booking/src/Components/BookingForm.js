import React, { useState, useEffect } from 'react';

const BookingForm = ({
    onSubmit,
    rooms,
    calculateAmountPayable,
    amountPayable,
    setAmountPayable,
    initialArrivalDate = '',
    initialDepartureDate = '',
    initialGuests = 1,
    numberOfNights = 1
}) => {

    // Format date function
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Converts to yyyy-MM-dd
    };

    const [roomType, setRoomType] = useState('');
    const [guests, setGuests] = useState(initialGuests);
    const [arrivalDate, setArrivalDate] = useState(formatDate(initialArrivalDate));
    const [departureDate, setDepartureDate] = useState(formatDate(initialDepartureDate));

    // New state variables for personal details
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [residence, setResidence] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    useEffect(() => {
        if (roomType && numberOfNights > 0 && guests > 0 && arrivalDate && departureDate) {
            const calculatedAmount = calculateAmountPayable(roomType, guests);
            setAmountPayable(calculatedAmount);
        }
    }, [roomType, guests, arrivalDate, departureDate, calculateAmountPayable, setAmountPayable]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = {
            roomType,
            numberOfNights,
            guests,
            arrivalDate,
            departureDate,
            amountPayable,
            firstName,
            lastName,
            sex,
            idNumber,
            residence,
            age,
            email,
            phoneNumber
        };
        onSubmit(bookingDetails);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="roomType">Room Type:</label>
                <select
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a room</option>
                    {rooms.map(room => (
                        <option key={room.type} value={room.type}>
                            {room.type} - ${room.pricePerNight} per night
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="arrivalDate">Arrival Date:</label>
                <input
                    id="arrivalDate"
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="departureDate">Departure Date:</label>
                <input
                    id="departureDate"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="numberOfNights">Number of Nights:</label>
                <input
                    id="numberOfNights"
                    type="number"
                    value={numberOfNights}
                    min="1"
                    required
                />
            </div>
            <div>
                <label htmlFor="guests">Number of Guests:</label>
                <input
                    id="guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    required
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="sex">Sex:</label>
                <input
                    id="sex"
                    type="text"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="idNumber">ID Number:</label>
                <input
                    id="idNumber"
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="residence">Residence:</label>
                <input
                    id="residence"
                    type="text"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount Payable: ${amountPayable}</label>
            </div>
            <button type="submit">Confirm Booking</button>
        </form>
    );
};

export default BookingForm;
