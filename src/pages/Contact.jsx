import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="py-10 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Get in Touch With Us</h1>
        <p className="mt-2 text-base md:text-lg max-w-2xl mx-auto text-gray-600">
          Have questions or need assistance? We’re here to help you 24/7. Fill out the form or reach us through the contact details below.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Your Phone (optional)"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select Enquiry Type</option>
              <option>Booking</option>
              <option>Support</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3 text-gray-700 text-sm">
            <p className="flex items-center">
              <FaPhone className="text-[#ef3d23] mr-2" /> +91 12345 67890
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-[#ef3d23] mr-2" /> support@intraroutes.com
            </p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="text-[#ef3d23] mr-2" /> 123 Business Park, City, State
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-5 flex space-x-4">
            <a href="#"><FaFacebook className="text-blue-600 text-lg hover:text-blue-800" /></a>
            <a href="#"><FaInstagram className="text-pink-500 text-lg hover:text-pink-700" /></a>
            <a href="#"><FaLinkedin className="text-blue-700 text-lg hover:text-blue-900" /></a>
            <a href="#"><FaTwitter className="text-blue-400 text-lg hover:text-blue-600" /></a>
          </div>

          {/* Google Map */}
          <div className="mt-6">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.6804690389183!2d72.57136227502212!3d23.008354779178184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84d9c6f3ad15%3A0x95d67b8b9d6c8b3c!2sSample%20Office!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-56 rounded-md border border-gray-200"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
