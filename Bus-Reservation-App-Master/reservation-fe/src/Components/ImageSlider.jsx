// src/Components/ImageSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/ImageSlider.css';

const images = [
  'https://img.freepik.com/free-vector/flat-design-dynamic-travel-agency-facebook-cover_23-2149525513.jpg?t=st=1720638596~exp=1720642196~hmac=5196f94cec5a1a394605316c8858268655842c25ffe533af1c3592846ba52ff8&w=996',
  'busImgs/Bus1.jpeg',
  'busImgs/Bus2.jpg',
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Bus10 ${index + 1}`} className="slider-image" />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
