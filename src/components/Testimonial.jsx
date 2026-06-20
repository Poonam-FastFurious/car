
import Slider from "react-slick"
import Arrow from "../assets/icons/arrow.svg";
import Star from "../assets/icons/star icon.svg";
import Quote from "../assets/icons/Quote.svg";
import { FaStar } from "react-icons/fa";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className="absolute right-0 md:right-[-40px] top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)] rounded-full flex items-center justify-center z-10 cursor-pointer"
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
            className="absolute left-0 md:left-[-40px] top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)] rounded-full flex items-center justify-center z-10 cursor-pointer"
        >
            <img src={Arrow} alt="Prev" className="w-4 rotate-180" />
        </div>
    );
}

const testimonials = [
    {
        name: "Pictrik Lamar",
        location: "Austin",
        rating: 5,
        feedback: "I had a wonderful experience with this car rental company. The vehicle was in excellent condition, the booking process was seamless, and the staff was friendly and professional. Highly recommended for hassle-free travel."
    },
    {
        name: "Sarah James",
        location: "Houston",
        rating: 4,
        feedback: "The service was great and car was very clean. Everything was quick and professional. Definitely would rent again!"
    },
    {
        name: "Michael Clark",
        location: "Dallas",
        rating: 5,
        feedback: "Amazing service! From pickup to drop-off, everything went smoothly. Great value for money and excellent customer support."
    },
];

const Testimonial = () => {
    const settings = {
        dots: false,
        // infinite: true,
        // speed: 300,
        // autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <section className=" px-3  sm:px-10 md:px-20 py-8 md:py-12">
            <div className="flex justify-center gap-x-16  flex-col lg:flex-row gap-12 items-start">
                {/* Left Side */}
                <div className="max-w-full lg:max-w-xl  w-full">
                    <p className="text-sm text-[var(--fourth-text)] mb-1">Testimonial</p>
                    <h2 className="text-3xl font-bold text-black mb-1">What Our Customers Says</h2>
                    <div className="w-12 h-[2px] bg-[#ef3d23] mb-4" />
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                        Our car rental service delivers reliable, clean, and well-maintained vehicles with
                        exceptional customer support, ensuring a smooth and comfortable journey every time you travel with us.
                    </p>
                    {/* View More */}
                    <div className=" mt-6">
                        <button className="bg-[var(--second-blue)] text-white px-8 py-1 sm:py-1.5 md:py-2 font-bold rounded-md text-lg cursor-pointer">
                            VIEW MORE
                        </button>
                    </div>
                </div>

                {/* Right Side - Slider */}
                <div className="relative max-w-full lg:max-w-lg   w-full">
                    <Slider {...settings}>
                        {testimonials.map((item, idx) => (
                            <div key={idx} className="px-6">
                                <div className="relative border border-red-500 rounded-xl bg-[#fff8f6] p-4 sm:p-8 shadow-sm text-center text-sm leading-relaxed">
                                    {/* Quote Top Left */}
                                    <div className="absolute top-[20px] left-[20px] text-[60px] text-red-300 opacity-40 z-0">
                                        <img src={Quote} alt="" className="w-5" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="font-bold text-black text-base">{item.name}</h3>
                                        <p className="text-[#5e646a] text-sm font-semibold">{item.location}</p>
                                        <div className=" my-2 gap-x-2 flex justify-center">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <FaStar className="text-[#fec107]" size={14} />
                                            ))}
                                        </div>

                                        <p className="text-gray-700 mt-2">{item.feedback}</p>
                                    </div>

                                    {/* Quote Bottom Right */}
                                    <div className="absolute bottom-[20px] right-[20px] text-[60px] text-red-300 opacity-40 z-0">
                                        <img src={Quote} alt="" className=" rotate-180 w-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
