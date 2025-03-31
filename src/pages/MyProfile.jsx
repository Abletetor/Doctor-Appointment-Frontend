import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { handleError } from "../hooks/handleError";
import {
   FaCamera,
   FaEnvelope,
   FaPhone,
   FaMapMarkerAlt,
   FaBirthdayCake,
   FaTransgender,
} from "react-icons/fa";

const MyProfile = () => {
   const { userData, setUserData, token, backendUrl, loadUserDataProfile } = useContext(AppContext);
   const [isEdit, setIsEdit] = useState(false);
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [tempUserData, setTempUserData] = useState(userData);

   useEffect(() => {
      if (image) {
         const previewUrl = URL.createObjectURL(image);
         setPreview(previewUrl);
         return () => URL.revokeObjectURL(previewUrl);
      }
   }, [image]);

   const formattedDob =
      userData.dob && !isNaN(new Date(userData.dob).getTime())
         ? new Date(userData.dob).toISOString().split("T")[0]
         : "";


   const updateUserProfileData = async () => {
      if (!userData.name || !userData.phone || !userData.gender || !userData.dob) {
         return toast.error("All fields are required.");
      }

      try {
         const formData = new FormData();
         formData.append("name", userData.name);
         formData.append("phone", userData.phone);
         formData.append("gender", userData.gender);
         formData.append("dob", userData.dob);
         formData.append("address", JSON.stringify(userData.address));
         if (image) formData.append("image", image);

         const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });

         if (data.success) {
            toast.success(data.message);
            await loadUserDataProfile();
            setIsEdit(false);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   const handleEdit = () => {
      setTempUserData(userData);
      setIsEdit(true);
   };

   const cancelEdit = () => {
      setUserData(tempUserData);
      setIsEdit(false);
   };

   return userData && (
      <div className="max-w-lg mx-auto p-5 text-sm bg-white rounded-lg shadow-md border border-[#B2DFDB]">
         {/* Profile Image */ }
         <div className="flex flex-col items-center">
            <label htmlFor="image" className="relative cursor-pointer">
               <img
                  className="w-36 h-36 object-cover rounded-full border-2 border-[#B2DFDB]"
                  src={ preview || userData.image }
                  alt="profile-img"
               />
               { isEdit && (
                  <div className="absolute bottom-2 right-2 bg-[#008080] text-white p-2 rounded-full">
                     <FaCamera />
                  </div>
               ) }
            </label>
            { isEdit && <input onChange={ (e) => setImage(e.target.files[0]) } type="file" id="image" hidden /> }
         </div>

         {/* Name */ }
         <div className="text-center mt-4">
            { isEdit ? (
               <input
                  type="text"
                  value={ userData.name }
                  onChange={ (e) => setUserData((prev) => ({ ...prev, name: e.target.value })) }
                  className="text-2xl font-medium text-center bg-[#E0F2F1] p-2 rounded w-full text-[#4A4A4A]"
               />
            ) : (
               <p className="font-medium text-2xl text-[#4A4A4A]">{ userData.name }</p>
            ) }
         </div>

         <hr className="my-5 border-t border-[#B2DFDB]" />

         {/* Contact Information */ }
         <div>
            <p className="text-[#4A4A4A] font-semibold">CONTACT INFORMATION</p>
            <div className="mt-3 space-y-3 text-[#4A4A4A]">
               <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#B0BEC5]" />
                  <p className="text-[#008080]">{ userData.email }</p>
               </div>
               <div className="flex items-center gap-2">
                  <FaPhone className="text-[#B0BEC5]" />
                  { isEdit ? (
                     <input
                        type="text"
                        value={ userData.phone }
                        onChange={ (e) => setUserData((prev) => ({ ...prev, phone: e.target.value })) }
                        className="bg-[#E0F2F1] p-2 rounded w-full text-[#4A4A4A]"
                     />
                  ) : (
                     <p className="text-[#008080]">{ userData.phone }</p>
                  ) }
               </div>
            </div>
         </div>

         <hr className="my-5 border-t border-[#B2DFDB]" />

         {/* Basic Information */ }
         <div>
            <p className="text-[#4A4A4A] font-semibold">BASIC INFORMATION</p>
            <div className="mt-3 space-y-3 text-[#4A4A4A]">
               <div className="flex items-center gap-2">
                  <FaTransgender className="text-[#B0BEC5]" />
                  { isEdit ? (
                     <select
                        value={ userData.gender }
                        onChange={ (e) => setUserData((prev) => ({ ...prev, gender: e.target.value })) }
                        className="bg-[#E0F2F1] p-2 rounded text-[#4A4A4A]"
                     >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                     </select>
                  ) : (
                     <p className="text-[#4A4A4A]">{ userData.gender }</p>
                  ) }
               </div>
               <div className="flex items-center gap-2">
                  <FaBirthdayCake className="text-[#B0BEC5]" />
                  { isEdit ? (
                     <input
                        className="bg-[#E0F2F1] p-2 rounded text-[#4A4A4A]"
                        type="date"
                        value={ formattedDob }
                        onChange={ (e) => setUserData((prev) => ({ ...prev, dob: e.target.value })) }
                     />
                  ) : (
                     <p className="text-[#4A4A4A]">{ userData.dob }</p>
                  ) }
               </div>
            </div>
         </div>

         {/* Buttons */ }
         <div className="mt-8 text-center space-x-3">
            { isEdit ? (
               <>
                  <button onClick={ updateUserProfileData } className="bg-[#008080] text-white px-6 py-2 rounded-full hover:bg-[#006666] hover:scale-105">
                     Save Information
                  </button>
                  <button onClick={ cancelEdit } className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
                     Cancel
                  </button>
               </>
            ) : (
               <button onClick={ handleEdit } className="bg-[#008080] text-white px-6 py-2 rounded-full hover:bg-[#006666] hover:scale-105">
                  Edit Profile
               </button>
            ) }
         </div>
      </div>
   );
};

export default MyProfile;
