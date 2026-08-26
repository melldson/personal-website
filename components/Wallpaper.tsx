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
          <linearGradient id="field" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c121c" />
            <stop offset="55%" stopColor="#0a0e16" />
            <stop offset="100%" stopColor="#0d1522" />
          </linearGradient>
          <pattern
            id="grid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="#9aa8bc"
              strokeWidth="0.04"
              opacity="0.22"
            />
          </pattern>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100" height="100" fill="url(#field)" />
        <rect width="100" height="100" fill="url(#grid)" />
        <rect
          width="100"
          height="100"
          filter="url(#noise)"
          opacity="0.045"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 40%, transparent 0%, rgba(5,7,12,0.45) 100%)",
        }}
      />
    </div>
  );
}
