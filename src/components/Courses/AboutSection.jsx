import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
    useEffect(() => { AOS.init(); }, []);

    return (
        <div className="py-20 bg-gray-900 px-6 text-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                <div data-aos="fade-right" className="md:w-1/2">
                    <img src="https://img.freepik.com/3d-models/v2/C/E/L/O/F/S/7/CELOFS76/books-icon-beauty-1.png?t=st=1749624680~exp=1749628280~hmac=2b3b00a362a5be42a1d6b45b8d7bb3fbfa4094549c23a686bb9d281d20f13bf2&w=1000"
                        alt="About"
                        className="rounded-3xl shadow-lg" />
                </div>

                <div data-aos="fade-left" className="md:w-1/2 md:pl-12 mt-10 md:mt-0">
                    <h2 className="text-4xl font-bold mb-6 text-blue-400">About Our Academy</h2>
                    <p className="text-lg leading-7 text-gray-300">
                        We help students crack toughest exams with deep concepts, doubt-solving, personal mentorship, and latest exam patterns.
                        Our unique teaching system boosts confidence & mastery.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutSection;
