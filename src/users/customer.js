import { Routes, Route } from 'react-router-dom';
import Aboutus from "../pages/aboutus";
import Home from "../pages/home";
import Navbar from "../components/navbar";
import Feedback from '../pages/feedback';
import Notifications from '../pages/notifications';
import Livetracking from '../pages/livetracking';
import Faq from '../pages/faq';
import MapPage from '../pages/mappage';
import Ouroffers from '../pages/ouroffers';
import QR from '../pages/qr';
import Prefrences from '../pages/prefrences';
import Time from '../pages/time';

function Customer() {
  return (
    <div className="Customer"> 
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ouroffers" element={<Ouroffers/>} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/livetracking" element={<Livetracking />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/qrscanner" element={<QR />} />
        <Route path="/prefrences" element={<Prefrences />} />
        <Route path="/time" element={<Time />} />
      </Routes>
    </div>
  );
}

export default Customer;
