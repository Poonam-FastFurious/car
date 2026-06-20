// components/dashboard/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCar, FaCreditCard, FaLock } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


export default function Sidebar({ handleClickToggle }) {

  return (
    <div className="w-54 md:w-58 h-fit bg-white sticky top-[95px] left-0  flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        {/* <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        /> */}
        <span className="font-semibold">Aditya Kumar</span>
        <div className="p-1 border-[1px] border-gray-200 rounded-full shadow-lg bg-[var(--global-red)]" onClick={handleClickToggle}>
          <RxCross2 color="#ffffff" />
        </div>
      </div>

      <nav className="flex flex-col p-3 space-y-1.5">
        {[
          { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
          { to: "/profile", label: "My Profile", icon: <FaUser /> },
          { to: "/bookings", label: "My Bookings", icon: <FaCar /> },
          { to: "/payments", label: "Payments", icon: <FaCreditCard /> },
          { to: "/change-password", label: "Change Password", icon: <FaLock /> },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${isActive ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
