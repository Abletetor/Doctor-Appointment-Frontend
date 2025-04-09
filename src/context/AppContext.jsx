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

   // pagination state
   const [pagination, setPagination] = useState({
      totalDocs: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10
   });
   

   // **Get All Doctors**
   const getAllDoctors = async (page = 1, limit = 10) => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/list?page=${page}&limit=${limit}`);

         if (data.success) {
            setDoctors(data.doctors);
            setPagination(data.pagination);
         } else {
            toast.error(data.message);
         }
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


   const value = {
      doctors, currencySymbol,
      backendUrl, token,
      setToken, userData,
      setUserData, loadUserDataProfile,
      appointments, getUserAppointments, getAllDoctors,
      pagination,
   };

   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;
