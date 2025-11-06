import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// make sure these imports include the real file extensions
import crousalimage1 from "../assets/images/crousal/crousalimage1.jpg";
import crousalimage2 from "../assets/images/crousal/crousalimage2.jpg";
import crousalimage3 from "../assets/images/crousal/crousalimage3.jpg";
import crousalimage4 from "../assets/images/crousal/crousalimage4.jpg";

const HeroSection = () => {
  return (
    <>
      <style>{`
        /* container spacing to sit below fixed navbar */
        .hero-carousel { margin-top: 86px; }

        /* carousel sizing */
        .carousel-item {
          position: relative;
          height: 90vh;
          min-height: 420px;
        }

        .carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* dark overlay for better text readability */
        .carousel-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }

        .carousel-caption {
          bottom: 22%;
          left: 50%;
          transform: translateX(-50%);
          width: min(1100px, 88%);
          text-align: center;
          z-index: 5;
          padding: 1.1rem 1.4rem;
          border-radius: 10px;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(3px);
        }

        .carousel-caption h2 {
          font-size: 2.6rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.3px;
          text-shadow: 0 6px 20px rgba(0,0,0,0.6);
        }

        .carousel-caption p {
          margin-top: 0.6rem;
          font-size: 1.05rem;
          color: #e7efe7;
          opacity: 0.95;
        }

        /* button style (example CTA) */
        .hero-cta {
          margin-top: 1rem;
          display: inline-block;
          background: linear-gradient(90deg,#ff3c00,#ff6f00);
          color: #fff;
          padding: 0.6rem 1.1rem;
          border-radius: 30px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(255,108,64,0.18);
        }

        /* smaller screens */
        @media (max-width: 992px) {
          .carousel-caption { bottom: 18%; padding: 0.9rem 1rem; }
          .carousel-caption h2 { font-size: 2rem; }
          .carousel-caption p { font-size: 0.98rem; }
        }

        @media (max-width: 576px) {
          .hero-carousel { margin-top: 72px; }
          .carousel-item { height: 62vh; min-height: 320px; }
          .carousel-caption { bottom: 12%; padding: 0.8rem; }
          .carousel-caption h2 { font-size: 1.4rem; }
          .carousel-caption p { font-size: 0.95rem; }
        }

        /* keep indicators subtle and visible */
        .carousel-indicators [data-bs-target] {
          background-color: rgba(255,255,255,0.6);
        }
        .carousel-indicators .active {
          background-color: #fff;
        }

        /* controls visibility on dark images */
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: invert(100%) brightness(180%);
          opacity: 0.95;
        }
      `}</style>

      <div
        id="heroCarousel"
        className="carousel slide carousel-fade hero-carousel"
        data-bs-ride="carousel"
        data-bs-interval="2300"    /* 2.3 seconds */
        data-bs-pause="false"     /* don't pause on hover — continuous */
        data-bs-wrap="true"       /* infinite looping */
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={crousalimage1} className="d-block w-100" alt="Commercial Gym Racks" />
            <div className="carousel-caption">
              <h2>Industrial-Grade Racks & Rigs</h2>
              <p>Heavy-duty squat racks and rigs engineered for safety, stability and lifetime performance.</p>
              <a className="hero-cta" href="/services">View More</a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage2} className="d-block w-100" alt="High Performance Barbells" />
            <div className="carousel-caption">
              <h2>Competition Barbells & Plates</h2>
              <p>Precision-machined barbells and calibrated plates that deliver consistent performance for athletes.</p>
              <a className="hero-cta" href="/services">View More</a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage3} className="d-block w-100" alt="Functional Training Equipment" />
            <div className="carousel-caption">
              <h2>Functional Training Systems</h2>
              <p>Modular rigs, plyo platforms and conditioning gear designed to power group and individual workouts.</p>
              <a className="hero-cta" href="/services">View Mores</a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage4} className="d-block w-100" alt="Recovery & Accessories" />
            <div className="carousel-caption">
              <h2>Recovery Tools & Accessories</h2>
              <p>From mats to mobility tools — everything you need for recovery and peak athletic performance.</p>
              <a className="hero-cta" href="/services">View More</a>
            </div>
          </div>
        </div>

        {/* controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
