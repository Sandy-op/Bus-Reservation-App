import React from 'react';
import SearchBus from './search/SearchBus';
import ImageSlider from '../components/ImgSlider/ImageSlider';
import Hero from "./home_container/hero/Hero";
import Category from './home_container/category/Category';
import  Offer  from './home_container/offer/Offer';

const LandingPage = () => {

  return (
    <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>

      <Hero />
      <SearchBus />
      <Category />
      <Offer />
      <ImageSlider />

      <section className="p-10 w-full mt-[-5px] rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl mb-5 font-bold text-gray-800 dark:text-neutral-300">Our Features</h2>

        <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-6 lg:gap-8">
          <div className="w-full sm:w-[45%] md:w-[30%] my-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl mb-2 font-semibold text-green-600">Easy Booking</h3>
            <p className="text-sm md:text-base m-0 text-gray-600">Book your tickets in just a few clicks.</p>
          </div>
          <div className="w-full sm:w-[45%] md:w-[30%] my-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl mb-2 font-semibold text-green-600">Manage Reservations</h3>
            <p className="text-sm md:text-base m-0 text-gray-600">View and manage all your bookings.</p>
          </div>
          <div className="w-full sm:w-[45%] md:w-[30%] my-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl mb-2 font-semibold text-green-600">Real-time Updates</h3>
            <p className="text-sm md:text-base m-0 text-gray-600">Get real-time updates on your bus status.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
