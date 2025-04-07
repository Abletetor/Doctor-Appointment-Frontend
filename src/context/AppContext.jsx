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

   // **Get All Doctors**
   const getAllDoctors = async () => {

      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
         data.success ? setDoctors(data.doctors) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // **On Load Get Doctors**
   useEffect(() => {
      getAllDoctors();
   }, []);

   // ** Get User Data Profile**
   const loadUserDataProfile = async () => {
      if (!token) return;

      try {
         const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { Authorization: `Bearer ${token}` } });

         data.success ? setUserData(data.userData) : toast.error(data.message);

      } catch (error) {
         handleError(error);
      }
   };
   // *Load user profile*
   useEffect(() => {
      token ? loadUserDataProfile() : setUserData(false);
   }, [token]);


   const value = {
      doctors, currencySymbol, backendUrl,
      token, setToken, getAllDoctors,
      userData, setUserData, loadUserDataProfile
   };
   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};
export default AppContextProvider;