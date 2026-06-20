import { useState } from "react";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";


export default function DashboardLayout({ children }) {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div className="flex relative w-full">
            {show ? <div className="fixed lg:relative top-0 left-0 h-full lg:h-auto bg-white lg:bg-none shadow-[3px_-1px_3px_0px_rgba(0,_0,_0,_0.1)] z-10"> <Sidebar handleClickToggle={handleClick} /> </div>
                : <div className="fixed top-[82px] sm:top-[85px] lg:top-[95px] left-1 h-fit  shadow-[3px_0px_3px_0px_rgba(0,_0,_0,_0.1)] p-2 bg-[var(--global-red)] z-10" onClick={handleClick}><GiHamburgerMenu color="#ffffff" /></div>
            }

            <main className="p-3 sm:p-4 md:p-5 bg-gray-50 w-full min-h-screen">
                {children}
            </main>
        </div>
    );
}
