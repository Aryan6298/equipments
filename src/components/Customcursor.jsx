import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (target instanceof HTMLElement) {
        const cursorStyle = window.getComputedStyle(target).cursor;
        setIsPointer(cursorStyle === 'pointer');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* inner dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isClicking ? 'scale(0.7)' : 'scale(1)',
        }}
      />
      {/* outer ring */}
      <div
        className="cursor-outline"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${isPointer ? 1.5 : 1}) translate(-50%, -50%)`,
          borderColor: isPointer ? '#3b82f6' : '#ffffff',
        }}
      />

      <style>
        {`
          /* Glowing blue inner dot */
          .cursor-dot {
            width: 12px;
            height: 12px;
            background-color: #3b82f6;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 20px #3b82f6,
              0 0 40px rgba(59, 130, 246, 0.9),
              0 0 80px rgba(59, 130, 246, 0.7),
              0 0 120px rgba(59, 130, 246, 0.6);
            animation: pulseGlow 2s infinite alternate ease-in-out;
            transition: transform 0.1s ease, box-shadow 0.2s ease;
          }

          /* Glowing outline ring */
          .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid #3b82f6;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.25s ease;
            opacity: 0.5;
            box-shadow:
              0 0 25px rgba(59, 130, 246, 0.7),
              0 0 60px rgba(59, 130, 246, 0.4);
          }

          /* Pulsating glow animation */
          @keyframes pulseGlow {
            from {
              box-shadow:
                0 0 15px #3b82f6,
                0 0 40px rgba(59, 130, 246, 0.7),
                0 0 80px rgba(59, 130, 246, 0.4);
            }
            to {
              box-shadow:
                0 0 25px #60a5fa,
                0 0 60px rgba(96, 165, 250, 0.9),
                0 0 100px rgba(147, 197, 253, 0.8);
            }
          }

          @media (max-width: 768px) {
            .cursor-dot,
            .cursor-outline {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default CustomCursor;
