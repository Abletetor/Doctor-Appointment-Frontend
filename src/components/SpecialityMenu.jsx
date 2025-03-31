import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const SpecialityMenu = () => {
   return (
      <motion.div
         initial={ { opacity: 0, x: 200 } }
         transition={ { duration: 1 } }
         whileInView={ { opacity: 1, x: 0 } }
         viewport={ { once: true } }
         id='speciality'
         className='flex flex-col items-center gap-4 py-16 text-[#4A4A4A]'>

         <h1 className='text-3xl font-medium text-[#008080]'>Find by Speciality</h1>
         <p className='sm:w-1/3 text-center text-sm'>Simple browse through my extensive list of trusted doctors, schedule your appointment hassle-free.</p>
         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            { specialityData.map((item, index) => (
               <Link onClick={ () => scrollTo(0, 0) }
                  to={ `/doctors/${item.speciality}` }
                  key={ index }
                  className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-500 rounded-lg p-3'>

                  <img src={ item.image } alt="" className='w-20 sm:w-24 mb-2 rounded-lg bg-white p-2 ' />
                  <p className="text-[#008080] font-medium">{ item.speciality }</p>
               </Link>
            )) }
         </div>
      </motion.div>
   );
};


export default SpecialityMenu;
