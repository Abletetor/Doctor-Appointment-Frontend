import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { handleError } from '../hooks/handleError';
import { slotDateFormat } from '../hooks/slotDateFormat';
import LottieLoader from '../components/LottieLoader';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const MyAppointment = () => {
   const { backendUrl, token } = useContext(AppContext);
   const [appointments, setAppointments] = useState([]);
   const [loading, setLoading] = useState({});

   // **Get User Appointments**
   const getUserAppointments = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { Authorization: `Bearer ${token}` } });

         if (data.success) {
            setAppointments(data.appointments.reverse());
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Cancel Appointment**
   const cancelAppointment = async (appointmentId) => {
      setLoading((prev) => ({ ...prev, [`cancel-${appointmentId}`]: true }));

      try {
         const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });

         if (data.success) {
            toast.success(data.message);
            getUserAppointments();
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      } finally {
         setLoading((prev) => ({ ...prev, [`cancel-${appointmentId}`]: false }));
      }
   };

   // **Stripe Payment**
   const appointmentStripe = async (appointmentId) => {
      setLoading((prev) => ({ ...prev, [appointmentId]: true }));

      try {
         const { data } = await axios.post(`${backendUrl}/api/user/payment-stripe`, { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });

         if (data.success) {
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

            if (error) {
               console.error("Stripe checkout error:", error);
               toast.error("Failed to redirect to payment page.");
            }
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      } finally {
         setLoading((prev) => ({ ...prev, [appointmentId]: false }));
      }
   };

   useEffect(() => {
      if (token) {
         getUserAppointments();
      }
   }, [token]);

   return (
      <div className='mb-10'>
         { appointments.length > 0 ? (
            appointments.map((item, index) => (
               <div key={ index } className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-[#B2DFDB]">
                  <div>
                     <img src={ item.docData.image } alt="" className="w-32 bg-[#E0F2F1]" />
                  </div>
                  <div className="flex-1 text-[#4A4A4A] text-sm">
                     <p className="text-[#008080] font-semibold">{ item.docData.name }</p>
                     <p>{ item.docData.speciality }</p>
                     <p className="text-[#008080] font-medium mt-1">Address:</p>
                     <p className="text-xs">{ item.docData.address.line1 }</p>
                     <p className="text-xs">{ item.docData.address.line2 }</p>
                     <p className="text-xs mt-1">
                        <span className="text-[#008080] text-sm font-medium">Date & Time:</span> { slotDateFormat(item.slotDate) } | { item.slotTime }
                     </p>
                  </div>
                  <div></div>
                  <div className="flex flex-col justify-end gap-2">
                     { !item.cancelled && item.payment && !item.isCompleted && (
                        <button className="sm:min-w-48 py-2 border border-[#B2DFDB] rounded text-[#008080] bg-[#E0F2F1]">Paid</button>
                     ) }
                     { !item.cancelled && !item.payment && !item.isCompleted && (
                        <button
                           onClick={ () => appointmentStripe(item._id) }
                           disabled={ loading[item._id] }
                           className={ `text-sm text-[#008080] text-center sm:min-w-48 py-2 border border-[#B2DFDB] cursor-pointer transition-all duration-300 ${loading[item._id] ? "bg-[#B0BEC5] text-white cursor-not-allowed" : "hover:bg-[#006666] hover:scale-105 hover:text-white"
                              }` }
                        >
                           { loading[item._id] ? <LottieLoader message="Processing Payment..." size="w-20 h-20" /> : "Pay Online" }
                        </button>
                     ) }

                     { !item.cancelled && !item.isCompleted && (
                        <button
                           onClick={ () => cancelAppointment(item._id) }
                           disabled={ loading[`cancel-${item._id}`] }
                           className={ `text-sm text-[#008080] text-center sm:min-w-48 py-2 border border-[#B2DFDB] cursor-pointer transition-all duration-300 ${loading[`cancel-${item._id}`] ? "bg-[#B0BEC5] text-white cursor-not-allowed" : "hover:bg-red-600 hover:scale-105 hover:text-white"
                              }` }
                        >
                           { loading[`cancel-${item._id}`] ? "Cancelling..." : "Cancel Appointment" }
                        </button>
                     ) }

                     { item.cancelled && (
                        <button className="sm:min-w-48 border border-red-500 rounded text-red-500">Appointment Cancelled</button>
                     ) }

                     { item.isCompleted && (
                        <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>) }
                  </div>
               </div>
            ))
         ) : (
            <p className="text-center text-[#B0BEC5] mt-6">You have No Appointment Available At this moment</p>
         ) }
      </div>
   );

};

export default MyAppointment;
