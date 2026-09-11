export const SITE = {
  name: "CertSlice",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  tagline: "Split a PFX without uploading your private key.",
  description:
    "Extract .crt, .key, and CA chain from a .pfx or .p12 in your browser. The key never leaves this tab.",
};

export const PRICING = {
  freePerDay: 2,
  monthlyUsd: 12,
  lifetimeUsd: 39,
} as const;

export const FREE_FILE_BYTES = 5 * 1024 * 1024;
export const PRO_FILE_BYTES = 20 * 1024 * 1024;
