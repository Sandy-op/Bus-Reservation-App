import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignUp from './Components/Admin/AdminSignUp';
import AdminHomePage from './Components/Admin/AdminHomePage';
import PageNotFound from './Components/PageNotFound';
import Protect from './Components/Protect';
import UserSignUp from './Components/User/UserSignUp';
import UserLogin from './Components/User/UserLogin';
import UserForgotPassword from './Components/User/UserForgotPassword';
import UserResetPassword from './Components/User/UserResetPassword';
import ResetConfirmation from './Components/ResetConfirmation';
import BookBus from './Components/Bus/BookBus';
import SearchBus from './Components/Bus/SearchBus';
import BookTicket from './Components/Bus/BookTicket';
import { AuthProvider } from './Components/AuthContext';
import AdminForgotPassword from './Components/Admin/AdminForgotPassword';
import AdminResetPassword from './Components/Admin/AdminResetPassword';


function App() {
  return (
    <div className="App">
      <AuthProvider>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/usersignup' element={<UserSignUp/>}/>
      <Route path='/userlogin' element={<UserLogin/>}/> 
      <Route path='/adminsignup' element={<AdminSignUp/>}/>
      <Route path='/bookbus/:id' element={<Protect Child={BookBus} role="user"/>}/>
      <Route path='/adminhomepage/*' element={<Protect Child={AdminHomePage} role="admin" />}/>
      <Route path='/user-forgot-password' element={<UserForgotPassword/>}/>
      <Route path='/admin-forgot-password' element={<AdminForgotPassword/>} />
      <Route path='/reset-confirmation' element={<ResetConfirmation />} />
      <Route path='/user-reset-password' element={<UserResetPassword/>} />
      <Route path='/admin-reset-password' element={<AdminResetPassword/>} />
      <Route path='/search-bus' element={<SearchBus/>}/>
      <Route path='/book-ticket/:busId/:userId/:numberOfSeats' element={<BookTicket/>} />
      
      <Route path='/*' element={<PageNotFound/>}/>
     </Routes>
     </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;