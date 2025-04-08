import React from 'react';
import Location from './Location';
import ContactForm from './ContactForm';

const ContactUs = () => {
  return (
    <div id='Contact' className='p-4'>
      <h2 className='text-3xl text-center mb-6 font-semibold'>Contact Us</h2>
      <div className='flex flex-col lg:flex-row gap-6 items-center'>
        <div className='w-full lg:w-1/2 order-2 md:order-1'>
          <Location />
        </div>
        <div className='w-full lg:w-1/2 order-1 md:order-2'>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
