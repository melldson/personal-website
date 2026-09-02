import { Block, Hint, PromptLine } from "../marks";

export function WritingView({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-7 sm:space-y-8">
      <Block>
        <PromptLine prompt={prompt} command="ls ./posts/" />
        <p className="text-[13px] leading-[1.55] text-[var(--fg)] sm:text-[15px]">
          (empty)
        </p>
        <Hint>
          no posts yet — nothing in the spool. when something is worth writing
          down, it will show up here.
        </Hint>
      </Block>
    </div>
  );
}
