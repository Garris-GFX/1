export default function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-6 rounded-card border border-stroke bg-white/4 p-tile shadow-tile">
      {title ? <div className="text-sm font-semibold text-white">{title}</div> : null}
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}
