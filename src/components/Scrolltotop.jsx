// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Always scroll to top on any navigation (including same-page clicks)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.key]); // location.key changes even for same path navigations

  return null;
};

export default ScrollToTop;
