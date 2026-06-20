import HeadingIcon from "../assets/icons/heading icon.svg"


const steps = [
  {
    number: "01",
    title: "Choose A Car",
    description: "Browse our wide selection and pick your perfect ride."
  },
  {
    number: "02",
    title: "Pick Up Date",
    description: "Select a convenient date and time that suits you best."
  },
  {
    number: "03",
    title: "Confirm Your Booking",
    description: "Review, pay, and get instant booking confirmation."
  },
  {
    number: "04",
    title: "Sit Back & Relax",
    description: "Enjoy your journey—our team handles everything else for you."
  }
];

const HowToWork = () => {
  return (
    <section className="bg-[url('../src/assets/images/HomeImages/htw.jpg')] bg-no-repeat bg-cover py-8 md:py-12 text-center bg-[#fffaf7db] bg-blend-overlay ">
      <div className="px-3 mb-10">
        <div className="text-center mb-[20px] md:mb-[30px] lg:mb-8">
          <img src={HeadingIcon} alt="divider" className="mx-auto h-5 md:h-6 xl:h-8" />
          <p className="font-gt font-light text-xs sm:text-sm md:text-base xl:text-lg text-[var(--fourth-text)] mt-3 lg:mt-4 mb-1">Simple Process. Smooth Journey.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            How It Work
          </h2>
        </div>
      </div>


      <div className="flex flex-wrap justify-center gap-x-6  gap-y-12 sm:gap-y-16 pt-6 sm:pt-8 px-3 sm:px-6">
        {steps.map((step, index) => (
          <div className="relative" key={index} >
            <div className="absolute bottom-full left-1 translate-y-1  bg-red-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg font-bold z-0">
              {step.number}
            </div>
            <div className="bg-white rounded-xl shadow-md p-3 w-full sm:w-60 max-w-88 relative">
              <h3 className=" font-bold text-md">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToWork;
