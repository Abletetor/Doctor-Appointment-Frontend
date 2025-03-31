import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
   {
      question: "How do I book an appointment?",
      answer: "To book an appointment, simply visit our 'All Doctors' page, choose a doctor, and select a convenient date and time."
   },
   {
      question: "Do I need to create an account to book a doctor?",
      answer: "Yes, creating an account allows you to manage your appointments, receive reminders, and access your booking history."
   },
   {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment from the 'My Appointments' section in your profile, at least 24 hours in advance."
   },
   {
      question: "Are online consultations available?",
      answer: "Yes, we offer both in-person and online consultations. You can select your preferred mode while booking an appointment."
   },
   {
      question: "How can I contact customer support?",
      answer: "You can reach our support team via the 'Contact' page or call our helpline at +123-456-7890 for immediate assistance."
   },
];

const FAQSection = () => {
   const [activeIndex, setActiveIndex] = useState(null);

   const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
   };

   return (
      <motion.div
         initial={ { opacity: 0, x: -200 } }
         transition={ { duration: 1 } }
         whileInView={ { opacity: 1, x: 0 } }
         viewport={ { once: true } }
         className="max-w-4xl mx-auto my-16 px-5">
         <h2 className="text-3xl font-semibold text-[#008080] text-center mb-8">Frequently Asked Questions</h2>
         <div className="space-y-4 cursor-pointer">
            { faqs.map((faq, index) => (
               <div key={ index } className="border border-[#B2DFDB] rounded-lg p-4 bg-white shadow-md cursor-pointer">
                  <button
                     className="w-full text-left flex justify-between items-center text-[#4A4A4A] font-medium text-lg"
                     onClick={ () => toggleFAQ(index) }
                  >
                     { faq.question }
                     <span className="text-[#008080] cursor-pointer">{ activeIndex === index ? "−" : "+" }</span>
                  </button>
                  { activeIndex === index && (
                     <p className="mt-2 text-gray-600">{ faq.answer }</p>
                  ) }
               </div>
            )) }
         </div>
      </motion.div>
   );
};

export default FAQSection;
