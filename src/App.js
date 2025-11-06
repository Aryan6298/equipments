// src/App.js
import React, { useEffect } from 'react';
import Topbar from './components/Topbar';
import NavigationBarBootstrap from './components/NavigationBar';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContactFormSection from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

import { FaWhatsapp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Gallery from './pages/MediaFeatures';
import NotFound from './pages/NotFound';
import Services from './pages/Services';
import CustomCursor from './components/Customcursor';
import ScrollToTop from './components/Scrolltotop';

// Temporary placeholders — replace with your real components if you have them:

function clampIconSize() {
  const min = 32;
  const max = 44;
  if (typeof window === 'undefined') return 42;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const based = Math.round((6.5 / 100) * vw);
  return Math.max(min, Math.min(max, based));
}

function FloatingWhatsApp() {
  const iconSize = clampIconSize();

  return (
    <a
      href="https://wa.me/+9190099000790"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        right: 'calc(1rem + env(safe-area-inset-right))',
        bottom: 'calc(1rem + env(safe-area-inset-bottom))',
        zIndex: 9999,
        color: '#25D366',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
    >
      <FaWhatsapp size={iconSize} />
    </a>
  );
}

const styles = {
  overlay1: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function App() {
  useEffect(() => {
    if (AOS && typeof AOS.init === 'function') {
      AOS.init({ duration: 1000 });
    }
  }, []);

  return (
    <>
      <FloatingWhatsApp />
      <CustomCursor />
         <ScrollToTop />

      <div style={styles.overlay1}>
        <Topbar />
        <NavigationBarBootstrap />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactFormSection />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services/>} />
            <Route path="/mediafeatures" element={<Gallery />} />
          <Route path="*" element={< NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}
