import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import indiamartLogo from "../assets/images/indiamart-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white pt-5 pb-3" style={{ backgroundColor: " #0f0f0fd7" }}>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

          {/* About Section */}
          <div className="col" data-aos="fade-up" data-aos-duration="1000">
            <h5 className="fw-bold mb-3 footer-heading" style={{ color: " #00FFFF" }}>
              About Us
            </h5>
            <p style={{ color: "white" }}>
             RUNIP 2 began in 2012 as a franchise partner of Proline Fitness. What started as a retail venture has grown
              into a landmark destination for fitness enthusiasts and a trusted distributor across Madhya Pradesh.
              We partner with leading global brands to deliver fitness equipment, turnkey sports facilities and
              maintenance services.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="col" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
            <h5 className="fw-bold mb-3 footer-heading" style={{ color: " #00FFFF" }}>
              Contact Us
            </h5>
            <p>
              <a href="tel:+919009900079" className="footer-link">
                <FaPhone className="me-2" style={{ transform: "rotate(90deg)" }} />Rahul Premchandani<br></br> +91 90099-00079
              </a>
            </p>
            <p>
              <a href="tel:+919827744771" className="footer-link">
                <FaPhone className="me-2" style={{ transform: "rotate(90deg)" }} />Nikhil Premchandani <br></br> +91 98277-44771
              </a>
            </p>
            <p> <a href="tel:07554233323" className="footer-link">
                <FaPhone className="me-2" style={{ transform: "rotate(90deg)" }} />
            Showroom: 0755-4233323
            </a></p>
            <p>
              <a href="mailto:runip2@gmail.com" className="footer-link">
                <FaEnvelope className="me-2" /> runip2@gmail.com
              </a>
            </p>
          </div>

          {/* Social + Map Section */}
          <div className="col" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
            <h5 className="fw-bold mb-3 footer-heading" style={{ color: " #00FFFF" }}>
              Connect with Us
            </h5>
            <div className="d-flex gap-3 mb-3">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                <FaInstagram />
              </a>

              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                <FaYoutube />
              </a>

              <a href="https://www.indiamart.com/runip/profile.html?srsltid=AfmBOopQ-um836PsGxhpnNvrM4NrClhwvLozeBmBjoY4PcxZmIizoQof" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px' }}>
                <img src={indiamartLogo} alt="IndiaMART" style={{ width: "26px", height: "26px" }} />
              </a>
            </div>

            <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58659.677727000635!2d77.39100050044105!3d23.23472123024881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4319ada5fd1b%3A0x8c872c17a5785aa9!2sRUNIP%202%20-%20Fitness%20Equipment%20Dealer%20-%20Best%20Sports%20Court%20Maker%20-%20Turf%20Football%20Store%2FManufacturer%20In%20Bhopal!5e0!3m2!1sen!2sin!4v1762223085684!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Our Location"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* Address Section */}
          <div className="col" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
            <h5 className="fw-bold mb-3 footer-heading" style={{ color: " #00FFFF" }}>
              Our Address
            </h5>
            <p style={{ color: "white" }}>
              <FaMapMarkerAlt className="me-2" />
              HARGEGOVIND COMPLEX, Zone-I, Maharana Pratap Nagar, <br></br> Bhopal, Madhya Pradesh <br></br> Pin Code - 462011
            </p>
        
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top pt-3">
          <p className="mb-1" style={{ color: "white" }}>
            &copy; {new Date().getFullYear()} Runip 2 . All rights reserved.
          </p>
         
          <Link to="/termsofservices" className="text-white">Terms of Service</Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .footer-heading {
            transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
          }

          .footer-heading:hover {
            transform: translateY(-5px);
            color: #f8f9fa;
          }

          .footer-link {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-link:hover {
            color: #00d4ff;
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
