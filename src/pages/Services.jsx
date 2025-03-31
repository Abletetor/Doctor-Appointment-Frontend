import React from "react";
import { FaBriefcaseMedical, FaWalking, FaHandsHelping, FaHeartbeat } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
   {
      title: "Health Seminar",
      description: "Educational programs on various health topics to raise awareness and promote healthy lifestyles.",
      icon: <FaBriefcaseMedical className="text-5xl text-[#008080]" />,
   },
   {
      title: "Health Walk",
      description: "Organized fitness walks to encourage physical activity and overall well-being in the community.",
      icon: <FaWalking className="text-5xl text-[#008080]" />,
   },
   {
      title: "Health Council",
      description: "Professional support including rehabilitation and psychological counseling for those in need.",
      icon: <FaHandsHelping className="text-5xl text-[#008080]" />,
   },
   {
      title: "Pay Health Bills",
      description: "Financial assistance for those who cannot afford medical expenses, ensuring healthcare access for all.",
      icon: <FaHeartbeat className="text-5xl text-[#008080]" />,
   },
];

const Services = () => {
   return (
      <motion.div
         initial={ { opacity: 0, y: 100 } }
         transition={ { duration: 1.5 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }
         className="max-w-6xl mx-auto my-16 px-5">
         <h2 className="text-3xl font-semibold text-[#008080] text-center mb-10">
            Our Services
         </h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            { services.map((service, index) => (
               <div
                  key={ index }
                  className="p-6 border border-[#B2DFDB] rounded-lg shadow-md bg-white text-center transition-transform duration-300 hover:scale-105"
               >
                  <div className="flex justify-center mb-4">{ service.icon }</div>
                  <h3 className="text-xl font-semibold text-[#4A4A4A] mb-2">
                     { service.title }
                  </h3>
                  <p className="text-gray-600">{ service.description }</p>
               </div>
            )) }
         </div>
      </motion.div>
   );
};

export default Services;
