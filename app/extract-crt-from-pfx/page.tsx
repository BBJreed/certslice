import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "Extract CRT from PFX without OpenSSL",
  description:
    "Extract the leaf certificate and private key from a PFX in your browser. No OpenSSL, no upload.",
  keywords: [
    "extract crt from pfx without openssl",
    "separate certificate and private key from pfx",
  ],
};

const faqs = [
  {
    q: "What files come out?",
    a: "cert.pem (leaf), chain-N.pem if intermediates exist, fullchain.pem, and private.key.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Extract CRT and key from a PFX"
        blurb="No OpenSSL -nodes -clcerts dance. Local decrypt, ZIP of PEMs."
      />
      <Faq items={faqs} />
    </>
  );
}
