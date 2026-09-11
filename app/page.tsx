import Link from "next/link";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";
import { PRICING, SITE } from "@/lib/config";

const faqs = [
  {
    q: "Does my private key get uploaded?",
    a: "No. Decryption runs with node-forge in this tab. We never receive the PFX.",
  },
  {
    q: "Why not OpenSSL?",
    a: "OpenSSL works. The flags are easy to get wrong, and a lot of people paste the PFX into a random converter. This is the local version of that converter.",
  },
  {
    q: "What if decryption fails?",
    a: "Wrong password, or a legacy RC2/3DES PFX. Re-export the archive with AES-256 and retry. We cannot recover a lost passphrase.",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Client-side PKI
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-ink sm:text-7xl">
          {SITE.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          IIS and Azure still hand you a .pfx. Nginx wants PEM. Two free extracts a
          day, then ${PRICING.lifetimeUsd} once.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/pfx-to-pem"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
          >
            Convert PFX to PEM
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-card"
          >
            Pricing
          </Link>
        </div>
      </section>
      <CertWorkspace
        headline="Drop the PFX. Get cert.pem, private.key, and the chain."
        blurb="Works on .pfx and .p12. Preview the common name first. Download a ZIP of PEMs."
      />
      <Faq items={faqs} />
    </>
  );
}
