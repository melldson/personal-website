"use client";

import { createContext, useContext } from "react";
import { randomLuckyCommand } from "@/lib/play";

type TerminalApi = {
  run: (command: string) => void;
};

export const TerminalContext = createContext<TerminalApi | null>(null);

export function useTerminal() {
  return useContext(TerminalContext);
}

export function LuckyButton() {
  const terminal = useTerminal();
  return (
    <button
      type="button"
      onClick={() => terminal?.run(randomLuckyCommand())}
      className="mt-4 rounded-sm border border-[var(--hair)] px-3 py-1.5 text-[12px] tracking-wide text-[var(--fg)] hover:bg-white/5"
    >
      feeling lucky
    </button>
  );
}
