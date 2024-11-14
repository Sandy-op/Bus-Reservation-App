import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage';
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Checkout from './pages/checkout/Checkout';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/bus' element={<Bus />} />
          <Route path='bus/bus-details' element={<Detail />} />
          <Route path='bus/bus-details/checkout' element={<Checkout />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;