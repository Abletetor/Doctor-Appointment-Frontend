import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
   return (
      <div className='bg-[#F5F5F5] p-10'>
         <div className='md:mx-10 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* Left-side */ }
            <div>
               <img src={ assets.logo_1 } alt="logo" className='mb-5 w-40' />
               <p className='w-full md:w-2/3 text-[#4A4A4A] leading-6'>
                  At LOVEYOURWORLD, we promote better health through seminars, fitness walks, counseling, and financial aid for medical bills. Together, we create a healthier, more compassionate world.
               </p>
            </div>

            {/* Center-side */ }
            <div>
               <p className='text-xl font-medium mb-5 text-[#008080]'>COMPANY</p>
               <ul className='flex flex-col gap-2 text-[#4A4A4A] hover:cursor-pointer'>
                  <li className='hover:text-[#008080] transition-all duration-300'>Home</li>
                  <li className='hover:text-[#008080] transition-all duration-300'>About us</li>
                  <li className='hover:text-[#008080] transition-all duration-300'>Contact us</li>
                  <li className='hover:text-[#008080] transition-all duration-300'>Privacy policy</li>
               </ul>
            </div>

            {/* Right-side */ }
            <div>
               <p className='text-xl font-medium mb-5 text-[#008080]'>GET IN TOUCH</p>
               <ul className='flex flex-col gap-2 text-[#4A4A4A]'>
                  <li className='flex items-center gap-2'><FaPhoneAlt className="text-[#008080]" /> +1234567889</li>
                  <li className='flex items-center gap-2'><FaEnvelope className="text-[#008080]" /> official@loveyourworld.com</li>
               </ul>
            </div>
         </div>

         {/* Copyright Text */ }
         <hr className="border-t border-gray-300 w-full" />
         <p className='py-5 text-sm text-center text-[#4A4A4A]'>Copyright &copy;{new Date().getFullYear()} Loveyourworld - All Rights Reserved</p>
      </div>
   );
};

export default Footer;
