import React from "react";
import { FaMoneyBillWave, FaUserCheck, FaBalanceScale, FaGlobe } from "react-icons/fa";

const About = () => {
    const highlights = [
        {
            icon: <FaMoneyBillWave className="text-3xl text-green-500" />,
            title: "Save up to 60%",
            desc: "Book return-leg vehicles and cut your travel costs significantly.",
        },
        {
            icon: <FaUserCheck className="text-3xl text-blue-500" />,
            title: "Verified Drivers",
            desc: "Travel with licensed drivers rated by real passengers.",
        },
        {
            icon: <FaBalanceScale className="text-3xl text-yellow-500" />,
            title: "Smart Bidding Model",
            desc: "Receive competitive quotes tailored to your journey needs.",
        },
        {
            icon: <FaGlobe className="text-3xl text-purple-500" />,
            title: "For All Travelers",
            desc: "Perfect for solo trips, groups, and even travel agents.",
        },
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Route, Your Choice.</h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    At <span className="font-semibold text-indigo-600">IntraRoutes</span>, we're revolutionizing how India travels intercity — connecting passengers with verified drivers for a smarter, sustainable, and cost-effective journey.
                </p>
            </section>

            {/* About Description */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-4">About IntraRoutes</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                        We operate on a bidding-based model, allowing travelers to post their journey needs and receive multiple fare quotes from verified drivers. Whether you’re a solo traveler or a group, IntraRoutes puts you in control — offering choice, transparency, and value in every ride.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We're also building a specialized B2B portal for travel agents to create custom itineraries and receive live quotes from our network of drivers — complete with full vehicle details, documents, and photos — streamlining the booking process.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
                        alt="Intercity travel"
                        className="rounded-2xl shadow-lg w-full max-w-md"
                    />
                </div>
            </section>

            {/* Why IntraRoutes */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Why IntraRoutes?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {highlights.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="mb-4 flex justify-center">{item.icon}</div>
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};



export default About;