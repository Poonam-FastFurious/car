import React, { Component } from "react";
import Slider from "react-slick";
import { FaStar, FaGasPump, FaCar, FaCogs } from "react-icons/fa";
import Arrow from "../assets/icons/arrow.svg";
import HeadingIcon from "../assets/icons/heading icon.svg";
import Img1 from "../assets/images/HomeImages/img2.jpg";
import Img2 from "../assets/images/HomeImages/img1.jpg";
import Img3 from "../assets/images/HomeImages/img3.jpg";
import { FaCaretRight } from "react-icons/fa";

// Arrow Components (MUST be outside the component return)
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)] rounded-full flex items-center justify-center z-10 cursor-pointer"
        >
            <img src={Arrow} alt="Next" className="w-4 " />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)] rounded-full flex items-center justify-center z-10 cursor-pointer"
        >
            <img src={Arrow} alt="Prev" className="w-4 rotate-180" />
        </div>
    );
}

// Car Data
const cars = [
    {
        name: "Maruti Suzuki Dzire",
        price: "₹ 5,000",
        desc: "Introducing a car that blends style, technology, and performance into one stunning package.",
        seats: "4 Seats",
        transmission: "Manual",
        fuel: "Petrol",
        rating: 4.5,
        image: Img1,
    },
    {
        name: "Toyota Innova Crysta",
        price: "₹ 6,000",
        desc: "With its aerodynamic silhouette,and LED headlights, this vehicle turns heads wherever it goes",
        seats: "7 Seats",
        transmission: "Manual",
        fuel: "Petrol",
        rating: 4.5,
        image: Img2,
    },
    {
        name: "Maruti Suzuki Ertiga",
        price: "₹ 6,000",
        desc: "Spacious and comfortable, the Toyota Innova Crysta is perfect for family trips or group travel.",
        seats: "7 Seats",
        transmission: "Manual",
        fuel: "Petrol",
        rating: 4.5,
        image: Img3,
    },
];

const CarRentalSection = () => {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="bg-[#fafafa] py-8 md:py-12 relative">


            <div className="px-3">
                <div className="text-center mb-[20px] md:mb-[30px] lg:mb-8">
                    <img src={HeadingIcon} alt="divider" className="mx-auto h-5 md:h-6 xl:h-8" />
                    <p className="font-gt font-light text-xs sm:text-sm md:text-base xl:text-lg text-[var(--fourth-text)] mt-3 lg:mt-4 mb-1">Explore Our Range of Rental Cars Today</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-black">
                        Cars We’re Offering for Rentals
                    </h2>
                </div>
            </div>
            <div className=" px-12 sm:px-14 lg:px-20 relative">
                <Slider {...settings} className="!flex items-stretch gap-4">
                    {cars.map((car, index) => (
                        <div key={index} className=" p-0 sm:p-3">
                            <div className="bg-white rounded-md sm:rounded-xl sm:shadow-md w-full h-full flex flex-col">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                                <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="font-semibold text-lg">{car.name}</h3>
                                        <p className="text-red-600 font-bold mt-1">
                                            {car.price} <span className="text-gray-500 font-normal">/ Day</span>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">{car.desc}</p>
                                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-700 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <FaCar color="var( --global-red)" /> {car.seats}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCogs color="var( --global-red)" /> {car.transmission}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaGasPump color="var(--global-red)" /> {car.fuel}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4  ">
                                        <div className="flex items-center gap-1 text-[#fec107]">
                                            <span className="bg-black text-white text-xs px-2 py-0.5 rounded">
                                                {car.rating}
                                            </span>
                                            {[...Array(4)].map((_, i) => (
                                                <FaStar key={i} size={14} />
                                            ))}
                                            <FaStar className="text-gray-300" size={14} />
                                        </div>
                                        <button className="text-sm text-black  hover:text-white px-4 py-1.5 rounded bg-white hover:bg-[var(--global-red)] cursor-pointer border-[1px] border-[#f2f2f2] ease-in-out duration-300 flex items-center gap-1.5">
                                            View Details <FaCaretRight className="hidden sm:block" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* View More */}
                <div className="text-center mt-6">
                    <button className="bg-[var(--second-blue)] text-white px-8 py-1.5 sm:py-2 md:py-3 font-bold rounded-md text-lg cursor-pointer">
                        VIEW MORE
                    </button>
                </div>
            </div>



        </div>
    );
};

export default CarRentalSection;
