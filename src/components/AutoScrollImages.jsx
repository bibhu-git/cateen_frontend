import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import scroll1 from '/scroll1.jpg'
import scroll3 from '/scroll3.jpg'
import scroll5 from '/scroll5.jpg'
const images = [scroll1, scroll3, scroll5];

export default function AutoScrollCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="max-w-full mx-auto overflow-hidden px-0 sm:px-6 md:px-12">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              className="w-full h-[85vh] sm:h-[75vh] md:h-[80vh] lg:h-[84vh] object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
