import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "PFX to PEM online, no upload",
  description:
    "Convert a PFX to PEM in your browser. Extract the certificate, private key, and chain without sending the file to a server.",
  keywords: ["pfx to pem", "pfx to pem private key online", "convert pfx to pem browser"],
};

const faqs = [
  {
    q: "How do I convert PFX to PEM without OpenSSL?",
    a: "Drop the .pfx here, enter the export password, and download the ZIP. Extraction is local.",
  },
  {
    q: "Is the private key sent to your server?",
    a: "No.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Convert PFX to PEM in the browser"
        blurb="Split an IIS or Azure .pfx into cert.pem, private.key, and fullchain.pem. The key never leaves this tab."
      />
      <Faq items={faqs} />
    </>
  );
}
