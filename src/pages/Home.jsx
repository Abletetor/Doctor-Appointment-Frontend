import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import FAQSection from '../components/FAQSection';
import Testimonials from '../components/Testimonials';

const Home = () => {
   return (
      <div>
         <Header />
         <SpecialityMenu />
         <TopDoctors />
         <Testimonials />
         <Banner />
         <FAQSection />
      </div>
   );
};

export default Home;