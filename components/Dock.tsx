import { LINKS } from "@/lib/content";

function Tile({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="group/dock relative z-10 flex shrink-0 items-end transition-transform duration-150 ease-out hover:-translate-y-1 focus-visible:outline-none"
    >
      <span className="block origin-bottom rounded-[4px] border border-[#1a1a17] bg-[#f7f4ee] p-[3px] leading-none shadow-[2px_2px_0_rgba(27,27,31,0.16)]">
        <span className="flex h-9 w-9 items-center justify-center text-[#1a1a17]">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap border border-[#c8c2b4] bg-[#fdfcf9] px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-[#1a1a17] opacity-0 shadow-[2px_2px_0_rgba(27,27,31,0.16)] transition-opacity duration-150 group-hover/dock:opacity-100 group-focus-visible/dock:opacity-100"
        style={{ bottom: "calc(44px + 10px)" }}
      >
        {label}
      </span>
    </a>
  );
}

export function Dock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 hidden justify-center pb-3 sm:flex">
      <nav
        aria-label="dock"
        className="dock-glass pointer-events-auto relative flex items-end gap-2.5 rounded-xl px-4 py-1.5"
      >
        <Tile href={LINKS.github} label="github ↗">
          <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
          </svg>
        </Tile>
        <Tile href={LINKS.linkedin} label="linkedin ↗">
          <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
          </svg>
        </Tile>
      </nav>
    </div>
  );
}
