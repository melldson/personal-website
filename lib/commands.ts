import { LINKS, PROJECTS, WORK } from "./content";
import { PLAY_OUTPUT } from "./play";

export type CommandResult =
  | { kind: "clear" }
  | { kind: "navigate"; href: string }
  | { kind: "open-url"; url: string }
  | { kind: "view"; view: ViewId; arg?: string }
  | { kind: "text"; text: string }
  | { kind: "error"; message: string }
  | { kind: "noop" };

export type ViewId =
  | "whois"
  | "about"
  | "links"
  | "updates"
  | "work"
  | "projects"
  | "work-detail"
  | "project-detail"
  | "nmap"
  | "help"
  | "writing"
  | "fortune";

const NAV: Record<string, string> = {
  about: "/",
  home: "/",
  cv: "/cv",
  writing: "/writing",
  contact: "/contact",
  play: "/play",
};

export const COMPLETIONS = [
  "whois",
  "whois melldson",
  "cat",
  "cat about.txt",
  "cat links.txt",
  "tail",
  "tail updates.log",
  "ls",
  "ls work",
  "ls projects",
  "ls -l ./projects/",
  "nmap",
  "nmap melldson",
  "open",
  "open everysk",
  "open pdf-inspector",
  "open work/1",
  "help",
  "clear",
  "about",
  "cv",
  "writing",
  "contact",
  "play",
  "fortune",
  "kubectl get pods",
  "kubectl get nodes",
  "uptime",
  "whoami",
  "pwd",
  "top",
  "terraform plan",
  "ping",
  "helm",
];

export function runCommand(raw: string): CommandResult {
  const line = raw.trim().replace(/\s+/g, " ");
  if (!line) return { kind: "noop" };
  const lower = line.toLowerCase();
  const [cmd, ...rest] = lower.split(" ");
  const arg = rest.join(" ");

  if (cmd === "clear" || cmd === "cls") return { kind: "clear" };
  if (cmd === "help" || cmd === "?") return { kind: "view", view: "help" };

  if (cmd === "whois" || cmd === "whoami") {
    if (!arg || arg === "melldson" || cmd === "whoami") {
      return { kind: "view", view: "whois" };
    }
    return { kind: "error", message: `whois: no match for '${rest.join(" ")}'` };
  }

  if (cmd === "cat") {
    if (!arg || arg === "about.txt" || arg === "about") {
      return { kind: "view", view: "about" };
    }
    if (arg === "links.txt" || arg === "links") {
      return { kind: "view", view: "links" };
    }
    return { kind: "error", message: `cat: ${arg}: no such file` };
  }

  if (cmd === "tail") {
    return { kind: "view", view: "updates" };
  }

  if (cmd === "ls") {
    if (!arg || arg === "work" || arg === "./work" || arg === "work/") {
      return { kind: "view", view: "work" };
    }
    if (
      arg.includes("project") ||
      arg === "-l" ||
      arg.startsWith("-l ")
    ) {
      return { kind: "view", view: "projects" };
    }
    if (arg === "education" || arg === "./education") {
      return {
        kind: "text",
        text: "ls: education: not mounted — no verified degrees on this host.",
      };
    }
    return { kind: "error", message: `ls: ${arg}: no such file or directory` };
  }

  if (cmd === "nmap") {
    return { kind: "view", view: "nmap" };
  }

  if (cmd === "open" || cmd === "cd") {
    return openThing(arg || rest.join(" "));
  }

  if (cmd && NAV[cmd]) {
    return { kind: "navigate", href: NAV[cmd] };
  }

  if (cmd === "fortune" || lower === "feeling lucky") {
    return { kind: "view", view: "fortune" };
  }

  if (lower === "kubectl get pods" || lower === "kubectl get po") {
    return { kind: "text", text: PLAY_OUTPUT["kubectl get pods"] };
  }
  if (lower === "kubectl get nodes" || lower === "kubectl get no") {
    return { kind: "text", text: PLAY_OUTPUT["kubectl get nodes"] };
  }
  if (cmd === "kubectl") {
    return {
      kind: "text",
      text: "error: you must specify a resource.\ntry: kubectl get pods · kubectl get nodes",
    };
  }
  if (cmd === "uptime") return { kind: "text", text: PLAY_OUTPUT.uptime };
  if (cmd === "pwd") return { kind: "text", text: PLAY_OUTPUT.pwd };
  if (cmd === "top") return { kind: "text", text: PLAY_OUTPUT.top };
  if (cmd === "ping") return { kind: "text", text: PLAY_OUTPUT.ping };
  if (cmd === "helm") return { kind: "text", text: PLAY_OUTPUT.helm };
  if (cmd === "date") return { kind: "text", text: PLAY_OUTPUT.date };
  if (cmd === "terraform") {
    return { kind: "text", text: PLAY_OUTPUT["terraform plan"] };
  }

  return {
    kind: "error",
    message: `command not found: ${line} — type 'help'`,
  };
}

function openThing(raw: string): CommandResult {
  const arg = raw.trim().toLowerCase();
  if (!arg) {
    return {
      kind: "error",
      message: "open: missing operand · try 'open everysk' or 'open work/1'",
    };
  }

  if (NAV[arg]) return { kind: "navigate", href: NAV[arg] };

  if (arg === "github" || arg === "gh") {
    return { kind: "open-url", url: LINKS.github };
  }
  if (arg === "linkedin") {
    return { kind: "open-url", url: LINKS.linkedin };
  }

  const workPath = arg.match(/^work\/(\d+)$/);
  if (workPath) {
    const id = Number(workPath[1]);
    const job = WORK.find((w) => w.id === id);
    if (!job) return { kind: "error", message: `open: work/${id}: not found` };
    return { kind: "view", view: "work-detail", arg: String(job.id) };
  }

  const projPath = arg.match(/^projects?\/(\d+)$/);
  if (projPath) {
    const id = Number(projPath[1]);
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) {
      return { kind: "error", message: `open: projects/${id}: not found` };
    }
    return { kind: "view", view: "project-detail", arg: project.name };
  }

  const job = WORK.find(
    (w) =>
      w.aliases.some((a) => a === arg || arg.includes(a)) ||
      w.org.toLowerCase().includes(arg) ||
      w.title.toLowerCase().includes(arg),
  );
  if (job && (arg.includes("everysk") || arg.includes("metadados") || job.aliases.includes(arg))) {
    return { kind: "view", view: "work-detail", arg: String(job.id) };
  }

  const project = PROJECTS.find(
    (p) => p.name.toLowerCase() === arg || arg.includes(p.name.toLowerCase()),
  );
  if (project) {
    return { kind: "view", view: "project-detail", arg: project.name };
  }

  if (arg.includes("everysk")) {
    return { kind: "view", view: "work-detail", arg: "1" };
  }
  if (arg.includes("metadados")) {
    return { kind: "view", view: "work-detail", arg: "4" };
  }

  return { kind: "error", message: `open: '${raw}': nothing matches` };
}

export function tabComplete(input: string): string {
  const q = input.trimStart();
  if (!q) return input;
  const hits = COMPLETIONS.filter((c) => c.startsWith(q.toLowerCase()));
  if (hits.length === 1) return hits[0]!;
  if (hits.length > 1) {
    const prefix = commonPrefix(hits);
    return prefix.length > q.length ? prefix : input;
  }
  return input;
}

function commonPrefix(items: string[]) {
  if (items.length === 0) return "";
  let prefix = items[0]!;
  for (const item of items.slice(1)) {
    let i = 0;
    while (i < prefix.length && i < item.length && prefix[i] === item[i]) i += 1;
    prefix = prefix.slice(0, i);
  }
  return prefix;
}
