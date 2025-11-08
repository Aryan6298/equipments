// src/components/NavigationBarBootstrap.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/runip2-logo.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBarBootstrap = () => {
  // initial value will be set on mount to be safe for SSR
  const [marginTop, setMarginTop] = useState('30px');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // controls collapse
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // mobile services dropdown
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false); // desktop hover dropdown

  // NEW: products dropdown states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // navbar height offset used by scroll-to helpers
  const NAV_OFFSET = 80;

  // Helper: returns the "top margin when at page top" depending on viewport
  const topMarginForViewport = () => {
    // threshold aligned with your navbar/mobile styles (lg breakpoint of 992px)
    if (typeof window === 'undefined') return '30px';
    return window.innerWidth < 787 ? '11.4vh' : '30px';
  };

  // On mount set an initial marginTop based on viewport (ensures mobile starts a little lower)
  useEffect(() => {
    setMarginTop(topMarginForViewport());

    // keep margin correct if user resizes (and is at top)
    const onResize = () => {
      if (window.scrollY <= 0) {
        setMarginTop(topMarginForViewport());
      }
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    setDesktopDropdownOpen(false);
    // NEW: close products menus too
    setMobileProductsOpen(false);
    setDesktopProductsOpen(false);
  }, [location.pathname]);

  // Show/hide navbar margin on scroll (mobile uses smaller initial offset)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 0) {
        // at top: use viewport-aware top margin
        setMarginTop(topMarginForViewport());
      } else {
        // scrolled: collapse margin
        setMarginTop('0px');
      }
    };

    // run once to ensure correct state if user loads at scrolled position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  // When route changes with a hash (e.g., /services#foo), scroll to target
  useEffect(() => {
    if ((location.pathname === '/services' || location.pathname === '/products') && location.hash) {
      const id = location.hash.replace('#', '');
      const t = setTimeout(() => scrollToId(id), 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location, scrollToId]);

  // Reusable nav link click handler (closes mobile menu)
  const handleNavLinkClick = useCallback((path) => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    setMobileProductsOpen(false); // also close products mobile
    if (path) navigate(path);
  }, [navigate]);

  // Handle clicking a service dropdown item
  const handleServiceClick = (e, sectionId) => {
    e && e.preventDefault();
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);

    if (location.pathname === '/services') {
      scrollToId(sectionId);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `/services#${sectionId}`);
      }
    } else {
      navigate(`/services#${sectionId}`);
      // fallback scroll (in case navigation rendering differs)
      setTimeout(() => scrollToId(sectionId), 320);
    }
  };

  // NEW: Handle clicking a product dropdown item (same behavior as services but for /products)
  const handleProductClick = (e, sectionId) => {
    e && e.preventDefault();
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);

    if (location.pathname === '/products') {
      scrollToId(sectionId);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `/products#${sectionId}`);
      }
    } else {
      navigate(`/products#${sectionId}`);
      setTimeout(() => scrollToId(sectionId), 320);
    }
  };

  // Toggle mobile menu collapse
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  // Toggle mobile dropdown for services (accordion-like)
  const toggleMobileDropdown = (e) => {
    e && e.preventDefault();
    setMobileDropdownOpen((v) => !v);
  };

  // NEW: Toggle mobile products dropdown
  const toggleMobileProductsDropdown = (e) => {
    e && e.preventDefault();
    setMobileProductsOpen((v) => !v);
  };

  return (
    <>
      <style>{`
        /* ====================== NAVBAR STYLING ====================== */
        .navbar {
          background-color: #0f0f0f !important;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
          overflow: visible;
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
          color: #fff;
        }

        .navbar-toggler-icon-custom {
          display: inline-block;
          width: 24px;
          height: 18px;
          position: relative;
        }

        .navbar-toggler-icon-custom span {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .navbar-toggler-icon-custom span:nth-child(1) { top: 0; }
        .navbar-toggler-icon-custom span:nth-child(2) { top: 8px; }
        .navbar-toggler-icon-custom span:nth-child(3) { top: 16px; }

        .navbar-toggler.open .navbar-toggler-icon-custom span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .navbar-toggler.open .navbar-toggler-icon-custom span:nth-child(2) {
          opacity: 0;
        }
        .navbar-toggler.open .navbar-toggler-icon-custom span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .navbar-nav .nav-item { position: relative; }

        @media (max-width: 576px) {
          .nav-link { font-size: 0.95rem; }
          .logo-img { max-height: 46px; }
        }
      `}</style>

      <nav
        className="navbar navbar-expand-lg fixed-top shadow-sm"
        style={{ zIndex: 1090, marginTop }}
      >
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
            onClick={() => handleNavLinkClick('/')}
            aria-label="Go to Home"
          >
            <img src={logo} alt="RUNIP2 Logo" className="rounded logo-img" />
          </Link>

          {/* Toggler (React-controlled) */}
          <button
            className={`navbar-toggler ${mobileMenuOpen ? 'open' : ''}`}
            type="button"
            aria-controls="mainNavbar"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <span className="navbar-toggler-icon-custom" aria-hidden>
              <span></span><span></span><span></span>
            </span>
          </button>

          {/* Navigation Links (collapse controlled by state) */}
          <div
            id="mainNavbar"
            className={`collapse navbar-collapse justify-content-end ${mobileMenuOpen ? 'show' : ''}`}
          >
            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => handleNavLinkClick('/')}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about-us"
                  onClick={() => handleNavLinkClick('/about-us')}
                >
                  About Us
                </NavLink>
              </li>

              {/* Services Dropdown */}
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
                        // mobile: clicking main label toggles mobile dropdown
                        e.preventDefault();
                        toggleMobileDropdown(e);
                      } else {
                        // desktop: go to services page and scroll top
                        handleNavLinkClick('/services');
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                      }
                    }}
                  >
                    Our Services
                  </NavLink>

                  {/* separate small triangle icon clickable for mobile too */}
                  <button
                    className="btn btn-link p-0 ms-1 d-lg-none"
                    onClick={toggleMobileDropdown}
                    aria-expanded={mobileDropdownOpen}
                    aria-label="Toggle services submenu"
                    style={{ color: 'inherit' }}
                  >
                    <IoMdArrowDropdown
                      className="dropdown-icon"
                      style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : undefined }}
                    />
                  </button>
                </div>

                {/* Mobile (accordion style) */}
                <ul className={`mobile-dropdown d-lg-none${mobileDropdownOpen ? ' open' : ''}`} role="menu" aria-label="Services submenu">
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
                      href="/services#facility"
                      className="dropdown-item"
                      onClick={(e) => handleServiceClick(e, 'facility-design')}
                    >
                      Facility Consulting
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

                {/* Desktop dropdown */}
                <ul className="dropdown-menu d-none d-lg-block" role="menu" aria-label="Services submenu">
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

              {/* ===== NEW: Products Dropdown (behaves like Services) ===== */}
              <li
                className={`nav-item dropdown ${desktopProductsOpen ? 'show' : ''}`}
                onMouseEnter={() => setDesktopProductsOpen(true)}
                onMouseLeave={() => setDesktopProductsOpen(false)}
              >
                <div className="nav-dropdown-combo d-flex align-items-center position-relative">
                  <NavLink
                    className="nav-link d-flex align-items-center gap-1 dropdown-toggle"
                    to="/products"
                    onClick={(e) => {
                      if (window.innerWidth < 992) {
                        // mobile: clicking main label toggles mobile products dropdown
                        e.preventDefault();
                        toggleMobileProductsDropdown(e);
                      } else {
                        // desktop: go to products page and scroll top
                        handleNavLinkClick('/products');
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                      }
                    }}
                  >
                    Sports Products
                  </NavLink>

                  {/* small triangle icon for mobile */}
                  <button
                    className="btn btn-link p-0 ms-1 d-lg-none"
                    onClick={toggleMobileProductsDropdown}
                    aria-expanded={mobileProductsOpen}
                    aria-label="Toggle products submenu"
                    style={{ color: 'inherit' }}
                  >
                    <IoMdArrowDropdown
                      className="dropdown-icon"
                      style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : undefined }}
                    />
                  </button>
                </div>

                {/* Mobile accordion for products */}
                <ul className={`mobile-dropdown d-lg-none${mobileProductsOpen ? ' open' : ''}`} role="menu" aria-label="Products submenu">
                  <li>
                    <a
                      href="/products#top-products"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'top-products')}
                    >
                      Top Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#cardio"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'cardio')}
                    >
                      Cardio Equipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#strength"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'strength')}
                    >
                      Strength Equipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#accessories"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'accessories')}
                    >
                      Accessories
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#custom-solutions"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'custom-solutions')}
                    >
                      Custom Solutions
                    </a>
                  </li>
                </ul>

                {/* Desktop dropdown for products */}
                <ul className="dropdown-menu d-none d-lg-block" role="menu" aria-label="Products submenu">
                  <li>
                    <a
                      href="/products#top-products"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'top-products')}
                    >
                      Top Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#cardio"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'cardio')}
                    >
                      Cardio Equipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#strength"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'strength')}
                    >
                      Strength Equipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#accessories"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'accessories')}
                    >
                      Accessories
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products#custom-solutions"
                      className="dropdown-item"
                      onClick={(e) => handleProductClick(e, 'custom-solutions')}
                    >
                      Custom Solutions
                    </a>
                  </li>
                </ul>
              </li>
              {/* ===== end products dropdown ===== */}

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/mediafeatures"
                  onClick={() => handleNavLinkClick('/mediafeatures')}
                >
                  Media Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/clients"
                  onClick={() => handleNavLinkClick('/clients')}
                >
                  Clients
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={() => handleNavLinkClick('/contact')}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBarBootstrap;
