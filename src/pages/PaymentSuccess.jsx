import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { handleError } from "../hooks/handleError";


const PaymentSuccess = () => {
   const [searchParams] = useSearchParams();
   const sessionId = searchParams.get("session_id");
   const [loading, setLoading] = useState(true);
   const { backendUrl, token } = useContext(AppContext);
   const navigate = useNavigate();

   useEffect(() => {
      const verifyStripePayment = async () => {
         if (!sessionId) {
            toast.error("Invalid payment session.");
            setLoading(false);
            return;
         }

         try {
            const { data } = await axios.post(`${backendUrl}/api/user/verify-stripe-payment`, { sessionId }, { headers: { Authorization: `Bearer ${token}` } });


            if (data.success) {
               toast.success("Payment verified successfully!");
               navigate('/my-appointments');
            } else {
               toast.error(data.message);
            }
         } catch (error) {
            handleError(error);
         } finally {
            setLoading(false);
         }
      };

      verifyStripePayment();
   }, [sessionId]);


   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
         <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
            { loading ? (
               <p className="text-lg font-semibold text-blue-500 animate-pulse">Verifying payment...</p>
            ) : (
               <p className="text-lg font-semibold text-green-600">Thank you! Your payment has been processed successfully.</p>
            ) }
         </div>
      </div>

   );
};

export default PaymentSuccess;
