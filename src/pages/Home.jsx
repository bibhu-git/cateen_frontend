import React from 'react'
import Navbar from '../components/Navbar'
import AutoScrollCarousel from '../components/AutoScrollImages'
import CanteenMenu from '../components/Menu'
import About from '../components/About'
import ContactUs from '../components/ContactUs'

const Home = () => {
  return (
    <div id='Home'>
      <Navbar/>
      <div className='px-1 md:px-16 mt-16 md:mt-20'>
      <AutoScrollCarousel />
        <CanteenMenu />
        <About />
        <ContactUs />
      </div>
    </div>
  )
}

export default Home
