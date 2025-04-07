import { FaStar } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LottieLoader from './LottieLoader';
import { handleError } from '../hooks/handleError';
import { toast } from 'react-toastify';

const StarRating = ({ doctorId }) => {
   const { backendUrl } = useContext(AppContext);
   const [rating, setRating] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchRating = async () => {
         try {
            const { data } = await axios.get(`${backendUrl}/api/rating/doctor/${doctorId}/average`);

            if (data.success) {
               setRating(parseFloat(data.averageRating));
            } else { toast.error(data.message); }
         } catch (err) {
            handleError(err);
            console.error("Failed to fetch rating:", err);
            setRating(0);
         } finally {
            setLoading(false);
         }
      };

      fetchRating();
   }, [doctorId]);

   if (loading) {
      return <LottieLoader message="Fetching ratings..." size="w-50 h-50" />;
   }


   const fullStars = Math.floor(rating);
   const hasHalfStar = rating - fullStars >= 0.5;

   return (
      <div className="flex items-center gap-1">
         { [...Array(5)].map((_, i) => (
            <FaStar
               key={ i }
               size={ 16 }
               color={
                  i < fullStars
                     ? '#FF6600'
                     : i === fullStars && hasHalfStar
                        ? '#FF660080'
                        : '#ccc'
               }
            />
         )) }
         <span className="text-xs text-[#4A4A4A] ml-1">({ rating?.toFixed(1) || '0.0' })</span>
      </div>
   );
};

export default StarRating;
