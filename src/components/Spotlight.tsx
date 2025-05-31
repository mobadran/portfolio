// import React from 'react';

// const Spotlight = ({ targetSelector, onClose }: { targetSelector: string; onClose?: () => void }) => {
//   const target = document.querySelector(targetSelector);
//   if (!target) return null;

//   const rect = target.getBoundingClientRect();
//   const padding = 10;

//   const x = rect.left - padding;
//   const y = rect.top - padding;
//   const width = rect.width + padding * 2;
//   const height = rect.height + padding * 2;

//   const clipPath = `polygon(
//     0 0,
//     100% 0,
//     100% 100%,
//     0 100%,
//     0 0,
//     ${x}px ${y}px,
//     ${x}px ${y + height}px,
//     ${x + width}px ${y + height}px,
//     ${x + width}px ${y}px,
//     ${x}px ${y}px
//   )`;

//   return <div className="spotlight-overlay" onClick={onClose} style={{ clipPath }} />;
// };

// export default Spotlight;

import React, { useEffect, useRef, useState } from 'react';
import { PiReadCvLogoBold } from 'react-icons/pi';

const Spotlight = ({ targetSelector, onClose }: { targetSelector: string; onClose?: () => void }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const target = document.querySelector(targetSelector);
  //   if (target) {
  //     setRect(target.getBoundingClientRect());
  //   }
  // }, [targetSelector]);

  useEffect(() => {
    const handleResize = () => {
      const target = document.querySelector(targetSelector);
      if (target) {
        setRect(target.getBoundingClientRect());
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [targetSelector]);

  if (!rect) return null;

  const padding = 10;
  const x = rect.left - padding;
  const y = rect.top - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  const clipPath = `polygon(
    0 0,
    100% 0,
    100% 100%,
    0 100%,
    0 0,
    ${x}px ${y}px,
    ${x}px ${y + height}px,
    ${x + width}px ${y + height}px,
    ${x + width}px ${y}px,
    ${x}px ${y}px
  )`;

  // Dialog position: below the target element
  const dialogStyle: React.CSSProperties = {
    position: 'fixed',
    left: rect.left - 16,
    top: rect.bottom + 16,
    transform: 'translateX(-50%)',
    zIndex: 10001,
    background: '#0d0d0d',
    color: '#ffffffd0',
    borderRadius: 8,
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    padding: '1.5rem 2rem',
    minWidth: 350,
    textAlign: 'center',
  };

  return (
    <>
      <div
        className="spotlight-overlay"
        onClick={onClose}
        style={{
          clipPath,
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 10000,
        }}
      />
      <div ref={dialogRef} style={dialogStyle}>
        <div className="mb-4 text-lg">
          Email: <b>badraanmo@gmail.com</b>
          <br />
          View my <b>resume</b> from the{' '}
          <span className="mx-1 inline-flex items-center align-middle">
            <PiReadCvLogoBold />
          </span>{' '}
          icon <br />
          Also my <b>Github</b> and <b>LinkedIn</b> are here.
        </div>
        <button
          className="mt-2 cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default Spotlight;
