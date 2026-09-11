import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "PFX to PEM for AWS ACM",
  description:
    "Convert a PFX to PEM files for AWS Certificate Manager import. Leaf, unencrypted key, and chain. No upload.",
  keywords: ["convert pfx to pem for aws certificate manager", "acm import pfx"],
};

const faqs = [
  {
    q: "What does ACM import need?",
    a: "Certificate body (leaf), private key (unencrypted PEM), and certificate chain (intermediates). The ZIP labels those files.",
  },
  {
    q: "What causes “Could not validate the certificate chain”?",
    a: "Leaf duplicated in the chain, wrong order, or missing intermediates. Check chain-N.pem and fullchain.pem before import.",
  },
  {
    q: "Is the key encrypted?",
    a: "The download is unencrypted PEM. You still need the PFX password to open the archive.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Convert PFX to PEM for AWS ACM import"
        blurb="Extract the leaf, unencrypted key, and chain in this tab. Import the three pieces in ACM. The PFX never hits our servers."
      />
      <Faq items={faqs} />
    </>
  );
}
