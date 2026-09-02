"use client";

import { Block, Hint, PromptLine } from "../marks";
import { LuckyButton } from "../terminal-context";

export function PlayView({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-7 sm:space-y-8">
      <Block>
        <PromptLine prompt={prompt} />
        <p className="max-w-prose text-[13px] leading-[1.55] text-[var(--fg)] sm:text-[15px]">
          a small cluster. type something — kubectl, uptime, fortune — and see
          what answers.
        </p>
        <Hint>the jokes are small. the cluster is quieter.</Hint>
        <LuckyButton />
      </Block>
    </div>
  );
}
