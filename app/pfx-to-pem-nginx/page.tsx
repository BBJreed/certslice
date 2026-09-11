import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "PFX to Nginx PEM in the browser",
  description:
    "Split a PFX into cert.pem, private.key, and fullchain.pem for Nginx. Runs locally. The key is not uploaded.",
  keywords: ["convert pfx to nginx cert and key", "pfx to pem nginx"],
};

const faqs = [
  {
    q: "What does Nginx want?",
    a: "ssl_certificate should be the leaf plus intermediates (fullchain.pem). ssl_certificate_key should be an unencrypted private.key.",
  },
  {
    q: "Why do online converters break Nginx?",
    a: "Wrong chain order, leftover passphrase, or Microsoft bag attributes. This export is PEM without a key password.",
  },
  {
    q: "Does the key leave this computer?",
    a: "No. Decrypt happens in the tab.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Split a PFX into Nginx cert.pem and private.key"
        blurb="Drop the IIS/Azure PFX, enter the export password, download the ZIP. Point ssl_certificate at fullchain.pem and ssl_certificate_key at private.key."
      />
      <pre className="mx-auto max-w-3xl overflow-x-auto px-4 pb-4 text-xs leading-6 text-muted">
{`ssl_certificate     /etc/nginx/ssl/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/private.key;`}
      </pre>
      <Faq items={faqs} />
    </>
  );
}
