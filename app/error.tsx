"use client";

import IndexPage from "@/components/layout/IndexPage";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <IndexPage title="Something went wrong" excerpt="An unexpected error occurred." backHref="/" backLabel="Home" rootLabel="System">
      <h2>Server error</h2>
      <p>Sorry — an unexpected error occurred. Try reloading the page or come back later.</p>
      {process.env.NODE_ENV === "development" ? (
        <pre className="mt-4 text-sm text-red-600">{error?.message}</pre>
      ) : null}
    </IndexPage>
  );
}
