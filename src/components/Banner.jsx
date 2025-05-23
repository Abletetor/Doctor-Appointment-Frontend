import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Banner = () => {
   const navigate = useNavigate();
   return (
      <motion.div
         initial={ { opacity: 0, y: 200 } }
         transition={ { duration: 1 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }
         className='flex bg-[#008080] rounded-lg px-6 sm:px-10 md:px-14 lg:12 my-20 md:mx-10'>
         {/* left side */ }
         <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
               <p className='mt-4'>Book Appointment</p>
               <p>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={ () => { navigate('/login'); scrollTo(0, 0); } } className='bg-white text-[#008080] text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create account</button>
         </div>

         {/* right side */ }
         <div className='hidden md:block md:w-1/2 lg:w[370px] relative'>
            <img src={ assets.banner_img } alt="Appointment-Image" className='w-[90%] absolute bottom-0 right-0 max-w-md' />
         </div>
      </motion.div>
   );
};

export default Banner;
