import type { AsciiRenderer, ColorMode, OpacityBuckets } from "../types";
import { createOpacityBuckets, fillOpacityBuckets, OPACITY_LEVELS } from "../types";
import {
  createCipherGrid,
  updateCipherParticles,
  type CipherParticle,
} from "./cipher-utils";

const CELL = 24;
const MOUSE_RADIUS = 120;
const FONT = "14px 'DM Mono', 'Menlo', 'Consolas', monospace";

interface CipherState {
  particles: CipherParticle[];
  colorMode: ColorMode;
  dpr: number;
  time: number;
  frameCount: number;
  buckets: OpacityBuckets<CipherParticle>;
}

function createCipherRenderer(colorMode: ColorMode): AsciiRenderer<CipherState> {
  return {
    createState(width, height, dpr) {
      const particles = createCipherGrid(width, height, CELL);
      const baseColor = colorMode === "dark" ? "250, 250, 250" : "0, 0, 0";
      const buckets = createOpacityBuckets<CipherParticle>(baseColor, particles.length);

      return { particles, colorMode, dpr, time: 0, frameCount: 0, buckets };
    },

    update(state, dt, mouse) {
      state.time += dt;
      state.frameCount++;

      updateCipherParticles(
        state.particles,
        dt,
        mouse.x,
        mouse.y,
        mouse.active,
        MOUSE_RADIUS,
        state.time,
        state.colorMode,
        state.frameCount
      );
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

export { createCipherRenderer };
