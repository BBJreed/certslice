import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "P12 to PEM in the browser",
  description:
    "Convert a .p12 PKCS#12 archive to PEM files locally. No upload. No OpenSSL flags.",
  keywords: ["p12 to pem", "convert p12 to pem browser client side"],
};

const faqs = [
  {
    q: "Is P12 the same as PFX?",
    a: "Same PKCS#12 container, different filename. This tool accepts both.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Convert P12 to PEM without uploading"
        blurb="Drop a .p12, enter the passphrase, download PEM files for Nginx, Apache, or Traefik."
      />
      <Faq items={faqs} />
    </>
  );
}
