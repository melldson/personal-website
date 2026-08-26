export function DitheredPortrait() {
  return (
    <div className="relative h-[112px] w-[90px] shrink-0 overflow-hidden border border-[#ffffff22] bg-black sm:h-[132px] sm:w-[106px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait-dither.png"
        alt=""
        width={112}
        height={140}
        className="h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

export function MonogramFallback() {
  return (
    <div className="flex h-[112px] w-[90px] shrink-0 items-center justify-center border border-[#ffffff22] bg-[#0c0c0b] font-mono text-2xl tracking-[0.2em] text-[#efece6] sm:h-[132px] sm:w-[106px]">
      MS
    </div>
  );
}
