import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Set initial visibility based on current scroll position (useful on refresh/route change)
    setVisible(window.scrollY === 0);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // If we're at very top of the page, always show
      if (currentY === 0) {
        setVisible(true);
      } else {
        // If user scrolled down (current > last), hide immediately
        if (currentY > lastScrollY.current) {
          setVisible(false);
        }
        // If user scrolled up but not at top, DO NOT show (per your request).
        // So we intentionally do nothing on scroll-up unless at top.
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .topbar {
          width: 100%;
          background: #2d2d2df2;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 2rem;
          font-size: 1rem;
          min-height: 38px;
          z-index: 1100;
          position: fixed;
          top: 0;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          flex-wrap: wrap;
        }

        .topbar--hidden {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .topbar__social {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .topbar__icon {
          color: #fff;
          font-size: 1.1rem;
          text-decoration: none;
          transition: color 0.2s, background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: transparent;
        }

        .topbar__icon.facebook:hover {
          color: #1877f2;
          background-color: #fff;
        }

        .topbar__icon.instagram:hover {
          color: #e1306c;
          background-color: #fff;
        }

        .topbar__contact {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .topbar__item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
        }

        .topbar__link {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s;
        }

        .topbar__link:hover {
          color: #00ffff;
          text-decoration: underline;
        }

        .topbar__email-icon,
        .topbar__phone-icon {
          font-size: 1rem;
          color: #00ffff;
        }

        @media (max-width: 768px) {
          .topbar {
            flex-direction: column;
            padding: 0.5rem 1rem;
            gap: 0.5rem;
          }
          .topbar__contact {
            justify-content: center;
            font-size: 0.9rem;
            gap: 0.6rem;
          }
        }
      `}</style>

      <div className={`topbar ${visible ? '' : 'topbar--hidden'}`}>
        {/* Left - Social Media */}
        <div className="topbar__social">
          <a
            href="https://www.facebook.com/"
            aria-label="Facebook"
            className="topbar__icon facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com/"
            aria-label="Instagram"
            className="topbar__icon instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        {/* Right - Contact info */}
        <div className="topbar__contact">
          <div className="topbar__item">
            <FontAwesomeIcon icon={faPhone} className="topbar__phone-icon" />
            <a href="tel:+919009900079" className="topbar__link">
              +91 90099-00079
            </a>
          </div>

          <div className="topbar__item">
            <FontAwesomeIcon icon={faPhone} className="topbar__phone-icon" />
            <a href="tel:+919827744771" className="topbar__link">
              +91 98277-44771
            </a>
          </div>

          <div className="topbar__item">
            <FontAwesomeIcon icon={faPhone} className="topbar__phone-icon" />
            <a href="tel:07554233323" className="topbar__link">
              0755-4233323
            </a>
          </div>

          <div className="topbar__item">
            <FontAwesomeIcon icon={faEnvelope} className="topbar__email-icon" />
            <a href="mailto:runip2@gmail.com" className="topbar__link">
              runip2@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
