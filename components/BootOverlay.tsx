"use client";

import { useEffect, useMemo, useState } from "react";
import { BIOS } from "@/lib/content";
import { DottedRow } from "./marks";

export function BootOverlay({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const rows = useMemo(() => [...BIOS.rows], []);

  useEffect(() => {
    if (paused || ready) return;
    if (visibleCount >= rows.length) {
      const t = window.setTimeout(() => setReady(true), 280);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(
      () => setVisibleCount((n) => n + 1),
      visibleCount === 0 ? 220 : 160,
    );
    return () => window.clearTimeout(t);
  }, [paused, ready, rows.length, visibleCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#0a0e14] px-5 py-8 font-mono text-xs text-[#ece8e1] sm:px-10 sm:py-12"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
      role="status"
      aria-live="polite"
      aria-label="Starting up"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        onDone();
      }}
    >
      <div className="mx-auto max-w-xl">
        <div className="mb-8 flex items-baseline justify-between tracking-wide">
          <span className="font-medium">{BIOS.headerLeft}</span>
          <span className="text-[#8b93a0]">{BIOS.headerRight}</span>
        </div>
        <div className="space-y-1 sm:space-y-0.5">
          {rows.slice(0, visibleCount).map((row) => (
            <DottedRow
              key={row.label}
              compact
              label={row.label}
              value={row.value}
            />
          ))}
        </div>
        {ready ? (
          <div className="mx-auto mt-16 flex max-w-[22rem] items-center gap-3 rounded-sm border border-[#ffffff22] px-3 py-2.5 text-[#8b93a0]">
            <span
              aria-hidden
              className="boot-cursor inline-block h-[1.05em] w-[0.6em] shrink-0 bg-[#c45c26]"
            />
            <span>press any key to continue …</span>
          </div>
        ) : null}
      </div>
      <div
        className="absolute right-4 bottom-4 flex gap-2 text-[10px] tracking-widest text-[#7d8490] sm:right-10 sm:bottom-8 sm:gap-4"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <button
          type="button"
          className="px-2 py-2 hover:text-[#ece8e1] sm:p-0"
          onClick={(e) => {
            e.stopPropagation();
            setPaused((p) => !p);
          }}
        >
          {paused ? "▶ resume" : "⏸ pause"}
        </button>
        <button
          type="button"
          className="px-2 py-2 hover:text-[#ece8e1] sm:p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDone();
          }}
        >
          skip ✕
        </button>
      </div>
    </div>
  );
}
