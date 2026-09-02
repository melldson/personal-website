"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { runCommand, tabComplete, type CommandResult } from "@/lib/commands";
import {
  PROJECTS,
  TABS,
  WORK,
  promptFor,
  sectionFromPath,
} from "@/lib/content";
import { fortune } from "@/lib/play";
import { TerminalContext } from "./terminal-context";
import { AgentView } from "./AgentView";
import { BootOverlay } from "./BootOverlay";
import { Dock } from "./Dock";
import { Block, PromptLine } from "./marks";
import {
  AboutText,
  LinksLine,
  UpdatesLog,
  WhoisCard,
} from "./sections/AboutView";
import { NmapTable } from "./sections/ContactView";
import {
  ProjectDetail,
  ProjectList,
  WorkDetail,
  WorkList,
} from "./sections/CvView";
import { Wallpaper } from "./Wallpaper";

type WindowMode = "windowed" | "maximized" | "minimized" | "closed";
type Mode = "human" | "agent";

type Extra = {
  id: number;
  prompt: string;
  command: string;
  result: CommandResult;
};

export function Desktop({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const section = sectionFromPath(pathname);
  const prompt = promptFor(section);

  const [booted, setBooted] = useState(false);
  const [windowMode, setWindowMode] = useState<WindowMode>("windowed");
  const [mode, setMode] = useState<Mode>("human");
  const [extras, setExtras] = useState<Extra[]>([]);
  const [cleared, setCleared] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [pathSeen, setPathSeen] = useState(pathname);
  const extraId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(
    null,
  );

  if (pathSeen !== pathname) {
    setPathSeen(pathname);
    setExtras([]);
    setCleared(false);
    setValue("");
  }

  useEffect(() => {
    if (extras.length === 0) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [extras]);

  const finishBoot = useCallback(() => {
    setBooted(true);
  }, []);

  const applyResult = useCallback(
    (command: string, result: CommandResult) => {
      if (result.kind === "noop") return;
      if (result.kind === "clear") {
        setCleared(true);
        setExtras([]);
        return;
      }
      if (result.kind === "navigate") {
        router.push(result.href);
        return;
      }
      if (result.kind === "open-url") {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }
      extraId.current += 1;
      setExtras((prev) => [
        ...prev,
        {
          id: extraId.current,
          prompt,
          command,
          result,
        },
      ]);
    },
    [prompt, router],
  );

  const run = useCallback(
    (command: string) => {
      const trimmed = command.trim();
      if (!trimmed) return;
      setHistory((h) => [trimmed, ...h.filter((x) => x !== trimmed)].slice(0, 40));
      setHistIdx(-1);
      setValue("");
      applyResult(trimmed, runCommand(trimmed));
    },
    [applyResult],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const placeholder =
    section === "about"
      ? "try 'whois melldson' or navigate — type 'help'"
      : section === "play"
        ? "type anything"
        : "navigate — type 'help'";

  const footerHint =
    section === "about"
      ? "try 'whois melldson' or navigate — type 'help'"
      : "navigate — type 'help'";

  const isMax = windowMode === "maximized";
  const hidden = windowMode === "closed" || windowMode === "minimized";

  return (
    <TerminalContext.Provider value={{ run }}>
      {!booted ? <BootOverlay onDone={finishBoot} /> : null}
      <div className="desk relative flex h-[100dvh] flex-col items-center overflow-hidden font-mono text-base text-[var(--fg)]">
        <Wallpaper />
        {windowMode !== "maximized" ? <Dock /> : null}

        {windowMode === "minimized" ? (
          <button
            type="button"
            className="absolute bottom-20 z-40 hidden rounded-md border border-[#1a1a17]/20 bg-[#f7f4ee] px-3 py-1.5 text-[11px] tracking-wide text-[#1a1a17] shadow-[2px_2px_0_rgba(27,27,31,0.16)] sm:block"
            onClick={() => setWindowMode("windowed")}
          >
            melldson — terminal
          </button>
        ) : null}

        {windowMode === "closed" ? (
          <button
            type="button"
            aria-label="reopen terminal"
            className="absolute inset-0 z-10 hidden sm:block"
            onClick={() => setWindowMode("windowed")}
          />
        ) : null}

        <div
          className={`pointer-events-none relative z-10 flex h-full w-full items-center justify-center overflow-hidden sm:px-8 sm:pt-10 sm:pb-20 ${hidden ? "sm:invisible sm:pointer-events-none" : ""}`}
        >
          <div
            role="group"
            aria-label={`${prompt}  —  terminal`}
            className={`term pointer-events-auto flex flex-col overflow-hidden sm:transition-[max-width,height,border-radius] duration-300 ${
              isMax
                ? "fixed inset-0 z-[60] h-full rounded-none"
                : "fixed inset-0 z-40 sm:relative sm:inset-auto sm:z-auto sm:h-[min(76vh,calc(100dvh-9rem))] sm:w-full sm:max-w-3xl sm:rounded-xl sm:border sm:border-[var(--frame-edge)]"
            }`}
            style={{
              transform:
                isMax || windowMode !== "windowed"
                  ? undefined
                  : `translate(${pos.x}px, ${pos.y}px)`,
              boxShadow: isMax ? "none" : "var(--frame-shadow)",
              background: "var(--frame-fill)",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <div
              className="relative flex cursor-grab items-stretch select-none sm:gap-3 sm:px-2"
              style={{ background: "var(--frame-fill)" }}
              onDoubleClick={() =>
                setWindowMode((m) => (m === "maximized" ? "windowed" : "maximized"))
              }
              onPointerDown={(e) => {
                if (window.innerWidth < 640 || isMax) return;
                if ((e.target as HTMLElement).closest("a,button")) return;
                drag.current = {
                  x: pos.x,
                  y: pos.y,
                  px: e.clientX,
                  py: e.clientY,
                };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!drag.current) return;
                setPos({
                  x: drag.current.x + (e.clientX - drag.current.px),
                  y: drag.current.y + (e.clientY - drag.current.py),
                });
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
            >
              <nav className="flex min-w-0 flex-1 items-stretch overflow-x-auto sm:overflow-visible">
                {TABS.map((tab) => {
                  const active = tab.id === section;
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative shrink-0 px-3.5 py-3 text-[12px] tracking-wide transition-colors duration-150 sm:px-4 sm:py-2.5 ${
                        active
                          ? "text-[var(--fg)]"
                          : "text-[var(--chrome)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent)]"
                        />
                      ) : null}
                      {tab.id}
                    </Link>
                  );
                })}
              </nav>
              <div className="group/ctl ml-auto hidden items-center gap-2 self-center pr-3 sm:flex">
                <WindowDot
                  label="Minimize"
                  color="var(--ctl-min)"
                  glyph="–"
                  onClick={() => setWindowMode("minimized")}
                />
                <WindowDot
                  label={isMax ? "Restore" : "Maximize"}
                  color="var(--ctl-max)"
                  glyph="□"
                  onClick={() =>
                    setWindowMode((m) =>
                      m === "maximized" ? "windowed" : "maximized",
                    )
                  }
                />
                <WindowDot
                  label="Close"
                  color="var(--ctl-close)"
                  glyph="✕"
                  onClick={() => setWindowMode("closed")}
                />
              </div>
            </div>

            <div
              ref={scrollRef}
              className="term-scroll flex min-h-0 flex-1 cursor-text flex-col overflow-y-auto overscroll-contain bg-[var(--term-bg)] font-mono text-[13px] text-[var(--fg)] sm:text-[15px]"
            >
              <div className="w-full space-y-6 px-4 pt-5 pb-8 sm:space-y-7 sm:px-8 sm:pt-6 sm:pb-8">
                {mode === "agent" ? (
                  <AgentView section={section} />
                ) : (
                  <>
                    {!cleared ? children : null}
                    {extras.map((item) => (
                      <ExtraBlock key={item.id} item={item} />
                    ))}
                    <form onSubmit={onSubmit} className="flex items-center gap-3">
                      <span className="shrink-0 font-medium text-[var(--accent)] select-none">
                        <span className="sm:hidden">
                          {prompt.replace(/^melldson@/, "")}
                        </span>
                        <span className="hidden sm:inline">{prompt}</span>
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <input
                          ref={inputRef}
                          type="text"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          enterKeyHint="go"
                          placeholder={placeholder}
                          aria-label="terminal input"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Tab") {
                              e.preventDefault();
                              setValue(tabComplete(value));
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              const next = Math.min(histIdx + 1, history.length - 1);
                              if (history[next]) {
                                setHistIdx(next);
                                setValue(history[next]!);
                              }
                            } else if (e.key === "ArrowDown") {
                              e.preventDefault();
                              const next = histIdx - 1;
                              if (next < 0) {
                                setHistIdx(-1);
                                setValue("");
                              } else {
                                setHistIdx(next);
                                setValue(history[next]!);
                              }
                            }
                          }}
                          className="w-full rounded-md bg-transparent px-0 py-1 font-[inherit] text-[var(--fg)] outline-none placeholder:text-[var(--dim)] focus:px-2 focus:ring-1 focus:ring-[var(--accent)]"
                        />
                      </span>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div
              className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--border)] px-4 py-1.5 text-[11px] tracking-wide select-none sm:px-8 sm:py-2"
              style={{
                paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
                background: "var(--frame-fill)",
              }}
            >
              <span className="hidden text-[var(--chrome)] sm:inline">
                {footerHint}
              </span>
              <span className="text-[var(--chrome)] sm:hidden">type help</span>
              <div className="ml-auto flex items-center gap-1 text-[var(--chrome)]">
                <button
                  type="button"
                  className={mode === "human" ? "text-[var(--fg)] underline" : ""}
                  onClick={() => setMode("human")}
                >
                  human
                </button>
                <span aria-hidden>|</span>
                <button
                  type="button"
                  className={mode === "agent" ? "text-[var(--fg)] underline" : ""}
                  onClick={() => setMode("agent")}
                >
                  agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TerminalContext.Provider>
  );
}

function WindowDot({
  label,
  color,
  glyph,
  onClick,
}: {
  label: string;
  color: string;
  glyph: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ background: color }}
      className="flex h-[11px] w-[11px] items-center justify-center rounded-full text-[8px] leading-none text-transparent transition-[filter,color] duration-150 hover:brightness-95 group-hover/ctl:text-[rgba(38,32,20,0.55)]"
    >
      {glyph}
    </button>
  );
}

function ExtraBlock({ item }: { item: Extra }) {
  return (
    <Block>
      <PromptLine prompt={item.prompt} command={item.command} />
      <ResultView result={item.result} />
    </Block>
  );
}

function ResultView({ result }: { result: CommandResult }) {
  if (result.kind === "error") {
    return <p className="text-[var(--dim)]">{result.message}</p>;
  }
  if (result.kind === "text") {
    return (
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-[1.5] sm:text-[15px]">
        {result.text}
      </pre>
    );
  }
  if (result.kind === "open-url") {
    return <p className="text-[var(--dim)]">opened in a new tab</p>;
  }
  if (result.kind !== "view") return null;

  switch (result.view) {
    case "whois":
      return <WhoisCard />;
    case "about":
      return <AboutText />;
    case "links":
      return <LinksLine />;
    case "updates":
      return <UpdatesLog />;
    case "work":
      return <WorkList />;
    case "projects":
      return <ProjectList />;
    case "nmap":
      return <NmapTable />;
    case "writing":
      return (
        <p className="text-[var(--dim)]">no posts yet — ls ./posts/ is empty</p>
      );
    case "fortune":
      return <p>{fortune()}</p>;
    case "help":
      return <HelpText />;
    case "work-detail": {
      const job = WORK.find((w) => String(w.id) === result.arg);
      return job ? <WorkDetail job={job} /> : <p>not found</p>;
    }
    case "project-detail": {
      const project = PROJECTS.find((p) => p.name === result.arg);
      return project ? <ProjectDetail project={project} /> : <p>not found</p>;
    }
    default:
      return null;
  }
}

function HelpText() {
  return (
    <pre className="whitespace-pre-wrap font-mono text-[13px] leading-[1.5] text-[var(--fg)] sm:text-[15px]">{`commands
  whois [melldson]     identity
  cat about.txt        bio
  cat links.txt        github, linkedin
  tail updates.log     recent
  ls work              roles
  ls projects          side projects
  nmap melldson        contact ports
  open <name>          role, project, or tab
  about cv writing contact play
  help                 this list
  clear                clear the buffer

play extras
  fortune · kubectl get pods · uptime · top`}</pre>
  );
}

