"use client";

import { useEffect, useState } from "react";
import "./GlitchTitle.css";

export type GlitchTitleState = "neutral" | "glow" | "chaotic";

type GlitchTitleProps = {
  text: string;
  state?: GlitchTitleState;
};

export function GlitchTitle({ text, state = "neutral" }: GlitchTitleProps) {
  const [seed, setSeed] = useState(0);

  // Re-randomize seed to trigger new animation cycles for chaotic state
  useEffect(() => {
    if (state !== "chaotic") return;

    const interval = setInterval(() => {
      setSeed(Math.random());
    }, 8000 + Math.random() * 4000); // Random interval between 8-12s

    return () => clearInterval(interval);
  }, [state]);

  const renderCharacters = () =>
    text.split("").map((char, i) => (
      <span key={i} className="glitch-char" style={{ "--char-index": i } as React.CSSProperties}>
        {char}
      </span>
    ));

  return (
    <div
      className={`glitch-container glitch-state-${state}`}
      data-state={state}
      data-seed={state === "chaotic" ? Math.floor(seed * 1000) : undefined}
    >
      {/* Single text layer with glow effects */}
      <h1
        className="glitch-text text-6xl font-bold tracking-tight sm:text-7xl"
        style={{ fontFamily: "var(--font-workbench)" }}
      >
        {renderCharacters()}
      </h1>
    </div>
  );
}
