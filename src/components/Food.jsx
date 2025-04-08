import React from 'react'
import { assets } from '../assets/assets'

const Food = ({ item }) => {
    return (
        <div className='bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-sm'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                <div className="flex justify-center">
                    <img
                        className="w-full max-w-xs md:h-64 rounded-lg shadow-md object-cover"
                        loading="lazy"
                        src={assets[item.image]}
                        alt={item.type}
                    />
                </div>
                <div className="text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3">{item.type}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Food
