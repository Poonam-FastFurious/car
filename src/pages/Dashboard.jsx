import React, { useEffect, useState } from "react";
import { FaStar, FaUserFriends, FaSuitcase, FaRoute } from "react-icons/fa";
import Img1 from "../assets/images/HomeImages/img1.jpg";
import { IoIosArrowRoundUp } from "react-icons/io";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy API call simulation
  useEffect(() => {
    setTimeout(() => {
      setCars([
        {
          id: 1,
          name: "Maruti Dzire (2023)",
          type: "Sedan | AC",
          rating: 4.5,
          reviews: 128,
          seats: 3,
          bags: 1,
          distance: "778 KM",
          price: "₹ 16,100/-",
          note: "(incl. all taxes)",
          img: Img1,
        },
        {
          id: 2,
          name: "Maruti Dzire (2024)",
          type: "Sedan | AC",
          rating: 4.7,
          reviews: 525,
          seats: 3,
          bags: 1,
          distance: "778 KM",
          price: "₹ 16,500/-",
          note: "All inclusive",
          img: Img1,
        },
        {
          id: 3,
          name: "Maruti Dzire (2025)",
          type: "Sedan | AC",
          rating: 4.8,
          reviews: 992,
          seats: 3,
          bags: 1,
          distance: "778 KM",
          price: "₹ 17,500/-",
          note: "All inclusive",
          img: Img1,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="bg-white rounded-lg p-3 sm:p-6 md:p-8 shadow ">
      <h1 className="text-lg md:text-xl font-semibold mt-2 text-center">
        Your Car Booking Request Has Been Submitted
      </h1>
      <p className="text-gray-500 mt-1 text-sm md:text-base text-center">
        We are looking for your best available cars
      </p>

      {/* Timer */}
      <div className="flex justify-center -mb-6 mt-6 relative z-5">
        <div className="bg-[var(--primary)] text-white rounded-full  border-[6px] w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center font-bold text-sm md:text-lg shadow-[0px_1px_8px_3px_rgba(0,_0,_0,_0.1)]">
          01:30
          <span className="text-[8px] md:text-[10px] font-normal leading-tight">
            Time Remaining
          </span>
        </div>
      </div>

      {/* Pickup & Drop Card */}
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between bg-white  rounded-lg shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] px-4 pb-4 pt-20 mt-[-60px] text-sm md:text-base">
        <div className="flex flex-col items-start mb-4 md:mb-0 md:pr-4 ">
          <p className="text-xs font-semibold text-start">Pick-up Location</p>
          <p className="text-gray-600 mt-1 text-sm text-start">
            Indira Gandhi International Airport (Terminal 3, Delhi)
          </p>
          <p className="mt-4 text-xs font-semibold text-start">Pick-up Date</p>
          <p className="text-gray-600 text-sm text-start">25-July-2025 At 12:15 PM</p>
          <p className="mt-4 text-xs font-semibold text-start">Distance</p>
          <p className="text-gray-600 text-sm text-start">770 km</p>
        </div>


        <div className="flex flex-col items-start md:pl-4">
          <p className="text-xs font-semibold text-start">Drop Location</p>
          <p className="text-gray-600 mt-1 text-sm text-start">
            Netaji Subhas Chandra Bose International Airport (CCU), Kolkata
          </p>
          <p className="mt-4 text-xs font-semibold text-start">Booking ID</p>
          <p className="text-gray-600 text-sm text-start">OW50-5H17948</p>
        </div>
      </div>

      {/* Car List */}
      <div className=" pt-8 md:pt-10 w-full">
        {loading ? (
          <div className="text-center text-gray-500 font-medium">
            Loading available cars...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-sm md:text-base">{car.name}</h2>
                  <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                    {car.type}{" "}
                    <span className="text-red-500 cursor-pointer text-xs md:text-sm">
                      More Details
                    </span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center text-yellow-500 mt-1 text-xs md:text-sm">
                    <FaStar />
                    <span className="ml-1 text-gray-800">{car.rating}</span>
                    <span className="ml-1 text-gray-500">
                      ({car.reviews} rides)
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-3">
                    <span className="flex items-center gap-1">
                      <FaUserFriends color="var( --global-red)" /> {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <FaSuitcase color="var( --global-red)" /> {car.bags} Bag
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRoute color="var( --global-red)" /> {car.distance}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <div className="">
                      <p className="mt-4 text-base md:text-lg font-semibold line-height-none">
                        {car.price}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500">{car.note}</p>
                    </div>

                    <div className="">
                      {/* Button */}
                      <button className="mt-3 w-full bg-[#fff001] hover:bg-[#f0e000] text-black font-medium px-3 py-1 rounded text-xs md:text-sm flex items-center gap-1">
                        Book This Car <IoIosArrowRoundUp className=" transform rotate-45" size={26} />
                      </button>
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
