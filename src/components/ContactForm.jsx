import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    return (
        <div className="max-w-xl w-full h-[400px] sm:h-[450px] mx-auto p-2 md:p-5 rounded-md shadow-md bg-white">
            <h2 className="text-3xl hidden md:block font-bold mb-5 text-center">Get in Touch</h2>
            <form className="space-y-3">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    placeholder="Message"
                    className="w-full p-3 border border-gray-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full bg-black text-white px-4 py-3 rounded hover:bg-gray-800 transition-all"
                >
                    <FaPaperPlane /> Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
