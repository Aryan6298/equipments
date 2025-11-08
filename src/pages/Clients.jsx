import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

// --- Client Logos ---
import client1 from '../assets/images/clients-logo/client01.png';
import client2 from '../assets/images/clients-logo/client02.png';
import client3 from '../assets/images/clients-logo/client03.png';
import client4 from '../assets/images/clients-logo/client04.png';
import client5 from '../assets/images/clients-logo/client05.png';
import client6 from '../assets/images/clients-logo/client06.png';
import client7 from '../assets/images/clients-logo/client07.png';
import client8 from '../assets/images/clients-logo/client08.png';
import client9 from '../assets/images/clients-logo/client09.png';
import client10 from '../assets/images/clients-logo/client10.png';
import client11 from '../assets/images/clients-logo/client11.png';
import client12 from '../assets/images/clients-logo/client12.png';
import client13 from '../assets/images/clients-logo/client13.png';
import client14 from '../assets/images/clients-logo/client14.png';
import client15 from '../assets/images/clients-logo/client15.png';
import client16 from '../assets/images/clients-logo/client16.png';
import client17 from '../assets/images/clients-logo/client17.png';
import client18 from '../assets/images/clients-logo/client18.png';
import client19 from '../assets/images/clients-logo/client19.png';
import client20 from '../assets/images/clients-logo/client20.png';
import client21 from '../assets/images/clients-logo/client21.png';
import client22 from '../assets/images/clients-logo/client22.png';
import client23 from '../assets/images/clients-logo/client23.png';
import client24 from '../assets/images/clients-logo/client24.png';
import client25 from '../assets/images/clients-logo/client25.png';
import client26 from '../assets/images/clients-logo/client26.png';
import client27 from '../assets/images/clients-logo/client27.png';

// --- Brand Logos ---
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
import yonex from "../assets/images/brands-logo/yonex.png";

const Clients = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const logoStyle = {
    height: "120px",
    margin: "20px",
    objectFit: "contain",
    borderRadius: "10px",
    transition: "transform 0.4s ease",
  };

  const clients = [
    client1, client2, client3, client4, client5, client6, client7, client8,
    client9, client10, client11, client12, client13, client14, client15,
    client16, client17, client18, client19, client20, client21, client22,
    client23, client24, client25, client26, client27,
  ];

  const brands = [
    matrix, lifefitness, cosco, aerofit, usi, california, sparnod, energie,
    vision, bodysolid, crest, supreme, lining, nivia, yonex,
  ];

  return (
    <div>
      <style>{`
        .client-heading, .brand-heading {
          color: #39b54a;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
        }
        .client-logo:hover {
          transform: scale(1.1);
        }
          @media (max-width: 768px) {
  .client-heading {
    margin-top: 14vh !important;
  }
}

      `}</style>

      <div className="container py-5">
        {/* --- Our Clients Section --- */}
        <h2 className="client-heading" style={{paddingTop:"3rem"}} data-aos="fade-down">
          Our Clients
        </h2>
        <div
          className="d-flex flex-wrap justify-content-center align-items-center"
          data-aos="fade-up"
        >
          {clients.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              className="client-logo"
              style={logoStyle}
            />
          ))}
        </div>

        {/* --- Brands We Represent Section --- */}
        <h2 className="brand-heading" data-aos="fade-down">
          The Brands We Represent
        </h2>
        <div
          className="d-flex flex-wrap justify-content-center align-items-center"
          data-aos="fade-up"
        >
          {brands.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Brand ${index + 1}`}
              className="client-logo"
              style={logoStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
