import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
   return (
      <div className='bg-[#008080] p-10 text-white'>
         <div className='md:mx-10 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-8 text-sm'>

            {/* Left-side */ }
            <div>
               <div className="bg-white p-2 rounded-md inline-block">
                  <img src={ assets.logo_1 } alt="logo" className='w-40' />
               </div>
               <p className='w-full md:w-2/3 leading-6 opacity-90 mt-3'>
                  At LOVEYOURWORLD, we promote better health through seminars, fitness walks, counseling, and financial aid for medical bills. Together, we create a healthier, more compassionate world.
               </p>
            </div>

            {/* Center-side */ }
            <div>
               <p className='text-xl font-medium mb-5 text-[#B2DFDB]'>COMPANY</p>
               <ul className='flex flex-col gap-2 opacity-90'>
                  <li className='hover:text-[#E0F2F1] hover:scale-105 transition-all duration-300 cursor-pointer'>Home</li>
                  <li className='hover:text-[#E0F2F1] hover:scale-105 transition-all duration-300 cursor-pointer'>About us</li>
                  <li className='hover:text-[#E0F2F1] hover:scale-105 transition-all duration-300 cursor-pointer'>Contact us</li>
                  <li className='hover:text-[#E0F2F1] hover:scale-105 transition-all duration-300 cursor-pointer'>Privacy policy</li>
               </ul>
            </div>

            {/* Right-side */ }
            <div>
               <p className='text-xl font-medium mb-5 text-[#B2DFDB]'>GET IN TOUCH</p>
               <ul className='flex flex-col gap-2'>
                  <li className='flex items-center gap-2'><FaPhoneAlt className="text-[#B2DFDB]" /> +1234567889</li>
                  <li className='flex items-center gap-2'><FaEnvelope className="text-[#B2DFDB]" /> official@loveyourworld.com</li>
               </ul>
            </div>
         </div>

         {/* Copyright Text */ }
         <hr className="border-t border-[#B2DFDB] w-full opacity-50" />
         <p className='py-5 text-sm text-center opacity-90'>Copyright &copy;{ new Date().getFullYear() } Loveyourworld - All Rights Reserved</p>
      </div>
   );
};

export default Footer;
