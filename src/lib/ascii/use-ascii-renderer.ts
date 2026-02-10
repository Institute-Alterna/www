import { useEffect, useRef, useMemo } from "react";
import type { AsciiRenderer, MouseState, ScrollState, ColorMode } from "./types";

interface UseAsciiRendererOptions {
  createRenderer: (colorMode: ColorMode) => AsciiRenderer;
  colorMode: ColorMode;
  scrollTarget?: React.RefObject<HTMLElement | null>;
}

const MAX_DPR = 2;

export function useAsciiRenderer({
  createRenderer,
  colorMode,
  scrollTarget,
}: UseAsciiRendererOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderer = useMemo(
    () => createRenderer(colorMode),
    [createRenderer, colorMode]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const internals = {
      state: null as unknown,
      rafId: 0,
      lastTime: 0,
      mouse: { x: 0, y: 0, active: false } as MouseState,
      scroll: { progress: 0 } as ScrollState,
      width: 0,
      height: 0,
      running: true,
      visible: true,
      canvasRect: { left: 0, top: 0 },
      resizeRafId: 0,
    };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = rect.width;
      const h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      internals.width = w;
      internals.height = h;
      internals.canvasRect = { left: rect.left, top: rect.top };
      internals.state = renderer.createState(w, h, dpr);
    }

    function startLoop() {
      if (internals.rafId) return;
      internals.lastTime = 0;
      internals.rafId = requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (!internals.rafId) return;
      cancelAnimationFrame(internals.rafId);
      internals.rafId = 0;
    }

    function shouldAnimate() {
      return internals.running && internals.visible && !prefersReducedMotion;
    }

    function tick(time: number) {
      if (!shouldAnimate()) {
        internals.rafId = 0;
        return;
      }

      if (internals.lastTime === 0) {
        internals.lastTime = time;
      }

      let dt = (time - internals.lastTime) / 1000;
      internals.lastTime = time;

      // Clamp dt to prevent large jumps after tab suspension
      if (dt > 0.1) dt = 0.1;

      if (internals.state !== null) {
        renderer.update(
          internals.state,
          dt,
          internals.mouse,
          internals.scroll
        );
        renderer.draw(
          ctx!,
          internals.state,
          internals.width,
          internals.height
        );
      }

      internals.rafId = requestAnimationFrame(tick);
    }

    function onMouseMove(e: MouseEvent) {
      // Use cached canvasRect — updated on resize and scroll, not every mousemove
      internals.mouse.x = e.clientX - internals.canvasRect.left;
      internals.mouse.y = e.clientY - internals.canvasRect.top;
      internals.mouse.active = true;
    }

    function onMouseLeave() {
      internals.mouse.active = false;
    }

    function onVisibilityChange() {
      if (document.hidden) {
        internals.running = false;
        stopLoop();
      } else {
        internals.running = true;
        if (shouldAnimate()) startLoop();
      }
    }

    function onScroll() {
      // Update cached canvas rect on scroll so mousemove stays accurate
      const rect = canvas!.getBoundingClientRect();
      internals.canvasRect = { left: rect.left, top: rect.top };

      const el = scrollTarget?.current;
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const scrollRange = el.scrollHeight - window.innerHeight;
      if (scrollRange <= 0) {
        internals.scroll.progress = 0;
        return;
      }
      const scrolled = -elRect.top;
      internals.scroll.progress = Math.max(0, Math.min(1, scrolled / scrollRange));
    }

    // Debounce ResizeObserver — batch via rAF to avoid rebuilding state many times per resize
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(internals.resizeRafId);
      internals.resizeRafId = requestAnimationFrame(() => resize());
    });
    resizeObserver.observe(canvas);

    // Pause animation when canvas is scrolled off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        internals.visible = entry.isIntersecting;
        if (entry.isIntersecting && shouldAnimate()) {
          startLoop();
        } else if (!entry.isIntersecting) {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Always listen to scroll to keep canvasRect in sync for mousemove accuracy
    window.addEventListener("scroll", onScroll, { passive: true });
    if (scrollTarget) {
      onScroll();
    }

    // Start immediately with system monospace fallback — DM Mono will
    // swap in once loaded. No blocking on document.fonts.ready.
    resize();

    if (prefersReducedMotion) {
      // Render a single static frame
      if (internals.state !== null) {
        renderer.update(internals.state, 0, internals.mouse, internals.scroll);
        renderer.draw(ctx!, internals.state, internals.width, internals.height);
      }
    } else {
      startLoop();
    }

    return () => {
      internals.running = false;
      stopLoop();
      cancelAnimationFrame(internals.resizeRafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [renderer, scrollTarget]);

  return canvasRef;
}
