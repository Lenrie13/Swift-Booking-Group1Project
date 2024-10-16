import React from 'react';
import './ContactInfo.css'; // Import the CSS file
import contactImage from '../assets/SwiftBookingImages/contactus.jpeg'; // Make sure the path to the image is correct

function ContactInfo() {
  return (
    <div className="contact-info-container">
      <img src={contactImage} alt="Contact Us" className="contact-info-image" />
      <h2>Contact Us</h2>
      <p>Have questions or need assistance? We're here to help!</p>
      <ul className="contact-details">
        <li><strong>Email:</strong> support@swiftbooking.com</li>
        <li><strong>Phone:</strong> +1 (800) 123-4567</li>
        <li><strong>Address:</strong> 123 Swift Booking Lane, Suite 100, Travel City, TC 12345</li>
      </ul>
      <p>Our customer support team is available 24/7 to assist you with your booking needs.</p>
    </div>
  );
}

export default ContactInfo;
