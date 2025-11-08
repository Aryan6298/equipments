// src/pages/TopProducts.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Replace these imports with your real product image paths
import prod1 from "../assets/images/products/matrix-fitness-treadmill-500x500.webp";
import prod2 from "../assets/images/products/revo-220-cosco-treadmill-500x500.webp";
import prod3 from "../assets/images/products/ce-3013-incline-press-machine-500x500.webp";
import prod4 from "../assets/images/products/cc-360xl-crossfit-8-gates-500x500.webp";
import prod5 from "../assets/images/products/ce-3048-power-cage-500x500.webp";

const TopProducts = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const [quickView, setQuickView] = useState(null);

  const products = [
    {
      id: 1,
      title: "Matrix Fitness Treadmill",
      img: prod1,
    //   price: "₹ 1,45,000",
      short: "Commercial-grade treadmill with advanced console & shock absorption.",
    },
    {
      id: 2,
      title: "REVO 220 Cosco Bike",
      img: prod2,
    //   price: "₹ 28,500",
      short: "Heavy-duty indoor cycle with adjustable resistance and ergonomic seat.",
    },
    {
      id: 3,
      title: "CE 3013 Incline Press",
      img: prod3,
    //   price: "₹ 78,900",
      short: "Commercial incline press for chest isolation and progressive overload.",
    },
    {
      id: 4,
      title: "CC 360XL Crossfit 4 Gates",
      img: prod4,
    //   price: "₹ 2,50,000",
      short: "Multi-station functional trainer — perfect for gyms & studios.",
    },
    {
      id: 5,
      title: "CE 3048 Power Cage",
      img: prod5,
    //   price: "₹ 62,000",
      short: "Sturdy power cage with safeties and pull-up rig — built to last.",
    },
  ];

  return (
    <div className="top-products-page">
      <style>{`
        .top-products-page {
          background: url('/assets/images/bg-gym.jpg') center/cover no-repeat;
          /* fallback bg if you have one; replace with your bg image path */
          color: #fff;
          padding: 7rem 0rem 2rem 0rem;
          min-height: 100vh;
        }

        .hero {
          text-align: center;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(4px);
        }

        .hero h1 {
          font-size: 2.6rem;
          margin-bottom: 0.5rem;
          color: #2fe37a; /* green accent */
          text-shadow: 0 6px 18px rgba(0,0,0,0.6);
        }

        .hero p {
          color: rgba(255,255,255,0.85);
          max-width: 900px;
          margin: 0 auto;
          font-size: 1.05rem;
        }

        .products-container {
          max-width: 1200px;
          margin: 2rem auto 4rem auto;
          background: rgba(10,10,10,0.55);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        }

        .product-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          overflow: hidden;
          margin: 0.75rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .product-img {
          width: 100%;
          height: 220px;
          object-fit: contain;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.1));
        }

        .product-body {
          padding: 1rem;
        }

        .product-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #fff;
          margin-bottom: 0.35rem;
        }

        .product-short {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.85);
          min-height: 48px;
          margin-bottom: 0.7rem;
        }

        .product-footer {
          display:flex;
          align-items:center;
          justify-content:center;
          gap: .5rem;
        }

        // .price {
        //   font-weight: 800;
        //   color: #2fe37a;
        //   font-size: 1.05rem;
        // }

        .btn-cta {
          background: linear-gradient(90deg, #1f9d4f, #2fe37a);
          color: #0a0a0a;
          border: none;
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(47,227,122,0.12);
        }

        .ribbon {
          position: absolute;
          left: 12px;
          top: 12px;
          background: rgba(47,227,122,0.95);
          color: #04120a;
          padding: 6px 10px;
          font-weight: 800;
          border-radius: 8px;
          font-size: 0.8rem;
          box-shadow: 0 6px 14px rgba(0,0,0,0.5);
        }

        /* quick view modal */
        .quickview-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index: 9999;
        }

        .quickview {
          width: 92%;
          max-width: 920px;
          background: rgba(10,10,10,0.95);
          border-radius: 12px;
          overflow: hidden;
          display:flex;
          gap: 1rem;
        }

        .quickview img {
          width: 45%;
          object-fit: contain;
          background: rgba(255,255,255,0.01);
          padding: 1.5rem;
        }

        .quickview .info {
          padding: 1.5rem;
          color: #eee;
          width: 55%;
        }

        .quickview .info h3 { color: #2fe37a; margin-bottom: .35rem; }
        .quickview .info p { color: rgba(255,255,255,0.8); }

        /* responsive tweaks */
        @media (max-width: 768px) {
          .product-img { height: 180px; }
          .product-body { padding: 0.85rem; }
          .quickview { flex-direction: column; width: 96%; }
          .quickview img { width: 100%; }
          .quickview .info { width: 100%; }
        }
          
                      @media (max-width: 768px) {
  .container{
    margin-top: 11vh !important;
  }
    
      `}</style>

      <div className="container">
        <div className="hero" data-aos="fade-up">
          <h1>Top Products</h1>
          <p>
            Handpicked, high-performance equipment for gyms and fitness centers.
            Quality-tested and backed by our service & installation expertise.
          </p>
        </div>

        <div className="products-container" data-aos="fade-up">
          <div className="row">
            {products.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                <div className="product-card position-relative">
                  <div className="ribbon">TOP</div>
                  <img className="product-img" src={p.img} alt={p.title} />
                  <div className="product-body">
                    <div className="product-title">{p.title}</div>
                    <div className="product-short">{p.short}</div>
                    <div className="product-footer">
                      {/* <div className="price">{p.price}</div> */}
                      <div>
                        <button
                          className="btn-cta"
                          onClick={() => setQuickView(p)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick View Modal */}
        {quickView && (
          <div
            className="quickview-backdrop"
            onClick={() => setQuickView(null)}
          >
            <div
              className="quickview"
              onClick={(e) => e.stopPropagation()}
              data-aos="zoom-in"
            >
              <img src={quickView.img} alt={quickView.title} />
              <div className="info">
                <h3>{quickView.title}</h3>
                <p style={{ fontWeight: 800, marginBottom: 8 }}>
                  {quickView.price}
                </p>
                <p>{quickView.short}</p>
                <p style={{ marginTop: 12 }}>
                  <strong>Key features:</strong>
                </p>
                <ul>
                  <li>Commercial build quality</li>
                  <li>Easy installation & warranty support</li>
                  <li>Spare parts & servicing available</li>
                </ul>
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <button
                    className="btn-cta"
                    onClick={() => {
                      // example action - replace with real navigation / purchase flow
                      alert("Enquire clicked for " + quickView.title);
                    }}
                  >
                    Enquire Now
                  </button>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setQuickView(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
