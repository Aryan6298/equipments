import React from 'react';

const Experience = () => {
  return (
    <div
      className="text-center my-5 py-4 px-3 rounded"
      style={{
        background: 'rgba(30, 120, 119, 0.26)',
        color: 'white',
      }}
      data-aos="fade-down"
    >
      <h2
        style={{
          fontSize: '3rem',
          fontWeight: '800',
          textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
        }}
      >
        15+ Years of Excellence in Fitness & Sports Solutions
      </h2>

      <p
        className="mt-3 fs-5"
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          fontWeight: '500',
          lineHeight: '1.7',
        }}
      >
        Since <b>2012</b>, <b>RUNIP 2</b> has evolved from a fitness retail
        partner to a trusted leader in sports and fitness equipment across{' '}
        <b>Madhya Pradesh</b>. Over the years, we have built strong partnerships
        with globally recognized brands such as <b>Cosco, Aerofit, USI,
        California Fitness,</b> and <b>Crest Fitness</b>, serving a wide range of
        clients from gyms and institutions to sports arenas.
      </p>

    
    </div>
  );
};

export default Experience;
