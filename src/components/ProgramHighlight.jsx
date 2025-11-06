import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import studyMallImg from '../assets/images/crousal/crousalimage4.jpg';
import studyFinImg from '../assets/images/crousal/crousalimage2.jpg';
import digiLibraryImg from '../assets/images/crousal/crousalimage1.jpg';

const programs = [
  {
    image: digiLibraryImg,
    title: 'Top Product 1',
    description:
      'Helps to get indoor running and help in achieving the fit ness goals at home  askljfd asdkfj asdf asdkjlf asdkjlf asdkjlf ',
    buttonText: 'Read more',
    link: '/services',
  },
  {
    image: studyFinImg,
    title: 'Top product 2',
    description:
      'Helps to get indoor running and help in achieving the fit ness goals at home adsfj asdoisfj asdjf akkjdf askldjf asdlkfj',
    buttonText: 'Read More',
    link: '/services',
  },
  {
    image: studyMallImg,
    title: 'Activities',
    description:
      'Our Livelihood Program focuses on equipping individuals—especially women, youth, and marginalized communities—with the skills, resources, and confidence.',
    buttonText: 'Read more',
    link: '/services',
  },
];

const ProgramHighlight = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const revealed = useRef(false);

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

  return (
    <>
      <style>{`
        .program-highlight-section {
          position: relative;
          z-index: 10;
          margin-top: -221px; /* desktop overlap */
          margin-bottom: 4rem;
          padding: 0;
          background: transparent !important;
          border-radius: 0 !important;
        }

        /* On tablets and phones, push the section below the hero */
        @media (max-width: 992px) {
          .program-highlight-section {
            margin-top: 40px !important; /* appear below hero on mobile */
          }
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
        }

        .program-highlight-container.visible .program-card {
          opacity: 1;
          transform: translateY(0);
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
          object-fit: cover;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          display: block;
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

        @media (max-width: 1000px) {
          .program-card,
          .program-highlight-container.visible .program-card,
          .program-highlight-container:not(.visible) .program-card {
            transition: none !important;
            transition-delay: 0s !important;
            opacity: 1 !important;
            transform: none !important;
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
        <div className={`program-highlight-container${visible ? ' visible' : ''}`}>
          {programs.map((program, index) => (
            <div className="program-card" key={index}>
              <img src={program.image} alt={program.title} className="program-card-image-rect" />
              <div className="program-card-content-rect">
                <h3 className="program-card-title">{program.title}</h3>
                <p className="program-card-description">{program.description}</p>
                <Link to={program.link} className="program-card-button">
                  {program.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProgramHighlight;
