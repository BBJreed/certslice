import forge from "node-forge";
import { zipStore } from "./zip";

export type CertPreview = {
  commonName: string;
  issuer: string;
  notBefore: string;
  notAfter: string;
  serial: string;
};

export type ExtractResult = {
  zip: Uint8Array;
  filename: string;
  preview: CertPreview[];
  files: string[];
};

function uint8ToBinary(bytes: Uint8Array) {
  let out = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    out += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return out;
}

function attr(cert: forge.pki.Certificate, oid: string) {
  const found = cert.subject.getField(oid) || cert.subject.getField({ name: oid });
  return found?.value || "";
}

function previewOf(cert: forge.pki.Certificate): CertPreview {
  return {
    commonName: attr(cert, "CN") || "unknown",
    issuer: cert.issuer.getField("CN")?.value || "unknown",
    notBefore: cert.validity.notBefore.toISOString().slice(0, 10),
    notAfter: cert.validity.notAfter.toISOString().slice(0, 10),
    serial: cert.serialNumber,
  };
}

export async function extractPfx(file: File, password: string): Promise<ExtractResult> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.byteLength < 32) throw new Error("That file is empty or not a PFX.");

  let p12: forge.pkcs12.Pkcs12Pfx;
  try {
    const asn1 = forge.asn1.fromDer(uint8ToBinary(bytes));
    p12 = forge.pkcs12.pkcs12FromAsn1(asn1, false, password);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (/mac|password|invalid/i.test(message)) {
      throw new Error(
        "Decryption failed. Wrong passphrase, or this PFX uses legacy RC2/3DES that the browser cannot open. Re-export it with AES-256.",
      );
    }
    throw new Error("Could not parse this PFX/P12. It may be corrupt.");
  }

  const certs: forge.pki.Certificate[] = [];
  const certBags =
    p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag] || [];
  for (const bag of certBags) {
    if (bag.cert) certs.push(bag.cert);
  }

  const keys: forge.pki.PrivateKey[] = [];
  const shrouded =
    p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
      forge.pki.oids.pkcs8ShroudedKeyBag
    ] || [];
  const plain = p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag] || [];
  for (const bag of [...shrouded, ...plain]) {
    if (bag.key) keys.push(bag.key);
  }

  if (!certs.length && !keys.length) {
    throw new Error("No certificate or private key was inside that archive.");
  }

  const parts: { name: string; data: Uint8Array }[] = [];
  const encoder = new TextEncoder();
  const names: string[] = [];

  certs.forEach((cert, i) => {
    const pem = forge.pki.certificateToPem(cert);
    const name = i === 0 ? "cert.pem" : `chain-${i}.pem`;
    names.push(name);
    parts.push({ name, data: encoder.encode(pem) });
  });

  keys.forEach((key, i) => {
    const pem = forge.pki.privateKeyToPem(key);
    const name = i === 0 ? "private.key" : `private-${i + 1}.key`;
    names.push(name);
    parts.push({ name, data: encoder.encode(pem) });
  });

  const allCerts = encoder.encode(certs.map((c) => forge.pki.certificateToPem(c)).join(""));
  if (certs.length > 1) {
    names.push("fullchain.pem");
    parts.push({ name: "fullchain.pem", data: allCerts });
  }

  const base = file.name.replace(/\.[^.]+$/, "") || "certificate";
  return {
    zip: zipStore(parts),
    filename: `${base}-pem.zip`,
    preview: certs.map(previewOf),
    files: names,
  };
}

export function downloadZip(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
