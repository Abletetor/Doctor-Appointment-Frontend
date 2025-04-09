import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { handleError } from "../hooks/handleError";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {

   const { backendUrl } = useContext(AppContext);

   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
   });

   // Handle change in form inputs
   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // **Handle Form Submission**
   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const { data } = await axios.post(`${backendUrl}/api/message/send-message`, formData);

         if (data.success) {
            toast.success(data.message);
            setFormData({ name: '', email: '', message: '' });
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <motion.div
         initial={ { opacity: 0, y: 100 } }
         transition={ { duration: 1.5 } }
         whileInView={ { opacity: 1, y: 0 } }
         viewport={ { once: true } }
         className="px-5 md:px-10 lg:px-20">
         {/* Header */ }
         <div className="text-center text-2xl pt-10 text-[#4A4A4A]">
            <p>CONTACT <span className="text-[#008080] font-semibold">US</span></p>
         </div>

         {/* Contact Info Section */ }
         <div className="my-10 flex flex-col md:flex-row gap-10 items-center text-sm">
            <img src={ assets.contact_img } alt="contact-image" className="w-full md:max-w-[360px] rounded-lg shadow-lg" />
            <div className="flex flex-col justify-center gap-6 text-[#4A4A4A]">
               <div>
                  <p className="font-semibold text-lg text-[#008080]">OUR OFFICE</p>
                  <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#008080]" /> 456 AnloTown, Koforidua, Ghana</p>
               </div>
               <div>
                  <p className="flex items-center gap-2"><FaPhoneAlt className="text-[#008080]" /> (+233) 123-45678</p>
                  <p className="flex items-center gap-2"><FaEnvelope className="text-[#008080]" /> support@loveyourworld.com</p>
               </div>
               <div>
                  <p className="font-semibold text-lg text-[#008080]">Careers at LOVEYOURWORLD</p>
                  <p>Learn more about our teams and job openings.</p>
                  <button className="border border-[#008080] text-[#008080] px-8 py-2 rounded-full cursor-pointer hover:bg-[#008080] hover:text-white transition-all duration-500">Explore Jobs</button>
               </div>
            </div>
         </div>

         {/* Contact Form Section */ }
         <div className="text-center text-xl text-[#4A4A4A] my-6">
            <p>GET IN <span className="text-[#008080] font-semibold">TOUCH</span></p>
         </div>

         <form onSubmit={ handleSubmit } className="flex flex-col gap-6 max-w-lg mx-auto mb-20 text-[#4A4A4A]">
            <input
               type="text"
               name="name"
               value={ formData.name }
               onChange={ handleChange }
               placeholder="Your Name"
               className="border border-[#B2DFDB] p-3 rounded-lg outline-none focus:border-[#008080]"
            />
            <input
               type="email"
               name="email"
               value={ formData.email }
               onChange={ handleChange }
               placeholder="Your Email"
               className="border border-[#B2DFDB] p-3 rounded-lg outline-none focus:border-[#008080]"
            />
            <textarea
               name="message"
               value={ formData.message }
               onChange={ handleChange }
               placeholder="Your Message"
               rows="4"
               className="border border-[#B2DFDB] p-3 rounded-lg outline-none focus:border-[#008080]"
            ></textarea>
            <button
               type="submit"
               disabled={ isLoading }
               className={ `bg-[#008080] text-white py-3 rounded-full transition-all duration-300 ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#006666] hover:scale-105'
                  }` }
            >
               { isLoading ? "Sending..." : "Send Message" }
            </button>
         </form>
      </motion.div>
   );
};

export default Contact;
