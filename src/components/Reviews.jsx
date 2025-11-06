import React from "react";

const Reviews = () => {
  const reviews = [
    {
      initials: "AK",
      name: "Amit Khare",
      review:
        "RUNIP 2 supplied and installed premium-quality gym equipment for our new fitness center. Their service team ensured smooth setup and post-installation support. Highly reliable partner!",
      rating: 5.0,
    },
    {
      initials: "SS",
      name: "Sneha Sharma",
      review:
        "Our organization partnered with RUNIP 2 for outdoor fitness installations. The equipment quality, delivery timelines, and professionalism were outstanding.",
      rating: 4.9,
    },
    {
      initials: "RG",
      name: "Rohit Gupta",
      review:
        "RUNIP 2 helped us design a custom fitness setup tailored to our space. Excellent product range, durable machines, and very cooperative staff throughout the process.",
      rating: 4.8,
    },
    {
      initials: "VP",
      name: "Vikas Patel",
      review:
        "They provided end-to-end solutions for our open gym project — from layout planning to installation. The entire experience was seamless and result-driven.",
      rating: 4.9,
    },
  ];

  return (
    <>
      <style>{`
        .reviews-section {
          background: rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 3rem 2rem;
          margin: 3rem 0;
          color: #fff;
        }
        .client-heading {
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #39b54a;
        }
        .review-card {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.3);
        }
        .view-more-btn {
          background: #39b54a;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          padding: 0.7rem 1.8rem;
          border-radius: 30px;
          transition: background 0.3s ease, transform 0.3s ease;
          display: inline-block;
        }
        .view-more-btn:hover {
          background: #2a8b3a;
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .reviews-section { padding: 2rem 1rem; }
          .client-heading { font-size: 1.6rem; }
        }
      `}</style>

      <div className="reviews-section" data-aos="fade-up">
        <h3 className="client-heading">What Our Clients Say</h3>
        <div className="row">
          {/* Left: Review Cards */}
          <div className="col-md-8">
            <div className="row">
              {reviews.map((review, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="review-card d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle bg-light text-dark fw-bold me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "1.2rem",
                        }}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <div className="fw-bold">{review.name}</div>
                        <div className="text-light small">Verified Client</div>
                      </div>
                    </div>
                    <p className="fs-6" style={{ fontStyle: "italic" }}>
                      "{review.review}"
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="text-warning">★★★★★</div>
                      <div className="text-light small">{review.rating}/5</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Satisfaction Summary */}
          <div className="col-md-4 d-flex align-items-center">
            <div className="p-4 review-card w-100">
              <h5 className="text-white fw-bold mb-3">
                Client Experience & Satisfaction
              </h5>
              <p className="mb-2">✔ 12+ Years of Excellence in Fitness & Sports</p>
              <p className="mb-2">✔ 500+ Installations Delivered</p>
              <p className="mb-2">✔ 98% Client Satisfaction Rate</p>
              <p className="mb-2">✔ Trusted by Gyms, Institutions & Corporates</p>
              <p className="mb-2">✔ Durable Equipment & Timely Delivery</p>
              <div className="mt-4 text-center">
                <a
                  href="https://www.google.com/search?sca_esv=14507766f32efae7&sxsrf=AE3TifOODwuj8aEtSap0nQ0kWAU8DN1QXQ:1762222371726&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyoSoVQALcbEbyjNqM0bYMYGtkdDbHa6dGFwgFRTjxQpCtnjD4ZqODUNy4TWYE7g9TVCyHGOhdAsd1mL69c4UUr93sADqoTnRYYctrRo_JcPrCFfaNd7QCh1eFDYMFogqDiKNLGQRmF6OGXuXF7T6TJBRKoW-fRmN2LS7mGIagXkGJd0mHiiRSX-YrXINocgJ7XyFmjoXniWWFAmgvCC9ttcqe9l&q=RUNIP+2+-+Fitness+Equipment+Dealer+-+Best+Sports+Court+Maker+-+Turf+Football+Store/Manufacturer+In+Bhopal+Reviews&sa=X&ved=2ahUKEwjmo-3ztdeQAxWKd2wGHa0yAWEQ0bkNegQIIRAE&biw=1396&bih=632&dpr=1.38"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-more-btn"
                >
                  View More Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
