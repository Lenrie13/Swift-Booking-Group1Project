import React, { useEffect, useState } from 'react';
import './Deals.css';

const Deals = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Simulating fetching discount data from an API
    const fetchDiscounts = () => {
      // Example discount notifications
      const discountData = [
        {
          id: 1,
          title: 'Spring Sale!',
          description: 'Get 20% off on all rooms when you book for 3 nights or more.',
          validTill: 'April 30, 2025',
        },
        {
          id: 2,
          title: 'Weekend Special!',
          description: 'Book a room for the weekend and enjoy 15% off your stay.',
          validTill: 'Ongoing',
        },
        {
          id: 3,
          title: 'Early Bird Discount!',
          description: 'Book 30 days in advance and receive a 25% discount on your booking.',
          validTill: 'Ongoing',
        },
        {
          id: 4,
          title: 'Last Minute Deals!',
          description: 'Up to 30% off on rooms booked within 48 hours of arrival.',
          validTill: 'Ongoing',
        },
      ];

      setDiscounts(discountData);
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="deals-container">
      <h2>Special Discounts and Notifications</h2>
      {discounts.length === 0 ? (
        <p>No discounts available at the moment.</p>
      ) : (
        <ul className="deals-list">
          {discounts.map((deal) => (
            <li key={deal.id} className="deal-item">
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <p>
                <strong>Valid Till:</strong> {deal.validTill}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Deals;
