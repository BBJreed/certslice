import Link from "next/link";
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
            PFX and P12 extraction in the browser. Your private key never hits our servers
            because we do not have a place to put it.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Tools</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/pfx-to-pem">PFX to PEM</Link>
            </li>
            <li>
              <Link href="/p12-to-pem">P12 to PEM</Link>
            </li>
            <li>
              <Link href="/extract-crt-from-pfx">Extract CRT from PFX</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name}. Keys stay on your device.
      </div>
    </footer>
  );
}
