import React from 'react'
import Food from './Food'
import menu from '../menu.json'

const About = () => {
    return (
        <div id='About'>
            <section className="py-6 md:py-14 my-10">
                <div className="container mx-auto px-4">
                    <div className="text-center md:text-left">
                        <h2 className='text-2xl md:text-3xl text-gray-400 my-4 font-semibold'>
                            ABOUT US
                        </h2>
                        <p className='text-base md:text-lg text-gray-700 leading-relaxed'>
                            Our canteen provides a variety of freshly prepared meals throughout the day,
                            offering breakfast, lunch, and dinner options that cater to different tastes and dietary preferences.
                            Whether you're starting your day with a healthy breakfast, enjoying a fulfilling lunch, or winding
                            down with a hearty dinner, we focus on serving nutritious and delicious meals in a welcoming environment.
                            We’re committed to making every meal a satisfying experience.
                        </p>
                    </div>
                </div>

                <div className='flex justify-center mt-16 px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-8xl items-center'>
                        {
                            menu.food.map((item, index) => (
                                <div key={index}>
                                    <Food item={item} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
