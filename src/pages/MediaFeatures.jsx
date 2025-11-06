// src/pages/Gallery.js
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Example imports — replace/add your images here
import g1 from '../assets/images/crousal/crousalimage2.jpg';
import g2 from '../assets/images/crousal/crousalimage3.jpg';
import g3 from '../assets/images/crousal/crousalimage4.jpg';
import g4 from '../assets/images/contact.png'; // reuse contact placeholder

const images = [
  { src: g1, alt: 'Gallery image 1', caption: 'Indoor Arena — turnkey solution' },
  { src: g2, alt: 'Gallery image 2', caption: 'Showroom & Equipment' },
  { src: g3, alt: 'Gallery image 3', caption: 'Open Gym Installation' },
  { src: g4, alt: 'Gallery image 4', caption: 'Installation & Maintenance' },
  { src: g4, alt: 'Gallery image 4', caption: 'Installation & Maintenance' },
  { src: g3, alt: 'Gallery image 3', caption: 'Open Gym Installation' },
  { src: g2, alt: 'Gallery image 2', caption: 'Showroom & Equipment' },
  { src: g1, alt: 'Gallery image 1', caption: 'Indoor Arena — turnkey solution' },
];

export default function Gallery() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  // open lightbox and save last focused element
  const openLightbox = (i) => {
    lastActiveElementRef.current = document.activeElement;
    setIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // focus will be set by effect when lightboxOpen changes
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // restore body overflow and focus will be handled in effect/unmount
    document.body.style.overflow = '';
    if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
      lastActiveElementRef.current.focus();
    }
  };

  const showPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setIndex((i) => (i + 1) % images.length);

  // ensure body overflow is restored if component unmounts while lightbox open
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // focus management and keyboard (including focus trap) when lightbox opens
  useEffect(() => {
    if (!lightboxOpen) return;

    // focus the lightbox container
    const el = lightboxRef.current;
    if (el && typeof el.focus === 'function') {
      el.focus();
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'Tab') {
        // simple focus trap: keep focus inside lightbox
        const focusable = el.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]); // only re-run when open state changes

  return (
    <section className="gallery-page" aria-labelledby="gallery-heading" style={{ marginTop: '4rem' }}>
      <style>{`
        :root{
          --bg:#0b0b0b;
          --panel:#0f1113;
          --muted:rgba(255,255,255,0.7);
          --accent-green:#39b54a;
          --accent-orange:#ff6a00;
        }

        .gallery-page {
          color: #fff;
          background: linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(11,11,11,1) 100%);
          padding-bottom: 4rem;
                 padding-top: 3rem;
        }

        .gallery-head {
          text-align: center;
          margin-bottom: 2rem;
        }
        .gallery-head h2 {
          font-size: 2.2rem;
          margin-bottom: 0.4rem;
          color: #fff;
        }
        .gallery-head p {
          color: var(--muted);
          margin-bottom: 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 1199px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 767px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .gallery-grid { grid-template-columns: 1fr; } }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          box-shadow: 0 8px 30px rgba(0,0,0,0.6);
          cursor: pointer;
          min-height: 150px;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(.2,.9,.2,1), filter 0.4s;
          transform-origin: center center;
          filter: brightness(0.75) contrast(1.02);
        }

        .gallery-item:hover img {
          transform: scale(1.07) translateY(-4px);
          filter: brightness(0.95);
        }

        .overlay {
          position: absolute;
          inset: 0;
          display:flex;
          align-items:flex-end;
          justify-content:stretch;
          padding: 1rem;
          background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%);
          transition: background 0.25s;
        }
        .overlay .caption {
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          text-shadow: 0 4px 18px rgba(0,0,0,0.6);
        }
        .overlay .actions {
          margin-left: auto;
          display:flex;
          gap:0.5rem;
        }
        .icon-btn {
          background: rgba(255,255,255,0.06);
          color: #fff;
          border-radius: 999px;
          width: 36px;
          height: 36px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border: 1px solid rgba(255,255,255,0.04);
          transition: transform 0.15s, background 0.15s;
        }
        .icon-btn:hover { transform: scale(1.05); background: rgba(255,255,255,0.09); }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display:flex;
          align-items:center;
          justify-content:center;
          background: rgba(0,0,0,0.85);
          padding: 2rem;
        }
        .lightbox-inner {
          max-width: 1100px;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.7);
          background: linear-gradient(180deg, rgba(15,15,15,0.98), rgba(10,10,10,0.98));
        }
        .lightbox-img {
          width: 100%;
          height: calc(60vh);
          max-height: 80vh;
          background: #000;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .lightbox-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display:block;
        }
        .lightbox-footer {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding: 0.75rem 1rem;
          border-top: 1px solid rgba(255,255,255,0.03);
          color: var(--muted);
        }
        .lb-controls { display:flex; gap:0.5rem; align-items:center; }
        .lb-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #fff;
          padding: 0.45rem 0.6rem;
          border-radius: 6px;
          cursor:pointer;
        }
        .lb-caption { font-weight:600; color:#fff; }

        @media (max-width: 768px) {
          .lightbox-inner { max-width: 95%; }
          .lightbox-img { height: 50vh; }
        }
      `}</style>

      <div className="container py-4">
        <div className="gallery-head" data-aos="fade-up">
          <h2 id="gallery-heading">Gallery</h2>
          <p>Projects, installations and product showcases — a curated look at our work.</p>
        </div>

        <div className="gallery-grid" role="list" aria-live="polite">
          {images.map((it, i) => (
            <div
              key={i}
              className="gallery-item"
              role="listitem"
              data-aos="zoom-in"
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              tabIndex={0}
              aria-label={`${it.alt}. Click to view larger`}
            >
              <img src={it.src} alt={it.alt} loading="lazy" />
              <div className="overlay" aria-hidden="true">
                <div className="caption">{it.caption}</div>
                <div className="actions" role="group" aria-hidden="true">
                  <div
                    className="icon-btn"
                    title="View"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openLightbox(i);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                    aria-label={`View ${it.alt}`}
                  >
                    🔍
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={closeLightbox}
        >
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
            ref={lightboxRef}
            tabIndex={-1} // allow programmatic focus
          >
            <div className="lightbox-img">
              <img src={images[index].src} alt={images[index].alt} />
            </div>
            <div className="lightbox-footer">
              <div className="lb-caption">{images[index].caption}</div>
              <div className="lb-controls">
                <button className="lb-btn" onClick={showPrev} aria-label="Previous image">◀</button>
                <button className="lb-btn" onClick={showNext} aria-label="Next image">▶</button>
                <a
                  className="lb-btn"
                  href={images[index].src}
                  download
                  aria-label="Download image"
                  title="Download image"
                  // open download in new tab when browser doesn't allow automatic download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ⬇
                </a>
                <button className="lb-btn" onClick={closeLightbox} aria-label="Close viewer">✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
