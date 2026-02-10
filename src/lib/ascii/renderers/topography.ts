import type { AsciiRenderer, ColorMode } from "../types";

const CELL = 12;
const FONT = "11px 'DM Mono', 'Menlo', 'Consolas', monospace";
const NUM_BANDS = 7;
const DOT = ".";

// Simple 2D noise using permutation table (no external dependencies)
const GRAD = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function createNoise(seed: number) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  return function noise2d(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const g00 = GRAD[perm[xi + perm[yi]] & 7];
    const g10 = GRAD[perm[xi + 1 + perm[yi]] & 7];
    const g01 = GRAD[perm[xi + perm[yi + 1]] & 7];
    const g11 = GRAD[perm[xi + 1 + perm[yi + 1]] & 7];

    const n00 = g00[0] * xf + g00[1] * yf;
    const n10 = g10[0] * (xf - 1) + g10[1] * yf;
    const n01 = g01[0] * xf + g01[1] * (yf - 1);
    const n11 = g11[0] * (xf - 1) + g11[1] * (yf - 1);

    const nx0 = n00 + u * (n10 - n00);
    const nx1 = n01 + u * (n11 - n01);

    return nx0 + v * (nx1 - nx0);
  };
}

interface TopoCell {
  x: number;
  y: number;
  elevation: number;
  band: number;
  isContour: boolean;
  opacity: number;
}

interface TopographyState {
  cells: TopoCell[];
  cols: number;
  rows: number;
  colorMode: ColorMode;
  dpr: number;
}

function createTopographyRenderer(
  colorMode: ColorMode
): AsciiRenderer<TopographyState> {
  const noise2d = createNoise(42);

  return {
    createState(width, height, dpr) {
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const cells: TopoCell[] = [];
      const scale = 0.045;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;

          // Multi-octave noise for natural terrain
          let val =
            noise2d(c * scale, r * scale) * 0.55 +
            noise2d(c * scale * 2.1, r * scale * 2.1) * 0.3 +
            noise2d(c * scale * 4.3, r * scale * 4.3) * 0.15;

          val = Math.max(0, Math.min(1, (val + 1) / 2));
          const band = Math.min(
            NUM_BANDS - 1,
            Math.floor(val * NUM_BANDS)
          );

          cells.push({
            x,
            y,
            elevation: val,
            band,
            isContour: false,
            opacity: 0,
          });
        }
      }

      // Detect contour lines: cells where any neighbour is in a different band
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const band = cells[idx].band;

          const different =
            (c > 0 && cells[idx - 1].band !== band) ||
            (c < cols - 1 && cells[idx + 1].band !== band) ||
            (r > 0 && cells[idx - cols].band !== band) ||
            (r < rows - 1 && cells[idx + cols].band !== band);

          cells[idx].isContour = different;
        }
      }

      return { cells, cols, rows, colorMode, dpr };
    },

    update(state, _dt, _mouse, scroll) {
      const progress = scroll?.progress ?? 0;
      const { cells } = state;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // Each elevation band fades in sequentially as scroll progresses
        const bandStart = (cell.band / NUM_BANDS) * 0.7;
        const fadeRange = 0.25;
        const bandFade = Math.max(
          0,
          Math.min(1, (progress - bandStart) / fadeRange)
        );

        if (bandFade <= 0) {
          cell.opacity = 0;
          continue;
        }

        if (cell.isContour) {
          // Contour lines: clearly visible
          cell.opacity = bandFade * (0.45 + cell.band * 0.07);
        } else {
          // Fill between contours: subtle
          cell.opacity = bandFade * (0.04 + cell.band * 0.015);
        }
      }
    },

    draw(ctx, state, width, height) {
      const { cells, colorMode, dpr } = state;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseWhite =
        colorMode === "dark" ? "250, 250, 250" : "13, 13, 13";
      const accentGreen = "92, 204, 13";

      // Batch cells by (colour, opacity) for efficient drawing
      const whiteGroups = new Map<number, number[]>();
      const greenGroups = new Map<number, number[]>();

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (c.opacity <= 0) continue;
        const key = Math.round(c.opacity * 50);

        // Top 2 bands' contour lines get accent colour
        if (c.isContour && c.band >= NUM_BANDS - 2) {
          let group = greenGroups.get(key);
          if (!group) {
            group = [];
            greenGroups.set(key, group);
          }
          group.push(i);
        } else {
          let group = whiteGroups.get(key);
          if (!group) {
            group = [];
            whiteGroups.set(key, group);
          }
          group.push(i);
        }
      }

      whiteGroups.forEach((indices, key) => {
        ctx.fillStyle = `rgba(${baseWhite}, ${key / 50})`;
        for (let j = 0; j < indices.length; j++) {
          const c = cells[indices[j]];
          ctx.fillText(DOT, c.x, c.y);
        }
      });

      greenGroups.forEach((indices, key) => {
        ctx.fillStyle = `rgba(${accentGreen}, ${key / 50})`;
        for (let j = 0; j < indices.length; j++) {
          const c = cells[indices[j]];
          ctx.fillText(DOT, c.x, c.y);
        }
      });

      ctx.restore();
    },
  };
}

export { createTopographyRenderer };
