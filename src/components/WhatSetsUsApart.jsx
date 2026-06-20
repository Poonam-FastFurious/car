import HeadingIcon from "../assets/icons/heading icon.svg"
import IconOne from "../assets/icons/verified driver.svg"
import IconTwo from "../assets/icons/24X7.svg"
import IconThree from "../assets/icons/WIDE FLEET.svg"
import IconFour from "../assets/icons/Fleet search.svg"

const features = [
    {
        id: 1,
        title: "Verified Drivers",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: IconOne,
    },
    {
        id: 2,
        title: "24x7 Support",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: IconTwo,
    },
    {
        id: 3,
        title: "Wide Fleet",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: IconThree,
    },
    {
        id: 4,
        title: "Best Prices",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: IconFour,
    },
];

const WhatSetsUsApart = () => {
    return (
        <section className="bg-[#fff8f6] pt-[16px] pb-[20px] md:pt-[20px] md:pb-[30px]  xl:pt-[50px] xl:pb-[60px] px-3 sm:px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-[200px] ">
            <div className="text-center mb-[20px] md:mb-[30px] lg:mb-8">
                <img src={HeadingIcon} alt="divider" className="mx-auto h-5 md:h-6 xl:h-8" />
                <p className="font-gt font-light text-xs sm:text-sm md:text-base xl:text-lg text-[var(--fourth-text)] mt-3 lg:mt-4 mb-1">Large Growing Fleet Of Cars</p>
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                    What Sets Us Apart
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-5 xl:gap-6">
                {features.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 md:p-6  rounded-lg lg:rounded-2xl  hover:shadow-sm delay-300  transform transition border-[0.5px] border-[#dcdcdc]"
                    >
                        <img
                            src={item.icon}
                            alt={item.title}
                            className="w-10 h-10 mb-3 md:mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                        </h3>
                        <p className="font-gt text-sm text-[var(--third-text)]">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatSetsUsApart;
