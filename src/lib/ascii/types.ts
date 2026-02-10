export type AsciiTheme =
  | "code-flow"
  | "parliament"
  | "circuit"
  | "cipher"
  | "topography";

export type ColorMode = "light" | "dark";

export interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

export interface ScrollState {
  progress: number;
}

export interface AsciiRenderer<State = unknown> {
  createState(width: number, height: number, dpr: number): State;
  update(state: State, dt: number, mouse: MouseState, scroll?: ScrollState): void;
  draw(ctx: CanvasRenderingContext2D, state: State, width: number, height: number): void;
}

/**
 * Pre-allocated opacity buckets to avoid per-frame Map/array allocation.
 * Quantises opacity into 51 levels (0..50) with pre-computed fillStyle strings.
 */
export const OPACITY_LEVELS = 51;

export interface OpacityBuckets<T> {
  /** One index array per opacity level (0..50). Stores indices into the source array. */
  indices: Int32Array[];
  /** Number of entries in each bucket for the current frame. */
  counts: Int32Array;
  /** Pre-computed rgba fillStyle strings for each bucket. */
  styles: string[];
  /** Temporary reference to source array set during fill. */
  _source: T[];
}

export function createOpacityBuckets<T>(
  baseColor: string,
  capacity: number
): OpacityBuckets<T> {
  const indices: Int32Array[] = [];
  const styles: string[] = [];
  for (let i = 0; i < OPACITY_LEVELS; i++) {
    indices.push(new Int32Array(capacity));
    styles.push(`rgba(${baseColor}, ${i / 50})`);
  }
  return {
    indices,
    counts: new Int32Array(OPACITY_LEVELS),
    styles,
    _source: [],
  };
}

export function fillOpacityBuckets<T extends { opacity: number }>(
  buckets: OpacityBuckets<T>,
  source: T[]
): void {
  buckets.counts.fill(0);
  buckets._source = source;
  for (let i = 0; i < source.length; i++) {
    const opacity = source[i].opacity;
    if (opacity <= 0) continue;
    const key = Math.round(opacity * 50);
    const idx = key < OPACITY_LEVELS ? key : OPACITY_LEVELS - 1;
    const count = buckets.counts[idx];
    // Grow bucket if needed (rare — only on first frame or after resize)
    if (count >= buckets.indices[idx].length) {
      const bigger = new Int32Array(buckets.indices[idx].length * 2);
      bigger.set(buckets.indices[idx]);
      buckets.indices[idx] = bigger;
    }
    buckets.indices[idx][count] = i;
    buckets.counts[idx] = count + 1;
  }
}
