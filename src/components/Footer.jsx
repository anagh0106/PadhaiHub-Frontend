import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart, FaClock } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-white px-6 md:px-20 pt-16 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10">

                {/* Logo + Description + Contact */}
                <div>
                    <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                        🎓 <span>PadhaiHub</span>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Empowering students with quality education and personalized learning experiences. Join thousands of successful students who achieved their academic goals with us.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                            <FaMapMarkerAlt className="mt-1" /> 123 Education Street, Learning City, LC 12345
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt /> +91 98765 43210
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope /> info@padhaihub.com
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Courses</a></li>
                        <li><a href="#">Our Faculty</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                {/* Class Timings */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Class Timings</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li className="flex gap-2">
                            <FaClock className="mt-1" /> <div>
                                <strong>Monday - Friday</strong><br />
                                Morning: 6:00 AM - 12:00 PM<br />
                                Evening: 4:00 PM - 9:00 PM
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <FaClock className="mt-1" /> <div>
                                <strong>Saturday - Sunday</strong><br />
                                9:00 AM - 6:00 PM
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="pt-6 text-center text-sm text-gray-400">
                © 2024 PadhaiHub. All rights reserved. | Designed with <FaHeart className="inline text-pink-500 mx-1" /> for better education
            </div>
        </footer>
    );
};

export default Footer;
