import { FaCar, FaCogs, FaGasPump, FaStar } from "react-icons/fa";
import Img1 from "../assets/images/AboutImages/luxury car.jpg";
import Img2 from "../assets/images/AboutImages/suv.jpg";
import Img3 from "../assets/images/AboutImages/tempo car.jpg";
import Img4 from "../assets/images/AboutImages/lucjary car.jpg";
import Img5 from "../assets/images/AboutImages/mini-bus.jpg";

const fleets = [
  {
    name: "Luxury Sedan",
    image: Img1,
    capacity: "3 Passengers, 2 Bags",
    seats: "3 Seats",
    transmission: "Automatic",
    fuel: "Petrol",
    features: ["Leather Seats", "AC", "Premium Music System"],
    price: "₹3500",
    rating: "4.5",
  },
  {
    name: "SUV",
    image: Img2,
    capacity: "6 Passengers, 4 Bags",
    seats: "6 Seats",
    transmission: "Automatic",
    fuel: "Diesel",
    features: ["Spacious Interior", "AC", "USB Charging"],
    price: "₹5000",
    rating: "4.7",
  },
  {
    name: "Tempo Traveller",
    image: Img3,
    capacity: "12 Passengers, 8 Bags",
    seats: "12 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    features: ["Comfort Seats", "Large Windows", "Music System"],
    price: "₹8000",
    rating: "4.6",
  },
  {
    name: "Luxury Van",
    image: Img4,
    capacity: "8 Passengers, 6 Bags",
    seats: "8 Seats",
    transmission: "Automatic",
    fuel: "Petrol",
    features: ["Recliner Seats", "AC", "Mini Fridge"],
    price: "₹7000",
    rating: "4.8",
  },
  {
    name: "Mini Bus",
    image: Img5,
    capacity: "20 Passengers, 15 Bags",
    seats: "20 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    features: ["Spacious", "Comfortable Seating", "AC"],
    price: "₹12000",
    rating: "4.4",
  },
];

const Fleet = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our Fleet
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Choose from our premium collection of vehicles for your next journey.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fleets.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border h-full flex flex-col hover:shadow-lg transition"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-xl">{car.name}</h3>
                  <p className="text-red-600 font-bold mt-1">
                    {car.price}{" "}
                    <span className="text-gray-500 font-normal">/ Day</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{car.capacity}</p>

                  <div className="flex items-center gap-3 mt-4 text-sm text-gray-700 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FaCar /> {car.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCogs /> {car.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaGasPump /> {car.fuel}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded">
                      {car.rating}
                    </span>
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                    <FaStar className="text-gray-300" size={14} />
                  </div>
                  <button className="text-sm bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fleet;
