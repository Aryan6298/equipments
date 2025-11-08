import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// make sure these imports include the real file extensions
import crousalimage1 from "../assets/images/crousal/crousalimage1.jpg";
import crousalimage2 from "../assets/images/crousal/crousalimage2.jpg";
import crousalimage3 from "../assets/images/crousal/crousalimage3.jpg";
import crousalimage4 from "../assets/images/group.avif";

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

        // /* dark overlay for better text readability */
        // .carousel-item::before {
        //   content: "";
        //   position: absolute;
        //   inset: 0;
        //   background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.5) 100%);
        //   pointer-events: none;
        // }

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

        /* NEW: hero CTA - base */
        .hero-cta {
          margin-top: 1rem;
          display: inline-block;
          position: relative;
          padding: 0.68rem 1.16rem;
          border-radius: 999px;
          font-weight: 800;
          text-decoration: none;
          color: #05110b;
          letter-spacing: .4px;
          z-index: 1;

          /* animated gradient background */
          background: linear-gradient(90deg, #1fb85a 0%, #2fe37a 40%, #9be78f 100%);
          background-size: 200% 100%;
          transition: transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms ease, background-position 420ms ease;
          box-shadow: 0 6px 20px rgba(47,227,122,0.12), 0 2px 6px rgba(0,0,0,0.35);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        /* subtle icon/tick inside button (optional) */
        .hero-cta .cta-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(5,17,11,0.12);
          box-shadow: inset 0 -2px 0 rgba(255,255,255,0.2);
        }

        /* animated pseudo-underline accent */
        .hero-cta::after {
          content: "";
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: -8px;
          height: 4px;
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(47,227,122,0.28), rgba(255,255,255,0.06));
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 220ms ease, transform 220ms cubic-bezier(.2,.9,.3,1);
          pointer-events: none;
        }

        /* hover/focus: lift + gradient shift + glow */
        .hero-cta:hover,
        .hero-cta:focus {
          transform: translateY(-6px) scale(1.02);
          background-position: 100% 0; /* animate gradient */
          box-shadow: 0 18px 44px rgba(47,227,122,0.14), 0 6px 18px rgba(0,0,0,0.5);
          outline: none;
        }

        .hero-cta:hover::after,
        .hero-cta:focus::after {
          opacity: 1;
          transform: translateY(0);
        }

        /* stronger focus ring for keyboard users */
        .hero-cta:focus-visible {
          box-shadow: 0 0 0 4px rgba(47,227,122,0.14), 0 12px 30px rgba(0,0,0,0.45);
        }

        /* dark-mode fallback: if background-too-bright, invert text color */
        @media (prefers-color-scheme: dark) {
          .hero-cta { color: #04110a; }
        }

        /* smaller screens */
        @media (max-width: 992px) {
          .carousel-caption { bottom: 18%; padding: 0.9rem 1rem; }
          .carousel-caption h2 { font-size: 2rem; }
          .carousel-caption p { font-size: 0.98rem; }
          .hero-cta { padding: 0.58rem 1rem; }
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
              <a className="hero-cta" href="/services">
                <span className="cta-dot" aria-hidden="true"></span>
                View More
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage2} className="d-block w-100" alt="High Performance Barbells" />
            <div className="carousel-caption">
              <h2>Competition Barbells & Plates</h2>
              <p>Precision-machined barbells and calibrated plates that deliver consistent performance for athletes.</p>
              <a className="hero-cta" href="/services">
                <span className="cta-dot" aria-hidden="true"></span>
                View More
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage3} className="d-block w-100" alt="Functional Training Equipment" />
            <div className="carousel-caption">
              <h2>Functional Training Systems</h2>
              <p>Modular rigs, plyo platforms and conditioning gear designed to power group and individual workouts.</p>
              <a className="hero-cta" href="/services">
                <span className="cta-dot" aria-hidden="true"></span>
                View More
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={crousalimage4} className="d-block w-100" alt="Recovery & Accessories" />
            <div className="carousel-caption">
              <h2>Recovery Tools & Accessories</h2>
              <p>From mats to mobility tools — everything you need for recovery and peak athletic performance.</p>
              <a className="hero-cta" href="/services">
                <span className="cta-dot" aria-hidden="true"></span>
                View More
              </a>
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
