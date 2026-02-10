"use client";

import { useMemo } from "react";
import { useAsciiRenderer } from "@/lib/ascii/use-ascii-renderer";
import type { AsciiTheme, ColorMode } from "@/lib/ascii/types";
import { createCodeFlowRenderer } from "@/lib/ascii/renderers/code-flow";
import { createParliamentRenderer } from "@/lib/ascii/renderers/parliament";
import { createCircuitRenderer } from "@/lib/ascii/renderers/circuit";
import { createCipherRenderer } from "@/lib/ascii/renderers/cipher";
import { createTopographyRenderer } from "@/lib/ascii/renderers/topography";
import { cn } from "@/lib/utils";
import type { AsciiRenderer } from "@/lib/ascii/types";

const rendererFactories: Record<
  AsciiTheme,
  (colorMode: ColorMode) => AsciiRenderer
> = {
  "code-flow": createCodeFlowRenderer,
  parliament: createParliamentRenderer,
  circuit: createCircuitRenderer,
  cipher: createCipherRenderer,
  topography: createTopographyRenderer,
};

interface AsciiCanvasProps {
  theme: AsciiTheme;
  colorMode: ColorMode;
  className?: string;
  scrollTarget?: React.RefObject<HTMLElement | null>;
}

export default function AsciiCanvas({
  theme,
  colorMode,
  className,
  scrollTarget,
}: AsciiCanvasProps) {
  const createRenderer = useMemo(
    () => rendererFactories[theme],
    [theme]
  );

  const canvasRef = useAsciiRenderer({
    createRenderer,
    colorMode,
    scrollTarget,
  });

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
