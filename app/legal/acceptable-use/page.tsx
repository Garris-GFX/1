/* eslint-disable react/no-unescaped-entities */
import IndexPage from "@/components/layout/IndexPage";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function AcceptableUsePage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage title="Acceptable Use Policy" excerpt="Rules governing acceptable use of Garris Graphics LLC services and site." lastUpdated={lastUpdated} backHref="/" backLabel="Home" rootLabel="Legal">
      <h2>Acceptable Use Policy</h2>

      <p>This Acceptable Use Policy sets expectations for lawful and respectful use of our services and website.</p>

      <h2>Prohibited conduct</h2>
      <p>
        Users must not use the Service for illegal activity, harassment, distribution of
        malware, or to interfere with the Service or other customers. Examples of prohibited
        uses include (without limitation):
      </p>
      <ul>
        <li>Content that promotes or facilitates illegal activity, violence, harassment, hate, or discrimination.</li>
        <li>Content that contains private or confidential information (credit card numbers, social security numbers, non-public personal data) without authorization.</li>
        <li>Child sexual abuse material, child erotica, or any content that harms or endangers minors.</li>
        <li>Pornographic, sexually explicit, or obscene material where prohibited by law or our service terms.</li>
        <li>Content intended to enable hacking, intrusion, or unauthorized access to systems.</li>
        <li>Open HTTP proxies, Tor relay services, or any anonymizing/proxy services intended to conceal malicious activity.</li>
        <li>Phishing pages, credential harvesting, or other attempts to fraudulently obtain credentials or financial data.</li>
        <li>Distribution of malware, viruses, trojans, worms, ransomware, or any code meant to damage or impair systems.</li>
        <li>Sites that facilitate piracy, warez, or unlawful sharing of copyrighted material.</li>
        <li>Unsolicited bulk email (spam) and abusive mailing practices; see below for limits and definitions.</li>
        <li>Any content that infringes the rights of third parties (copyright, trademark, privacy, publicity).</li>
        <li>Content that excessively consumes resources through abusive striping or duplicate services to avoid overage fees.</li>
      </ul>

      <h2>Passwords and account security</h2>
      <p>
        You are solely responsible for maintaining the confidentiality and security of
        passwords and access credentials for accounts and services provided by Garris
        Graphics LLC. Any activity that occurs under your account is presumed to be
        authorized by you. Use strong, unique passwords and update them periodically.
      </p>
      <p>
        If we detect insecure or compromised credentials, weak password usage, or repeated
        failed login attempts, we may require you to change your password, temporarily
        suspend access, or take other measures to protect the service and other customers.
      </p>

      <h2>Spam and email limits</h2>
      <p>
        Unsolicited bulk email (SPAM) is prohibited. For operational stability, Garris
        Graphics may limit email sending rates from hosted accounts. Excessive or abusive
        sending that harms infrastructure or results in blacklisting may result in
        suspension of the account.
      </p>

      <h2>Additional usage restrictions</h2>
      <p>
        We may remove or disable access to content that violates this policy, without
        notice. Additional examples of activities that may result in suspension or
        termination include:
      </p>
      <ul>
        <li>Operating services that constantly exceed resource limits or spawn excessive connections.</li>
        <li>Using multiple accounts or services to 'stripe' content and avoid resource limits.</li>
        <li>Using our systems to host content that is advertised via spam or otherwise abused.</li>
        <li>Operating anonymizing networks, proxying, or other services intended to conceal abusive behavior.</li>
        <li>Hosting large-scale file dumps, warez, or pirate sites.</li>
      </ul>

      <h2>Third-party software and provider terms</h2>
      <p>
        Use of control panels (cPanel, Plesk) or other third-party management tools is
        subject to those providers' license terms. Hosting, SSL, and other infrastructure
        services may be provided by third parties (for example, Hostwinds). Your use of
        those services is subject to their respective terms and agreements.
      </p>

      <h2>Enforcement</h2>
      <p>
        We reserve the right to suspend or terminate accounts, remove or disable content,
        and cooperate with law enforcement where appropriate. Repeated or serious
        violations may lead to permanent account closure without refund.
      </p>
      <p>
        To report abuse, security issues, or suspected policy violations, please email
        <a href="mailto:noah@garris.graphics">noah@garris.graphics</a> with details and relevant URLs.
      </p>

      <h2>Email usage and storage</h2>
      <p>
        If you use email services provided or administered by Garris GFX (for example,
        addresses at @garris.graphics), you must use those accounts responsibly. Prohibited
        uses include sending unsolicited bulk email (spam), phishing, distributing malware,
        and using the service to harvest credentials or personally identifiable information.
      </p>
      <p>
        We may impose reasonable sending limits or suspend accounts that cause infrastructure
        harm or result in IP blacklisting. Persistent abuse may lead to account suspension
        or termination.
      </p>

      <h2>Email storage policy</h2>
      <p>
        Email storage quotas and retention limits vary by plan. Users are responsible for
        managing mailbox size; Garris GFX may delete mail in accordance with the service
        plan or after prolonged inactivity. Critical email retention requirements should be
        specified in the service agreement.
      </p>

      <h2>Professional email providers</h2>
      <p>
        If professional email services (Fastmail, Google Workspace, Microsoft 365, etc.)
        are used, administrative setup and ongoing management are described in the service
        agreement and are subject to those providers' terms of service and privacy policies.
      </p>
    </IndexPage>
  );
}
