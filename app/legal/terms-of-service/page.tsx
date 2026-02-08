/* eslint-disable react/no-unescaped-entities */
import IndexPage from "@/components/layout/IndexPage";
import Link from "next/link";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function TermsPage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage
      title="Terms of Service"
      excerpt="Terms governing use of Garris Graphics LLC's website and services"
      lastUpdated={lastUpdated}
      backHref="/"
      backLabel="Home"
      rootLabel="Legal"
    >
      <h2>Overview</h2>
      <p>
        These Terms of Service ("Terms") govern your use of the Garris Graphics LLC website
        and any services offered through the site. By accessing or using the site, you agree to
        be bound by these Terms.
      </p>

      <h2>Services and proposals</h2>
      <p>
        Any services, quotes, or proposals provided by Garris Graphics LLC are subject to
        separate agreements. Proposals remain valid for the period stated and may require a
        deposit before work commences.
      </p>

      <h2>Payments and refunds</h2>
      <p>
        Payment terms are set out in the applicable service agreement or invoice. Deposits
        for design and website projects are determined in the service agreement; hosting
        services do not require a deposit. Refunds are governed by our Refunds policy,
        and, where applicable, the service agreement. Design service refunds are available
        up to 14 days after completion as provided in the Refunds policy. Hosting refunds
        or credits may be issued in accordance with the Subscription & Hosting policy.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless otherwise agreed in writing, Garris Graphics LLC retains ownership of its
        pre-existing intellectual property, while deliverables are licensed to clients as
        specified in the project agreement.
      </p>

      <h2>Client responsibilities</h2>
      <p>
        Clients must provide timely feedback, approvals, and any required materials. Delays
        caused by client inaction may result in schedule changes or additional fees.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Garris Graphics LLC's liability for any claim
        arising out of or relating to these Terms or services is limited to direct damages up
        to the amount paid for the services giving rise to the claim. We are not liable for
        indirect, incidental, or consequential damages.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of North Carolina, United States,
        without regard to conflict of law principles. Any disputes will be resolved in the
        state or federal courts located in North Carolina unless otherwise agreed in writing.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? <Link href="/contact">Contact us</Link>.
      </p>
      <h2>Billing & Payment</h2>
      <p>
        Payment terms are set out in the applicable service agreement or invoice. All fees
        are due in advance of the applicable term. Garris Graphics LLC accepts common
        payment methods as described on invoices. You are responsible for ensuring that
        the payment method on file is up-to-date. If payment cannot be collected, we may
        attempt to collect payment from an alternate payment method on file.
      </p>

      <h2>Auto‑renewal</h2>
      <p>
        Unless otherwise noted, recurring services (such as hosting or maintenance plans)
        will automatically renew for the same term as the most recent period (monthly,
        annual, etc.) until cancelled. To avoid automatic renewal, cancel the service in
        advance of the renewal date per the instructions on your invoice or in your
        service agreement.
      </p>

      <h2>Credits, refunds & chargebacks</h2>
      <p>
        Setup fees, domain registration and renewal fees, certain add‑on fees and other
        administrative fees are generally non‑refundable. Refunds for services may be
        available as described in our Refunds policy and the applicable agreement. Garris
        Graphics LLC may, in its discretion, issue refunds as in‑store credit, via the
        original payment method, or by other means. If a payment is retracted (chargeback),
        a chargeback fee of $25 may be assessed to the account to cover administration and
        processing costs.
      </p>

      <h2>Notices and communications</h2>
      <p>
        You consent to receive electronic communications from us (email) concerning your
        account and the Services. We may also post certain notices on the Website. It is
        your responsibility to keep contact information current so that we can reach you
        about billing, security, or other important account matters.
      </p>

      <h2>How to contact us</h2>
      <p>
        For billing, abuse, DMCA, or other legal notices, please contact us at:
      </p>
      <ul>
        <li>Email: <a href="mailto:noah@garris.graphics">noah@garris.graphics</a></li>
        <li>Mail: Garris Graphics LLC, Attention: Legal / Billing, 314 McClure Circle, Castle Hayne, NC</li>
      </ul>
      <p>
        To withdraw consent for marketing emails, use the unsubscribe link in messages or contact the email above.
      </p>

      <h2>Domain registrations & transfers</h2>
      <p>
        If we provide domain registration or transfer services, those registrations are
        subject to the registrar's terms and ICANN rules. Domain registration and renewal
        fees are typically non‑refundable. Transfer processes and timing vary by registrar
        and TLD; you are responsible for providing accurate registrant information.
      </p>

      <h2>Premium services</h2>
      <p>
        Premium or one‑time services (migrations, emergency restores, expedited work) are
        described in the applicable statement of work and may be non‑refundable once
        initiated. Any deliverables and exclusions will be described in the associated
        work order.
      </p>

      <h2>Termination, suspension, and effects of closure</h2>
      <p>
        We reserve the right to suspend or terminate accounts or Services for violations of
        these Terms, nonpayment, abuse, or other reasons set forth in our policies. Upon
        suspension or termination you may lose access to content and Services; you are
        responsible for keeping backups of your content. Certain obligations and
        limitations may survive termination as set out in these Terms.
      </p>

      <h2>Cancellation policy</h2>
      <p>
        You may cancel subscription services (such as hosting or maintenance plans) by
        providing at least seven (7) days' notice prior to the next billing cycle. To
        cancel, notify us by email at <a href="mailto:noah@garris.graphics">noah@garris.graphics</a> or via
        your account portal where available.
      </p>
      <p>
        Upon cancellation you may choose to keep your website and self‑transfer it using a
        backup/export we provide, or allow the site to expire and be removed from our
        servers at the end of the billing period. Subscription payments are generally not
        refundable once processed, except as provided in the Refunds policy or required by
        law.
      </p>

      <h2>Disclaimer of warranties & limitation of liability</h2>
      <p>
        Services are provided "as is" and "as available". To the fullest extent permitted
        by law, Garris Graphics LLC disclaims all warranties, express or implied,
        including warranties of merchantability and fitness for a particular purpose. Our
        liability for claims arising from or related to the Services is limited to direct
        damages up to the amount paid for the services giving rise to the claim, and we are
        not liable for indirect, incidental, or consequential damages.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold Garris Graphics LLC and its affiliates harmless
        from any claims, damages, losses, liabilities, costs and expenses (including
        reasonable attorneys' fees) arising from your use of the Services, your violation
        of these Terms, or your infringement of any third‑party rights.
      </p>

      <h2>Force majeure</h2>
      <p>
        Garris Graphics LLC will not be liable for failures or delays caused by circumstances
        beyond our reasonable control, including natural disasters, acts of government,
        third‑party outages, and other force majeure events.
      </p>

      <h2>Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of the State of North Carolina, without regard
        to conflict of laws principles. Disputes will be resolved in state or federal
        courts located in North Carolina unless otherwise agreed in writing.
      </p>

      {/* Disclaimer, Acceptable Use, and Cookies moved to their own pages under /legal */}
    </IndexPage>
  );
}
