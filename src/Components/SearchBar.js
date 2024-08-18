import React, { useState, useEffect } from 'react';
import './SearchBar.css';

// Helper function to fetch hotels from local storage
const getStoredHotels = () => {
  const storedHotels = localStorage.getItem('hotels');
  return storedHotels ? JSON.parse(storedHotels) : [];
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [hotels, setHotels] = useState(getStoredHotels());

  useEffect(() => {
    setFilteredHotels(hotels.filter(hotel =>
      hotel.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, hotels]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for hotels..."
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="search-results">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="search-result-item">
            <h3>{hotel.title}</h3>
            <p>{hotel.description}</p>
            <p>${hotel.price} per night</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
