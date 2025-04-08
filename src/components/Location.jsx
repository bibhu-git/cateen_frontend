import React from 'react';

const Location = () => {
    return (
        <div className="w-full">
            <div className="w-full h-[400px] sm:h-[450px] relative overflow-hidden rounded-lg shadow-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.4387870234923!2d86.35433947701166!3d20.813983678606277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1be45e26922ebb%3A0x8382d43f99565c0c!2sChitalo%20Mohavidyalaya%20Jajpur!5e0!3m2!1sen!2sin!4v1743489333959!5m2!1sen!2sin"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>
    );
};

export default Location;
