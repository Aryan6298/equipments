import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

import digiLibraryImg from '../assets/images/products/matrix-fitness-treadmill-500x500.webp';
import studyFinImg from '../assets/images/products/revo-220-cosco-treadmill-500x500.webp';
import studyMallImg  from '../assets/images/products/ce-3013-incline-press-machine-500x500.webp';

const programs = [
  {
    image: digiLibraryImg,
    title: 'Matrix Fitness Treadmill',
    description:
      'Commercial-grade treadmill designed for heavy use — advanced cushioning, multi-program console, and reliable motor for smooth, quiet performance. Ideal for gyms and premium home setups.',
    buttonText: 'View Details',
    link: '/products',
  },
  {
    image: studyFinImg,
    title: 'REVO 220 Cosco Bike',
    description:
      'Ergonomic indoor cycle with adjustable resistance, reinforced frame and comfortable saddle — perfect for HIIT and steady-state cardio sessions at home or studio.',
    buttonText: 'View Details',
    link: '/products',
  },
  {
    image: studyMallImg,
    title: 'CE 3013 Incline Press',
    description:
      'Robust incline press machine built for targeted chest training — smooth guide rails, adjustable seat and heavy-duty construction for consistent performance and safety.',
    buttonText: 'View Details',
    link: '/products',
  },
];

const ProgramHighlight = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const revealed = useRef(false);

  // IntersectionObserver — remains as before (keeps existing visible logic)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          revealed.current = true;
        }
      },
      { threshold: 0.6, rootMargin: '-100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll handler — unchanged
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0) {
        setVisible(false);
        revealed.current = false;
      } else if (revealed.current) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initialize AOS: enabled only on small screens (<=1000px)
  useEffect(() => {
    AOS.init({
      // mobile-only: disable when larger than small/tablet so desktop remains untouched
      disable: function () {
        return window.innerWidth > 1000;
      },
      offset: 120, // offset (in px) from the original trigger point
      duration: 700, // animation duration
      easing: 'ease-out',
      once: true, // whether animation should happen only once - true is usually good for performance
      mirror: false, // whether elements should animate out while scrolling past them
    });

    // Recalculate when window resizes (so AOS enable/disable adjusts)
    const onResize = () => {
      AOS.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // When our visible state changes (from IntersectionObserver), refresh AOS so it picks up new elements
  useEffect(() => {
    if (visible) {
      // small delay so DOM updates (class .visible) before AOS recalculates
      setTimeout(() => AOS.refresh(), 50);
    }
  }, [visible]);

  return (
    <>
      <style>{`
        .program-highlight-section {
          position: relative;
          z-index: 5; /* keep lower than hero caption */
          margin-bottom: 2rem;
          padding: 0;
          background: transparent !important;
          border-radius: 0 !important;
          /* Prevent invisible/translated cards from intercepting clicks on desktop */
          pointer-events: none;
        }

        /* Desktop: keep the original negative overlap you had */
        @media (min-width: 701px) {
          .program-highlight-section {
            margin-top: -221px; /* desktop overlap - unchanged */
          }
        }

        /* Mobile: appear right after hero with a small gap */
        @media (max-width: 700px) {
          .program-highlight-section {
            margin-top: 2rem; /* small gap below hero */
            pointer-events: auto; /* mobile: allow interactions */
          }
        }

        /* When container is visible, enable interactions */
        .program-highlight-container.visible {
          pointer-events: auto;
        }

        .program-highlight-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          box-shadow: none !important;
          border-radius: 0 !important;
          background: transparent !important;
          overflow: visible;
          padding: 0 1rem;
        }

        .program-card {
          background: rgba(0, 47, 45, 0.978);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          display: flex;
          flex-direction: column;
          min-height: 480px;
          overflow: hidden;
          align-items: stretch;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.9s cubic-bezier(.4,0,.2,1), transform 0.9s cubic-bezier(.4,0,.2,1), box-shadow 0.2s;
          /* don't accept pointer events until container is visible on desktop */
          pointer-events: none;
        }

        /* Desktop visible rule (unchanged) */
        .program-highlight-container.visible .program-card {
          opacity: 1;
          transform: translateY(0);
          /* enable pointer events when visible */
          pointer-events: auto;
        }

        .program-highlight-container.visible .program-card:nth-child(1) {
          transition-delay: 0.1s;
        }
        .program-highlight-container.visible .program-card:nth-child(2) {
          transition-delay: 0.3s;
        }
        .program-highlight-container.visible .program-card:nth-child(3) {
          transition-delay: 0.5s;
        }

        /* Remove transition-delay when not visible for instant hide */
        .program-highlight-container:not(.visible) .program-card {
          transition-delay: 0s !important;
        }

        .program-card-image-rect {
          width: 100%;
          height: 220px;
          object-fit: contain;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          display: block;
          background: white;
        }

        .program-card-content-rect {
          background: transparent !important;
          color: #fff !important;
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
          padding: 2rem 1.5rem 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          z-index: 1;
        }

        .program-card-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #fff !important;
          text-align: center;
        }

        .program-card-description {
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
          color: #e6f0e6 !important;
          text-align: center;
        }

        .program-card-button {
          background-color: #fff ;
          color: rgba(0, 47, 45, 0.978) ;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s, color 0.3s, transform 0.2s;
          display: inline-block;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          border: solid 2px #000;
          width: fit-content;
          margin-top: 1rem;
        }

        .program-card-button:hover {
          background-color: #000;
          color: #fff;
          transform: translateY(-6px);
        }

        /* Outlined button for What We Do page sections */
        .whatwedo-readmore-btn {
          background: transparent !important;
          color: #39b54a !important;
          border: 2px solid #39b54a !important;
          border-radius: 50px !important;
          padding: 0.7rem 2rem !important;
          font-weight: 600 !important;
          text-decoration: none !important;
          display: inline-block !important;
          margin-top: 1rem !important;
          transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s !important;
          box-shadow: none !important;
          width: fit-content !important;
        }

        .whatwedo-readmore-btn:hover {
          background: #39b54a !important;
          color: #fff !important;
          border-color: #39b54a !important;
          transform: translateY(-2px) !important;
        }

        /*
          MOBILE & SMALL TABLET: AOS will handle fade-up
          keep layout responsive below
        */
        @media (max-width: 1000px) {
          /* make cards interactive on mobile */
          .program-card {
            pointer-events: auto;
            opacity: 1; /* AOS applies its own styles for the animation; set to 1 so no permanent hiding */
            transform: none;
            transition: none;
          }

          .program-highlight-container {
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 700px) {
          .program-highlight-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 0 1rem;
          }
          .program-card {
            min-width: 0;
            width: 100%;
            margin: 0 auto;
          }
        }
      `}</style>

      <section className="program-highlight-section" ref={sectionRef}>
        {/* we keep the visible class — used for desktop behaviour and pointer-event enabling */}
        <div className={`program-highlight-container${visible ? ' visible' : ''}`}>
          {programs.map((program, index) => {
            // small delay values in ms to match the earlier stagger (AOS expects ms)
            const delays = [60, 180, 300];
            const delay = delays[index] || index * 120;
            return (
              <div
                className="program-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={delay}
                data-aos-duration="700"
              >
                <img src={program.image} alt={program.title} className="program-card-image-rect" />
                <div className="program-card-content-rect">
                  <h3 className="program-card-title">{program.title}</h3>
                  <p className="program-card-description">{program.description}</p>
                  <Link to={program.link} className="program-card-button">
                    {program.buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProgramHighlight;
