import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../hooks/handleError';

const Login = () => {
   const navigate = useNavigate();
   const [state, setState] = useState('Sign Up');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
   const { token, setToken, backendUrl, setUserData } = useContext(AppContext);

   // ** Handle form submission **
   const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
         if (state === "Sign Up") {
            const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
            if (data.success) {
               localStorage.setItem("token", data.token);
               setToken(data.token);
               setUserData(data.userData);

            } else { toast.error(data.message); }

         } else {

            const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

            if (data.success) {
               localStorage.setItem("token", data.token);
               setToken(data.token);
               setUserData(data.userData);

            } else { toast.error(data.message); }
         }
      } catch (error) {
         handleError(error);
      }
   };

   // *Redirect after Login*
   useEffect(() => {
      if (token) {
         navigate('/');
      }
   }, [token, navigate]);

   return (
      <form onSubmit={ onSubmitHandler } className="min-h-[80vh] flex items-center justify-center">
         <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border border-[#B2DFDB] rounded-xl bg-[#E0F2F1] text-[#4A4A4A] text-sm shadow-md">
            <p className="text-2xl font-semibold text-[#008080]">
               { state === "Sign Up" ? "Create an Account" : "Welcome Back" }
            </p>
            <p className="text-[#4A4A4A]">{ state === 'Sign Up' ? "Sign up to book your appointment" : "Log in to your account" }</p>

            { state === "Sign Up" && (
               <div className="w-full">
                  <label className="font-medium text-[#4A4A4A]">Full Name</label>
                  <input
                     className="border border-[#B2DFDB] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#008080]"
                     type="text"
                     onChange={ (e) => setName(e.target.value) }
                     value={ name }
                     required
                  />
               </div>
            ) }

            <div className="w-full">
               <label className="font-medium text-[#4A4A4A]">Email</label>
               <input
                  className="border border-[#B2DFDB] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  type="email"
                  onChange={ (e) => setEmail(e.target.value) }
                  value={ email }
                  required
               />
            </div>

            <div className="w-full">
               <label className="font-medium text-[#4A4A4A]">Password</label>
               <input
                  className="border border-[#B2DFDB] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  type="password"
                  onChange={ (e) => setPassword(e.target.value) }
                  value={ password }
                  required
               />
            </div>

            <button
               type="submit"
               className="w-full bg-[#008080] py-2 rounded-md text-base text-white cursor-pointer transition-all duration-300 hover:bg-[#006666] hover:scale-105"
            >
               { state === "Sign Up" ? "Create Account" : "Login" }
            </button>

            { state === "Sign Up" ? (
               <p>
                  Already have an account?
                  <span onClick={ () => setState("Log In") } className="text-[#008080] font-medium cursor-pointer hover:underline"> Login here</span>
               </p>
            ) : (
               <p>
                  Don't have an account?
                  <span onClick={ () => setState("Sign Up") } className="text-[#008080] font-medium cursor-pointer hover:underline"> Sign up</span>
               </p>
            ) }
         </div>
      </form>
   );
};

export default Login;
