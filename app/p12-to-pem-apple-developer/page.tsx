import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { CertWorkspace } from "@/components/CertWorkspace";

export const metadata: Metadata = {
  title: "Apple Developer P12 to PEM",
  description:
    "Convert an Apple Developer .p12 to PEM and an unencrypted key in the browser. For CI secrets. No upload.",
  keywords: ["export p12 to pem apple certificates", "apple p12 to pem github actions"],
};

const faqs = [
  {
    q: "Why does CI want PEM?",
    a: "GitHub Actions, Fastlane, and Bitrise expect PEM plus an unencrypted key as secrets, not an interactive Keychain.",
  },
  {
    q: "Will modern macOS P12 files work?",
    a: "AES/PBKDF2 exports usually work in the browser. Very old 3DES bags may fail; the error will say so.",
  },
  {
    q: "Should I upload a distribution key to a converter site?",
    a: "No. This tab never receives it.",
  },
] as const;

export default function Page() {
  return (
    <>
      <CertWorkspace
        headline="Convert an Apple Developer P12 to PEM locally"
        blurb="Drop the .p12, enter the export password, download PEM + unencrypted key for CI. Signing keys stay on this machine."
      />
      <Faq items={faqs} />
    </>
  );
}
