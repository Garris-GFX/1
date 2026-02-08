import IndexPage from "@/components/layout/IndexPage";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function RefundsPage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage title="Refunds" excerpt="Refund and cancellation policy for services." lastUpdated={lastUpdated} backHref="/" backLabel="Home" rootLabel="Legal">
      <h2>Refunds & cancellations</h2>

      <p>
        Refunds provided by Garris Graphics LLC depend on the service type and the terms set
        in your service agreement. Below are the standard policies; specific agreements may
        modify these terms.
      </p>

      <h2>Effective date</h2>
      <p>March 30, 2025</p>

      <h2>1. Setup Fee & Subscription Fees</h2>
      <p>
        The one-time setup fee paid for our website design services is non-refundable except
        under the conditions outlined below. Monthly subscription fees for hosting,
        maintenance, and support are non-refundable once billed.
      </p>

      <h2>2. 7-Day Delivery Guarantee & Revisions</h2>
      <p>
        We guarantee delivery of a fully completed website within 7 calendar days from your
        confirmed project start date — provided all required content is submitted on time
        and feedback is provided within 12 hours.
      </p>
      <p>
        This means your website will be fully built, functional, and ready for your review
        within the guaranteed 7-day window.
      </p>

      <h3>Revision policy</h3>
      <p>
        If you request revisions after the 7-day delivery, we will make the necessary
        changes to ensure you’re satisfied. Revision rounds may take additional time beyond
        the initial 7-day window. Once you approve the final version of your website, the
        project is considered complete.
      </p>
      <p>
        After final approval: minor updates (photo swaps or text changes) are included if
        you’re on an active monthly subscription plan. Major redesigns or substantial
        changes require a separate quote.
      </p>

      <h2>3. How to request a refund</h2>
      <p>
        If you believe you qualify for a refund under our 7-Day Delivery Guarantee, you must
        submit your request in writing to <a href="mailto:noah@garris.graphics">noah@garris.graphics</a> within 24
        hours of the missed delivery deadline. Refund requests submitted outside this
        timeframe will not be accepted.
      </p>

      <h2>4. Non-refundable circumstances</h2>
      <p>
        Refunds will not be provided in the following situations:
      </p>
      <ul>
        <li>Delays caused by the Client (late content submission, failure to respond within 12 hours).</li>
        <li>Client requests to pause or extend the timeline.</li>
        <li>Client dissatisfaction with scope after on-time delivery.</li>
        <li>Subscription fees already billed (these cover services already rendered).</li>
      </ul>

      <h2>5. Subscription cancellation</h2>
      <p>
        You may cancel your monthly subscription at any time with seven (7) days’ notice
        before your next billing cycle. See our Subscription & Hosting policy for details.
      </p>
      <p>
        Upon cancellation you may choose to:
      </p>
      <ul>
        <li>
          Keep Your Website & Transfer It — we will provide a free self‑transfer backup or
          export to help you move the website to a new hosting provider. You are
          responsible for provisioning new hosting and managing your domain.
        </li>
        <li>
          Let Your Website Expire — if you choose not to transfer, your website will be
          removed from our servers at the end of your billing period.
        </li>
      </ul>
      <p>
        Garris Graphics LLC generally does not issue refunds for subscription payments once
        they have been processed, except as expressly provided in the Refunds policy or as
        required by applicable law.
      </p>

      <h2>Contact</h2>
      <p>
        For any refund-related questions, please contact us at <a href="mailto:noah@garris.graphics">noah@garris.graphics</a>.
      </p>

      <h2>Original policies preserved</h2>
      <p>
        The standard deposit, design-service refund window, and hosting refund guidance
        outlined elsewhere on this site remain in effect; specific agreements may override
        these general policies.
      </p>
    </IndexPage>
  );
}
