import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";

const Header = () => {
   return (
      <motion.div
         initial={ { opacity: 0, y: 100 } }
         transition={ { duration: 1.5 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }
         className='flex flex-col md:flex-row flex-wrap bg-[#008080] rounded-lg px-6 md:px-10 lg:px-20'>

         {/* Left Side */ }
         <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br /> With Trusted & Caring Doctors.</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
               <img src={ assets.group_profiles } alt="Group-profile" className='w-28' />
               <p>Simple browse through my extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#008080] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
               Book Appointment <img src={ assets.arrow_icon } alt="Book Appointment Image" className='w-3' /></a>
         </div>

         {/* Right side  */ }
         <div className='md:w-1/2 relative'>
            <img src={ assets.header } alt="Header-Image" className='w-full md:absolute bottom-0 h-auto rounded-lg' />
         </div>

      </motion.div>
   );
};

export default Header;
