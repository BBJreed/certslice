"use client";

import Link from "next/link";
import { useState } from "react";
import { PRICING, SITE } from "@/lib/config";
import { useUsage } from "./UsageProvider";

const LINKS = [
  { href: "/pfx-to-pem", label: "PFX to PEM" },
  { href: "/p12-to-pem", label: "P12 to PEM" },
  { href: "/extract-crt-from-pfx", label: "Extract CRT" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const { plan, remaining, ready } = useUsage();
  const [open, setOpen] = useState(false);
  const unlimited = plan !== "free";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-card">
            C
          </span>
          {SITE.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink/80 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {ready ? (
            <span className="hidden text-xs text-muted sm:inline">
              {unlimited ? "Unlimited" : `${remaining} free left today`}
            </span>
          ) : null}
          {!unlimited ? (
            <Link
              href="/pricing"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-card"
            >
              Unlock ${PRICING.lifetimeUsd}
            </Link>
          ) : null}
          <button type="button" className="md:hidden" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-card px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block py-2 text-sm" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
