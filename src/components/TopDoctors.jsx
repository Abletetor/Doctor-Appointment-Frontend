import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import StarRating from './StarRating';

const TopDoctors = () => {
   const navigate = useNavigate();
   const { doctors } = useContext(AppContext);

   return (
      <motion.div
         initial={ { opacity: 0, x: -200 } }
         transition={ { duration: 1 } }
         whileInView={ { opacity: 1, x: 0 } }
         viewport={ { once: true } }
         className='flex flex-col items-center gap-4 my-16 text-[#4A4A4A] md:mx-10'>
         <h1 className='text-3xl font-medium text-[#008080]'>Top Doctors</h1>
         <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>

         <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            { doctors.slice(0, 10).map((item, index) => (
               <div
                  onClick={ () => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); } }
                  key={ index }
                  className='border border-[#B2DFDB] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-lg transition-all duration-500'
               >
                  <img src={ item.image } alt="" className='bg-[#E0F2F1]' />
                  <div className='p-4'>
                     <div className={ `flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-[#B0BEC5]"}` }>
                        <p className={ `w-2 h-2 ${item.available ? "bg-green-500" : "bg-[#B0BEC5]"} rounded-full` }></p>
                        <p>{ item.available ? "Available" : "Not Available" }</p>
                     </div>
                     <p className='text-[#008080] text-lg font-medium'>{ item.name }</p>
                     <StarRating rating={ item.averageRating } />

                     <div className='flex justify-between items-center mt-1'>
                        <p className='text-[#4A4A4A] text-sm'>
                           { item.speciality }</p>
                        <button
                           onClick={ () => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); } }
                           className={ `px-3 py-1 text-white rounded-full text-xs transition-all duration-300 shadow-md ${item.available ? "bg-[#008080] hover:bg-[#006666] cursor-pointer" : "bg-[#B0BEC5] cursor-not-allowed"}` }
                           disabled={ !item.available }
                        >
                           Book now
                        </button>
                     </div>
                  </div>
               </div>
            )) }
         </div>

         <button
            onClick={ () => { navigate('/doctors'); scrollTo(0, 0); } }
            className='bg-[#E0F2F1] text-[#4A4A4A] px-12 py-3 rounded-full mt-10 transition-all duration-300 hover:bg-[#006666] hover:text-white hover:scale-105 shadow-md'
         >
            More
         </button>
      </motion.div>
   );
};

export default TopDoctors;

