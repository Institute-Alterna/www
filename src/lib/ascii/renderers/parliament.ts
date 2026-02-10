import type { AsciiRenderer, ColorMode, OpacityBuckets } from "../types";
import { createOpacityBuckets, fillOpacityBuckets, OPACITY_LEVELS } from "../types";

const SEAT_CHARS = ["o", "O", ".", "@", "o"];
const MOUSE_RADIUS = 120;
const CELL = 20;
const FONT = "14px 'DM Mono', 'Menlo', 'Consolas', monospace";

interface Seat {
  x: number;
  y: number;
  char: string;
  baseChar: string;
  activeChar: string;
  baseOpacity: number;
  opacity: number;
  row: number;
}

interface ParliamentState {
  seats: Seat[];
  podiumX: number;
  podiumY: number;
  colorMode: ColorMode;
  dpr: number;
  time: number;
  buckets: OpacityBuckets<Seat>;
}

function createParliamentRenderer(colorMode: ColorMode): AsciiRenderer<ParliamentState> {
  return {
    createState(width, height, dpr) {
      const seats: Seat[] = [];
      const cx = width / 2;
      // Position the arc centre near bottom so the semicircle fills upward
      const cy = height * 0.95;
      // Scale to fill the entire canvas height
      const numRows = 14;
      const totalVerticalSpace = height * 0.90;
      const baseRadius = totalVerticalSpace * 0.15;
      const rowSpacing = (totalVerticalSpace - baseRadius) / (numRows - 1);

      for (let row = 0; row < numRows; row++) {
        const radius = baseRadius + row * rowSpacing;
        const arcLength = Math.PI * 0.85;
        const startAngle = Math.PI + (Math.PI - arcLength) / 2;
        const seatsInRow = Math.max(5, Math.floor((arcLength * radius) / CELL));

        for (let s = 0; s < seatsInRow; s++) {
          const angle = startAngle + (s / (seatsInRow - 1)) * arcLength;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;

          if (x >= -CELL && x <= width + CELL && y >= -CELL && y <= height + CELL) {
            const baseChar = SEAT_CHARS[row % SEAT_CHARS.length];
            seats.push({
              x,
              y,
              char: baseChar,
              baseChar,
              activeChar: "@",
              baseOpacity: 0.12 + (row / numRows) * 0.12,
              opacity: 0.12,
              row,
            });
          }
        }
      }

      const baseColor = colorMode === "light" ? "0, 0, 0" : "250, 250, 250";
      const buckets = createOpacityBuckets<Seat>(baseColor, seats.length);

      return {
        seats,
        podiumX: cx,
        podiumY: cy - baseRadius * 0.4,
        colorMode,
        dpr,
        time: 0,
        buckets,
      };
    },

    update(state, dt, mouse) {
      const { seats } = state;
      state.time += dt;

      for (let i = 0; i < seats.length; i++) {
        const s = seats[i];

        // Breathing opacity
        const breath = 0.5 + 0.5 * Math.sin(state.time * 0.8 + s.row * 0.5 + i * 0.03);
        s.opacity = s.baseOpacity * (0.6 + 0.4 * breath);
        s.char = s.baseChar;

        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const strength = 1 - dist / MOUSE_RADIUS;
            const maxOpacity = state.colorMode === "light" ? 0.5 : 0.7;
            s.opacity = Math.min(maxOpacity, s.opacity + strength * 0.35);
            s.char = strength > 0.5 ? s.activeChar : "O";
          }
        }
      }
    },

    draw(ctx, state, width, height) {
      const { seats, podiumX, podiumY, colorMode, dpr, buckets } = state;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseColor = colorMode === "light" ? "0, 0, 0" : "250, 250, 250";

      // Draw podium
      const podiumOpacity = 0.18 + 0.04 * Math.sin(state.time);
      ctx.fillStyle = `rgba(${baseColor}, ${podiumOpacity})`;
      ctx.fillText("[ === ]", podiumX, podiumY);

      // Draw seats
      fillOpacityBuckets(buckets, seats);

      for (let k = 0; k < OPACITY_LEVELS; k++) {
        const count = buckets.counts[k];
        if (count === 0) continue;
        ctx.fillStyle = buckets.styles[k];
        const idxArr = buckets.indices[k];
        for (let i = 0; i < count; i++) {
          const s = seats[idxArr[i]];
          ctx.fillText(s.char, s.x, s.y);
        }
      }

      ctx.restore();
    },
  };
}

export { createParliamentRenderer };
