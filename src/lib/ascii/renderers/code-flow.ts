import type { AsciiRenderer, ColorMode, OpacityBuckets } from "../types";
import { createOpacityBuckets, fillOpacityBuckets, OPACITY_LEVELS } from "../types";

const CHARS = ["{", "}", "<", ">", "(", ")", "/", "*", "=", "+", ";", "&", "|", "~"];
const CELL = 24;
const MOUSE_RADIUS = 120;
const DRIFT_SPEED = 12;
const FONT = "14px 'DM Mono', 'Menlo', 'Consolas', monospace";

interface Particle {
  char: string;
  x: number;
  y: number;
  baseOpacity: number;
  opacity: number;
  phase: number;
  speed: number;
  dx: number;
  dy: number;
}

interface CodeFlowState {
  particles: Particle[];
  cols: number;
  rows: number;
  colorMode: ColorMode;
  dpr: number;
  buckets: OpacityBuckets<Particle>;
}

function createCodeFlowRenderer(colorMode: ColorMode): AsciiRenderer<CodeFlowState> {
  return {
    createState(width, height, dpr) {
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const particles: Particle[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          particles.push({
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            x: c * CELL + CELL / 2,
            y: r * CELL + CELL / 2,
            baseOpacity: 0.08 + Math.random() * 0.14,
            opacity: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.7,
            dx: 0,
            dy: 0,
          });
        }
      }

      const baseColor = colorMode === "light" ? "0, 0, 0" : "250, 250, 250";
      const buckets = createOpacityBuckets<Particle>(baseColor, particles.length);

      return { particles, cols, rows, colorMode, dpr, buckets };
    },

    update(state, dt, mouse) {
      const { particles, colorMode } = state;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift upward
        p.y -= DRIFT_SPEED * p.speed * dt;

        // Wrap when particle goes above canvas
        if (p.y < -CELL) {
          p.y += (state.rows + 1) * CELL;
          p.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        // Sine opacity pulse
        p.phase += dt * p.speed * 1.5;
        const pulse = 0.5 + 0.5 * Math.sin(p.phase);
        p.opacity = p.baseOpacity * (0.5 + 0.5 * pulse);

        // Mouse interaction
        p.dx *= 0.9;
        p.dy *= 0.9;

        if (mouse.active) {
          const mx = mouse.x - (p.x + p.dx);
          const my = mouse.y - (p.y + p.dy);
          const dist = Math.sqrt(mx * mx + my * my);

          if (dist < MOUSE_RADIUS) {
            const strength = 1 - dist / MOUSE_RADIUS;
            const maxOpacity = colorMode === "light" ? 0.45 : 0.6;
            p.opacity = Math.min(maxOpacity, p.opacity + strength * 0.3);

            // Magnetic repulsion
            const force = strength * 3;
            p.dx -= (mx / dist) * force;
            p.dy -= (my / dist) * force;
          }
        }
      }
    },

    draw(ctx, state, width, height) {
      const { particles, dpr, buckets } = state;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      fillOpacityBuckets(buckets, particles);

      for (let k = 0; k < OPACITY_LEVELS; k++) {
        const count = buckets.counts[k];
        if (count === 0) continue;
        ctx.fillStyle = buckets.styles[k];
        const idxArr = buckets.indices[k];
        for (let i = 0; i < count; i++) {
          const p = particles[idxArr[i]];
          ctx.fillText(p.char, p.x + p.dx, p.y + p.dy);
        }
      }

      ctx.restore();
    },
  };
}

export { createCodeFlowRenderer };
