import React, { useState, useEffect } from 'react';

function Promotions({ selectedHotelId }) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Fetching deals data from the JSON server or local file
    fetch('http://localhost:3000/deals') 
      .then(response => response.json())
      .then(data => {
        // Filtering deals specific to the selected hotel
        const hotelDeals = data.filter(deal => deal.hotelId === selectedHotelId);
        setDeals(hotelDeals);
      });
  }, [selectedHotelId]);

  return (
    <div>
      <h1></h1>
      {deals.length > 0 ? (
        <ul>
          {deals.map(deal => (
            <li key={deal.id}>
              <h2>{deal.title}</h2>
              <p>{deal.description}</p>
              <p>Discount: {deal.discountPercentage}%</p>
              <p>Valid Till: {deal.validTill}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Promotions;