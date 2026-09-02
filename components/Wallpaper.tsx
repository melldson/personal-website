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
          <pattern
            id="halftone"
            width="1.8"
            height="1.6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.45" cy="0.8" r="0.38" fill="#2a5fb8" />
            <circle cx="1.35" cy="0" r="0.28" fill="#2a5fb8" />
            <circle cx="1.35" cy="1.6" r="0.28" fill="#2a5fb8" />
          </pattern>
          <pattern
            id="halftone-fine"
            width="1.15"
            height="1"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.3" cy="0.5" r="0.18" fill="#2a5fb8" />
            <circle cx="0.88" cy="0" r="0.12" fill="#2a5fb8" />
            <circle cx="0.88" cy="1" r="0.12" fill="#2a5fb8" />
          </pattern>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
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
        <path
          fill="url(#halftone)"
          opacity="0.55"
          d="M0 28 C 18 18, 36 40, 54 26 S 82 14, 100 30 L 100 72 C 82 84, 64 58, 46 70 S 16 86, 0 68 Z"
        />
        <path
          fill="url(#halftone-fine)"
          opacity="0.35"
          d="M0 8 C 20 2, 40 16, 60 6 S 88 0, 100 10 L 100 38 C 80 28, 58 44, 36 32 S 12 22, 0 28 Z"
        />
        <rect width="100" height="100" fill="#3a3226" opacity="0.05" />
      </svg>
    </div>
  );
}
