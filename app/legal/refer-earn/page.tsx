/* eslint-disable react/no-unescaped-entities */
import IndexPage from "@/components/layout/IndexPage";
import Link from "next/link";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function ReferEarnPage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage title="Refer & Earn" excerpt="Referral program details and rewards." lastUpdated={lastUpdated} backHref="/" backLabel="Home" rootLabel="Legal">
      <h2>Refer &amp; Earn</h2>

      <p>
        Refer a new client to Garris Graphics LLC and earn a discount on hosting for the
        current billing cycle. For each referred client who signs up for website or design
        services, the referrer will receive 10% off their hosting costs for the current
        billing cycle. Referral discounts cannot be redeemed for cash and are subject to the
        terms below.
      </p>

      <h2>Eligibility</h2>
      <p>
        Referral discounts apply only to new clients who have not previously engaged Garris
        Graphics LLC. The referring party must provide accurate referral contact information
        before the referral is accepted and credited.
      </p>

      <h2>Redemption</h2>
      <p>
        Discounts are applied after the referred client signs a paid service agreement for
        website or design services and any required deposit is received. Discounts apply to
        the referrer's hosting invoice for the current billing cycle and may be limited or
        adjusted at Garris Graphics LLC's discretion.
      </p>

      <p className="mt-4">To refer someone, <Link href="/contact">get in touch</Link> and include referral details.</p>
    </IndexPage>
  );
}
