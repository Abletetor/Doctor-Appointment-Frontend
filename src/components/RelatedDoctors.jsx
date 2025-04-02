import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
   const navigate = useNavigate();
   const { doctors } = useContext(AppContext);
   const [relDoc, setRelDoc] = useState([]);

   useEffect(() => {
      if (doctors.length > 0 && speciality) {
         const docsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
         setRelDoc(docsData);
      }
   }, [doctors, docId, speciality]);

   return (
      <div className="flex flex-col items-center gap-6 my-16 text-[#4A4A4A] md:mx-10">
         {/* Heading */ }
         <h1 className="text-3xl font-semibold text-[#008080]">Related Doctors</h1>

         {/* Doctors Grid */ }
         <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 pt-5 px-4 sm:px-0">
            { relDoc.slice(0, 5).map((item, index) => (
               <div
                  key={ index }
                  onClick={ () => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); } }
                  className="border border-[#B2DFDB] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-md"
               >
                  <img src={ item.image } alt="Doctor" className="bg-[#E0F2F1] w-full h-44 object-cover" />
                  <div className="p-4">
                     {/* Availability Status */ }
                     <div className={ `flex items-center gap-2 text-sm ${item.available ? "text-green-600" : "text-[#B0BEC5]"}` }>
                        <span className={ `w-2 h-2 ${item.available ? "bg-green-600" : "bg-gray-400"} rounded-full` }></span>
                        <p>{ item.available ? "Available" : "Not Available" }</p>
                     </div>

                     {/* Doctor Name */ }
                     <p className="text-[#008080] text-lg font-semibold">{ item.name }</p>

                     {/* Speciality */ }
                     <div className='flex justify-between items-center mt-1'>
                        <p className='text-[#4A4A4A] text-sm'>{ item.speciality }</p>
                        <button
                           onClick={ () => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); } }
                           className={ `px-3 py-1 text-white rounded-full text-xs transition-all duration-300 shadow-md ${item.available ? "bg-[#008080] hover:bg-[#006666] cursor-pointer" : "bg-[#B0BEC5] cursor-not-allowed"}` }
                           disabled={ !item.available }
                        >
                           { item.available ? "Book now" : "Not Available" }
                        </button>
                     </div>
                  </div>
               </div>
            )) }
         </div>

         {/* View More Button */ }
         <button
            onClick={ () => { navigate('/doctors'); scrollTo(0, 0); } }
            className="bg-[#E0F2F1] text-[#4A4A4A] px-12 py-3 rounded-full mt-10 transition-all duration-300 hover:bg-[#006666] hover:text-white hover:scale-105 shadow-md"
         >
            View More
         </button>
      </div>
   );
};

export default RelatedDoctors;
