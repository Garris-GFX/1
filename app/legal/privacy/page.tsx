/* eslint-disable react/no-unescaped-entities */
import IndexPage from "@/components/layout/IndexPage";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function PrivacyPage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage
      title="Privacy policy"
      excerpt="How Garris Graphics LLC collects, uses, and protects personal information"
      lastUpdated={lastUpdated}
      backHref="/"
      backLabel="Home"
      rootLabel="Legal"
    >
      <h2>Introduction</h2>

      <p>
        Garris Graphics LLC ("we", "us", "our") is committed to protecting the privacy of
        visitors to this website. This Privacy Policy explains what information we collect,
        why we collect it, how we use it, and your rights with respect to your information.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact information you provide when you use the contact form (name, email, message).</li>
        <li>Technical data collected automatically (IP address, browser type, device information, and pages visited) for analytics and to improve the site.</li>
        <li>Any information you choose to submit as part of a project inquiry or file upload.</li>
      </ul>

      <h2>Analytics and newsletter</h2>
      <p>
        We use Google Analytics to understand site usage and performance. If you sign up for our
        newsletter or submit the contact form we collect the information you provide (email,
        name, message) to send communications and respond to inquiries. You may unsubscribe from
        marketing emails at any time using the link in the message or by contacting us.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use personal data to respond to inquiries, provide requested services, process payments,
        and to analyze and improve our website and services. We do not sell your personal data.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        We use cookies and similar technologies (such as analytics) to understand site usage and
        to improve the user experience. You can manage cookie preferences in your browser; note
        that disabling certain cookies may affect site functionality.
      </p>

      <h2>Third-party services</h2>
      <p>
        We may use third-party providers (for analytics, hosting, payment processing, etc.) that
        process personal data on our behalf. These providers have their own privacy practices.
      </p>

      <h2>Data retention and security</h2>
      <p>
        We retain personal data only as long as necessary to fulfill the purposes described in
        this policy or as required by law. We implement reasonable administrative, technical,
        and physical safeguards to protect personal information.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your jurisdiction you may have rights to access, correct, or delete your
        personal data, and to restrict or object to certain processing. To exercise these rights,
        contact us using the link below.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or to exercise your rights, contact us at <a href="mailto:noah@garris.graphics">noah@garris.graphics</a>
        or by mail at 314 McClure Circle, Castle Hayne, NC.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date of the latest revision will appear
        on this page.
      </p>
      <h2>Email storage and retention</h2>
      <p>
        If you use email services provided by or administered through Garris Graphics LLC,
        we retain email content according to the storage and retention settings of the
        chosen plan or third‑party provider. Short‑term backups or delivery logs may be
        retained for operational or security purposes. If longer retention is required for
        legal or business reasons, please request this in writing so it can be included in
        your service agreement. Note that professional email services (Google Workspace,
        Microsoft 365, Fastmail, etc.) have their own retention and privacy controls.
      </p>
    </IndexPage>
  );
}
