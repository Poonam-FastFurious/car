import React from "react";
import { FaCar, FaMapMarkedAlt, FaHandshake, FaClock } from "react-icons/fa";

const Services = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className=" py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl ">
            Reliable transport solutions tailored for your needs.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaCar className="text-blue-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">City Rides</h3>
          <p className="text-gray-600">
            Comfortable and affordable rides within the city anytime, anywhere.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaMapMarkedAlt className="text-green-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Outstation Trips</h3>
          <p className="text-gray-600">
            Safe and hassle-free travel for your long-distance journeys.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaHandshake className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Corporate Services</h3>
          <p className="text-gray-600">
            Professional travel solutions for your business needs.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaClock className="text-red-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Hourly Rentals</h3>
          <p className="text-gray-600">
            Flexible rentals for shopping, events, or short trips.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We provide reliable, safe, and comfortable rides with transparent pricing,
            experienced drivers, and 24/7 support to make your travel stress-free.
          </p>
          <ul className="grid gap-6 md:grid-cols-3 text-left max-w-4xl mx-auto">
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> 24/7 Availability
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> Professional Drivers
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> Affordable Pricing
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> Easy Booking
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> Safe & Clean Vehicles
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">✔</span> Customizable Packages
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Ride?</h2>
          <p className="text-blue-100 mb-6">
            Book now and experience comfort and safety like never before.
          </p>
          <a
            href="/booking"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}


export default Services;