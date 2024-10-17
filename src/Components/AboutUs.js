import React from 'react';
import './AboutUs.css'; // Import the CSS file
import aboutUsImage from '../assets/SwiftBookingImages/aboutus.jpg'; // Corrected the path to the image

function AboutUs() {
  return (
    <div className="about-us-container">
      <img src={aboutUsImage} alt="About Us" className="about-us-image" />
      <h2 className="about-us-title">About Us</h2>
      <h1 className="swift-booking-title">SWIFTY HOTEL</h1>
      <div className="description">
        <p>
        Welcome to Swifty Hotel, where luxury meets comfort and convenience! 
        Nestled in prime locations, we offer more than just a place to stay – 
        we provide an unforgettable experience. From our elegantly designed rooms 
        to our world-class amenities and personalized service, every detail is crafted 
        to ensure your stay is nothing short of extraordinary. Whether you're here for business 
        or leisure, Swifty Hotel promises a perfect blend of style, relaxation, and impeccable hospitality. 
        Come discover your home away from home!
        </p>
        <h3>Our Mission</h3>
        <p>
        At Swifty Hotel, our mission is to deliver exceptional comfort, personalized service, 
        and unforgettable experiences, ensuring every guest feels valued and every stay is seamless and memorable.
        </p>
        <h3>Our Motto</h3>
        <p>
          Professionalism. Reliability. Excellence.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
