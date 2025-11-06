// src/pages/Services.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Replace these with your actual image paths
import srv1 from '../assets/images/crousal/crousalimage2.jpg';
import srv2 from '../assets/images/crousal/crousalimage3.jpg';
import srv3 from '../assets/images/crousal/crousalimage4.jpg';
import srv4 from '../assets/images/crousal/crousalimage1.jpg';
import srv5 from '../assets/images/runip2-logo.png';
import srv6 from '../assets/images/contact.png';

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const services = [
    {
      id: 'equipment-supply',
      title: 'Sports Equipment Supply',
      desc:
        'High-quality sports and gym equipment for homes, gyms, institutions and parks — trusted brands & warranty-backed.',
      img: srv1,
    },
    {
      id: 'arena-construction',
      title: 'Arena & Turf Solutions',
      desc:
        'End-to-end indoor/outdoor arena construction: flooring, turfing, lighting and seating for professional & community venues.',
      img: srv2,
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Service',
      desc:
        'Preventive & corrective maintenance packages to keep your equipment and venues safe, durable and operational.',
      img: srv3,
    },
    {
      id: 'facility-design',
      title: 'Facility Design & Consulting',
      desc:
        'Space planning, equipment layout and turnkey consultancy to optimize performance, safety and user experience.',
      img: srv4,
    },
    {
      id: 'corporate-fitness',
      title: 'Corporate Fitness Solutions',
      desc:
        'Custom corporate wellness programs and gym setups for offices, including equipment supply and on-site training.',
      img: srv5,
    },
    {
      id: 'sports-accessories',
      title: 'Sports Accessories & Merch',
      desc:
        'Balls, nets, protective gear, scoreboards and branded merchandise — curated for clubs, schools and retailers.',
      img: srv6,
    },
  ];

  return (
    <>
      <style>
        {`
        /* Page safety */
        html, body {
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .services-container {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.82) 0%, rgba(8, 8, 8, 0.82) 100%);
          padding: 3.5rem 1rem;
          margin-top: 4rem; /* added top margin as requested */
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          color: #e6e6e6;
        }

        .services-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .services-title {
          font-size: 2.6rem;
          color: #39b54a;
          font-weight: 800;
          text-shadow: 1px 1px 6px rgba(0,0,0,0.6);
          margin-bottom: 0.6rem;
        }

        .services-sub {
          color: #cfcfcf;
          max-width: 820px;
          margin: 0.25rem auto 0;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }

        /* two columns on md+ */
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .service-card {
          display: flex;
          align-items: stretch;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.6);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 50px rgba(0,0,0,0.7);
        }

        .service-img-wrap {
          flex: 0 0 45%;
          max-width: 45%;
          position: relative;
          overflow: hidden; /* critical to avoid hover spill */
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.0));
        }

        .service-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover; /* use cover for consistent card fill */
          transition: transform 0.6s ease;
          will-change: transform;
        }

        .service-card:hover .service-img {
          transform: scale(1.06);
        }

        .service-body {
          padding: 1.35rem 1.5rem;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .service-title {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .service-desc {
          color: #d5d5d5;
          font-size: 0.98rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .service-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          background: transparent;
          color: #39b54a;
          font-weight: 700;
          border: 2px solid rgba(57, 181, 74, 0.12);
          padding: 0.5rem 0.9rem;
          border-radius: 10px;
          width: fit-content;
          transition: all 0.22s ease;
        }

        .service-cta:hover {
          background: rgba(57,185,74,0.06);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(57,181,74,0.06);
        }

        /* Make card stacked look on small screens: image top, body below */
        @media (max-width: 767px) {
          .service-card {
            flex-direction: column;
          }
          .service-img-wrap {
            width: 100%;
            max-width: 100%;
            flex: 0 0 auto;
            height: 220px;
          }
          .service-img {
            height: 100%;
            object-fit: cover;
          }
        }
      `}
      </style>

      <div className="services-container">
        <header className="services-header" data-aos="fade-up">
          <h1 className="services-title">Our Services</h1>
          <p className="services-sub">
            Comprehensive fitness & sports services tailored for homes, gyms, institutions and enterprises.
            From equipment supply to turnkey arena construction — we deliver quality, reliability and
            end-to-end support.
          </p>
        </header>

        <section className="services-grid" data-aos="fade-up" data-aos-delay="80">
          {services.map((s, idx) => (
            <article
              className="service-card"
              key={s.id}
              id={s.id} /* adding id so anchors/scrolling works if needed */
              data-aos="fade-up"
              data-aos-delay={120 + idx * 60}
            >
              <div className="service-img-wrap">
                <img src={s.img} alt={s.title} className="service-img" />
              </div>

              <div className="service-body">
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                {/* changed to Link to redirect to contact page as requested */}
                <Link className="service-cta" to="/contact">
                  Contact Us →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default Services;
