// src/pages/About.js
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import aboutImg3 from '../assets/images/crousal/crousalimage2.jpg';
import aboutImg1 from '../assets/images/crousal/crousalimage3.jpg';
import aboutImg2 from '../assets/images/crousal/crousalimage4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [showVideo, setShowVideo] = useState(false);
  const [videoDismissed, setVideoDismissed] = useState(false);

  const handleOpenVideo = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !showVideo && !videoDismissed) {
        setShowVideo(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showVideo, videoDismissed]);

  return (
    <>
      <style>
        {`
          /* Safety: prevent horizontal overflow while keeping layout intact */
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          /* Safe page container — use padding instead of forcing full-width + padding */
          .containerc {
            background-color: #000000a3;
            max-width: 100vw;
            box-sizing: border-box;
            padding: 4rem 15px 3rem;
            margin: 5rem 0 auto ;
          }

          /* Keep Bootstrap rows untouched (don't remove their negative margins globally).
             Instead ensure columns prevent overflow of scaled children. */
          .col-md-6 {
            position: relative;
            overflow: hidden; /* critical to stop hover scale from creating horizontal scroll */
          }

          .pop-hover {
            transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease;
            filter: brightness(0.92) contrast(0.95);
            transform-origin: center center;
            will-change: transform;
            display: block;
          }

          .pop-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 2;
            filter: brightness(1) contrast(1);
          }

          /* Ensure images never exceed their column and respond properly */
          img {
            max-width: 100%;
            width: 100%;
            height: auto;
            display: block;
          }

          .about-heading {
            font-size: 2.8rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            color: #39b54a;
            text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
            animation: fadeInDown 1.2s ease-out;
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .section-heading {
            font-weight: 600;
            font-size: 1.75rem;
            margin-bottom: 1rem;
            color: #ffc107;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.4);
            transition: all 0.3s ease;
          }

          .section-heading:hover {
            color: #ffe38fff;
            transform: scale(1.13);
          }

          p {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #e0e0e0;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          }

          /* AOS animated elements should be visible but won't cause overflow by themselves */
          [data-aos] { overflow: visible; }
        `}
      </style>

      <div className="containerc py-5">
        <h2 className="about-heading">RUNIP 2 — Your Go-To Partner for Sports & Fitness</h2>

        {/* Section 1 */}
        <div className="row align-items-center mb-5" data-aos="fade-up">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutImg1}
              alt="Who we are"
              className="img-fluid rounded shadow pop-hover"
            />
          </div>
          <div className="col-md-6">
            <h3 className="section-heading" data-aos="fade-right">Who we are</h3>
            <p data-aos="fade-left">
              RUNIP 2 began its journey in 2012 as a franchise partner of Proline Fitness.
              What started as a retail venture has grown into a landmark destination for fitness
              enthusiasts. We are now a trusted distributor of fitness products across Madhya
              Pradesh, partnering with leading brands such as Cosco, Aerofit, USI, California Fitness,
              and Crest Fitness. Fitness is a way of life — and we’re here to make it accessible.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="row align-items-center flex-md-row-reverse" data-aos="fade-up">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutImg2}
              alt="Why choose us"
              className="img-fluid rounded shadow pop-hover"
            />
          </div>
          <div className="col-md-6">
            <h3 className="section-heading" data-aos="fade-left">Why choose us</h3>
            <p data-aos="fade-right">
              At RUNIP 2 we believe fitness is for everyone. We provide reliable products for home workouts,
              gyms, and sports; fair, competitive pricing so quality fitness is accessible; and dependable
              after-sales service so your equipment keeps performing. Our strengths include comprehensive
              sports product portfolios, turnkey sports facility solutions (indoor cricket arenas, turfs,
              badminton courts), and expert maintenance & service contracts.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="row align-items-center mt-5" data-aos="fade-up">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutImg3}
              alt="Open gym and arena solutions"
              className="img-fluid rounded shadow pop-hover"
            />
          </div>
          <div className="col-md-6">
            <h3 className="section-heading" data-aos="fade-right">Our solutions</h3>
            <p data-aos="fade-left">
              We offer open-gym solutions for parks, housing societies and institutions, with durable,
              weather-resistant equipment built for high usage and safety. Our sports arena solutions
              cover end-to-end execution — flooring, turfing, lighting, seating and supporting infrastructure —
              for both indoor and outdoor venues. We also provide exercise equipment supply for gyms and corporates,
              foosball setups, and ongoing maintenance services to keep facilities in top shape.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
