/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { handleError } from "../hooks/handleError";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const currencySymbol = '$';
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [doctors, setDoctors] = useState([]);
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [userData, setUserData] = useState(false);
   const [appointments, setAppointments] = useState([]);

   // **Get All Doctors**
   const getAllDoctors = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
         data.success ? setDoctors(data.doctors) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // **Get User Appointments**
   const getUserAppointments = async () => {
      if (!token) return;

      try {
         const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
         });

         if (data.success) {
            setAppointments(data.appointments.reverse());
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Get User Profile**
   const loadUserDataProfile = async () => {
      if (!token) return;

      try {
         const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
            headers: { Authorization: `Bearer ${token}` },
         });

         data.success ? setUserData(data.userData) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // Load profile and appointments when token changes
   useEffect(() => {
      if (token) {
         loadUserDataProfile();
         getUserAppointments();
      } else {
         setUserData(false);
         setAppointments([]);
      }
   }, [token]);

   // On initial load, fetch doctors
   useEffect(() => {
      getAllDoctors();
   }, []);

   const value = {
      doctors, currencySymbol,
      backendUrl, token,
      setToken, userData,
      setUserData, loadUserDataProfile,
      appointments, getUserAppointments, getAllDoctors
   };

   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;
