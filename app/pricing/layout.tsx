import type { Metadata } from "next";
import { PRICING } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Two free PFX extracts a day. Unlimited for $${PRICING.monthlyUsd}/mo or $${PRICING.lifetimeUsd} lifetime. Keys never leave the browser.`,
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
