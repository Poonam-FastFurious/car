import React from 'react';
import Testimonial from '../components/Testimonial';
import HowToWork from '../components/HowToWork';
import MostBookedRoutes from '../components/MostBookedRoutes';
import WhatSetsUsApart from '../components/WhatSetsUsApart';
import DiscoverUser from '../components/DiscoverUser';
import HeroSection from '../components/HeroSection';
import CarRentalSection from '../components/CarRentalSection';

const Home = () => {
  return (
    <div className="px-xl">
      <div className="">
        <HeroSection />
        <WhatSetsUsApart />
        <CarRentalSection />
        <DiscoverUser/>
        <MostBookedRoutes />
        <HowToWork />
        <Testimonial />
      </div>
    </div>
  )
};

export default Home;