import React, { useEffect, useState, useRef } from 'react';

const stats = [
  {
    label: '15+ States',
    desc: 'Expertise across modern technologies and tools.',
    target: 15,
    prefix: 'States ' ,
    suffix: '+ ',
    duration: 3000,
    icon: '🌐',
  },
  {
    label: '100% Client Satisfaction',
    desc: 'Delivering reliable, scalable solutions.',
    target: 100,
    prefix: ' Client Satisfaction  ',
    suffix: '% ',
    duration: 3000,
    icon: '👍',
  },
  {
    label: '100+ Projects',
    desc: 'Crafted for clients worldwide.',
    target: 100,
    prefix: '',
    suffix: '+  Projects',
    duration: 3000,
    icon: '🛠️',
  },
];

// ✅ Fixed JSX version of the count-up hook
function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    let startVal = 0;
    const fps = 60;
    const stepCount = Math.max(1, Math.round((duration / 1000) * fps));
    const increment = target / stepCount;

    function animate() {
      startVal += increment;
      if (startVal < target) {
        setCount(Math.floor(startVal));
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(Math.round(target));
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [target, duration, start]);

  return count;
}

const OurReach = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count1 = useCountUp(stats[0].target, stats[0].duration, inView);
  const count2 = useCountUp(stats[1].target, stats[1].duration, inView);
  const count3 = useCountUp(stats[2].target, stats[2].duration, inView);
  const counts = [count1, count2, count3];

  return (
    <section
      ref={sectionRef}
      className={`our-reach-section py-5 d-flex justify-content-center align-items-center ${
        inView ? 'fade-in' : ''
      }`}
      style={{ background: 'transparent' }}
    >
      <style>{`
        .our-reach-section {
          background: transparent;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          padding: 2.2rem 1.2rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1.2s cubic-bezier(.4,1,.4,1), transform 1.2s cubic-bezier(.4,1,.4,1);
        }
        .our-reach-section:not(.fade-in) {
          opacity: 0;
          transform: translateY(30px);
        }

        .our-reach-card {
          background: rgba(0, 0, 0, 0.32);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 #2563eb22, 0 0 18px 0 #2563eb33;
          padding: 2.2rem;
          min-width: 260px;
          max-width: 340px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: box-shadow 0.28s, transform 0.28s;
          border: 1.2px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .our-reach-card:hover {
          box-shadow: 0 12px 40px 0 #2563eb66, 0 0 48px 0 #2563eb44;
          transform: scale(1.038) translateY(-6px);
        }

        .our-reach-icon {
          font-size: 2.4rem;
          margin-bottom: 0.9rem;
          color: #6ea8fe;
          filter: drop-shadow(0 0 10px #2563eb66);
          animation: icon-pop 1.2s cubic-bezier(.4,1,.4,1);
          z-index: 2;
        }

        @keyframes icon-pop {
          0% { transform: scale(0.75); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .our-reach-count {
          font-family: 'Instrument Serif', serif;
          font-size: 2.4rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.85rem;
          letter-spacing: 0.6px;
          text-shadow: 0 2px 14px #000a1a88;
          z-index: 2;
        }

        .our-reach-desc {
          color: #d7dbe8;
          font-size: 1.05rem;
          font-weight: 400;
          z-index: 2;
        }

        .our-reach-card::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 130%;
          height: 130%;
          background: radial-gradient(circle, #2563eb18 0%, transparent 65%);
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 991px) {
          .our-reach-section {
            flex-direction: column;
            gap: 1.6rem;
            padding: 1.6rem;
          }
          .our-reach-card {
            min-width: 220px;
            max-width: 100%;
          }
        }
      `}</style>

      {stats.map((stat, idx) => (
        <div className="our-reach-card shadow-lg" key={stat.label}>
          <span className="our-reach-icon" role="img" aria-label={stat.label}>
            {stat.icon}
          </span>
          <div className="our-reach-count" aria-live="polite">
            {stat.prefix}
            {stat.suffix === '%' ? counts[idx] : counts[idx].toLocaleString()}
            {stat.suffix}
          </div>
          <div className="our-reach-desc">{stat.desc}</div>
        </div>
      ))}
    </section>
  );
};

export default OurReach;
