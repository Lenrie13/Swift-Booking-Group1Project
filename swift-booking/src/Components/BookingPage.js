import React, { useState } from 'react';
import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';
import Modal from './Modal';

const BookingPage = () => {
    const [bookingData, setBookingData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookingSubmit = (data) => {
        setBookingData(data);
        setIsModalOpen(true); 
    };

    const handlePaymentSubmit = (paymentData) => {
        console.log('Booking Data:', bookingData);
        console.log('Payment Data:', paymentData);
        setIsModalOpen(false);
        alert('Payment Successful!');
        // Redirect to User Dashboard
        window.location.href = '/user-dashboard'; 
    };

    return (
        <div>
            <h2>Book a Room</h2>
            <BookingForm onSubmit={handleBookingSubmit} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PaymentForm amount={100} onPaymentSubmit={handlePaymentSubmit} />
            </Modal>
        </div>
    );
};

export default BookingPage;
