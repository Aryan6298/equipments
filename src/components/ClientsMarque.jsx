import React, { useState, useRef, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

// import your client logos
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

const ClientsMarque = () => {
  const [showAllClients, setShowAllClients] = useState(false);
  const autoCollapseTimer = useRef(null);

  const clients = [
    client1, client2, client3, client4, client5, client6,
    client7, client8, client9, client10, client11, client12,client13, client14, client15, client16, client17, client18,
    client19, client20, client21, client22, client23, client24,
    client25, client26, client27
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
