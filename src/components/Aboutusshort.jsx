import React from 'react';
import { FaCut } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <>
      <style>{`
        .about-section {
          width: 100vw;
          max-width: 99vw;
          margin: 0 auto;
          padding: 3rem 1rem 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .about-who {
          background-color: rgba(245, 245, 245, 0.39);
          border-radius: 8px;
          margin-bottom: 3rem;
        }

        .about-block {
          width: 100%;
          margin-bottom: 2rem;
          text-align: center;
        }

        .about-title-who {
          font-size: 2.8rem;
          font-weight: 700;
          color: rgb(41, 40, 40);
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .about-title-red {
          color: rgba(0, 57, 56, 1);
        }

        .about-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.2rem 0 1.5rem 0;
        }

        .about-line {
          display: inline-block;
          width: 60px;
          height: 4px;
          background: rgba(0, 57, 56, 1);
          border-radius: 2px;
          margin: 0 1.2rem;
        }

        .about-icon {
          color: rgba(0, 57, 56, 1);
          font-size: 2.2rem;
          vertical-align: middle;
        }

        .about-vision-black {
          font-size: 1.15rem;
          color: black;
          font-family: 'Open Sans', sans-serif;
          margin: 0 auto 2rem auto;
          max-width: 900px;
          line-height: 1.6;
          padding: 0 1rem;
        }

        @media (max-width: 700px) {
          .about-title-who {
            font-size: 2rem;
          }

          .about-section {
            padding: 2rem 0.5rem 1.5rem 0.5rem;
          }

          .about-line {
            width: 30px;
          }
        }
      `}</style>

      <section className="about-section about-who" id="about">
        <div className="about-block">
          <h2 className="about-title-who">
            WHO <span className="about-title-red">WE ARE ?</span>
          </h2>
          <div className="about-divider">
            <span className="about-line" />
            <FaCut className="about-icon" />
            <span className="about-line" />
          </div>
           <p className="about-vision-black">
            <b>RUNIP 2</b> is a trusted name in fitness and sports solutions,
            committed to promoting a healthier and more active lifestyle. With over a decade of expertise,
            we aim to empower communities, institutions, and individuals through
            <b> innovative fitness equipment</b> and
            <b> sustainable sports infrastructure</b> designed for performance, durability, and excellence.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
