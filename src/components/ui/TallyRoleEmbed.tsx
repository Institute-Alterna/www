"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";

interface TallyRoleEmbedProps {
  src: string;
  title: string;
}

export default function TallyRoleEmbed({ src, title }: TallyRoleEmbedProps) {
  const [height, setHeight] = useState(800);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (typeof e.data !== "object" || !e.data) return;
    if (
      (e.data.event === "Tally.FormLoaded" ||
        e.data.event === "Tally.ResizeFrame") &&
      typeof e.data.height === "number" &&
      e.data.height > 0
    ) {
      setHeight(e.data.height);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <>
      <iframe
        src={src}
        width="100%"
        title={title}
        className="mt-10 block w-full border-0"
        loading="lazy"
        style={{ height: `${height}px`, transition: "height 0.3s ease" }}
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
