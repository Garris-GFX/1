import IndexPage from "@/components/layout/IndexPage";

export default function WelcomePage() {
  return (
    <IndexPage title="Welcome" excerpt="Thanks for visiting" backHref="/" backLabel="Home" rootLabel="System">
      <h2>Welcome</h2>

      <p>Thanks for checking out the site — if you&apos;re new, start with the work and blog links above.</p>
    </IndexPage>
  );
}
