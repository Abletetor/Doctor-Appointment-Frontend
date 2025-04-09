import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import LottieLoader from "../components/LottieLoader";
import { motion } from "framer-motion";
import StarRating from "../components/StarRating";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Doctors = () => {
   const { speciality } = useParams();
   const { doctors, getAllDoctors, pagination } = useContext(AppContext);
   const [filterDoc, setFilterDoc] = useState([]);
   const [showFilter, setShowFilter] = useState(false);
   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 9;
   const navigate = useNavigate();

   // Filter Doctors
   const applyFilter = React.useCallback(() => {
      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
         if (speciality) {
            setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
         } else {
            setFilterDoc(doctors);
         }
         setLoading(false);
      }, 500);
   }, [doctors, speciality]);

   const handlePrev = () => {
      if (currentPage > 1) {
         setCurrentPage(prev => prev - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < pagination?.totalPages) {
         setCurrentPage(prev => prev + 1);
      }
   };

   useEffect(() => {
      applyFilter();
   }, [applyFilter]);

   // On initial load, fetch doctors
   useEffect(() => {
      getAllDoctors(currentPage, limit).finally(() => setLoading(false));
   }, [currentPage, limit]);

   //Show pagination if filter is active
   const isFilterActive = speciality !== undefined && speciality !== null;


   return (
      <motion.div
         initial={ { opacity: 0, y: 100 } }
         transition={ { duration: 1.5 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }>
         <p className="text-[#4A4A4A]">Browse through the doctors specialist.</p>
         <div
            className="flex flex-col sm:flex-row items-start gap-5 mt-5 mb-6">
            <button
               className={ `py-1 px-3 border border-[#B2DFDB] rounded cursor-pointer text-sm transition-all sm:hidden ${showFilter ? "bg-[#008080] text-white" : "text-[#4A4A4A]"} hover:bg-[#006666] hover:text-white` }
               onClick={ () => setShowFilter((prev) => !prev) }
            >
               Filters
            </button>

            {/* Filters */ }
            <div className={ `flex-col gap-4 text-sm text-[#4A4A4A] ${showFilter ? "flex" : "hidden sm:flex"}` }>
               { ["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
                  <p
                     key={ spec }
                     onClick={ () => (speciality === spec ? navigate("/doctors") : navigate(`/doctors/${spec}`)) }
                     className={ `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#B2DFDB] rounded transition-all cursor-pointer 
                     ${speciality === spec ? "bg-[#E0F2F1] text-[#008080] font-medium" : "hover:bg-[#E0F2F1] hover:text-[#008080]"}`
                     }
                  >
                     { spec }
                  </p>
               )) }
            </div>

            {/* Doctors List */ }
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(215px,1fr))] gap-4 pt-5 gap-y-6">

               { loading ? (
                  <LottieLoader message="Fetching Doctors..." size="w-100 h-100" />
               ) : filterDoc.length > 0 ? (
                  filterDoc.map((item, index) => (
                     <div
                        onClick={
                           () => {
                              navigate(`/appointment/${item._id}`);
                              scrollTo(0, 0);
                           } }
                        key={ index }
                        className="border border-[#B2DFDB] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-lg transition-all duration-500"
                     >
                        <img src={ item.image } alt="" className="bg-[#E0F2F1]" />
                        <div className="p-4">
                           <div className={ `flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-[#B0BEC5]"}` }>
                              <p className={ `w-2 h-2 ${item.available ? "bg-green-500" : "bg-[#B0BEC5]"} rounded-full` }></p>
                              <p>{ item.available ? "Available" : "Not Available" }</p>
                           </div>
                           <p className="text-[#008080] text-lg font-medium">{ item.name }</p>
                           <StarRating rating={ item.averageRating } />

                           <div className='flex justify-between items-center mt-1'>
                              <p className='text-[#4A4A4A] text-sm'>{ item.speciality }</p>
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
                  ))
               ) : (
                  <p className="text-center text-[#4A4A4A]">No Data Available at the Moment.</p>
               ) }
            </div>

         </div>
         {/* Pagination Controls */ }
         { !isFilterActive && (

            <div className="mt-6 mb-10 flex justify-center items-center gap-4">
               <button
                  onClick={ handlePrev }
                  disabled={ currentPage === 1 }
                  className="text-[#008080] hover:bg-[#E0F2F1] px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
               >
                  <MdChevronLeft size={ 18 } />
               </button>
               <span className="text-sm text-[#4A4A4A]">
                  Page { currentPage } of { pagination?.totalPages }
               </span>
               <button
                  onClick={ handleNext }
                  disabled={ currentPage === pagination?.totalPages }
                  className="text-[#008080] hover:bg-[#E0F2F1] px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
               >
                  <MdChevronRight size={ 18 } />
               </button>
            </div>
         ) }
      </motion.div>
   );

};

export default Doctors;
