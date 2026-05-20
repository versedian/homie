"use client";

import { useEffect, useState } from "react";
import "./GlitchTitle.css";

type GlitchTitleProps = {
  text: string;
  isActive?: boolean;
};

export function GlitchTitle({ text, isActive = false }: GlitchTitleProps) {
  const [seed, setSeed] = useState(0);

  // Re-randomize seed to trigger new animation cycles
  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(Math.random());
    }, 8000 + Math.random() * 4000); // Random interval between 8-12s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`glitch-container ${isActive ? 'glitch-active' : ''}`} data-seed={Math.floor(seed * 1000)}>
      <h1 className="glitch-text text-6xl font-bold tracking-tight sm:text-7xl" style={{ fontFamily: "var(--font-workbench)" }}>
        {text.split('').map((char, i) => (
          <span key={i} className="glitch-char" style={{ "--char-index": i } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </h1>
      <h1 className="glitch-text glitch-layer-1 text-6xl font-bold tracking-tight sm:text-7xl" aria-hidden="true" style={{ fontFamily: "var(--font-workbench)" }}>
        {text.split('').map((char, i) => (
          <span key={i} className="glitch-char" style={{ "--char-index": i } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </h1>
      <h1 className="glitch-text glitch-layer-2 text-6xl font-bold tracking-tight sm:text-7xl" aria-hidden="true" style={{ fontFamily: "var(--font-workbench)" }}>
        {text.split('').map((char, i) => (
          <span key={i} className="glitch-char" style={{ "--char-index": i } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
