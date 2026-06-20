import React, { useContext, useEffect, useRef, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import HeroCar from "../assets/images/HomeImages/heroCar.png"

const TRIP_TYPES = [
  { id: "oneway", label: "One Way Trip" },
  { id: "roundtrip", label: "Round Trip" },
  { id: "multicity", label: "Multi City" },
];

const HeroSection = () => {
  const { updateBookingData, vehicleTypes } = useContext(BookingContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("oneway");
  const [form, setForm] = useState({
    fleet_type_id: "",
    pickup_location: "",
    pickup_lat: null,
    pickup_lng: null,
    drop_location: "",
    drop_lat: null,
    drop_lng: null,
    pickup_date: "",
    pickup_time: "",
    trip_type: "oneway",
  });

  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const pickupRef = useRef();
  const dropRef = useRef();

  useEffect(() => {
    const setupAutocomplete = (ref, fieldName) => {
      if (!ref.current || !window.google) return;
      const autocomplete = new window.google.maps.places.Autocomplete(ref.current, {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();

        setForm(prev => ({
          ...prev,
          [fieldName]: address,
          [`${fieldName.split("_")[0]}_lat`]: lat,
          [`${fieldName.split("_")[0]}_lng`]: lng,
        }));
      });
    };

    setupAutocomplete(pickupRef, "pickup_location");
    setupAutocomplete(dropRef, "drop_location");
  }, []);

  // const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  //   if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  //   const R = 6371;
  //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
  //   const dLon = ((lon2 - lon1) * Math.PI) / 180;
  //   const a =
  //     Math.sin(dLat / 2) ** 2 +
  //     Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   return parseFloat((R * c).toFixed(2));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!form.pickup_lat || !form.pickup_lng) {
      newErrors.pickup_location = "Please select a valid pickup location";
      valid = false;
    }

    if (form.trip_type !== "multicity" && (!form.drop_lat || !form.drop_lng)) {
      newErrors.drop_location = "Please select a valid drop location";
      valid = false;
    }

    if (!form.fleet_type_id) {
      newErrors.fleet_type_id = "Please select a vehicle type";
      valid = false;
    }

    if (!form.pickup_date) {
      newErrors.pickup_date = "Please select a pickup date";
      valid = false;
    }

    if (!form.pickup_time || !/^\d{2}:\d{2}$/.test(form.pickup_time)) {
      newErrors.pickup_time = "Please enter a valid time in HH:MM format";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const formatTimeTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const selectedVehicle = vehicleTypes.find(v => v.fleet_type_id == form.fleet_type_id);
      const payload = {
        trip_id: form.trip_type === "roundtrip" ? 2 : form.trip_type === "multicity" ? 3 : 1,
        trip_type: form.trip_type,
        fleet_type_id: parseInt(form.fleet_type_id),
        vehicle_type: selectedVehicle?.fleet_type_name || "",
        pickup_location: form.pickup_location,
        drop_location: form.drop_location,
        pickup_date: form.pickup_date,
        pickup_time: formatTimeTo12Hour(form.pickup_time),
        pickup_time_24hr: form.pickup_time,
        // distance: form.trip_type === "multicity"
        //   ? 0
        //   : getDistanceInKm(form.pickup_lat, form.pickup_lng, form.drop_lat, form.drop_lng),
        customer_name: "Test User",
        email: "test@example.com",
        phone: "9876543210",
      };

      const res = await axiosInstance.post("/booking-trip", payload);

      if (res?.data?.status) {
        updateBookingData({ ...payload, user_trip_id: res.data.data.user_trip_id });
        navigate("/booking");
      } else {
        const apiErrors = res.data.errors || {};
        const formattedErrors = Object.fromEntries(
          Object.entries(apiErrors).map(([key, val]) => [key, val[0] || `Invalid ${key}`])
        );
        setErrors(formattedErrors);
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        apiError: error?.response?.data?.message || "Something went wrong, please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center xl:min-h-[600px] hero-section overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10  mx-auto px-3 sm:px-4 lg:px-[40px]  xl:px-[100px] py-8 xl:py-18 text-white">
        <div className="max-w-2xl">
          <h2 className="text-lg font-medium text-white">Fast and Easy Way to Rent a Car</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl/16 font-bold sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 leading-tight">
            Explore the world with <br /> comfortable car
          </h1>
        </div>

        <div className="mt-5 md:mt-6 lg:mt-8 xl:mt-10 flex flex-wrap gap-0 sm:gap-2">
          {TRIP_TYPES.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setForm(prev => ({ ...prev, trip_type: tab.id }));
              }}
              className={`px-3 sm:px-4 py-1 lg:py-1.5 xl:py-2 border-r-[1px] sm:border-0 sm:rounded-t-[5px] transition-colors ${activeTab === tab.id
                ? "bg-[#ff3726] font-medium"
                : "bg-[#005cb4] hover:bg-[#004a9b]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-700 p-6 shadow-lg md:max-w-[520px] xl:max-w-[814px] mt-0 border-t-[5px] border-[#ff3726] grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4"
          noValidate
        >
          {/* Vehicle Type */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaCar className="text-gray-500" /> Vehicle Type
            </label>
            <select
              name="fleet_type_id"
              value={form.fleet_type_id}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full mt-1 px-2 py-1.5 h-8 xl:h-10 border rounded ${errors.fleet_type_id ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Type</option>
              {vehicleTypes.map(type => (
                <option key={type.fleet_type_id} value={type.fleet_type_id}>
                  {type.fleet_type_name}
                </option>
              ))}
            </select>
            {errors.fleet_type_id && <p className="text-red-500 text-xs mt-1">{errors.fleet_type_id}</p>}
          </div>

          {/* Pickup Location */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" /> Pickup Location
            </label>
            <input
              ref={pickupRef}
              name="pickup_location"
              value={form.pickup_location}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className={`w-full mt-1 px-2 py-1.5 h-8 xl:h-10 border rounded ${errors.pickup_location ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.pickup_location && <p className="text-red-500 text-xs mt-1">{errors.pickup_location}</p>}
          </div>

          {/* Drop Location */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" /> Drop Location
            </label>
            <input
              ref={dropRef}
              name="drop_location"
              value={form.drop_location}
              onChange={handleChange}
              placeholder="Enter drop location"
              disabled={form.trip_type === "multicity"}
              className={`w-full mt-1 px-2 py-1.5 h-8 xl:h-10 border rounded ${errors.drop_location ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.drop_location && <p className="text-red-500 text-xs mt-1">{errors.drop_location}</p>}
          </div>

          {/* Pickup Date */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" /> Pickup Date
            </label>
            <input
              type="date"
              name="pickup_date"
              value={form.pickup_date}
              onChange={handleChange}
              min={today}
              disabled={isLoading}
              onClick={(e) => e.target.showPicker && e.target.showPicker()} // 👈 auto open
              className={`w-full mt-1 px-2 py-1.5 h-8 xl:h-10 border rounded ${errors.pickup_date ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.pickup_date && <p className="text-red-500 text-xs mt-1">{errors.pickup_date}</p>}
          </div>

          {/* Pickup Time */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaClock className="text-gray-500" /> Pickup Time
            </label>
            <input
              type="time"
              name="pickup_time"
              value={form.pickup_time}
              onChange={handleChange}
              disabled={isLoading}
              onClick={(e) => e.target.showPicker && e.target.showPicker()} // 👈 auto open
              className={`w-full mt-1 px-2 py-1.5 border h-8 xl:h-10 rounded ${errors.pickup_time ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.pickup_time && <p className="text-red-500 text-xs mt-1">{errors.pickup_time}</p>}
          </div>


          {/* Submit Button */}
          <div className="flex justify-center items-start pt-2 sm:pt-6 ">
            <button
              type="submit"
              disabled={isLoading}
              className={`custom-red max-w-[240px] text-white w-full h-8 xl:h-10 rounded hover:bg-red-600 transition-all flex items-center justify-center ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Go for booking →"
              )}
            </button>
          </div>

          {errors.apiError && (
            <div className="md:col-span-3 text-red-500 text-center">{errors.apiError}</div>
          )}
        </form>
      </div>

      <div className="  absolute -bottom-6 xl:-bottom-10 -right-32 xl:-right-24  hidden md:block h-[300px] lg:h-[320px]  xl:h-[400px]">
        <img src={HeroCar} alt="Luxury car for rent" className="w-full h-full" loading="lazy" />
      </div>
    </div>
  );
};

export default HeroSection;
