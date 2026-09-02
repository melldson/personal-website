"use client";

import { PROJECTS, WORK, type ProjectItem, type WorkItem } from "@/lib/content";
import { Block, ExtLink, Hint, PromptLine, StatusTag } from "../marks";
import { useTerminal } from "../terminal-context";

export function WorkList({
  onOpen,
}: {
  onOpen?: (id: number) => void;
}) {
  return (
    <div>
      <ul className="space-y-1.5">
        {WORK.map((job) => (
          <li key={job.id}>
            <button
              type="button"
              onClick={() => onOpen?.(job.id)}
              className="grid w-full grid-cols-[1.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 text-left text-[13px] leading-[1.5] sm:grid-cols-[1.25rem_11.5rem_minmax(0,1fr)_auto] sm:text-[15px]"
            >
              <span className="text-[var(--dim)]">{job.id}</span>
              <span className="hidden text-[var(--chrome)] sm:inline">
                {job.period || "—"}
              </span>
              <span className="min-w-0">
                <span className="sm:hidden text-[var(--chrome)]">
                  {job.period ? `${job.period} · ` : ""}
                </span>
                <span className="font-medium">{job.title}</span>
                <span className="text-[var(--chrome)]">
                  {" "}
                  · {job.org}
                  {job.place ? ` · ${job.place}` : ""}
                  {job.flag ? ` ${job.flag}` : ""}
                </span>
              </span>
              <StatusTag tone={job.status === "current" ? "live" : "muted"}>
                {job.status}
              </StatusTag>
            </button>
          </li>
        ))}
      </ul>
      <Hint>
        type &apos;open &lt;name&gt;&apos; or &apos;open work/&lt;n&gt;&apos; · e.g. open
        everysk · open work/1
      </Hint>
    </div>
  );
}

export function ProjectList({
  onOpen,
}: {
  onOpen?: (name: string) => void;
}) {
  return (
    <div>
      <ul className="space-y-3">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onOpen?.(p.name)}
              className="grid w-full grid-cols-[1.25rem_minmax(0,1fr)_auto] items-start gap-x-3 text-left text-[13px] leading-[1.5] sm:text-[15px]"
            >
              <span className="text-[var(--dim)]">{p.id}</span>
              <span>
                <span className="font-medium">{p.name}</span>
                <span className="text-[var(--chrome)]"> · {p.stack}</span>
                <span className="mt-0.5 block text-[var(--fg)]">{p.blurb}</span>
              </span>
              <StatusTag tone={p.status === "live" ? "live" : "muted"}>
                {p.status}
              </StatusTag>
            </button>
          </li>
        ))}
      </ul>
      <Hint>
        click a row for detail · or type &apos;open &lt;name&gt;&apos; · e.g. open
        pdf-inspector
      </Hint>
    </div>
  );
}

export function WorkDetail({ job }: { job: WorkItem }) {
  const where = [job.org, job.place, job.flag].filter(Boolean).join(" · ");
  return (
    <div className="space-y-1 text-[13px] leading-[1.5] sm:text-[15px]">
      <p className="font-medium">{job.title}</p>
      <p className="text-[var(--chrome)]">{where}</p>
      <p className="text-[var(--dim)]">
        {job.period || "dates not on record"} · {job.status}
      </p>
    </div>
  );
}

export function ProjectDetail({ project }: { project: ProjectItem }) {
  return (
    <div className="space-y-1 text-[13px] leading-[1.5] sm:text-[15px]">
      <p>
        <span className="font-medium">{project.name}</span>
        <span className="text-[var(--chrome)]"> · {project.stack}</span>
      </p>
      <p>{project.blurb}</p>
      <p>
        <ExtLink href={project.href}>{project.href.replace("https://", "")}</ExtLink>
      </p>
    </div>
  );
}

export function CvView({ prompt }: { prompt: string }) {
  const terminal = useTerminal();
  return (
    <div className="space-y-7 sm:space-y-8">
      <Block>
        <PromptLine prompt={prompt} command="ls work" />
        <WorkList onOpen={(id) => terminal?.run(`open work/${id}`)} />
      </Block>
      <Block>
        <PromptLine prompt={prompt} command="ls -l ./projects/" />
        <ProjectList
          onOpen={(name) => terminal?.run(`open ${name}`)}
        />
      </Block>
    </div>
  );
}
