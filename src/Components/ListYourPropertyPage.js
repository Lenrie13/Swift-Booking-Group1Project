import React, { useState, useEffect } from 'react';
import './ListYourPropertyPage.css';

// Helper function to fetch hotels from local storage
const getStoredHotels = () => {
  const storedHotels = localStorage.getItem('hotels');
  return storedHotels ? JSON.parse(storedHotels) : [];
};

const ListYourPropertyPage = ({ onHotelAdded }) => {
  const [hotels, setHotels] = useState(getStoredHotels());
  const [formData, setFormData] = useState({ title: '', description: '', price: '', imageUrl: '' });
  const [editingHotel, setEditingHotel] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Save hotels to local storage when updated
  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels));
    // Notify parent component (if any) that hotels have been updated
    if (onHotelAdded) onHotelAdded(hotels);
  }, [hotels, onHotelAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHotel) {
      setHotels(hotels.map(hotel =>
        hotel.id === editingHotel.id ? { ...hotel, ...formData } : hotel
      ));
      setEditingHotel(null);
    } else {
      const newHotel = {
        id: Date.now(), // Unique ID based on timestamp
        ...formData,
      };
      setHotels([...hotels, newHotel]);
    }
    setFormData({ title: '', description: '', price: '', imageUrl: '' });
    setImagePreview('');
  };

  const handleEdit = (hotel) => {
    setFormData(hotel);
    setImagePreview(hotel.imageUrl);
    setEditingHotel(hotel);
  };

  const handleDelete = (id) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  return (
    <div className="list-your-property-container">
      <div className="form-container">
        <h1 className="page-title">
          {editingHotel ? 'Edit Your Property' : 'List Your Property'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price per Night</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          </div>
          <button type="submit" className="button">
            {editingHotel ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <div className="hotel-list">
        <h2 className="list-title">Your Hotels</h2>
        <div className="hotel-grid">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              {hotel.imageUrl && <img src={hotel.imageUrl} alt={hotel.title} className="hotel-image" />}
              <h3>{hotel.title}</h3>
              <p>{hotel.description}</p>
              <p>${hotel.price} per night</p>
              <button onClick={() => handleEdit(hotel)} className="button">Edit</button>
              <button onClick={() => handleDelete(hotel.id)} className="button button-delete">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListYourPropertyPage;
