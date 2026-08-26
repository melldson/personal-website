import { ABOUT_PARAGRAPHS, LINKS, SITE, UPDATES } from "@/lib/content";
import { Portrait } from "../Portrait";
import { Block, DottedRow, ExtLink, Hint, PromptLine } from "../marks";

export function WhoisCard() {
  return (
    <div className="flex gap-4 sm:gap-6">
      <Portrait />
      <div className="min-w-0 flex-1 space-y-0.5 self-center">
        <DottedRow label="NAME" value={SITE.name} />
        <DottedRow label="ROLE" value={SITE.role} />
        <DottedRow label="ORG" value={SITE.org} />
        <DottedRow label="LOCATION" value={SITE.location} />
        <DottedRow label="FOCUS" value={SITE.focus} />
      </div>
    </div>
  );
}

export function AboutText() {
  return (
    <div className="max-w-prose space-y-4 text-[13px] leading-[1.55] text-[var(--fg)] sm:text-[15px] sm:leading-[1.55]">
      {ABOUT_PARAGRAPHS.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function LinksLine() {
  return (
    <p className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] sm:text-[15px]">
      <ExtLink href={LINKS.github}>github</ExtLink>
      <ExtLink href={LINKS.linkedin}>linkedin</ExtLink>
    </p>
  );
}

export function UpdatesLog() {
  return (
    <ul className="space-y-1.5 text-[13px] leading-[1.5] sm:text-[15px]">
      {UPDATES.map((u) => (
        <li key={u.date + u.kind} className="flex flex-wrap gap-x-3">
          <span className="w-16 shrink-0 text-[var(--dim)]">{u.date}</span>
          <span className="w-14 shrink-0 text-[var(--chrome)]">{u.kind}</span>
          <span>— {u.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function AboutView({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <Block>
        <PromptLine prompt={prompt} command="whois melldson" />
        <WhoisCard />
      </Block>
      <Block>
        <PromptLine prompt={prompt} command="cat about.txt" />
        <AboutText />
      </Block>
      <Block>
        <PromptLine prompt={prompt} command="cat links.txt" />
        <LinksLine />
      </Block>
      <Block>
        <PromptLine prompt={prompt} command="tail -n 5 updates.log" />
        <UpdatesLog />
        <Hint>three entries in the log — newest first</Hint>
      </Block>
    </div>
  );
}
