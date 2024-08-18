import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const BookingManagement = (props) => {
    const { signedInUser } = props;
    const [signedInUserBookings, setSignedInUserBookings] = useState([]);
    const location = useLocation();
    const { bookingData } = location.state ?? {};
    console.log("The bookingData is======>", bookingData);
    console.log("The signed in user is=====>", signedInUser);
    console.log("The signed in user bookings---->", signedInUserBookings);

    useEffect(() => {
        fetch('http://localhost:3000/payments')
            .then(response => response.json())
            .then(data => setSignedInUserBookings(data.filter((booking) => booking.user.id === signedInUser.id)))
            .catch(error => console.error('Error fetching bookings:', error));

    }, [signedInUser])

    const cancelBooking = (booking) => {
        fetch(`http://localhost:3000/payments/${booking.id}`, {
            method: 'DELETE'
        }).then((response)=>response.json())
        .then((data)=>{
            setSignedInUserBookings((previousBookings)=>previousBookings.filter((bookingItem)=>bookingItem.id !== booking.id));
            console.log("Deletion response", data);
        }).catch((error)=>{
            console.log("Error deleting booking", booking);
        })
    }


    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
        }}>
            {signedInUserBookings.map((booking) => (
                <div key={booking.id} style={{ border: '1px solid black', borderRadius: '4px', padding: '8px' }}>
                    <div>Hotel: {booking?.hotel?.name}</div>
                    <div>Room: {booking?.room?.type}</div>
                    <div>Payment Method: {booking.paymentMethod}</div>
                    <div>Amount: $ {booking.amount}</div>
                    <button style={{ background: 'red', color: 'white' }} onClick={()=>cancelBooking(booking)}>Cancel Booking</button>
                </div>
            ))}
        </div>
    )
}