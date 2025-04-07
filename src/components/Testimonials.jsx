import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa"; // React Icons for stars

const testimonials = [
   {
      name: "John Doe",
      feedback: "The appointment process was seamless and efficient. The doctor was very professional and provided excellent care.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
   },
   {
      name: "Sarah Adams",
      feedback: "Booking an online consultation was easy, and I received great medical advice. Highly recommend this service!",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 4,
   },
   {
      name: "Michael Lee",
      feedback: "I had an amazing experience. The doctor listened to all my concerns and provided the right treatment.",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      rating: 5,
   },
   {
      name: "Emily Carter",
      feedback: "Great platform for finding the best doctors. The scheduling system is user-friendly and very convenient!",
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      rating: 4,
   },
];

// Star rating component
const StarRating = ({ rating }) => {
   return (
      <div className="flex">
         { [...Array(5)].map((_, index) => (
            index < rating ?
               <FaStar key={ index } className="text-orange-500" />
               :
               <FaRegStar key={ index } className="text-gray-400" />
         )) }
      </div>
   );
};

const Testimonials = () => {
   const [isPaused, setIsPaused] = useState(false);

   return (
      <section className="max-w-5xl mx-auto my-16 px-5 overflow-hidden mb-30">
         <h2 className="text-3xl font-semibold text-[#008080] text-center mb-8">
            What Our Patients Say
         </h2>

         <motion.div
            className="flex space-x-6"
            initial={ { x: "100%" } }
            animate={ { x: isPaused ? 0 : "-100%" } }
            transition={ { ease: "linear", duration: 15, repeat: Infinity } }
         >
            { testimonials.map((testimonial, index) => (
               <motion.div
                  key={ index }
                  className="min-w-[400px] p-6 border border-[#B2DFDB] rounded-lg shadow-md bg-white cursor-pointer"
                  whileHover={ { scale: 1.05 } }
                  onHoverStart={ () => setIsPaused(true) }
                  onHoverEnd={ () => setIsPaused(false) }
               >
                  <div className="flex items-center space-x-4">
                     <img
                        src={ testimonial.image }
                        alt={ testimonial.name }
                        className="w-12 h-12 rounded-full border-2 border-[#008080]"
                     />
                     <div>
                        <h3 className="text-lg font-semibold text-[#4A4A4A]">
                           { testimonial.name }
                        </h3>
                        <StarRating rating={ testimonial.rating } />
                     </div>
                  </div>
                  <p className="text-gray-600 mt-3">{ testimonial.feedback }</p>
               </motion.div>
            )) }
         </motion.div>
      </section>
   );
};

export default Testimonials;

// In the above code snippet, we have created a Testimonials component that displays a list of testimonials. The component uses the Framer Motion library to create a sliding animation effect for the testimonials. The component also includes a StarRating component that displays a star rating based on the rating provided in the testimonial data.