import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from '../assets/images/contact.png'; // replace with your trainers image

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwprnkqv';

const ContactFormSection = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: '' }); // ok: true|false|null

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handlePhoneChange = (e) => {
    const numeric = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numeric);
  };

  const validate = (formEl) => {
    const email = formEl.email.value.trim();
    const name = formEl.name.value.trim();
    const subject = formEl.subject.value.trim();
    const message = formEl.message.value.trim();
    const phoneDigits = phoneNumber;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{7,14}$/.test(phoneDigits);

    if (!name) return 'Please enter your name.';
    if (!emailOk) return 'Please enter a valid email.';
    if (!phoneOk) return 'Enter a valid phone number (7–14 digits).';
    if (!subject) return 'Please add a subject.';
    if (!message) return 'Please write a message.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok: null, msg: '' });

    const formEl = e.currentTarget;
    const error = validate(formEl);
    if (error) {
      setStatus({ ok: false, msg: error });
      return;
    }

    // Honeypot check
    if (formEl.honey.value) {
      // Bot likely; pretend success but do nothing
      setStatus({ ok: true, msg: 'Thanks! We will get back to you shortly.' });
      formEl.reset();
      setPhoneNumber('');
      setCountryCode('+91');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData(formEl);

      // Build a human friendly full phone field for Formspree
      fd.set('fullPhone', `${countryCode} ${phoneNumber}`);

      // Optional: customize email subject in Formspree dashboard using this field
      fd.set('_subject', `New Contact: ${formEl.subject.value}`);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ ok: true, msg: 'Thanks! We received your message and will reply soon.' });
        formEl.reset();
        setPhoneNumber('');
        setCountryCode('+91');
      } else {
        const msg =
          data?.errors?.map((er) => er.message).join(' ') ||
          'Something went wrong. Please try again.';
        setStatus({ ok: false, msg });
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section overflow-hidden py-5"  data-aos="fade-up" aria-labelledby="contact-heading">
      <style>{`
  :root {
    --bg:#0b0b0b;
    --panel:#0f1113;
    --muted:rgba(255,255,255,0.7);
    --accent-green:#39b54a;
    --accent-orange:#ff6a00;
  }

  .contact-section {
    background: linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(11,11,11,1) 100%);
    color: #fff;
    margin-top: 5rem;
  }

  .contact-wrap {
    display: flex;
    gap: 2.5rem;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* image panel */
  .contact-image {
    flex: 1 1 480px;
    min-height: 420px;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
    background: linear-gradient(120deg, rgba(10,10,10,0.85), rgba(8,8,8,0.95));
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .contact-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 75% 50%;
    display: block;
    transform: scale(1.02);
    transition: transform 0.6s ease, filter 0.4s ease;
    mix-blend-mode: normal;
    filter: brightness(0.65) contrast(1.05);
  }
  .contact-image:hover img {
    transform: scale(1.05);
    filter: brightness(0.7);
  }

  /* subtle accent overlay */
  .contact-image::after {
    content: '';
    position: absolute;
    right: -10%;
    top: -10%;
    width: 60%;
    height: 120%;
    background: linear-gradient(180deg, rgba(57,181,74,0.06) 0%, rgba(255,106,0,0.05) 100%);
    transform: rotate(12deg);
    pointer-events: none;
  }

  /* form panel */
  .contact-box {
    flex: 1 1 480px;
    background: linear-gradient(180deg, rgba(15,16,19,0.9), rgba(8,9,11,0.85));
    border: 1px solid rgba(57,181,74,0.07);
    padding: 2.2rem;
    border-radius: 1rem;
    color: #fff;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    transition: box-shadow 0.4s ease;
  }
  .contact-box:hover {
    box-shadow: 0 0 25px rgba(255,106,0,0.15);
  }

  .contact-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
  }

  .contact-sub {
    color: var(--muted);
    margin-bottom: 1rem;
  }

  /* Form Inputs */
  .form-control {
    background: rgba(255,255,255,0.04) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    color: #fff !important;
    border-radius: 0.6rem !important;
    padding: 0.65rem 0.75rem !important;
    transition: all 0.3s ease !important;
  }

  .form-control::placeholder { color: rgba(255,255,255,0.45) !important; }

  .form-control:focus {
    border-color: var(--accent-green) !important;
    box-shadow: 0 0 12px rgba(57,181,74,0.35) !important;
    background: rgba(15,15,15,0.9) !important;
    color: #fff !important;
  }

  /* Phone inputs */
  .phone-group {
    gap: 0.5rem;
  }
  .phone-group .form-control:first-child {
    max-width: 28%;
    flex-shrink: 0;
    text-align: center;
  }
  .phone-group .form-control:last-child {
    flex-grow: 1;
  }

  /* Button styling + hover glow */
  .contact-btn {
    background: linear-gradient(90deg, var(--accent-orange), #ff3c00);
    border: none;
    color: white;
    font-weight: 700;
    padding: 0.75rem 1rem;
    border-radius: 0.6rem;
    width: 100%;
    box-shadow: 0 0 0 rgba(255,106,0,0);
    transition: all 0.25s ease-in-out;
  }

  .contact-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(57,181,74,0.35);

  }

  .contact-btn:disabled {
    opacity: 0.7;
    transform: none;
    box-shadow: none;
  }

  /* Small link info */
  .small-info a {
    color: var(--accent-green);
    text-decoration: none;
    font-weight:600;
    transition: color 0.2s ease;
  }
  .small-info a:hover {
    color: #bff6c6;
    text-decoration: underline;
  }

  /* Success & error alert */
  .alert-custom {
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-weight: 600;
    margin-bottom: 0.9rem;
  }

  /* responsiveness */
  @media (max-width: 991px) {
    .contact-wrap { gap: 1rem; }
    .contact-image, .contact-box { flex: 1 1 100%; min-height: 360px; }
    .contact-box { padding: 1.25rem; }
  }
`}</style>


      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
              <div>
                <h2 id="contact-heading" className="h4 text-uppercase text-success mb-1" style={{ color: 'var(--accent-green)', letterSpacing: '0.08em' }}>
                  RUNIP 2 ━ YOUR GO-TO PARTNER FOR SPORTS & FITNESS
                </h2>
                <h3 className="contact-title">Speak with a Trainer, Request Equipment or Book a Turnkey Project
                </h3>
                <p className="contact-sub">We provide product supply, turnkey sports facility solutions and reliable after-sales service across Madhya Pradesh.</p>
              </div>
            </div>

            <div className="contact-wrap">
              {/* Image panel (trainers image) */}
              <div className="contact-image" data-aos="fade-right" aria-hidden="false">
                <img src={img1} alt="Our Gym Trainers" />
              </div>

              {/* Form panel */}
              <div className="contact-box" data-aos="fade-left" role="form" aria-label="Contact form">
                {status.ok === true && (
                  <div className="alert alert-success alert-custom" role="alert">
                    {status.msg}
                  </div>
                )}
                {status.ok === false && (
                  <div className="alert alert-danger alert-custom" role="alert">
                    {status.msg}
                  </div>
                )}

                <form onSubmit={onSubmit} autoComplete="on" noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honey"
                    tabIndex="-1"
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-5000px', height: 0, width: 0, opacity: 0 }}
                    aria-hidden="true"
                  />

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="visually-hidden" htmlFor="name">Your name</label>
                      <input id="name" name="name" type="text" className="form-control" placeholder="Your Name" required />
                    </div>

                    <div className="col-md-6">
                      <label className="visually-hidden" htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" className="form-control" placeholder="Your E-mail" required />
                    </div>

                    {/* Phone Input Group */}
<div className="col-md-6">
  <div className="d-flex align-items-center phone-group" style={{ gap: '0.5rem' }}>
    <label className="visually-hidden" htmlFor="countryCode">Country</label>
    <input
      id="countryCode"
      name="countryCode"
      type="text"
      className="form-control flex-shrink-0"
      placeholder="+91"
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      required
      aria-label="country code"
      style={{ maxWidth: '30%' }}
    />

    <label className="visually-hidden" htmlFor="phone">Phone</label>
    <input
      id="phone"
      name="phone"
      type="tel"
      className="form-control flex-grow-1"
      placeholder="9876543210"
      value={phoneNumber}
      onChange={handlePhoneChange}
      pattern="[0-9]{7,14}"
      title="Enter a valid phone number (7–14 digits)"
      required
      aria-label="phone number"
    />
  </div>
</div>

                    <div className="col-md-6">
                      <label className="visually-hidden" htmlFor="subject">Subject</label>
                      <input id="subject" name="subject" type="text" className="form-control" placeholder="Subject (e.g., Personal Training)" required />
                    </div>

                    <div className="col-12">
                      <label className="visually-hidden" htmlFor="message">Message</label>
                      <textarea id="message" name="message" className="form-control" rows="4" placeholder="Tell us about your goal or question..." required />
                    </div>

                    <div className="col-12 pt-2">
                      <button type="submit" className="btn contact-btn" disabled={submitting} aria-disabled={submitting}>
                        {submitting ? 'Sending…' : 'Send Message'}
                      </button>
                    </div>

                    <div className="col-12 small-info mt-3">
                      <p className="mb-1">📞 <a href="tel:+919009900079">+91 90099-00079</a></p>
                      <p className="mb-0">📩 <a href="mailto:runip2@gmail.com">runip2@gmail.com</a></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
