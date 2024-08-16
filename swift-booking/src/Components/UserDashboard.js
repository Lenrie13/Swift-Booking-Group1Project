import React, { useState, useEffect } from 'react';

const UserDashboard = ({ bookings, onEdit, onCancel }) => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // Assume `bookings` is passed as a prop and contains the user's bookings.
    setUserBookings(bookings);
  }, [bookings]);

  const handleEdit = (id) => {
    const booking = userBookings.find((booking) => booking.id === id);
    onEdit(booking);
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      onCancel(id);
      setUserBookings(userBookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {userBookings.length > 0 ? (
        <ul>
          {userBookings.map((booking) => (
            <li key={booking.id}>
              <p>Room Type: {booking.roomType}</p>
              <p>Date: {booking.date}</p>
              <p>Status: {booking.status}</p>
              <button onClick={() => handleEdit(booking.id)}>Edit</button>
              <button onClick={() => handleCancel(booking.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings.</p>
      )}
    </div>
  );
};

export default UserDashboard;
