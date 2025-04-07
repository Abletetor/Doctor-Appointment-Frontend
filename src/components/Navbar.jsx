import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
   const navigate = useNavigate();
   const dropdownRef = useRef();
   const [showMenu, setShowMenu] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { token, setToken, userData } = useContext(AppContext);

   const logout = () => {
      setToken(false);
      localStorage.removeItem("token");
      navigate("/");
   };

   useEffect(() => {
      function handleClickOutside (event) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <>
         {/* Fixed Navbar */ }
         <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex items-center justify-between text-sm py-4 px-5">
            <img
               onClick={ () => {
                  navigate("/");
                  scrollTo(0, 0);
               } }
               src={ assets.logo_1 }
               alt="App-logo"
               className="w-30 cursor-pointer"
            />

            {/* Desktop Navigation */ }
            <ul className="hidden md:flex items-start gap-5 font-medium">
               { ["/", "/doctors", "/services", "/about", "/contact"].map(
                  (path, index) => (
                     <NavLink
                        key={ index }
                        to={ path }
                        className="relative"
                        onClick={ () => scrollTo(0, 0) }
                     >
                        <li className="py-1 uppercase">{ path.replace("/", "") || "Home" }</li>
                        <hr className="border-none outline-none h-0.5 bg-[#008080] w-3/5 m-auto absolute left-0 right-0 bottom-0 hidden" />
                     </NavLink>
                  )
               ) }
            </ul>

            {/* Profile & Mobile Menu */ }
            <div className="flex items-center gap-4">
               { token && userData ? (
                  <div className="relative" ref={ dropdownRef }>
                     <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={ () => setDropdownOpen(!dropdownOpen) }
                     >
                        <img
                           src={ userData.image }
                           alt="profile"
                           className="w-8 rounded-full"
                        />
                        <img
                           src={ assets.dropdown_icon }
                           alt="dropdown-menu"
                           className="w-2.5"
                        />
                     </div>

                     { dropdownOpen && (
                        <div className="absolute right-0 mt-3 bg-white border border-[#B2DFDB] rounded-md shadow-lg text-gray-700 w-48">
                           <div className="flex flex-col p-4 space-y-2">
                              <p
                                 onClick={ () => {
                                    navigate("/my-profile");
                                    setDropdownOpen(false);
                                    scrollTo(0, 0);
                                 } }
                                 className="cursor-pointer hover:text-[#008080]"
                              >
                                 My Profile
                              </p>
                              <p
                                 onClick={ () => {
                                    navigate("/my-appointments");
                                    setDropdownOpen(false);
                                    scrollTo(0, 0);
                                 } }
                                 className="cursor-pointer hover:text-[#008080]"
                              >
                                 My Appointments
                              </p>
                              <p
                                 onClick={ () => {
                                    logout();
                                    setDropdownOpen(false);
                                    scrollTo(0, 0);
                                 } }
                                 className="cursor-pointer hover:text-red-500"
                              >
                                 Logout
                              </p>
                           </div>
                        </div>
                     ) }
                  </div>

               ) : (
                  <button
                     onClick={ () => navigate("/login") }
                     className="bg-[#008080] text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-[#006666] transition duration-300"
                  >
                     Create account
                  </button>
               ) }

               {/* Mobile Menu Button */ }
               <img
                  onClick={ () => setShowMenu(true) }
                  src={ assets.menu_icon }
                  alt="menu-icon"
                  className="w-6 md:hidden cursor-pointer"
               />

               {/* Mobile Menu */ }
               <div
                  className={ `fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${showMenu ? "w-64" : "w-0"
                     } overflow-hidden z-50` }
               >
                  <div className="flex items-center justify-between px-5 py-6">
                     <img className="w-36" src={ assets.logo_1 } alt="logo" />
                     <img
                        className="w-7 cursor-pointer"
                        onClick={ () => setShowMenu(false) }
                        src={ assets.cross_icon }
                        alt="close-menu"
                     />
                  </div>

                  {/* Mobile Menu Links */ }
                  <ul className="flex flex-col items-start gap-3 mt-5 px-5 text-lg font-medium">
                     { ["/", "/doctors", "/services", "/about", "/contact"].map(
                        (path, index) => (
                           <NavLink
                              key={ index }
                              onClick={ () => {
                                 setShowMenu(false);
                                 scrollTo(0, 0);
                              } }
                              to={ path }
                           >
                              <p className="px-4 py-2 rounded inline-block uppercase">
                                 { path.replace("/", "") || "Home" }
                              </p>
                           </NavLink>
                        )
                     ) }
                  </ul>
               </div>
            </div>
         </div>

         {/* Padding to prevent content from being hidden behind navbar */ }
         <div className="pt-[90px]"></div>
      </>
   );
};

export default Navbar;
