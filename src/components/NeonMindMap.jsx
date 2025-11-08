import React, { useLayoutEffect, useRef, useState } from "react";
import "./NeonMindMap.css";
import img01 from "../assets/images/handshake.avif"

export default function NeonMindMap() {
  const isMobile = window.innerWidth <= 720;
  const nodes = [
    {
      id: 0,
      label: "Consumer-Centric Product Range",
      x: 80,
      y: 35,
      img: img01,
    },
    { id: 1, label: "Reliable After-Sales", x: 80, y: 65, img: img01, },
    { id: 2, label: "Customized Equipment Packages", x: 50, y: 85 , img: img01, },
    { id: 3, label: "Value-Driven Pricing", x: 20, y: 65 ,img: img01, },
    {
      id: 4,
      label: (
        <>
          Trusted Brand <br /> Partnerships
        </>
      ),
      x: isMobile ? 20 : 20,
      y: 35,
      img: img01,
    },
    {
      id: 5,
      label: "Brand Value & Trust",
      x: 50,
      y: 15,
      img: img01,
    },
  ];

  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const outerRefs = useRef({});
  const [segments, setSegments] = useState([]);
  const [started, setStarted] = useState(false);

  const toLocalRect = (rect, cont) => ({
    left: rect.left - cont.left,
    top: rect.top - cont.top,
    width: rect.width,
    height: rect.height,
    right: rect.right - cont.left,
    bottom: rect.bottom - cont.top,
    cx: rect.left - cont.left + rect.width / 2,
    cy: rect.top - cont.top + rect.height / 2,
  });

  // deterministic connector builder (keeps left/right dynamic; top/bottom will be visually covered by CSS pseudo-lines)
  const measure = () => {
    const container = containerRef.current;
    const center = centerRef.current;
    if (!container || !center) return;

    requestAnimationFrame(() => {
      const cont = container.getBoundingClientRect();
      const cRect = center.getBoundingClientRect();
      const centerBox = toLocalRect(cRect, cont);

      const pad = 8; // gap between box edge and connector endpoint

      const result = nodes.map((n) => {
        const el = outerRefs.current[n.id];
        if (!el) return null;
        const rRect = el.getBoundingClientRect();
        const r = toLocalRect(rRect, cont);

        const dx = r.cx - centerBox.cx;
        const dy = r.cy - centerBox.cy;

        // Mostly horizontal -> horizontal elbow
        if (Math.abs(dx) > Math.abs(dy)) {
          const sign = Math.sign(dx) || 1;
          const start = {
            x: centerBox.cx + sign * (centerBox.width / 2 + pad),
            y: centerBox.cy,
          };
          const end = {
            x: r.cx - sign * (r.width / 2 + pad),
            y: r.cy,
          };
          // original elbow would be at end.x; shorten the horizontal length by 10%
          let elbow = { x: end.x, y: start.y };

          // shorten horizontal distance between start.x and elbow.x by 10% (move elbow 10% toward start)
          const shortenFactor = 0.9; // 90% of the original horizontal distance -> 10% shorter
          const horiz = elbow.x - start.x;
          elbow.x = start.x + horiz * shortenFactor;

          // If elbow and start are essentially identical, fallback to straight line
          if (Math.hypot(elbow.x - start.x, elbow.y - start.y) < 0.5) {
            return { id: n.id, points: [start, end], end };
          }
          return { id: n.id, points: [start, elbow, end], end };
        }

        // Mostly vertical -> vertical (we still compute endpoints so small dynamic vertical strokes remain accurate,
        // but main visible vertical spine is handled by CSS pseudo-elements)
        const signY = Math.sign(dy) || 1;
        const start = {
          x: centerBox.cx,
          y: centerBox.cy + signY * (centerBox.height / 2 + pad),
        };
        const end = {
          x: r.cx,
          y: r.cy - signY * (r.height / 2 + pad),
        };
        const mid = { x: start.x, y: end.y };

        // fallback to straight line if points collapse
        if (
          Math.hypot(mid.x - start.x, mid.y - start.y) < 0.5 ||
          Math.hypot(end.x - mid.x, end.y - mid.y) < 0.5
        ) {
          return { id: n.id, points: [start, end], end };
        }

        return { id: n.id, points: [start, mid, end], end };
      });

      setSegments(result.filter(Boolean));
    });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    // initial measurement
    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NEW: toggle handler so clicking toggles between open and collapsed
  const toggleStarted = () => {
    if (started) {
      // collapse immediately
      setStarted(false);
      // optional: clear segments if you want them removed when collapsed
      // setSegments([]);
    } else {
      // open: measure then reveal
      measure();
      // ensure the CSS transitions can pick up the change
      setTimeout(() => setStarted(true), 60);
    }
  };

  const setOuter = (id) => (el) => {
    if (el) outerRefs.current[id] = el;
    else delete outerRefs.current[id];
  };

  return (
    <div className="neon-canvas">
      {/* add started class to container to control visibility via CSS */}
      <div
        className={`neon-container${started ? " started" : ""}`}
        ref={containerRef}
      >
        <svg className="neon-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="neonGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#7af1ff" />
              <stop offset="50%" stopColor="#00d0ff" />
              <stop offset="100%" stopColor="#0099ff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* dynamic connectors (left/right and small vertical segments) */}
          {segments.map((s) => {
            const d = s.points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ");
            return (
              <g key={s.id} className="connector-group">
                <path
                  d={d}
                  className={`neon-line ${started ? "anim" : ""}`}
                  stroke="url(#neonGradient)"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  fill="none"
                  style={{ filter: "url(#glow)" }}
                />
                <circle
                  cx={s.end.x}
                  cy={s.end.y}
                  r={started ? 6 : 0}
                  className={`neon-dot ${started ? "dot-on" : ""}`}
                />
              </g>
            );
          })}
        </svg>

        <div
          ref={centerRef}
          className="center-box"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={toggleStarted} // <-- toggles open/close
        >
          <div className="center-heading">Why Choose Us</div>
          <div className="center-sub">Click to View</div>
        </div>

        {nodes.map((n) => (
          <div
            key={n.id}
            ref={setOuter(n.id)}
            className={`outer-box ${started ? "outer-glow" : ""}`}
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* media container (optional image). If you want an image, add `img` to the node object */}
            {n.img ? (
              <div className="outer-media">
                <img src={n.img} alt={typeof n.label === "string" ? n.label : "node"} />
              </div>
            ) : (
              <div className="outer-media empty" aria-hidden />
            )}

            {/* title overlay shown above the image */}
            <div className="outer-title">{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
