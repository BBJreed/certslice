import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) stripe = new Stripe(key);
  return stripe;
}

export async function ensurePrices(client: Stripe) {
  const fromEnvMonthly = process.env.STRIPE_PRICE_MONTHLY;
  const fromEnvLifetime = process.env.STRIPE_PRICE_LIFETIME;
  if (fromEnvMonthly && fromEnvLifetime) {
    return { monthly: fromEnvMonthly, lifetime: fromEnvLifetime };
  }

  const listed = await client.prices.list({
    lookup_keys: ["certslice_monthly", "certslice_lifetime"],
    active: true,
  });
  const monthlyExisting = listed.data.find((p) => p.lookup_key === "certslice_monthly");
  const lifetimeExisting = listed.data.find((p) => p.lookup_key === "certslice_lifetime");
  if (monthlyExisting && lifetimeExisting) {
    return { monthly: monthlyExisting.id, lifetime: lifetimeExisting.id };
  }

  throw new Error("Stripe prices certslice_monthly / certslice_lifetime are missing.");
}
