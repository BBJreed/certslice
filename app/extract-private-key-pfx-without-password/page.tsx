import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "Extract an unencrypted private key from a PFX",
  description:
    "Open a PFX with its export password and download an unencrypted PEM key so Nginx will not prompt on restart. Not a password cracker. No upload.",
  keywords: [
    "extract private key from pfx without password prompt",
    "unencrypted pem key from pfx",
  ],
};

const faqs = [
  {
    q: "Can you open a PFX if I lost the password?",
    a: "No. You must know the export password. This page only writes an unencrypted key after a successful decrypt so daemons do not hang on “PEM pass phrase”.",
  },
  {
    q: "Why does Nginx ask for a passphrase?",
    a: "The key is still encrypted. This export strips that so unattended restart works. Protect the file on disk.",
  },
  {
    q: "What about Microsoft bag attributes?",
    a: "PEM output from this tool is standard PKCS#8/RSA PEM, not a Windows dump with friendlyName headers.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Get an unencrypted private.key from a PFX"
        blurb="Enter the PFX password you already have. We decrypt locally and write a key Nginx can load without a prompt. We cannot recover a forgotten password."
      />
      <Faq items={faqs} />
    </>
  );
}
