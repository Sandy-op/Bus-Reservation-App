// src/LandingPage.js
import React from 'react';
import NavBar from './NavBar';
import '../Styles/LandingPage.css';
import SearchBus from './Bus/SearchBus';
import Footer from './Footer';
import ImageSlider from './ImageSlider';

const LandingPage = () => {

  return (
    <div className="landing-page">
      <NavBar />
      <header className="header">
        <ImageSlider/>
      </header>
      <section className="search-bus">
        <SearchBus />
      </section>
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Easy Booking</h3>
            <p>Book your tickets in just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>Manage Reservations</h3>
            <p>View and manage all your bookings.</p>
          </div>
          <div className="feature-item">
            <h3>Real-time Updates</h3>
            <p>Get real-time updates on your bus status.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;
