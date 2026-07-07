import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMPORARY: lets the dev server's JS bundle load when the site is opened
  // from a phone on the LAN instead of localhost — Next blocks cross-origin
  // _next/static requests by default, which otherwise 403s main-app.js and
  // silently prevents React from ever hydrating (looks like "nothing
  // responds to touch" but isn't touch-specific at all, and looks like a
  // fresh regression whenever this machine's DHCP-assigned LAN IP changes,
  // since that changes which origin needs to be allowlisted). Remove once
  // on-device testing over LAN is no longer needed.
  allowedDevOrigins: ["192.168.0.3", "192.168.0.4"],
};

export default nextConfig;
