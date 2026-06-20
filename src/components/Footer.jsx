
import SaffronLogo from "../assets/icons/LogoForFooter.svg"
import Techvision from "../assets/icons/tV-logo.jpg"
import Youtube from "../assets/icons/youtube.svg"
import Facebook from "../assets/icons/facebook.svg"
import Instagram from "../assets/icons/instagram.svg"
import { NavLink } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="px-1.5 md:px-3 xl:px-8 pt-4 md:pt-8">
                <div className="bg-[#1a1a1a] text-white pt-4 sm:pt-8 xl:pt-18 px-4 xl:px-14  pb-8 rounded-se-[12px]  rounded-ss-[12px] md:rounded-se-[28px]  md:rounded-ss-[28px] lg:rounded-se-[34px]  lg:rounded-ss-[34px] xl:rounded-se-[80px]  xl:rounded-ss-[80px]">
                    <div className=" mx-auto px-0 sm:px-6 grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-8 xl:gap-14">
                        {/* Left Column */}
                        <div className="col-span-2">
                            <div className="text-2xl font-bold mb-6 text-white">
                                <img
                                    src={SaffronLogo}
                                    alt="TecVision Logo"
                                    className="h-12"
                                />
                            </div>
                            <p className=" text-sm   text-gray-300 text-justify">
                                Experience hassle-free travel with our car rental service, offering
                                clean, well-maintained vehicles and dedicated customer
                                support—ensuring every journey is comfortable, and reliable from the
                                moment you book to your
                                <span className="text-red-500 cursor-pointer"> Read More...</span>
                            </p>
                            <div className="mt-4">
                                <p className="font-semibold mb-2">FOLLOW US</p>
                                <div className="flex gap-3">
                                    <img src={Facebook} alt="Facebook" className="h-8 w-8 xl:h-10 xl:w-10" />
                                    <img src={Instagram} alt="Instagram" className="h-8 w-8 xl:h-10 xl:w-10" />
                                    <img src={Youtube} alt="Youtube" className="h-8 w-8 xl:h-10 xl:w-10" />
                                </div>
                            </div>
                        </div>

                        {/* Useful Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-2 border-b-2 border-red-500 inline-block">
                                Useful Links
                            </h4>
                            <ul className="space-y-2 text-sm   text-gray-300">

                                <li>
                                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" className={({ isActive }) => isActive ? 'text-red-600' : ''}>About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/fleet" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Fleet</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/services" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Services</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/partners" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Partners</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Other Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-2 border-b-2 border-red-500 inline-block">
                                Other Links
                            </h4>
                            <ul className="space-y-2 text-sm  text-gray-300">
                                {/* <li>Cars Information</li>
                                <li>Testimonials</li> */}
                                <li>
                                    <NavLink to="/termsConditions" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Terms & Conditions</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/privacyPolicy" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Privacy Policy</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cancellationPolicy" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Cancellation Policy</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/#" className={({ isActive }) => isActive ? 'text-red-600' : ''}>Tour Enquiry</NavLink>
                                </li> */}

                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-2">
                            <h4 className="font-bold text-lg mb-2 border-b-2 border-red-500 inline-block">
                                Contact Info
                            </h4>
                            <ul className="space-y-2 text-sm   text-gray-300">
                                <li className="flex gap-3">
                                    <div className="py-1"><FaMapMarkerAlt className="text-[#ef3d23]" /></div>
                                    <p className="p-0 m-0">A - 1509, T3, NX-ONE, Sector - Techzone IV,<br />
                                        Gr. Noida (West) - 201306, Uttar Pradesh, India</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="py-1">< FaPhone className="text-[#ef3d23]" /></div> <p>+91 120 6580475</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="py-1"><FaWhatsapp className="text-[#ef3d23]" /></div> <p>+91 97177 76640 (WhatsApp)</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="py-1"><FaEnvelope className="text-[#ef3d23]" /></div> <p>info@intraroutes.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-red-600 text-white text-sm py-3 px-6 flex flex-col md:flex-row justify-between items-center">
                <p>© 2025 All Rights Reserved. Intra Routes
                </p>
                <div className="flex items-center gap-2">
                    Developed & Promoted by:
                    <div className="bg-white rounded-md p-1.5">
                        <img
                            src={Techvision}
                            alt="TecVision Logo"
                            className="h-4"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;