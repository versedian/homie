"use client";

import { useState } from "react";

type SearchEngine = {
  name: string;
  label: string;
  icon: string;
  baseColor: string;
  brightColor: string;
  buildUrl: (query: string) => string;
};

const searchEngines: SearchEngine[] = [
  {
    name: "google",
    label: "Google",
    icon: "G",
    baseColor: "#8fa8d8",
    brightColor: "#6db3ff",
    buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: "duckduckgo",
    label: "DuckDuckGo",
    icon: "🦆",
    baseColor: "#d4a894",
    brightColor: "#ffb88d",
    buildUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  },
  {
    name: "bing",
    label: "Bing",
    icon: "B",
    baseColor: "#7db8c4",
    brightColor: "#4dd9ff",
    buildUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: "brave",
    label: "Brave",
    icon: "⚡",
    baseColor: "#c9899d",
    brightColor: "#ff6bb5",
    buildUrl: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}`,
  },
];

const imageEngines: SearchEngine[] = [
  {
    name: "google-images",
    label: "Images",
    icon: "G",
    baseColor: "#8fa8d8",
    brightColor: "#6db3ff",
    buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}&tbm=isch`,
  },
  {
    name: "duckduckgo-images",
    label: "Images",
    icon: "🦆",
    baseColor: "#d4a894",
    brightColor: "#ffb88d",
    buildUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}&iax=images&ia=images`,
  },
  {
    name: "bing-images",
    label: "Images",
    icon: "B",
    baseColor: "#7db8c4",
    brightColor: "#4dd9ff",
    buildUrl: (q) => `https://www.bing.com/images/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: "brave-images",
    label: "Images",
    icon: "⚡",
    baseColor: "#c9899d",
    brightColor: "#ff6bb5",
    buildUrl: (q) => `https://search.brave.com/images?q=${encodeURIComponent(q)}`,
  },
];

type SectionHeaderProps = {
  icon: string;
  title: string;
  gradient: string;
};

function SectionHeader({ icon, title, gradient }: SectionHeaderProps) {
  return (
    <div className="group/header flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-lg group-hover/header:scale-110 transition-transform duration-300">{icon}</span>
        <h2 className={`text-sm font-semibold tracking-wide ${gradient}`}>
          {title}
        </h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-foreground-muted/30 via-foreground-muted/10 to-transparent group-hover/header:from-foreground-muted/50 group-hover/header:via-foreground-muted/20 transition-colors duration-300" />
    </div>
  );
}

type SpeedDialProps = {
  query: string;
};

export function SpeedDial({ query }: SpeedDialProps) {
  const [hoveredEngine, setHoveredEngine] = useState<string | null>(null);

  const handleEngineClick = (engine: SearchEngine) => {
    if (query.trim()) {
      // Save before redirect to ensure consistent behavior across all engines
      sessionStorage.setItem("searchQuery", query);
      window.location.href = engine.buildUrl(query);
    }
  };

  const EngineButton = ({ engine }: { engine: SearchEngine }) => {
    const isHovered = hoveredEngine === engine.name;

    return (
      <button
        key={engine.name}
        onClick={() => handleEngineClick(engine)}
        disabled={!query.trim()}
        onMouseEnter={() => setHoveredEngine(engine.name)}
        onMouseLeave={() => setHoveredEngine(null)}
        className="group relative overflow-hidden rounded-xl backdrop-blur-md transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: isHovered
            ? `rgba(${hexToRgb(engine.brightColor)}, 0.25)`
            : `rgba(${hexToRgb(engine.baseColor)}, 0.15)`,
          border: `1.5px solid ${isHovered ? engine.brightColor : engine.baseColor}`,
          boxShadow: isHovered
            ? `0 0 12px ${engine.brightColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col items-center justify-center px-3 py-5 sm:px-4 sm:py-6">
          <div
            className="text-3xl font-bold transition-all duration-300"
            style={{
              color: isHovered ? engine.brightColor : engine.baseColor,
              textShadow: isHovered
                ? `0 0 8px ${engine.brightColor}60`
                : "none",
            }}
          >
            {engine.icon}
          </div>
          <p
            className="mt-2 text-xs font-medium transition-all duration-300"
            style={{
              color: isHovered ? engine.brightColor : engine.baseColor,
            }}
          >
            {engine.label}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="mt-12">
      {/* Web Search Section */}
      <div className="space-y-4">
        <SectionHeader 
          icon="🔍" 
          title="Web Search" 
          gradient="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        />
        <div className="grid grid-cols-4 gap-3">
          {searchEngines.map((engine) => (
            <EngineButton key={engine.name} engine={engine} />
          ))}
        </div>
      </div>

      {/* Visual Separator */}
      <div className="my-8 flex items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground-muted/20 to-transparent" />
        <span className="text-xs text-foreground-muted/40 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground-muted/20 to-transparent" />
      </div>

      {/* Image Search Section */}
      <div className="space-y-4">
        <SectionHeader 
          icon="🖼️" 
          title="Image Search" 
          gradient="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
        />
        <div className="grid grid-cols-4 gap-3">
          {imageEngines.map((engine) => (
            <EngineButton key={engine.name} engine={engine} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to convert hex to RGB for rgba
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 0, 0";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
