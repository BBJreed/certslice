import Link from "next/link";
import { SITE } from "@/lib/config";
import { readPlan } from "@/lib/session";

export default async function SuccessPage() {
  const plan = await readPlan();
  const unlocked = plan !== "free";

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-good">
        {unlocked ? "You're in" : "Almost"}
      </p>
      <h1 className="mt-3 font-serif text-5xl text-ink">
        {unlocked ? "Unlimited is on." : "Payment received — refresh if this lags."}
      </h1>
      <p className="mt-4 text-muted">
        {unlocked
          ? `${SITE.name} will not ask again on this browser until the plan ends.`
          : "If you just paid, wait a second and extract a PFX."}
      </p>
      <Link
        href="/pfx-to-pem"
        className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-card"
      >
        Convert PFX to PEM
      </Link>
    </div>
  );
}
