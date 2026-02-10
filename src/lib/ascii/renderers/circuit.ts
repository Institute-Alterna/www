import type { AsciiRenderer, ColorMode, OpacityBuckets } from "../types";
import { createOpacityBuckets, fillOpacityBuckets, OPACITY_LEVELS } from "../types";

const CELL = 20;
const MOUSE_RADIUS = 120;
const MAX_SIGNALS = 30;
const FONT = "14px 'DM Mono', 'Menlo', 'Consolas', monospace";

interface Node {
  x: number;
  y: number;
  char: string;
  baseOpacity: number;
  opacity: number;
}

interface Signal {
  x: number;
  y: number;
  tx: number;
  ty: number;
  speed: number;
  opacity: number;
  progress: number;
}

interface CircuitState {
  nodes: Node[];
  signals: Signal[];
  hubX: number;
  hubY: number;
  colorMode: ColorMode;
  dpr: number;
  time: number;
  signalTimer: number;
  buckets: OpacityBuckets<Node>;
}

function createCircuitRenderer(colorMode: ColorMode): AsciiRenderer<CircuitState> {
  return {
    createState(width, height, dpr) {
      const nodes: Node[] = [];
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const hubX = width / 2;
      const hubY = height / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;
          const dx = x - hubX;
          const dy = y - hubY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(hubX * hubX + hubY * hubY);

          // Choose char based on position: + at junctions, - for horizontal, | for vertical
          let char: string;
          if (Math.random() < 0.15) {
            char = "+";
          } else if (Math.abs(dy) < Math.abs(dx)) {
            char = "-";
          } else {
            char = "|";
          }

          // Closer to hub = slightly higher base opacity
          const proximity = 1 - dist / maxDist;
          nodes.push({
            x,
            y,
            char,
            baseOpacity: 0.06 + proximity * 0.14,
            opacity: 0,
          });
        }
      }

      // Initial signals
      const signals: Signal[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * Math.min(width, height) * 0.4 + 50;
        signals.push({
          x: hubX + Math.cos(angle) * r,
          y: hubY + Math.sin(angle) * r,
          tx: hubX,
          ty: hubY,
          speed: 60 + Math.random() * 80,
          opacity: 0.3 + Math.random() * 0.2,
          progress: 0,
        });
      }

      const baseColor = colorMode === "light" ? "0, 0, 0" : "250, 250, 250";
      const buckets = createOpacityBuckets<Node>(baseColor, nodes.length);

      return { nodes, signals, hubX, hubY, colorMode, dpr, time: 0, signalTimer: 0, buckets };
    },

    update(state, dt, mouse) {
      const { nodes, signals, hubX, hubY } = state;
      state.time += dt;
      state.signalTimer += dt;

      // Update node opacities
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(state.time * 0.6 + i * 0.02);
        n.opacity = n.baseOpacity * (0.5 + 0.5 * pulse);

        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const strength = 1 - dist / MOUSE_RADIUS;
            const maxOpacity = state.colorMode === "light" ? 0.45 : 0.6;
            n.opacity = Math.min(maxOpacity, n.opacity + strength * 0.3);
          }
        }
      }

      // Update signals — compact-remove dead signals in a single pass
      let writeIdx = 0;
      for (let i = 0; i < signals.length; i++) {
        const s = signals[i];
        const dx = s.tx - s.x;
        const dy = s.ty - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5) continue; // Reached hub, skip (remove)

        // Move toward hub
        let speed = s.speed;

        // Mouse acceleration
        if (mouse.active) {
          const mx = mouse.x - s.x;
          const my = mouse.y - s.y;
          const mDist = Math.sqrt(mx * mx + my * my);
          if (mDist < MOUSE_RADIUS) {
            speed *= 1 + (1 - mDist / MOUSE_RADIUS) * 2;
          }
        }

        const step = speed * dt;
        s.x += (dx / dist) * step;
        s.y += (dy / dist) * step;
        s.progress = 1 - dist / Math.max(Math.sqrt(hubX * hubX + hubY * hubY), 1);

        signals[writeIdx++] = s;
      }
      signals.length = writeIdx;

      // Spawn new signals periodically
      if (state.signalTimer > 0.3) {
        state.signalTimer = 0;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * Math.min(state.nodes.length > 0 ? 200 : 100, 300) + 80;
        signals.push({
          x: hubX + Math.cos(angle) * r,
          y: hubY + Math.sin(angle) * r,
          tx: hubX,
          ty: hubY,
          speed: 60 + Math.random() * 80,
          opacity: 0.3 + Math.random() * 0.2,
          progress: 0,
        });

        // Spawn from cursor if active
        if (mouse.active) {
          signals.push({
            x: mouse.x + (Math.random() - 0.5) * 20,
            y: mouse.y + (Math.random() - 0.5) * 20,
            tx: hubX,
            ty: hubY,
            speed: 80 + Math.random() * 60,
            opacity: 0.35 + Math.random() * 0.15,
            progress: 0,
          });
        }

        // Cap signal count — single splice instead of shift() loop
        if (signals.length > MAX_SIGNALS) {
          signals.splice(0, signals.length - MAX_SIGNALS);
        }
      }
    },

    draw(ctx, state, width, height) {
      const { nodes, signals, hubX, hubY, colorMode, dpr, buckets } = state;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const accentColor = colorMode === "light" ? "68, 148, 10" : "108, 231, 20";

      // Draw nodes
      fillOpacityBuckets(buckets, nodes);

      for (let k = 0; k < OPACITY_LEVELS; k++) {
        const count = buckets.counts[k];
        if (count === 0) continue;
        ctx.fillStyle = buckets.styles[k];
        const idxArr = buckets.indices[k];
        for (let i = 0; i < count; i++) {
          const n = nodes[idxArr[i]];
          ctx.fillText(n.char, n.x, n.y);
        }
      }

      // Draw hub
      ctx.fillStyle = `rgba(${accentColor}, 0.35)`;
      ctx.fillText("[+]", hubX, hubY);

      // Draw signals
      for (let i = 0; i < signals.length; i++) {
        const s = signals[i];
        ctx.fillStyle = `rgba(${accentColor}, ${s.opacity})`;
        ctx.fillText("*", s.x, s.y);
      }

      ctx.restore();
    },
  };
}

export { createCircuitRenderer };
