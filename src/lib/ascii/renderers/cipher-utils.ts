const HEX_CHARS = "0123456789ABCDEF";
const CIPHER_CHARS = [
  ...HEX_CHARS.split(""),
  "{", "}", "#", "@", "$", "%", "&", "^",
];

export function randomCipherChar(): string {
  return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
}

export function cycleChar(current: string, speed: number, dt: number): string {
  // Higher speed = more frequent character changes
  if (Math.random() < speed * dt) {
    return randomCipherChar();
  }
  return current;
}

export interface CipherParticle {
  x: number;
  y: number;
  char: string;
  baseOpacity: number;
  opacity: number;
  cycleSpeed: number;
  dx: number;
  dy: number;
}

export function createCipherGrid(
  width: number,
  height: number,
  cellSize: number
): CipherParticle[] {
  const particles: CipherParticle[] = [];
  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      particles.push({
        x: c * cellSize + cellSize / 2,
        y: r * cellSize + cellSize / 2,
        char: randomCipherChar(),
        baseOpacity: 0.10 + Math.random() * 0.12,
        opacity: 0,
        cycleSpeed: 0.3 + Math.random() * 0.8,
        dx: 0,
        dy: 0,
      });
    }
  }

  return particles;
}

export function updateCipherParticles(
  particles: CipherParticle[],
  dt: number,
  mouseX: number,
  mouseY: number,
  mouseActive: boolean,
  mouseRadius: number,
  time: number,
  colorMode: "light" | "dark",
  frameCount: number
) {
  const cycleThisFrame = frameCount % 3 === 0;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Breathing opacity
    const breath = 0.5 + 0.5 * Math.sin(time * 0.5 + i * 0.015);
    p.opacity = p.baseOpacity * (0.5 + 0.5 * breath);

    // Decay displacement
    p.dx *= 0.92;
    p.dy *= 0.92;

    let nearMouse = false;

    if (mouseActive) {
      const mx = mouseX - (p.x + p.dx);
      const my = mouseY - (p.y + p.dy);
      const dist = Math.sqrt(mx * mx + my * my);

      if (dist < mouseRadius) {
        nearMouse = true;
        const strength = 1 - dist / mouseRadius;
        const maxOpacity = colorMode === "dark" ? 0.65 : 0.5;
        p.opacity = Math.min(maxOpacity, p.opacity + strength * 0.4);

        // Faster cycling near cursor ("decoding" effect)
        p.char = cycleChar(p.char, p.cycleSpeed * (1 + strength * 8), dt);

        // Magnetic repulsion
        const force = strength * 2.5;
        p.dx -= (mx / dist) * force;
        p.dy -= (my / dist) * force;
      }
    }

    // Throttle base cycling to every 3rd frame for distant particles
    if (!nearMouse && cycleThisFrame) {
      p.char = cycleChar(p.char, p.cycleSpeed, dt * 3);
    }
  }
}
