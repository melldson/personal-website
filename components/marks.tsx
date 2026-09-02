import type { ReactNode } from "react";

export function DottedRow({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-0 ${compact ? "text-[11px] sm:text-xs" : "text-[13px] sm:text-[15px]"}`}
    >
      <span className="shrink-0">{label}</span>
      <span
        aria-hidden
        className="mx-2 h-[1em] min-w-3 flex-1 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dim) 0.55px, transparent 0.65px)",
          backgroundSize: "5px 1em",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "0 0.62em",
        }}
      />
      <span className="shrink-0 text-right">{value}</span>
    </div>
  );
}

export function PromptLine({
  prompt,
  command,
}: {
  prompt: string;
  command?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="shrink-0 font-medium text-[var(--accent)] select-none">
        <span className="sm:hidden">{prompt.replace(/^melldson@/, "")}</span>
        <span className="hidden sm:inline">{prompt}</span>
      </span>
      {command ? (
        <span className="text-[var(--cmd)]">{command}</span>
      ) : null}
    </div>
  );
}

export function ExtLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-[var(--link)] underline-offset-2 hover:underline"
    >
      {children}
      <span aria-hidden> ↗</span>
    </a>
  );
}

export function StatusTag({
  tone,
  children,
}: {
  tone: "live" | "muted";
  children: ReactNode;
}) {
  return (
    <span
      className={
        tone === "live" ? "text-[var(--live)]" : "text-[var(--dim)]"
      }
    >
      {children}
    </span>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[12px] text-[var(--dim)]">{children}</p>;
}

export function Block({ children }: { children: ReactNode }) {
  return <section className="space-y-2">{children}</section>;
}
