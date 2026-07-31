import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Pages
import Home from './pages/Home';
import AllTours from './pages/AllTours';
import TourDetails from './pages/TourDetails';
import AllVisas from './pages/AllVisas';
import AllActivities from './pages/AllActivities';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageTours from './admin/ManageTours';
import ManageVisas from './admin/ManageVisas';
import ManageActivities from './admin/ManageActivities';
import ManageTestimonials from './admin/ManageTestimonials';
import ManageEnquiries from './admin/ManageEnquiries';
import ManagePopups from './admin/ManagePopups';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tours" element={<ManageTours />} />
          <Route path="visas" element={<ManageVisas />} />
          <Route path="activities" element={<ManageActivities />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="enquiries" element={<ManageEnquiries />} />
          <Route path="popups" element={<ManagePopups />} />
        </Route>

        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<AllTours />} />
                <Route path="/tours/:id" element={<TourDetails />} />
                <Route path="/visas" element={<AllVisas />} />
                <Route path="/activities" element={<AllActivities />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
