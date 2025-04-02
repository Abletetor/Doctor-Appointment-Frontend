import { Route, Routes } from 'react-router-dom';
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyAppointment from './pages/MyAppointment';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import PaymentSuccess from './pages/PaymentSuccess';
import Services from './pages/Services';

const App = () => {
   return (
      <>
         <div className='mx-4 sm:mx-[10%]'>
            <ToastContainer />
            <Navbar />
            <Routes>
               <Route path='/' element={ <Home /> } />
               <Route path='/doctors' element={ <Doctors /> } />
               <Route path='/doctors/:speciality' element={ <Doctors /> } />
               <Route path='/login' element={ <Login /> } />
               <Route path='/about' element={ <About /> } />
               <Route path='/contact' element={ <Contact /> } />
               <Route path='/services' element={ <Services /> } />
               <Route path='/my-profile' element={ <MyProfile /> } />
               <Route path='/my-appointments' element={ <MyAppointment /> } />
               <Route path='/appointment/:docId' element={ <Appointment /> } />
               <Route path="/payment-success" element={ <PaymentSuccess /> } />
               <Route path='/cancel' element={ <MyAppointment /> } />
            </Routes>
         </div>
         <Footer />
      </>
   );
};

export default App;