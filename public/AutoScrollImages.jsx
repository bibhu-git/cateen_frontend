import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import scroll1 from '../assets/scroll1';
import scroll2 from '../assets/scroll2';

const images = [
  scroll1,
  scroll2
];

export default function AutoScrollCarousel() {
  return (
    <Carousel 
      animation="slide"
      interval={3000} // Auto-scroll every 3 seconds
      indicators={true} // Show dots below images
      navButtonsAlwaysVisible={true} // Show navigation buttons
    >
      {images.map((img, index) => (
        <Paper key={index} elevation={3} sx={{ overflow: "hidden" }}>
          <img 
            src={img} 
            alt={`Slide ${index + 1}`} 
            style={{ width: "100%", height: "80vh", objectFit: "cover" }} 
          />
        </Paper>
      ))}
    </Carousel>
  );
}
