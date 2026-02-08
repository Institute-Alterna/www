export default function ContactFormEmbed({
  title = "Contact form",
}: {
  title?: string;
}) {
  const url = new URL("https://tally.so/embed/3x7bg5");
  url.searchParams.set("alignLeft", "1");
  url.searchParams.set("hideTitle", "1");
  url.searchParams.set("transparentBackground", "1");

  return (
    <iframe
      src={url.toString()}
      width="100%"
      height="400"
      title={title}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      loading="lazy"
      className="rounded-lg border-0"
    />
  );
}
