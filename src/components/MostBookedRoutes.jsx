import React from "react";
import Slider from "react-slick";
import { BsArrowRight, BsArrowRightCircle } from "react-icons/bs";
import HeadingIcon from "../assets/icons/heading icon.svg";
import ImgeOne from "../assets/images/HomeImages/image 1.jpg";
import ImgeTwo from "../assets/images/HomeImages/image 2.jpg";
import ImgeThree from "../assets/images/HomeImages/image 3.jpg";
import ImgeFour from "../assets/images/HomeImages/image 4.jpg";
import ImgeFive from "../assets/images/HomeImages/image 5.jpg";
import Arrow from "../assets/icons/arrow.svg"; // same arrow as used before

// Custom Arrows
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-2 sm:right-4 md:right-14 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)]  rounded-full flex items-center justify-center z-20 cursor-pointer"
    >
      <img src={Arrow} alt="Next" className="w-4" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-2 sm:left-4 md:left-14 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[var(--global-red)] rounded-full flex items-center justify-center z-20 cursor-pointer"
    >
      <img src={Arrow} alt="Prev" className="w-4 rotate-180" />
    </div>
  );
}

const routes = [
  {
    id: 1,
    title: "Delhi To Agra",
    price: "₹ 6,000",
    image: ImgeOne,
  },
  {
    id: 2,
    title: "Delhi To Jaipur",
    price: "₹ 7,000",
    image: ImgeTwo,
  },
  {
    id: 3,
    title: "Mumbai To Kerala",
    price: "₹ 15,000",
    image: ImgeThree,
  },
  {
    id: 4,
    title: "Mumbai To Kerala",
    price: "₹ 15,000",
    image: ImgeFour,
  },
  {
    id: 5,
    title: "Mumbai To Kerala",
    price: "₹ 15,000",
    image: ImgeFive,
  },
];

const MostBookedRoutes = () => {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "200px",
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerPadding: "120px", },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "60px",
        },

      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },

      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },

      },
    ],
  };

  return (
    <section className="bg-white  py-8 md:py-12 ">
      {/* Header */}
      <div className="px-3">
        <div className="text-center mb-[20px] md:mb-[30px] lg:mb-8">
          <img src={HeadingIcon} alt="divider" className="mx-auto h-5 md:h-6 xl:h-8" />
          <p className="font-gt font-light text-xs sm:text-sm md:text-base xl:text-lg text-[var(--fourth-text)] mt-3 lg:mt-4 mb-1">Discover Our Most Popular Routes to Drive</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Most Booked Routes
          </h2>
        </div>
      </div>

      {/* Slider */}
      <div className="relative sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:w-[100px] sm:before:h-full sm:before:bg-gradient-to-r before:from-white sm:before:to-transparent before:z-10 
                 sm:after:absolute sm:after:right-0 sm:after:top-0 sm:after:w-[100px] sm:after:h-full sm:after:bg-gradient-to-l sm:after:from-white sm:after:to-transparent sm:after:z-10 ">
        <Slider {...settings} className="!flex items-stretch gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="px-3 py-0 sm:p-3"
            >
              <div className="w-full rounded-xl overflow-hidden bg-red-3 transition-all flex flex-col h-full relative ">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3 flex justify-between items-center w-full absolute bottom-0 bg-gradient-to-b from-[#00000000] to-[#000000]">
                  <div>
                    <h3 className="text-md font-semibold text-white">
                      {route.title}
                    </h3>
                    <p className="text-sm text-[var(--global-red)]">
                      {route.price}
                      <span className="text-white"> / Person</span>
                    </p>
                  </div>
                  <div className="bg-white hover:bg-[var(--global-red)] text-[var(--global-red)] hover:text-white p-2 rounded-full cursor-pointer  transform hover:-rotate-45 ease-in-out duration-300">
                    <BsArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <button className="bg-[var(--second-blue)] text-white px-8 py-1.5 sm:py-2 md:py-3 font-bold rounded-md text-lg cursor-pointer">
          VIEW MORE
        </button>
      </div>
    </section>
  );
};

export default MostBookedRoutes;
