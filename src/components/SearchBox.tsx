"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

type SearchBoxProps = {
  onQueryChange?: (query: string) => void;
};

export function SearchBox({ onQueryChange }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onQueryChangeRef = useRef(onQueryChange);

  // Keep ref in sync with prop
  useEffect(() => {
    onQueryChangeRef.current = onQueryChange;
  }, [onQueryChange]);

  // Initialize from sessionStorage on first mount (using useLayoutEffect to run before paint)
  useLayoutEffect(() => {
    // Try to restore from sessionStorage first (consistent across all redirects)
    const savedQuery = sessionStorage.getItem("searchQuery");
    if (savedQuery && inputRef.current) {
      inputRef.current.value = savedQuery;
      // Sync to state
      setQuery(savedQuery);
      onQueryChangeRef.current?.(savedQuery);
      inputRef.current.focus();
      return;
    }
    // Then check if browser restored a value (bfcache/autocomplete)
    if (inputRef.current?.value) {
      const restoredValue = inputRef.current.value;
      setQuery(restoredValue);
      onQueryChangeRef.current?.(restoredValue);
    }
    
    inputRef.current?.focus();
  }, []);

  // Listen for popstate (back/forward navigation)
  useEffect(() => {
    const handlePopstate = () => {
      const savedQuery = sessionStorage.getItem("searchQuery");
      if (savedQuery && inputRef.current) {
        inputRef.current.value = savedQuery;
        setQuery(savedQuery);
        onQueryChangeRef.current?.(savedQuery);
      } else if (inputRef.current?.value) {
        const restoredValue = inputRef.current.value;
        setQuery(restoredValue);
        onQueryChangeRef.current?.(restoredValue);
      }
      inputRef.current?.focus();
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  // Global keyboard shortcut to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.length === 1 // Only focus on actual character keys
      ) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    onQueryChangeRef.current?.(value);
    // Persist to sessionStorage for consistent behavior across all redirects
    if (value.trim()) {
      sessionStorage.setItem("searchQuery", value);
    } else {
      sessionStorage.removeItem("searchQuery");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      // Save before redirect to ensure consistency across all engines
      sessionStorage.setItem("searchQuery", query);
      // Default to DuckDuckGo
      window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center gap-3 rounded-full border border-border bg-surface-light/50 px-6 py-4 transition-all duration-700 backdrop-blur-md focus-within:animate-search-glow focus-within:[will-change:transform,border-color,box-shadow]"
        style={{
          background: "rgba(37, 45, 61, 0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search the web..."
          autoFocus
          className="flex-1 bg-transparent text-foreground placeholder-foreground-muted outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center rounded-full p-2 transition hover:bg-surface/30"
        >
          <svg
            className="h-5 w-5 text-foreground-muted transition hover:text-neon-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
