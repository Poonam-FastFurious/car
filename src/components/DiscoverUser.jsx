

const DiscoverUser = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-20 px-4 md:px-12 relative overflow-hidden home-discover-section">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left text content */}
        <div className="max-w-2xl lg:max-w-3xl z-10">
          <h1 className="md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--second-blue)] leading-tight mb-4">
            Discover the ease and <br />
            convenience of{" "}
            <span className="text-[var(--global-red)]">Renting with Us</span>
          </h1>
          <div className="w-20 h-1 bg-[var(--global-red)] mb-4"></div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Experience hassle-free renting with us—simple process, transparent
            terms, flexible options, and dedicated support to make your renting
            journey smooth and convenient every step.
          </p>
        </div>

        {/* Right image */}
        <div className="w-full md:w-1/2">
          {/* <img
            src="/images/hero-car.png"
            alt="car"
            className="w-full h-auto object-contain"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default DiscoverUser;
