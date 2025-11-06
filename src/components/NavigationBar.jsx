// src/components/NavigationBarBootstrap.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/runip2-logo.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavigationBarBootstrap = () => {
  const [marginTop, setMarginTop] = useState('30px');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const collapseRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // navbar height offset (adjust if your navbar is taller/shorter)
  const NAV_OFFSET = 80;

  // Collapse nav on link click (keeps mobile UX tidy)
  const handleNavLinkClick = useCallback(() => {
    if (window.innerWidth < 992 && collapseRef.current) {
      const bsCollapse = window.bootstrap && window.bootstrap.Collapse
        ? window.bootstrap.Collapse
        : window.Collapse;
      if (bsCollapse) {
        try {
          const instance = bsCollapse.getInstance
            ? bsCollapse.getInstance(collapseRef.current) || new bsCollapse(collapseRef.current, { toggle: false })
            : new bsCollapse(collapseRef.current, { toggle: false });
          instance.hide();
        } catch (err) {
          if (collapseRef.current.classList.contains('show')) {
            collapseRef.current.classList.remove('show');
          }
        }
      } else if (collapseRef.current.classList.contains('show')) {
        collapseRef.current.classList.remove('show');
      }
    }
    setMobileDropdownOpen(false);
  }, []);

  // smooth scroll helper (accounts for fixed navbar offset)
  const scrollToId = useCallback((id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.pageYOffset + rect.top - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // When route (location) changes and contains a hash, attempt to scroll to it.
  useEffect(() => {
    if (location.pathname === '/services' && location.hash) {
      const id = location.hash.replace('#', '');
      // small timeout to let the page render (images/AOS/layout)
      const t = setTimeout(() => scrollToId(id), 120);
      return () => clearTimeout(t);
    }
    // If no hash and on /services, scroll to top of services container?
    return undefined;
  }, [location, scrollToId]);

  // Handle clicking a service dropdown item
  const handleServiceClick = (e, sectionId) => {
    e && e.preventDefault();
    handleNavLinkClick();

    if (location.pathname === '/services') {
      // already on services page -> just scroll
      scrollToId(sectionId);
      // optionally update the URL hash without reloading
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `/services#${sectionId}`);
      }
    } else {
      // navigate to /services with hash then scroll after navigation (use effect above also handles it)
      navigate(`/services#${sectionId}`);
      // fallback scroll after short delay in case effect timing differs
      setTimeout(() => scrollToId(sectionId), 300);
    }
  };

  // show/hide navbar on scroll (existing behaviour)
  useEffect(() => {
    const handleScroll = () => setMarginTop(window.scrollY <= 0 ? '30px' : '0px');
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (e) => {
    if (window.innerWidth < 992) {
      e.preventDefault();
      setMobileDropdownOpen((open) => !open);
    }
  };

  return (
    <>
      <style>{`
        /* ====================== NAVBAR STYLING ====================== */
        .navbar {
          background-color: #0f0f0f !important;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
          overflow: visible; /* ensure dropdown can overflow */
        }

        .logo-img {
          width: auto;
          max-height: 56px;
          object-fit: contain;
          filter: drop-shadow(0 0.15rem 0.4rem rgba(0,0,0,0.6));
        }

        .nav-link {
          font-weight: 500;
          color: #f5f5f5 !important;
          position: relative;
          font-size: 1.05rem;
          text-transform: capitalize;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #39b54a !important;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #39b54a, #ff3c00);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.28s ease;
        }

        .nav-link:hover::before,
        .nav-link.active::before {
          transform: scaleX(1);
        }

        .dropdown-toggle::after {
          display: none !important;
          content: none !important;
          border: none !important;
        }

        .nav-item.dropdown { position: relative; }

        .dropdown-menu {
          position: absolute;
          top: calc(100% - 6px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          min-width: 260px;
          max-width: 360px;
          z-index: 1500;
          background-color: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          display: block;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          padding: 0.25rem 0;
          transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s;
          white-space: normal;
        }

        .nav-item.dropdown:hover > .dropdown-menu,
        .nav-item.dropdown.show > .dropdown-menu {
          visibility: visible;
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        @media (max-width: 991px) {
          .dropdown-menu {
            position: static;
            transform: none;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            background-color: transparent;
            box-shadow: none;
            border: none;
            padding: 0;
            max-width: none;
            top: auto;
          }
        }

        .dropdown-item {
          color: #f5f5f5;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          transition: background 0.28s, color 0.28s;
          white-space: normal;
        }

        .dropdown-item:hover {
          background: linear-gradient(135deg, #39b54a, #2e8c3a);
          color: #fff;
        }

        .dropdown-icon {
          transition: transform 0.28s ease, color 0.28s ease;
          color: #39b54a !important;
          font-size: 1.15rem;
          display: inline-flex;
          align-items: center;
        }

        .nav-dropdown-combo:hover .dropdown-icon,
        .nav-item.dropdown.show .dropdown-icon {
          transform: rotate(180deg);
        }

        .nav-dropdown-combo {
          padding-bottom: 6px;
        }

        .mobile-dropdown {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.25s ease;
          background-color: #1a1a1a;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          margin-top: 0.5rem;
        }

        .mobile-dropdown.open {
          max-height: 420px;
          opacity: 1;
        }

        @media (min-width: 992px) {
          .mobile-dropdown { display: none !important; }
        }

        .navbar-toggler {
          border: none;
          filter: invert(100%);
        }

        .navbar-nav .nav-item { position: relative; }

        @media (max-width: 576px) {
          .nav-link { font-size: 0.95rem; }
          .logo-img { max-height: 46px; }
        }
      `}</style>

      <nav
        className="navbar navbar-expand-lg shadow-sm fixed-top"
        style={{ zIndex: 1090, marginTop }}
      >
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
            onClick={() => { handleNavLinkClick(); navigate('/'); }}
            aria-label="Go to Home"
          >
            <img src={logo} alt="RUNIP2 Logo" className="rounded logo-img" />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center" id="mainNavbar" ref={collapseRef}>
            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={() => { handleNavLinkClick(); navigate('/'); }}>Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about-us" onClick={() => { handleNavLinkClick(); navigate('/about-us'); }}>About Us</NavLink>
              </li>

              {/* Dropdown */}
              <li
                className={`nav-item dropdown ${desktopDropdownOpen ? 'show' : ''}`}
                onMouseEnter={() => setDesktopDropdownOpen(true)}
                onMouseLeave={() => setDesktopDropdownOpen(false)}
              >
                <div className="nav-dropdown-combo d-flex align-items-center position-relative">
                  <NavLink
                    className="nav-link d-flex align-items-center gap-1 dropdown-toggle"
                    to="/services"
                    onClick={(e) => {
                      if (window.innerWidth < 992) {
                        e.preventDefault();
                        setMobileDropdownOpen(!mobileDropdownOpen);
                      } else {
                        handleNavLinkClick();
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                      }
                    }}
                  >
                    Our Services
                  </NavLink>

                  <span
                    className="dropdown-toggle d-flex align-items-center"
                    role="button"
                    onClick={handleDropdownToggle}
                    aria-label="Toggle programs dropdown"
                    aria-haspopup="true"
                    aria-expanded={mobileDropdownOpen}
                  >
                    <IoMdArrowDropdown
                      className="dropdown-icon"
                      style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : undefined }}
                    />
                  </span>
                </div>

                {/* Mobile Dropdown */}
                <ul className={`mobile-dropdown${mobileDropdownOpen ? ' open' : ''} d-lg-none`}>
                  <li>
                    <a
                      href="/services#equipment-supply"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'equipment-supply')}
                    >
                      Equipment Supply
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#arena-construction"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'arena-construction')}
                    >
                      Arena & Turf Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#maintenance"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'maintenance')}
                    >
                      Maintenance & Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#facility-design"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'facility-design')}
                    >
                      Facility Design & Consulting
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#corporate-fitness"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'corporate-fitness')}
                    >
                      Corporate Fitness
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#sports-accessories"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'sports-accessories')}
                    >
                      Sports Accessories
                    </a>
                  </li>
                </ul>

                {/* Desktop Dropdown */}
                <ul className="dropdown-menu d-none d-lg-block" role="menu" aria-label="Programs submenu">
                  <li>
                    <a
                      href="/services#equipment-supply"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'equipment-supply')}
                    >
                      Equipment Supply
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#arena-construction"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'arena-construction')}
                    >
                      Arena & Turf Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#maintenance"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'maintenance')}
                    >
                      Maintenance & Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#facility-design"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'facility-design')}
                    >
                      Facility Design & Consulting
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#corporate-fitness"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'corporate-fitness')}
                    >
                      Corporate Fitness
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services#sports-accessories"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'sports-accessories')}
                    >
                      Sports Accessories
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item"><NavLink className="nav-link" to="/mediafeatures" onClick={() => { handleNavLinkClick(); navigate('/mediafeatures'); }}>Media Features</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact" onClick={() => { handleNavLinkClick(); navigate('/contact'); }}>Contact Us</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBarBootstrap;
