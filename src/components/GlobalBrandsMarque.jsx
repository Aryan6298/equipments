import React, { useState, useRef, useEffect } from "react";
import Marquee from "react-fast-marquee";

/*
  Replace these imports with the actual files you have.
  Example filenames below — update paths/names to match your project.
*/
// import matrix from "../assets/images/brands/matrix.png";
// import lifefitness from "../assets/images/brands/lifefitness.png";
// import cosco from "../assets/images/brands/cosco.png";
// import aerofit from "../assets/images/brands/aerofit.png";
// import usi from "../assets/images/brands/usi.png";
// import california from "../assets/images/brands/california.png";
// import sparnod from "../assets/images/brands/sparnod.png";
// import energie from "../assets/images/brands/energie.png";
// import vision from "../assets/images/brands/vision.png";
// import bodysolid from "../assets/images/brands/bodysolid.png";
// import crest from "../assets/images/brands/crest.png";
// import supreme from "../assets/images/brands/supreme.png";
// import lining from "../assets/images/brands/lining.png";
// import nivia from "../assets/images/brands/nivia.png";
// import yonex from "../assets/images/brands/yonex.png";
// import badminton from "../assets/images/brands/badminton.png";
// import footballturf from "../assets/images/brands/footballturf.png";
// import opengym from "../assets/images/brands/opengym.png";
// import gymfloor from "../assets/images/brands/gymfloor.png";
// import gem from "../assets/images/brands/gem.png";


import matrix from "../assets/images/brands-logo/Matrix.jpg";
import lifefitness from "../assets/images/brands-logo/lifefitness.jpg";
import cosco from "../assets/images/brands-logo/cosco.jpeg";
import aerofit from "../assets/images/brands-logo/aerofit.jpeg";
import usi from "../assets/images/brands-logo/usi.png";
import california from "../assets/images/brands-logo/california.png";
import sparnod from "../assets/images/brands-logo/sparod.png";
import energie from "../assets/images/brands-logo/energiefitness.png";
import vision from "../assets/images/brands-logo/vision.png";
import bodysolid from "../assets/images/brands-logo/bodysolid.png";
import crest from "../assets/images/brands-logo/crest.png";
import supreme from "../assets/images/brands-logo/supreme.png";
import lining from "../assets/images/brands-logo/lining.png";
import nivia from "../assets/images/brands-logo/nivia.png";
import yonex from"../assets/images/brands-logo/yonex.png";

const GlobalBrandsMarquee = () => {
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef(null);

  // list of brand logos (order you want them displayed)
  const brands = [
    matrix,
    lifefitness,
    cosco,
    aerofit,
    usi,
    california,
    sparnod,
    energie,
    vision,
    bodysolid,
    crest,
    supreme,
    lining,
    nivia,
    yonex,
    // badminton,
    // footballturf,
    // opengym,
    // gymfloor,
    // gem,
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleToggle = () => {
    if (expanded) {
      // collapse immediately
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setExpanded(false);
      return;
    }

    // expand then auto-collapse after 4s
    setExpanded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setExpanded(false);
      timerRef.current = null;
    }, 4000);
  };

  const logoStyle = {
    height: 120,
    objectFit: "contain",
    borderRadius: 8,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <>
      <style>{`
        .brands-section {
          margin: 3rem auto;
          padding: 1.25rem;
          border-radius: 14px;
          max-width: 1300px;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          cursor: pointer;
          backdrop-filter: blur(4px);
        }

        .brands-heading {
          text-align: center;
          margin: 0 0 1.2rem 0;
          font-size: 1.9rem;
          font-weight: 800;
          color: #39b54a; /* green shade */
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.75rem;
          align-items: center;
          justify-items: center;
          padding: 1rem;
        }

        .brand-card {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px;
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
          transition: transform .18s ease, box-shadow .18s ease;
        }

        .brand-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .marquee-wrapper {
          padding: 0.5rem 0;
        }

        .marquee-logo {
          height: 120px;
          margin: 0 28px;
          border-radius: 8px;
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .marquee-logo:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        @media (max-width: 900px) {
          .marquee-logo { height: 100px; margin: 0 20px; }
        }

        @media (max-width: 600px) {
          .marquee-logo { height: 70px; margin: 0 12px; }
          .brands-heading { font-size: 1.25rem; }
          .brands-grid { gap: 12px; }
        }
      `}</style>

      <div
        className="brands-section"
        onClick={handleToggle}
        role="button"
        aria-pressed={expanded}
        aria-label={expanded ? "Hide brands" : "Show brands"}
        data-aos="zoom-in"
      >
        <h3 className="brands-heading">
          Global Brands We Represent {expanded ? "— Click to Collapse" : "(Click to Expand)"}
        </h3>

        {expanded ? (
          <div className="brands-grid" aria-live="polite">
            {brands.map((logo, idx) => (
              <div key={idx} className="brand-card" role="img" aria-label={`Brand ${idx + 1}`}>
                <img src={logo} alt={`Brand ${idx + 1}`} style={logoStyle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="marquee-wrapper" aria-hidden={false}>
            <Marquee
              gradient={false}
              speed={45}
              pauseOnHover={false}
              pauseOnClick={false}
              loop={0}
              aria-label="Global brands carousel"
            >
              {/* Duplicate once for smooth looping */}
              {brands.concat(brands).map((logo, i) => (
                <img key={i} src={logo} alt={`Brand ${i + 1}`} className="marquee-logo" style={logoStyle} />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalBrandsMarquee;
