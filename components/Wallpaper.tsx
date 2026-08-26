type Dot = { x: number; y: number; r: number; o: number };

function makeDots(): Dot[] {
  const dots: Dot[] = [];
  const cols = 70;
  const rows = 46;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = ((col + (row % 2) * 0.5) / cols) * 100;
      const y = (row / (rows - 1)) * 100;
      const wave =
        Math.sin((x / 100) * Math.PI * 2.35 + (y / 100) * 1.55) * 0.5 + 0.5;
      const ridge = Math.sin((x / 100) * Math.PI * 1.1 + 0.4) * 0.18;
      const band = Math.abs(y / 100 - (0.46 + ridge));
      const r = 0.14 + wave * 0.62 + (1 - Math.min(1, band * 3.2)) * 0.22;
      if (r < 0.28) continue;
      dots.push({
        x,
        y,
        r,
        o: 0.18 + wave * 0.42,
      });
    }
  }
  return dots;
}

const DOTS = makeDots();

export function Wallpaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden sm:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6ecd2" />
            <stop offset="55%" stopColor="#ead9b2" />
          </linearGradient>
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ea24a" />
            <stop offset="55%" stopColor="#3e8a3a" />
            <stop offset="100%" stopColor="#2f6d30" />
          </linearGradient>
          <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix
              in="n"
              type="saturate"
              values="0"
              result="g"
            />
            <feBlend in="SourceGraphic" in2="g" mode="multiply" />
          </filter>
        </defs>
        <rect width="100" height="100" fill="url(#paper)" />
        <path
          fill="url(#grass)"
          d="M0 52 C 12 44, 22 58, 34 50 S 54 38, 66 48 S 86 62, 100 46 L 100 100 L 0 100 Z"
        />
        <path
          fill="#2f6d30"
          opacity="0.28"
          d="M0 68 C 18 62, 30 74, 48 66 S 78 58, 100 70 L 100 100 L 0 100 Z"
        />
        <g filter="url(#grain)" opacity="0.9">
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#2a5fb8"
              opacity={d.o}
            />
          ))}
        </g>
        <rect width="100" height="100" fill="#3a3226" opacity="0.06" />
      </svg>
    </div>
  );
}
