import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="prose max-w-none">
                <p className="mb-4">
                    Welcome to our application. We are dedicated to providing the best
                    service possible.
                </p>
                <p className="mb-4">
                    Our mission is to deliver innovative solutions that make a difference
                    in people's lives.
                </p>
                <p>
                    Thank you for choosing us. If you have any questions, feel free to
                    reach out.
                </p>
            </div>
        </div>
    );
};

export default About;