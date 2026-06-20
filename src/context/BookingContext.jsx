import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [bookingData, setBookingData] = useState(() => {
    const savedData = localStorage.getItem('bookingData');
    return savedData ? JSON.parse(savedData) : {
      trip_id: "",
      fleet_type_id: "",
      user_trip_id: "",
      pickup_location: "",
      drop_location: "",
      pickup_date: "",
      pickup_time_24hr: "",
      pickup_time: "",
      vehicle_type: "",
      trip_type: "oneway",
      drop_coords: null,
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      dob: "",
      gender: "",
      mobile: user?.phone || "",
      email: user?.email || "",
      passengers: 1,
      pickupAddress1: "",
      pickupAddress2: "",
      pickupLandmark: "",
      pickupState: "",
      pickupCity: "",
      pickupPostal: "",
      dropAddress1: "",
      dropAddress2: "",
      dropLandmark: "",
      dropState: "",
      dropCity: "",
      dropPostal: ""
    };
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isVehicleLoading, setIsVehicleLoading] = useState(false);

  const fetchVehicleTypes = async () => {
    setIsVehicleLoading(true);
    try {
      const res = await axiosInstance.post("/fleet-type");
      if (res.data?.data) {
        setVehicleTypes(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    } finally {
      setIsVehicleLoading(false);
    }
  };



  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    if (user) {
      setBookingData(prev => ({
        ...prev,
        firstname: user?.firstname || prev.firstname,
        lastname: user?.lastname || prev.lastname,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile
      }));
    }
  }, [user]);

  const updateBookingData = (newData) => {
    setBookingData(prev => ({ ...prev, ...newData }));
  };

  const clearBookingData = () => {
    setBookingData({
      fleet_type_id: "",
      trip_id: "",
      pickup_location: "",
      drop_location: "",
      pickup_date: "",
      pickup_time_24hr: "",
      pickup_time: "",
      vehicle_type: "",
      trip_type: "oneway",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      dob: "",
      gender: "",
      mobile: user?.phone || "",
      email: user?.email || "",
      passengers: 1,
      pickupAddress1: "",
      pickupAddress2: "",
      pickupLandmark: "",
      pickupState: "",
      pickupCity: "",
      pickupPostal: "",
      dropAddress1: "",
      dropAddress2: "",
      dropLandmark: "",
      dropState: "",
      dropCity: "",
      dropPostal: "",
      user_trip_id:""
    });
    localStorage.removeItem('bookingData');
  };

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  return (
    <BookingContext.Provider value={{
      bookingData,
      updateBookingData,
      clearBookingData,
      vehicleTypes,
      isVehicleLoading,
      fetchVehicleTypes
    }}>
      {children}
    </BookingContext.Provider>
  );
};