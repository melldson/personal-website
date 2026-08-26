import Link from "next/link";
import { markdownForSection } from "@/lib/markdown";
import type { SectionId } from "@/lib/content";

export function AgentView({ section }: { section: SectionId }) {
  const md = markdownForSection(section);
  return (
    <div className="space-y-6 text-[13px] leading-[1.55] sm:text-[15px]">
      <p className="text-[var(--dim)]">
        machine-readable ·{" "}
        <Link href="/md/about" className="text-[var(--link)] hover:underline">
          /md/about
        </Link>
        {" · "}
        <Link href="/llms.txt" className="text-[var(--link)] hover:underline">
          /llms.txt
        </Link>
      </p>
      <pre className="whitespace-pre-wrap font-mono text-[var(--fg)]">{md}</pre>
    </div>
  );
}
