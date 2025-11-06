import React, { useState, useRef, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

// import your client logos
import client1 from '../assets/images/crousal/crousalimage1.jpg';
import client2 from '../assets/images/crousal/crousalimage1.jpg';
import client3 from '../assets/images/crousal/crousalimage1.jpg';
import client4 from '../assets/images/crousal/crousalimage1.jpg';
import client5 from '../assets/images/crousal/crousalimage1.jpg';
import client6 from '../assets/images/crousal/crousalimage1.jpg';
import client7 from '../assets/images/crousal/crousalimage1.jpg';
import client8 from '../assets/images/crousal/crousalimage1.jpg';
import client9 from '../assets/images/crousal/crousalimage1.jpg';
import client10 from '../assets/images/crousal/crousalimage1.jpg';
import client11 from '../assets/images/crousal/crousalimage1.jpg';
import client12 from '../assets/images/crousal/crousalimage1.jpg';

const ClientsMarque = () => {
  const [showAllClients, setShowAllClients] = useState(false);
  const autoCollapseTimer = useRef(null);

  const clients = [
    client1, client2, client3, client4, client5, client6,
    client7, client8, client9, client10, client11, client12
  ];

  // Auto-collapse logic (4 seconds)
  const handleToggleClick = () => {
    if (showAllClients) {
      clearTimeout(autoCollapseTimer.current);
      setShowAllClients(false);
    } else {
      setShowAllClients(true);
      clearTimeout(autoCollapseTimer.current);
      autoCollapseTimer.current = setTimeout(() => setShowAllClients(false), 4000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(autoCollapseTimer.current);
  }, []);

  const logoStyle = {
    height: 120,
    objectFit: 'contain',
    borderRadius: '8px',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  };

  return (
    <>
      <style>{`
        .clients-section {
          margin: 2.5rem auto;
          padding: 1.25rem;
          border-radius: 16px;
          max-width: 1300px;
          background-color: rgba(255,255,255,0.05);
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          backdrop-filter: blur(5px);
        }
        .clients-section:active { transform: translateY(2px); }

        .client-heading {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.8rem;
          font-weight: 800;
          color: #39b54a;
        }

        .clients-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          align-items: center;
          padding: 1rem;
        }

        .marquee-wrapper {
          padding: 0.5rem 0;
        }

        .marquee-logo {
          height: 120px;
          margin: 0 30px;
          opacity: 0.95;
          border-radius: 8px;
          transition: transform .25s ease, opacity .25s ease;
        }

        .marquee-logo:hover {
          transform: scale(1.1);
          opacity: 1;
          box-shadow: 0 6px 18px rgba(57,181,74,0.3);
        }

        @media (max-width: 768px) {
          .marquee-logo {
            height: 70px;
            margin: 0 16px;
          }
          .client-heading {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <div
        className="clients-section"
        onClick={handleToggleClick}
        role="button"
        aria-pressed={showAllClients}
        data-aos="zoom-in"
      >
        <h3 className="client-heading">
          Our Clients {showAllClients ? '— Click to Collapse' : '(Click to Expand)'}
        </h3>

        {showAllClients ? (
          <div className="clients-grid">
            {clients.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Client logo ${i + 1}`}
                className="marquee-logo"
                style={logoStyle}
              />
            ))}
          </div>
        ) : (
          <div className="marquee-wrapper">
            <Marquee gradient={false} speed={45} pauseOnHover={false} pauseOnClick={false} loop={0}>
              {clients.concat(clients).map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt={`Client logo ${i + 1}`}
                  className="marquee-logo"
                  style={logoStyle}
                />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsMarque;
