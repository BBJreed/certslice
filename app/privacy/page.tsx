import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${SITE.name} decrypts PFX files in your browser. Private keys are not uploaded.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-serif text-5xl text-ink">Privacy</h1>
      <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
        <p>
          {SITE.name} extracts certificates and keys in your browser with
          node-forge. The PFX is not uploaded. We cannot see the private key.
        </p>
        <p>
          After Stripe Checkout we set a signed cookie so this browser knows you
          paid. Stripe processes the card.
        </p>
        <p>
          Free uses are counted in localStorage. Clearing site data resets the
          counter; paid access lives in the cookie.
        </p>
      </div>
    </article>
  );
}
