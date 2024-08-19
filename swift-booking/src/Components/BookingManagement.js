import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BookingManagement.css";

export const BookingManagement = (props) => {
    const { signedInUser } = props;
    const [signedInUserBookings, setSignedInUserBookings] = useState([]);
    const location = useLocation();
    const { bookingData } = location.state ?? {};

    useEffect(() => {
        fetch('http://localhost:3000/payments')
            .then(response => response.json())
            .then(data => setSignedInUserBookings(data.filter((booking) => booking.user.id === signedInUser.id)))
            .catch(error => console.error('Error fetching bookings:', error));

    }, [signedInUser]);

    const cancelBooking = (booking) => {
        fetch(`http://localhost:3000/payments/${booking.id}`, {
            method: 'DELETE'
        }).then(() => {
            setSignedInUserBookings((previousBookings) => previousBookings.filter((bookingItem) => bookingItem.id !== booking.id));
        }).catch((error) => {
            console.log("Error deleting booking", error);
        });
    };

    return (
        <div className="user-dashboard">
            <h1 className="bookings-header">User Dashboard: Bookings</h1>
            <div className="bookings-list">
                {signedInUserBookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                        <div>Hotel: {booking?.hotel?.name}</div>
                        <div>Room: {booking?.room?.type}</div>
                        <div>Payment Method: {booking.paymentMethod}</div>
                        <div>Amount: $ {booking.amount}</div>
                        <button className="cancel-button" onClick={() => cancelBooking(booking)}>Cancel Booking</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
