import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { handleError } from '../hooks/handleError';
import StarRating from '../components/StarRating';

const Appointment = () => {
   const { docId } = useParams();
   const { doctors, currencySymbol, backendUrl, getAllDoctors, token } = useContext(AppContext);
   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

   const [docInfo, setDocInfo] = useState(null);
   const [docSlot, setDocSlot] = useState([]);
   const [slotIndex, setSlotIndex] = useState(0);
   const [slotTime, setSlotTime] = useState("");
   const navigate = useNavigate();

   //Fetch Doctor Informations
   const fetchDocInfo = async () => {
      try {
         const docInfo = await doctors.find(doc => doc._id === docId);
         setDocInfo(docInfo);
      } catch (error) {
         console.log(error);
      }
   };

   // Calculate Available Slot
   const getAvailableSlot = async () => {
      if (!docInfo) return;

      let tempSlots = [];
      let today = new Date();

      for (let i = 0; i < 7; i++) {
         let currentDate = new Date(today);
         currentDate.setDate(today.getDate() + i);

         let endTime = new Date(currentDate);
         endTime.setHours(21, 0, 0, 0);

         if (i === 0) { // Adjust start time if it's today
            currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
            currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
         } else {
            currentDate.setHours(10);
            currentDate.setMinutes(0);
         }

         let timeSlots = [];
         while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            const slotDate = `${day}-${month}-${year}`;

            const isSlotAvailable =
               !docInfo?.slots_booked?.[slotDate] ||
               !docInfo.slots_booked[slotDate].includes(formattedTime);

            if (isSlotAvailable) {
               timeSlots.push({
                  datetime: new Date(currentDate),
                  time: formattedTime
               });
            }

            currentDate.setMinutes(currentDate.getMinutes() + 30);
         }

         tempSlots.push(timeSlots);
      }

      setDocSlot(tempSlots);
   };

   useEffect(() => {
      getAvailableSlot();
   }, [docInfo]);

   // **Book appointment **
   const bookAppointment = async () => {
      if (!token) {
         toast.warn("Login to book appointment");
         window.scrollTo(0, 0);
         return navigate('/login');
      }

      if (!slotTime) {
         toast.error("Please select a valid time slot!");
         return;
      }

      try {
         const date = docSlot[slotIndex][0].datetime;
         let day = date.getDate();
         let month = date.getMonth() + 1;
         let year = date.getFullYear();
         const slotDate = `${day}-${month}-${year}`;

         const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`,
            { docId, slotDate, slotTime },
            { headers: { Authorization: `Bearer ${token}` } }
         );

         if (data.success) {
            toast.success(data.message);
            getAllDoctors();
            window.scrollTo(0, 0);
            navigate('/my-appointments');
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   useEffect(() => {
      fetchDocInfo();
      console.log("Doc Info:", docInfo);
   }, [doctors, docId]);


   return docInfo && (
      <div>
         {/* Doctor Details */ }
         <div className="flex flex-col sm:flex-row gap-6">
            <div>
               <img
                  src={ docInfo.image }
                  alt="Doctor"
                  className="bg-[#008080] w-full sm:max-w-72 rounded-lg"
               />
            </div>

            {/* Doctor Information */ }
            <div className="flex-1 border border-[#B2DFDB] rounded-lg p-8 bg-[#E0F2F1] mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-md">
               {/* Name & Verified Icon */ }
               <p className="flex items-center gap-2 text-2xl font-semibold text-[#008080]">
                  { docInfo.name }
                  <img src={ assets.verified_icon } alt="Verified" className="w-5" />
               </p>
               <StarRating doctorId={ docInfo._id } />

               {/* Degree, Specialty & Experience */ }
               <div className="flex items-center gap-2 text-sm mt-1 text-[#4A4A4A]">
                  <p>{ docInfo.degree } - { docInfo.speciality }</p>
                  <button className="py-1 px-3 border border-[#B2DFDB] text-xs rounded-full bg-white">
                     { docInfo.experience }
                  </button>
               </div>

               {/* About Doctor */ }
               <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#4A4A4A] mt-3">
                     About <img src={ assets.info_icon } alt="Info" />
                  </p>
                  <p className="text-sm text-[#4A4A4A] max-w-[700px] mt-1">
                     { docInfo.about }
                  </p>
               </div>

               {/* Appointment Fee */ }
               <p className="text-[#4A4A4A] font-medium mt-4">
                  Appointment Fee: <span className="text-[#008080]">{ currencySymbol }{ docInfo.fees }</span>
               </p>
            </div>
         </div>

         {/* Booking Slots */ }
         { docInfo.available ? (
            <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-[#4A4A4A]">
               <p className="text-lg font-semibold">Booking Slots</p>

               {/* Date Selection */ }
               <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
                  { docSlot.length > 0 && docSlot.map((item, index) => (
                     <div
                        key={ index }
                        onClick={ () => setSlotIndex(index) }
                        className={ `text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${slotIndex === index
                           ? 'bg-[#008080] text-white'
                           : 'border border-[#B2DFDB] bg-white text-[#4A4A4A]'
                           }` }
                     >
                        <p>{ item[0] && daysOfWeek[item[0].datetime.getDay()] }</p>
                        <p>{ item[0] && item[0].datetime.getDate() }</p>
                     </div>
                  )) }
               </div>

               {/* Time Slot Selection */ }
               <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
                  { docSlot.length > 0 && docSlot[slotIndex]?.map((item, index) => (
                     <p
                        key={ index }
                        onClick={ () => setSlotTime(item.time) }
                        className={ `text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime
                           ? 'bg-[#008080] text-white'
                           : 'border border-[#B2DFDB] bg-white text-[#4A4A4A]'
                           }` }
                     >
                        { item.time.toLowerCase() }
                     </p>
                  )) }
               </div>

               {/* Book Appointment Button */ }
               <button
                  onClick={ bookAppointment }
                  className="bg-[#008080] text-white text-sm font-medium px-14 py-3 rounded-full my-6 mt-10 transition-all duration-300 hover:bg-[#006666] hover:scale-105 cursor-pointer shadow-md"
               >
                  Book an Appointment
               </button>
            </div>
         ) : (
            <p className="text-center text-[#B0BEC5] mt-6">
               Doctor Not Available for Booking at This Moment.
            </p>
         ) }

         {/* Related Doctors */ }
         <RelatedDoctors docId={ docId } speciality={ docInfo.speciality } />
      </div>
   );

};

export default Appointment;
