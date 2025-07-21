import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Authform from './AuthForm.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ThemeContext from './context/ThemeContext.jsx';
import { motion, useMotionValue, animate } from "framer-motion";

const Home = () => {
    const [review, setReview] = useState([]);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isFormSubmitted, setisFormSubmitted] = useState(false);
    const [MainText, setMainText] = useState("")
    const [Description, setDescription] = useState("")
    const [Heading, setHeading] = useState("")
    const [cards, setcards] = useState([]);
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-[rgba(15,15,15,0.5)]',
        border: theme === 'light' ? 'border-gray-300' : 'border-[rgba(255,255,255,0.1)]',
        text: theme === 'light' ? 'text-black' : 'text-white',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        shadow: 'shadow-lg',
        glass: theme === 'light' ? 'backdrop-blur-lg' : 'backdrop-blur-lg',
        overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60'
    };

    const isLocal = window.location.hostname === "localhost";
    const API = isLocal
        ? "http://localhost:3000/review"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/review";

    const Card_API = window.location.hostname === "localhost"
        ? "http://localhost:3000/cards"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/cards";

    const token = localStorage.getItem("token");
    const homeAPI = window.location.hostname === "localhost"
        ? "http://localhost:3000/home"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/home";

    const fetchHomePageText = async () => {
        try {
            const res = await axios.get(`${API}/home/text`);
            console.log(res.data);
            // yahan setState karna
            setHeading(res.data.headingLine1 + " " + res.data.headingLine2);
            setMainText(res.data.mainText);
            setDescription(res.data.description);
        } catch (error) {
            console.error("Failed to load homepage text", error);
        }
    };


    const FetchCardData = async () => {
        try {
            const res = await axios.get(`${Card_API}/getAllCards`
            );
            setcards(res.data.cards);
        } catch (err) {
            console.error("Error fetching cards", err);
        }
    };

    const handleGetStarted = () => {
        setShowAuthForm(true);
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API}/getReviews`);
            setReview(res.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
        FetchCardData();
        fetchHomePageText();
    }, []);

    const ReviewSubmitHandler = async (reviewData) => {
        if (!reviewData.name || !reviewData.grade || !reviewData.message) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.post(`${API}/submitReview`, reviewData);
            if (response.status === 201) {
                alert("Review submitted successfully");
                setisFormSubmitted(true);
                reset();
                await fetchReviews();
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`${colors.background} ${colors.text} min-h-screen transition-colors duration-500`}>

            {/* <section className={`py-24 text-center ${colors.card} ${colors.border} ${colors.shadow} ${colors.glass} border rounded-xl mx-4 mt-4 transition-all animate-fade-in`}>
                <h1 className="text-4xl font-extrabold">Welcome to PadhaiHub</h1>
                <p className={`mt-4 text-xl ${colors.subtext}`}>Where learning becomes a joyful experience</p>
                {!token && (
                    <button
                        className="mt-6 bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg hover:scale-105 hover:brightness-110 transition-all shadow-lg"
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                )}
            </section> */}
            <section>
                <p>{Heading}</p>
                <p>{MainText}</p>
                <p>{Description}</p>
            </section>
            {showAuthForm && (
                <div className={`fixed inset-0 flex items-center justify-center ${colors.overlay} ${colors.glass} z-50 p-4`}>
                    <Authform onClose={() => setShowAuthForm(false)} />
                </div>
            )}

            <section className={`py-16 ${colors.card} ${colors.border} rounded-xl mx-4 my-4 shadow-lg text-center animate-fade-in`}>
                <h2 className="text-3xl font-bold">Why Choose Us?</h2>
                <p className={`mt-4 text-lg ${colors.subtext} max-w-2xl mx-auto`}>
                    We offer personalized tuition classes for students of all grades with experienced educators.
                    Our goal is to foster understanding and a passion for learning.
                </p>
            </section>

            <section className="py-16 animate-fade-in">
                <h2 className="text-3xl font-bold text-center mb-12">Explore Our Learning Atmosphere</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className={`${colors.card} ${colors.border} rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 hover:brightness-110 transition-transform`}>
                            <img src={card.image} alt={card.title} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                                <p className={`${colors.subtext}`}>{card.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {token && (
                <section className={`py-16 ${colors.card} ${colors.border} rounded-xl mx-4 my-4 text-center px-4 animate-fade-in`}>
                    <h2 className="text-3xl font-bold">Share Your Experience</h2>
                    <p className={`mt-4 text-lg ${colors.subtext} max-w-2xl mx-auto`}>
                        Your feedback is important to us! Please share your review.
                    </p>

                    <form onSubmit={handleSubmit(ReviewSubmitHandler)} className={`mt-10 max-w-md mx-auto ${colors.card} ${colors.glass} p-6 rounded-xl shadow-lg ${colors.border}`}>
                        <div className="mb-5 text-left">
                            <input type="text" placeholder="Your Name" {...register("name", { required: "Name is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="mb-5 text-left">
                            <input type="text" placeholder="Your Grade" {...register("grade", { required: "Grade is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade.message}</p>}
                        </div>

                        <div className="mb-5 text-left">
                            <textarea placeholder="Write your review here..." {...register("message", { required: "Message is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white h-32 resize-none border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg hover:scale-105 hover:brightness-110 transition-transform font-semibold">
                            Submit Review
                        </button>
                    </form>
                </section>
            )}

            {/* Smooth Testimonials Section */}
            {/* <section className={`py-16 ${colors.card} ${colors.border} rounded-xl mx-4 my-4 text-center animate-fade-in`}>
                <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
                <div className="relative w-full overflow-hidden">
                    <AutoScroll reviews={review} theme={theme} colors={colors} />
                </div>
            </section> */}
            <section
                className={`py-16 px-6 md:px-16 ${colors.card} ${colors.border} rounded-2xl mx-4 my-8 shadow-xl relative overflow-hidden`}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                >
                    What Our Students Say
                </motion.h2>

                <div className="relative w-full max-w-5xl mx-auto">
                    <AutoScroll reviews={review} theme={theme} colors={colors} />
                </div>

                {/* Floating animation */}
                <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-pink-500 rounded-full blur-3xl opacity-30"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-30"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </section>


            <footer className={`${colors.card} ${colors.border} text-center py-6 animate-fade-in`}>
                <p className="text-lg">Ready to start your journey with us?</p>
                <Link to="/" className="mt-4 inline-block bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg hover:scale-105 hover:brightness-110 transition-transform">
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

// Infinite Smooth AutoScroll Component
const AutoScroll = ({ reviews, theme, colors }) => {
    const x = useMotionValue(0);
    const totalWidth = reviews.length * 320; // 300 + gap approx

    useEffect(() => {
        const controls = animate(x, [-totalWidth, 0], {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
        });

        return () => controls.stop();
    }, [totalWidth]);

    return (
        <motion.div
            className="flex gap-8"
            style={{ x }}
            onMouseEnter={() => x.stop()}
            onMouseLeave={() => {
                const currentX = x.get();
                animate(x, [currentX, -totalWidth], {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: ((totalWidth + currentX) / totalWidth) * 30,
                    ease: "linear"
                });
            }}
        >
            {reviews.length === 0 ? (
                <p className={`${colors.subtext}`}>No reviews yet. Be the first to share!</p>
            ) : (
                [...reviews, ...reviews].map((item, index) => (
                    <div
                        key={index}
                        className={`backdrop-blur-md p-6 rounded-xl border ${colors.border} shadow-xl min-w-[300px] transition-all hover:scale-105 hover:brightness-110 
                            ${theme === 'light' ? 'bg-white/80 text-black' : 'bg-white/10 text-white'}`}
                    >
                        <p className={`italic ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>"{item.message}"</p>
                        <h3 className="mt-4 font-bold text-lg">{item.name}</h3>
                        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.grade}</p>
                    </div>
                ))
            )}
        </motion.div>
    )
}

export default Home;
