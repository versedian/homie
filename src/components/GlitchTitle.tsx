"use client";

import { useEffect, useState } from "react";
import "./GlitchTitle.css";

type GlitchTitleProps = {
  text: string;
};

export function GlitchTitle({ text }: GlitchTitleProps) {
  const [seed, setSeed] = useState(0);

  // Re-randomize seed to trigger new animation cycles
  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(Math.random());
    }, 5000 + Math.random() * 3000); // Random interval between 5-8s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glitch-container" data-seed={Math.floor(seed * 1000)}>
      <h1 className="glitch-text text-6xl font-light tracking-tight sm:text-7xl">
        <span className="glitch-char" style={{ "--char-index": 0 } as React.CSSProperties}>
          {text[0]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 1 } as React.CSSProperties}>
          {text[1]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 2 } as React.CSSProperties}>
          {text[2]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 3 } as React.CSSProperties}>
          {text[3]}
        </span>
      </h1>
      <h1 className="glitch-text glitch-layer-1 text-6xl font-light tracking-tight sm:text-7xl" aria-hidden="true">
        <span className="glitch-char" style={{ "--char-index": 0 } as React.CSSProperties}>
          {text[0]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 1 } as React.CSSProperties}>
          {text[1]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 2 } as React.CSSProperties}>
          {text[2]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 3 } as React.CSSProperties}>
          {text[3]}
        </span>
      </h1>
      <h1 className="glitch-text glitch-layer-2 text-6xl font-light tracking-tight sm:text-7xl" aria-hidden="true">
        <span className="glitch-char" style={{ "--char-index": 0 } as React.CSSProperties}>
          {text[0]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 1 } as React.CSSProperties}>
          {text[1]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 2 } as React.CSSProperties}>
          {text[2]}
        </span>
        <span className="glitch-char" style={{ "--char-index": 3 } as React.CSSProperties}>
          {text[3]}
        </span>
      </h1>
    </div>
  );
}
