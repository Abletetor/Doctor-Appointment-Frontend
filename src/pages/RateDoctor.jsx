import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { handleError } from '../hooks/handleError';
import LottieLoader from '../components/LottieLoader';

const RateDoctor = () => {
   const { doctorId, appointmentId } = useParams();
   const navigate = useNavigate();
   const { token, backendUrl } = useContext(AppContext);

   const [rating, setRating] = useState(0);
   const [hover, setHover] = useState(null);
   const [comment, setComment] = useState('');
   const [loading, setLoading] = useState(false);
   const [alreadyRated, setAlreadyRated] = useState(false);
   const [checking, setChecking] = useState(true);

   // **Check if the user has already rated the appointment**
   useEffect(() => {
      const checkRating = async () => {
         try {
            const { data } = await axios.get(`${backendUrl}/api/rating/check-status`, {
               params: { appointmentId },
               headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
               setAlreadyRated(true);
               toast.info("You have already rated this appointment.");
            }
         } catch (err) {
            handleError(err);
            console.log(err);
         } finally {
            setChecking(false);
         }
      };

      if (token && appointmentId) checkRating();
   }, [appointmentId, token]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (rating === 0) {
         toast.warn("Please select a rating");
         return;
      }

      try {
         setLoading(true);
         const { data } = await axios.post(`${backendUrl}/api/rating/add`, {
            doctorId, appointmentId, rating, comment
         }, { headers: { Authorization: `Bearer ${token}` } });

         toast.success(data.message);
         setComment('');
         setRating(0);
         navigate('/my-appointments');
      } catch (err) {
         handleError(err);
         console.error("Rating submission error:", err);
      } finally {
         setLoading(false);
      }
   };


   if (checking) {
      return <LottieLoader message="Checking rating status..." size="w-100 h-100" />;
   }

   if (alreadyRated) {
      return (
         <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-[#B2DFDB] mb-20 text-center text-[#008080]">
            <h2 className="text-2xl font-semibold mb-2">You have already rated this appointment</h2>
            <button
               onClick={ () => navigate('/my-appointments') }
               className="mt-4 bg-[#008080] text-white px-4 py-2 rounded hover:bg-[#006666] transition"
            >
               Go Back to Appointments
            </button>
         </div>
      );
   }

   return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-[#B2DFDB] mb-20">
         <h2 className="text-2xl font-semibold text-center text-[#008080] mb-4"> Rate Your Doctor</h2>

         <div className="flex justify-center mb-4">
            { [...Array(5)].map((_, index) => {
               const starValue = index + 1;
               return (
                  <label key={ index }>
                     <input
                        type="radio"
                        name="rating"
                        value={ starValue }
                        className="hidden"
                        onClick={ () => setRating(starValue) }
                     />
                     <FaStar
                        className="cursor-pointer transition-colors duration-200"
                        size={ 32 }
                        color={
                           starValue <= (hover || rating)
                              ? '#FFD700'
                              : '#ccc'
                        }
                        onMouseEnter={ () => setHover(starValue) }
                        onMouseLeave={ () => setHover(null) }
                     />
                  </label>
               );
            }) }
         </div>

         <textarea
            value={ comment }
            onChange={ (e) => setComment(e.target.value) }
            rows="4"
            placeholder="Write your feedback (optional)..."
            className="w-full border rounded-md p-3 mb-4 outline-none focus:ring-2 focus:ring-[#008080]"
         />

         <button
            onClick={ handleSubmit }
            disabled={ loading }
            className="w-full bg-[#008080] text-white py-2 rounded-md hover:bg-[#006666] transition duration-300 disabled:opacity-60 cursor-pointer"
         >
            { loading ? 'Submitting...' : 'Submit Rating' }
         </button>
      </div>
   );
};

export default RateDoctor;
