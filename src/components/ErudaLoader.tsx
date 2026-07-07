"use client";

import { useEffect, useState } from "react";

// TEMPORARY: on-device mobile debugging via Eruda. Remove before real deployment.
// Activate by visiting the site with ?debug=true in the URL.
export default function ErudaLoader() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const search = window.location.search;
    console.log("[ErudaLoader] mounted, location.search =", search);

    if (!search.includes("debug=true")) {
      console.log("[ErudaLoader] debug=true not present, skipping");
      return;
    }

    setStatus("debug=true detected, loading eruda…");

    if ((window as unknown as { eruda?: unknown }).eruda) {
      console.log("[ErudaLoader] eruda already loaded, skipping");
      setStatus("eruda already loaded");
      return;
    }

    console.log("[ErudaLoader] injecting eruda script");
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      console.log("[ErudaLoader] script loaded, calling eruda.init()");
      (window as unknown as { eruda: { init: () => void } }).eruda.init();
      setStatus("eruda loaded ✓");
    };
    script.onerror = (err) => {
      console.error("[ErudaLoader] script failed to load", err);
      setStatus("eruda script FAILED to load (network/CDN blocked?)");
    };
    document.body.appendChild(script);
  }, []);

  if (!status) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        left: 8,
        zIndex: 999999,
        background: "black",
        color: "lime",
        fontSize: 11,
        fontFamily: "monospace",
        padding: "4px 8px",
        borderRadius: 4,
        opacity: 0.85,
      }}
    >
      {status}
    </div>
  );
}
