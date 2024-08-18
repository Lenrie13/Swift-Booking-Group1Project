import React, { useEffect, useState } from 'react';
import './Deals.css';

const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/deals') // Adjust the URL if needed
      .then((response) => response.json())
      .then((data) => setDeals(data))
      .catch((error) => console.error('Error fetching deals:', error));
  }, []);

  return (
    <div className="deals-container">
      <h2>Special Deals and Discounts</h2>
      {deals.length === 0 ? (
        <p>No deals available at the moment.</p>
      ) : (
        <ul className="deals-list">
          {deals.map((deal) => (
            <li key={deal.id} className="deal-item">
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <p>
                <strong>Discount:</strong> {deal.discountPercentage}% off
              </p>
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
