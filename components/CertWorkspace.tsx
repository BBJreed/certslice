"use client";

import { useState } from "react";
import { FREE_FILE_BYTES, PRO_FILE_BYTES } from "@/lib/config";
import { downloadZip, extractPfx, type CertPreview } from "@/lib/cert";
import { formatBytes } from "@/lib/usage";
import { PaywallModal } from "./PaywallModal";
import { useUsage } from "./UsageProvider";

export function CertWorkspace({
  headline,
  blurb,
}: {
  headline: string;
  blurb: string;
}) {
  const { plan, remaining, allowed, recordUse } = useUsage();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CertPreview[]>([]);
  const [zip, setZip] = useState<{ bytes: Uint8Array; name: string; files: string[] } | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [drag, setDrag] = useState(false);
  const maxBytes = plan === "free" ? FREE_FILE_BYTES : PRO_FILE_BYTES;

  async function run() {
    if (!file) return;
    if (!allowed) {
      setPaywall(true);
      return;
    }
    setStatus("working");
    setError(null);
    try {
      const out = await extractPfx(file, password);
      recordUse();
      setPreview(out.preview);
      setZip({ bytes: out.zip, name: out.filename, files: out.files });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not open that PFX.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        pfx to pem
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        {headline}
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">{blurb}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const next = e.dataTransfer.files[0];
          if (next) setFile(next);
        }}
        className={`mt-8 rounded-3xl border-2 border-dashed px-6 py-12 text-center ${
          drag ? "border-accent bg-accent/5" : "border-line bg-card"
        }`}
      >
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pfx,.p12,application/x-pkcs12"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <p className="text-lg font-medium text-ink">
            {file ? file.name : "Drop a .pfx or .p12 here"}
          </p>
          <p className="mt-2 text-sm text-muted">
            {file
              ? formatBytes(file.size)
              : `The private key never leaves this tab. ${plan === "free" ? `${remaining} free left today.` : "Unlimited."}`}
          </p>
        </label>
      </div>

      {file && file.size > maxBytes ? (
        <p className="mt-4 text-sm text-accent">
          File is over {formatBytes(maxBytes)}. Unlock for larger archives.
        </p>
      ) : null}

      <label className="mt-6 block text-sm font-medium text-ink">
        Export passphrase
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2 text-sm"
          placeholder="Leave blank if the PFX has no password"
        />
      </label>

      <button
        type="button"
        onClick={run}
        disabled={!file || status === "working" || (!!file && file.size > maxBytes)}
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {status === "working" ? "Decrypting…" : "Extract PEM"}
      </button>

      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}

      {preview.length ? (
        <div className="mt-8 space-y-3">
          {preview.map((cert) => (
            <div key={cert.serial} className="rounded-2xl bg-card p-4 text-sm ring-1 ring-line">
              <p className="font-medium text-ink">{cert.commonName}</p>
              <p className="mt-1 text-muted">
                Issuer {cert.issuer} · {cert.notBefore} → {cert.notAfter}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {zip && status === "done" ? (
        <div className="mt-6 rounded-3xl bg-good/10 p-5 ring-1 ring-good/20">
          <p className="font-medium text-ink">Ready — {zip.name}</p>
          <p className="mt-1 text-sm text-muted">{zip.files.join(", ")}</p>
          <button
            type="button"
            onClick={() => downloadZip(zip.bytes, zip.name)}
            className="mt-4 rounded-full bg-good px-5 py-2.5 text-sm font-semibold text-white"
          >
            Download ZIP
          </button>
        </div>
      ) : null}

      <PaywallModal open={paywall} onClose={() => setPaywall(false)} />
    </div>
  );
}
