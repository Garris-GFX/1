/* eslint-disable react/no-unescaped-entities */
import IndexPage from "@/components/layout/IndexPage";
import Link from "next/link";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function CookiePolicyPage() {
  const lastUpdated = await getLastUpdated(import.meta.url);
  return (
    <IndexPage title="Cookie Policy" excerpt="How Garris Graphics LLC uses cookies and tracking technologies" lastUpdated={lastUpdated} backHref="/" backLabel="Home" rootLabel="Legal">
      <h2>Cookie Policy</h2>

      <p>
        We use cookies and similar tracking technologies to operate the site, analyze usage,
        and improve the user experience. Google Analytics is used for site analytics. Cookies
        may be set by us or by third-party services we use (for analytics or embedded content).
      </p>

      <h2>Managing cookies</h2>
      <p>
        Most browsers allow you to block or delete cookies through their settings. Disabling
        cookies may affect site functionality. If you prefer not to be tracked by Google
        Analytics, you can opt out via Google's opt-out tools or disable tracking in your
        browser. For questions about data collection, see our Privacy Policy or
        <Link href="/contact">contact us</Link>.
      </p>
    </IndexPage>
  );
}
