import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";

const About = () => {
   return (
      <motion.div
         initial={ { opacity: 0, y: 100 } }
         transition={ { duration: 1.5 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }
         className="px-5 md:px-10 lg:px-20">

         {/* Header */ }
         <div className="text-center text-2xl pt-10 text-[#4A4A4A]">
            <p>ABOUT <span className="text-[#008080] font-medium">US</span></p>
         </div>

         {/* About Content */ }
         <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
            <img src={ assets.about_img } alt="About-Image" className="w-full md:max-w-[360px] rounded-lg shadow-lg" />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-[16px] text-[#4A4A4A]">
               <p>
                  At <b>LOVEYOURWORLD</b>, we are dedicated to improving healthcare accessibility and promoting overall well-being in our communities. Our initiatives focus on raising awareness through health seminars, encouraging active lifestyles with health walks, and providing essential support through rehabilitation and psychological counseling. We believe that healthcare is a fundamental right, and we work tirelessly to ensure that those in need receive the necessary medical attention and guidance.
               </p>
               <p>
                  Through our commitment to social impact, we also extend financial aid to individuals struggling to afford medical expenses. By bridging the gap between healthcare providers and underserved populations, we empower people to take control of their health. At <b>LOVEYOURWORLD</b>, we stand for a healthier, more compassionate world—one where everyone has the opportunity to lead a fulfilling life.
               </p>

               <b className="text-[#008080] text-lg">OUR VISION</b>
               <p>
                  At <b>LOVEYOURWORLD</b>, our mission is to make quality healthcare accessible to all by promoting awareness, providing support, and bridging the gap between medical care and those in need. Through education, advocacy, and direct assistance, we strive to create a world where no one is denied healthcare due to financial or social barriers.</p>
            </div>
         </div>

         {/* Why Choose Us Section */ }
         <div className="text-xl my-6 text-[#4A4A4A] text-center">
            <p>WHY <span className="text-[#008080] font-semibold">CHOOSE US</span></p>
         </div>

         <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-20">
            { [
               { title: "EFFICIENCY:", description: "Streamlined appointment scheduling that fits into your busy lifestyle." },
               { title: "CONVENIENCE:", description: "Access to a network of trusted healthcare professionals in your area." },
               { title: "PERSONALIZATION:", description: "Tailored recommendations and reminders to help you stay on top of your health." }
            ].map((item, index) => (
               <div
                  key={ index }
                  className="border border-[#B2DFDB] px-10 py-8 md:px-16 flex flex-col gap-4 text-[15px] text-[#4A4A4A] 
                  hover:bg-[#008080] hover:text-white transition-all duration-300 cursor-pointer rounded-lg shadow-md"
               >
                  <b>{ item.title }</b>
                  <p>{ item.description }</p>
               </div>
            )) }
         </div>
      </motion.div>
   );
};

export default About;
