'use client';
import { useState } from 'react';
import Spotlight from './Spotlight';

export const SpotlightButton = () => {
  const [showHighlight, setShowHighlight] = useState(false);

  return (
    <>
      {showHighlight && <Spotlight targetSelector="#socialLinks" onClose={() => setShowHighlight(false)} />}

      <button
        className="rounded-2xl bg-emerald-600 px-4 py-2 text-emerald-50 transition-colors duration-250 hover:cursor-pointer hover:bg-emerald-500 hover:text-emerald-100"
        onClick={() => setShowHighlight(true)}
      >
        Contact Me!
      </button>
    </>
  );
};
