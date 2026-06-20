import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../context/BookingContext";
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const TRIP_TYPES = {
  oneway: "One Way Trip",
  roundtrip: "Round Trip",
  multicity: "Multi City",
};



const Booking = () => {
  const { bookingData, updateBookingData, vehicleTypes } = useContext(BookingContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
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
    fleet_type_id: "",
    pickup_location: "",
    drop_location: "",
    pickup_date: "",
    pickup_time: "",
    trip_type: "oneway",
    trip_id: "",
    user_trip_id: "",
  });

  // ✅ Sync formData with bookingData on component mount and bookingData changes
  useEffect(() => {
    if (bookingData) {
      setFormData(prev => ({
        ...prev,
        firstname: bookingData?.firstname || "",
        lastname: bookingData?.lastname || "",
        dob: bookingData?.dob || "",
        gender: bookingData?.gender || "",
        mobile: bookingData?.mobile || "",
        email: bookingData?.email || "",
        passengers: bookingData?.passengers || 1,
        pickupAddress1: bookingData?.pickupAddress1 || "",
        pickupAddress2: bookingData?.pickupAddress2 || "",
        pickupLandmark: bookingData?.pickupLandmark || "",
        pickupState: bookingData?.pickupState || "",
        pickupCity: bookingData?.pickupCity || "",
        pickupPostal: bookingData?.pickupPostal || "",
        dropAddress1: bookingData?.dropAddress1 || "",
        dropAddress2: bookingData?.dropAddress2 || "",
        dropLandmark: bookingData?.dropLandmark || "",
        dropState: bookingData?.dropState || "",
        dropCity: bookingData?.dropCity || "",
        dropPostal: bookingData?.dropPostal || "",
        fleet_type_id: bookingData?.fleet_type_id || "",
        pickup_location: bookingData?.pickup_location || "",
        drop_location: bookingData?.drop_location || "",
        pickup_date: bookingData?.pickup_date || "",
        pickup_time: bookingData?.pickup_time_24hr || "",
        trip_type: bookingData?.trip_type || "oneway",
        trip_id: bookingData?.trip_id || "",
        user_trip_id: bookingData?.user_trip_id || "",
      }));
    }
  }, [bookingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // ✅ Real-time context update for all fields
    // if (name === 'fleet_type_id') {
    //   const selectedVehicle = vehicleTypes.find(v => v.fleet_type_id == value);
    //   updateBookingData({ 
    //     [name]: value,
    //     vehicle_type: selectedVehicle?.fleet_type_name || ""
    //   });
    // } else {
    //   updateBookingData({ [name]: value });
    // }
  };

  const handleVerifyEmail = () => {
    alert("Verification email sent!");
    setEmailVerified(true);
  };

  const handleEditSearch = () => {
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveSearch = () => {
    // ✅ Find selected vehicle properly
    const selectedVehicle = vehicleTypes.find(
      (type) => type.fleet_type_id == formData.fleet_type_id
    );

    // ✅ Update all booking data including vehicle info
    const updatedData = {
      fleet_type_id: parseInt(formData.fleet_type_id),
      vehicle_type: selectedVehicle?.fleet_type_name || "",
      pickup_location: formData.pickup_location,
      drop_location: formData.drop_location,
      pickup_date: formData.pickup_date,
      pickup_time_24hr: formData.pickup_time,
      pickup_time: formatTimeTo12Hour(formData.pickup_time),
      trip_type: formData.trip_type,
      trip_id: formData.trip_type === "roundtrip" ? 2 : formData.trip_type === "multicity" ? 3 : 1
    };

    updateBookingData(updatedData);

    // ✅ Update formData to reflect changes
    setFormData(prev => ({
      ...prev,
      ...updatedData,
      pickup_time: formData.pickup_time // Keep 24hr format in formData
    }));

    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ Use existing trip_id from bookingData if available
      let currentTripId = bookingData?.user_trip_id || formData.user_trip_id;

      // ✅ Only create new trip if not exists
      if (!currentTripId) {
        const selectedVehicle = vehicleTypes.find(
          (type) => type.fleet_type_id == formData.fleet_type_id
        );

        // const distance = formData.trip_type === "multicity" ? 0 : 
        //   getDistanceInKm(
        //     bookingData.pickup_lat,
        //     bookingData.pickup_lng,
        //     bookingData.drop_lat,
        //     bookingData.drop_lng
        //   );

        const tripPayload = {
          trip_type: formData.trip_type,
          trip_id: formData.trip_type === "roundtrip" ? 2 : formData.trip_type === "multicity" ? 3 : 1,
          fleet_type_id: parseInt(formData.fleet_type_id),
          vehicle_type: selectedVehicle?.fleet_type_name || "",
          pickup_location: formData.pickup_location,
          drop_location: formData.drop_location,
          pickup_date: formData.pickup_date,
          pickup_time: formatTimeTo12Hour(formData.pickup_time),
          pickup_time_24hr: formData.pickup_time,
          // distance,
          customer_name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          phone: formData.mobile,
        };

        const tripResponse = await axiosInstance.post("/booking-trip", tripPayload);

        if (!tripResponse.data.status) {
          alert(tripResponse.data.message || "Failed to create trip booking");
          return;
        }

        currentTripId = tripResponse.data.data.user_trip_id;

        // ✅ Update context with trip_id
        updateBookingData({
          user_trip_id: currentTripId,
          trip_id: tripResponse.data.data.trip_id || currentTripId
        });
      }

      // ✅ Final booking payload
      const bookingPayload = {
        ...formData,
        pickup_time: formatTimeTo12Hour(formData.pickup_time),
        pickup_time_24hr: formData.pickup_time,
        user_trip_id: currentTripId,
        fleet_type_id: parseInt(formData.fleet_type_id),
      };

      const bookingResponse = await axiosInstance.post("/booking-details", bookingPayload);

      if (!bookingResponse.data.status) {
        alert(bookingResponse.data.message || "Booking failed. Please try again.");
        return;
      }

      // ✅ Final context update
      updateBookingData({
        ...formData,
        user_trip_id: currentTripId,
        fleet_type_id: parseInt(formData.fleet_type_id)
      });

      alert("Booking confirmed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  //   if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  //   const R = 6371;
  //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
  //   const dLon = ((lon2 - lon1) * Math.PI) / 180;
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos((lat1 * Math.PI) / 180) *
  //     Math.cos((lat2 * Math.PI) / 180) *
  //     Math.sin(dLon / 2) *
  //     Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   return parseFloat((R * c).toFixed(2));
  // };

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen">
      <section className="bg-gray-100 py-6 px-3  lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {Object.entries(TRIP_TYPES).map(([key, label]) => (
              <button
                key={key}
                className={`px-2 sm:px-4 py-1.5 md:py-2 rounded-t-md text-white transition-colors ${formData.trip_type === key ? "bg-[#ff3726]" : "bg-[#005cb4]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-white border-t-[5px] border-[#ff3726] p-3 py-4 md:p-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-g xl:grid-cols-6 gap-3 md:gap-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaCar className="text-gray-500" /> Vehicle Type
                  </label>
                  <select
                    name="fleet_type_id"
                    value={formData.fleet_type_id}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.fleet_type_id} value={type.fleet_type_id}>
                        {type.fleet_type_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" /> Pick-up
                  </label>
                  <input
                    name="pickup_location"
                    value={formData.pickup_location}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Enter pickup location"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" /> Drop-off
                  </label>
                  <input
                    name="drop_location"
                    value={formData.drop_location}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Enter drop location"
                    disabled={formData.trip_type === "multicity"}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-500" /> Date
                  </label>
                  <input
                    type="date"
                    name="pickup_date"
                    value={formData.pickup_date}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaClock className="text-gray-500" /> Time
                  </label>
                  <input
                    type="time"
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleSaveSearch}
                    className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaCar className="text-gray-500" /> Vehicle Type
                  </label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    {bookingData?.vehicle_type || "Not selected"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" /> Pick-up
                  </label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    {bookingData?.pickup_location || "Not specified"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" /> Drop-off
                  </label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    {bookingData?.drop_location || "Not specified"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-500" /> Date
                  </label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    {bookingData?.pickup_date || "Not specified"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    <FaClock className="text-gray-500" /> Time
                  </label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    {formatTimeTo12Hour(bookingData?.pickup_time_24hr) || "Not specified"}
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleEditSearch}
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit Search
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl  font-bold mb-3 md:mb-6">Booking Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 text-sm bg-white p-3 md:p-6 rounded-lg shadow">
            <InfoBlock
              title="Your Route"
              value={`${bookingData?.pickup_location || "Not specified"} - ${bookingData?.drop_location || "Not specified"}`}
            />
            <InfoBlock title="Trip type" value={TRIP_TYPES[bookingData?.trip_type] || "Not specified"} />
            <InfoBlock title="Vehicle Type" value={bookingData?.vehicle_type || "Not specified"} />
            <InfoBlock
              title="Trip start time"
              value={bookingData?.pickup_date && bookingData?.pickup_time_24hr
                ? `${formatDate(bookingData.pickup_date)}, ${formatTimeTo12Hour(bookingData.pickup_time_24hr)}`
                : "Not specified"}
            />
            {/* <InfoBlock
              title="Total distance"
              value={`${bookingData?.distance || 0} km`}
            /> */}
          </div>
        </section>

        <DetailsSection
          title="Pick-up Details"
          icon={<FaMapMarkerAlt className="text-red-500" />}
          fields={[
            { name: "pickupAddress1", label: "House No. / Appartment Name", icon: null },
            { name: "pickupAddress2", label: "Address", icon: null },
            { name: "pickupLandmark", label: "Landmark (Optional)", icon: null },
            { name: "pickupState", label: "State", icon: null, isSelect: true },
            { name: "pickupCity", label: "City", icon: null },
            { name: "pickupPostal", label: "Postal Code", icon: null },
          ]}
          formData={formData}
          handleChange={handleInputChange}
        />

        <DetailsSection
          title="Drop-off Details"
          icon={<FaMapMarkerAlt className="text-blue-500" />}
          fields={[
            { name: "dropAddress1", label: "House No. / Appartment Name", icon: null },
            { name: "dropAddress2", label: "Address", icon: null },
            { name: "dropLandmark", label: "Landmark (Optional)", icon: null },
            { name: "dropState", label: "State", icon: null, isSelect: true },
            { name: "dropCity", label: "City", icon: null },
            { name: "dropPostal", label: "Postal Code", icon: null },
          ]}
          formData={formData}
          handleChange={handleInputChange}
        />

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-6 flex items-center gap-2">
            <FaUser className="text-gray-600" /> Personal Details
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 text-sm bg-white px-3 py-4 md:p-6 rounded-lg shadow">
            <FormInput
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              icon={<FaUser className="text-gray-500" />}
              required
            />
            <FormInput
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              icon={<FaUser className="text-gray-500" />}
            />

            <FormInput
              label="Date Of Birth (Optional)"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />

            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={["Male", "Female", "Other"]}
            />

            <FormInput
              label="Mobile No."
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              icon={<FaPhone className="text-gray-500" />}
              required
            />

            <div className="relative">
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaEnvelope className="text-gray-500" /> Email Address
              </label>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-grow border rounded-l px-3 sm:px-4 py-1.5 md:py-2"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className={`text-white font-semibold px-4 border border-l-0 rounded-r ${emailVerified ? "bg-green-500 border-green-500" : "bg-red-500 border-red-500 hover:bg-red-600"}`}
                >
                  {emailVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>

            <FormInput
              label="Total Number of Passengers"
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              min="1"
              required
            />

            <div className="md:col-span-3 flex justify-center mt-3 md:mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !emailVerified}
                className={`px-4 md:px-8 py-1.5 md:py-3 bg-yellow-400 border border-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-all flex items-center gap-2 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""} ${!emailVerified ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

// Helper Components
const FormInput = ({ label, type = "text", name, value, onChange, icon, min, required = false, ...props }) => (
  <div>
    <label className="block mb-1 font-medium flex items-center gap-1">
      {icon} {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      className="w-full px-3 sm:px-4 py-1.5 md:py-2 border rounded"
      required={required}
      {...props}
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options = [] }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 sm:px-4 py-1.5 md:py-2 border rounded"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const InfoBlock = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded">
    <div className="text-gray-500 text-sm">{title}</div>
    <div className="font-semibold">{value || "-"}</div>
  </div>
);

const DetailsSection = ({ title, icon, fields, formData, handleChange }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold mb-2 md:mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 bg-white px-3 py-4 md:p-6 rounded-lg shadow">
      {fields.map((field) => (
        <div key={field.name}>
          {field.isSelect ? (
            <FormSelect
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              options={["Uttar Pradesh", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"]}
            />
          ) : (
            <FormInput
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              icon={field.icon}
            />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default Booking;