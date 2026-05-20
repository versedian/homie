"use client";

import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { SpeedDial } from "@/components/SpeedDial";
import { GlitchTitle } from "@/components/GlitchTitle";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section - Pure search focus */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 sm:py-32">
        <div className="w-full max-w-3xl">
          {/* Logo/Branding */}
          <div className="mb-16 text-center">
            <GlitchTitle text="homie" />
          </div>

          {/* Search Box */}
          <SearchBox onQueryChange={setQuery} />

          {/* Speed Dial */}
          <SpeedDial query={query} />
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-border/30 bg-background px-4 py-4 text-center text-xs text-foreground-muted/70">
        <p>minimal · private · fast</p>
      </footer>
    </main>
  );
}
