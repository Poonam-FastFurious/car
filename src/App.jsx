import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Fleet from './pages/Fleet';
import Services from './pages/Services';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OtpVerification from './components/auth/OtpVerification';
import ThankYou from './components/auth/ThankYou';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import MyProfile from './pages/MyProfile';
import MyBookings from './pages/MyBookings';
import Payments from './pages/Payments';
import ChangePassword from './components/auth/ChangePassword';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationRefundPolicy from './pages/CancellationRefundPolicy';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="max-w-[1920px] w-full mx-auto bg-white text-gray-800 relative">
      <BrowserRouter>
        <ScrollToTop />
        <Header />

        <main className="min-h-[calc(100vh-200px)] "> {/* adjust height if needed */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/termsConditions" element={<TermsConditions />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/cancellationPolicy" element={<CancellationRefundPolicy />} />

            {/* ✅ Protected Routes */}
            <Route path="/booking" element={<Booking />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardLayout> <Dashboard /> </DashboardLayout>} />
              <Route path="/profile" element={<DashboardLayout><MyProfile /></DashboardLayout>} />
              <Route path="/bookings" element={<DashboardLayout><MyBookings /></DashboardLayout>} />
              <Route path="/payments" element={<DashboardLayout><Payments /></DashboardLayout>} />
              <Route path="/change-password" element={<DashboardLayout><ChangePassword /></DashboardLayout>} />
            </Route>
          </Routes>

        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
