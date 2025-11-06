import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <style>
      {`
        .notfound-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0b0b0b 0%, #000000 100%);
          text-align: center;
          overflow: hidden;
          padding: 2rem;
          animation: fadeIn 1.2s ease-out;
        }

        /* Neon glowing 404 */
        .error-glow {
          font-size: 8rem;
          font-weight: 900;
          color: #39b54a;
          text-shadow:
            0 0 10px #39b54a,
            0 0 20px #39b54a,
            0 0 40px #39b54a,
            0 0 80px #2f9c3e;
          animation: pulseGlow 2.5s infinite alternate;
        }

        @keyframes pulseGlow {
          from {
            text-shadow:
              0 0 10px #39b54a,
              0 0 20px #39b54a,
              0 0 40px #39b54a;
            transform: scale(1);
          }
          to {
            text-shadow:
              0 0 20px #39b54a,
              0 0 40px #39b54a,
              0 0 80px #2f9c3e;
            transform: scale(1.03);
          }
        }

        .notfound-title {
          font-size: 2rem;
          color: #ffffff;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .notfound-message {
          font-size: 1.2rem;
          color: #dcd8d8;
          margin-bottom: 2rem;
          max-width: 600px;
          line-height: 1.7;
        }

        /* Button styled to match your RUNIP2 theme */
        .notfound-home-btn {
          display: inline-block;
          background: #39b54a;
          color: #000;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.8rem 2.2rem;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(57, 181, 74, 0.3);
        }

        .notfound-home-btn:hover {
          background: #2e9f3f;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 0 25px rgba(57, 181, 74, 0.6);
        }

        /* Subtle fade animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
    </style>

    <div className="notfound-container">
      <div className="error-glow">404</div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-message">
        Oops! Looks like you’ve taken a wrong turn.<br />
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="notfound-home-btn">← Back to Home</Link>
    </div>
  </>
);

export default NotFound;
