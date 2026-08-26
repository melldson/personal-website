export const SITE = {
  title: "melldson",
  handle: "melldson",
  name: "Melldson Soliz",
  oneLiner:
    "Staff DevSecOps at Everysk. I keep the platform and security layer quiet enough that the product can move.",
  role: "Staff DevSecOps Engineer",
  org: "Everysk Technologies",
  location: "Brazil",
  focus: "Kubernetes · GCP · CI/CD · security",
} as const;

export const LINKS = {
  github: "https://github.com/melldson",
  linkedin: "https://www.linkedin.com/in/melldson",
} as const;

export const BIOS = {
  headerLeft: "MELLDSON BIOS",
  headerRight: "melldson",
  rows: [
    { label: "Manufactured", value: "Brazil" },
    { label: "Firmware", value: "DevSecOps · GCP · Kubernetes" },
    { label: "Locales", value: "pt · en" },
    { label: "Volumes mounted", value: "/metadados /everysk" },
    { label: "Root filesystem", value: "/brazil · triathlon" },
    { label: "Starting session", value: "ready when you are" },
  ],
} as const;

export const ABOUT_PARAGRAPHS = [
  "I run platform and security at Everysk, an automation platform for investment operations. Kubernetes, GCP, pipelines, and making security the default instead of a scramble.",
  "Before DevOps I was a software engineer on the same team. Before Everysk I did BI and IT at Metadados in Caxias do Sul.",
  "Outside of work I train triathlon. Based in Brazil.",
] as const;

export const UPDATES = [
  {
    date: "2024-11",
    kind: "cert",
    text: "Google Cloud Associate Cloud Engineer",
  },
  {
    date: "2022-08",
    kind: "role",
    text: "moved from software engineering into DevOps at Everysk",
  },
  {
    date: "2021-09",
    kind: "joined",
    text: "joined Everysk as a software engineer",
  },
] as const;

export type WorkItem = {
  id: number;
  period: string;
  title: string;
  org: string;
  place?: string;
  flag?: string;
  status: "current" | "past";
  aliases: string[];
};

export const WORK: WorkItem[] = [
  {
    id: 1,
    period: "Aug 2022 –",
    title: "Staff DevSecOps Engineer",
    org: "Everysk Technologies",
    flag: "🇧🇷",
    status: "current",
    aliases: ["everysk", "devsecops", "staff"],
  },
  {
    id: 2,
    period: "Sep 2021 – Aug 2022",
    title: "Software Engineer",
    org: "Everysk Technologies",
    flag: "🇧🇷",
    status: "past",
    aliases: ["swe", "software"],
  },
  {
    id: 3,
    period: "",
    title: "Data Analyst",
    org: "Metadados",
    status: "past",
    aliases: ["data", "analyst"],
  },
  {
    id: 4,
    period: "Feb 2018 – Aug 2019",
    title: "IT Analyst",
    org: "Metadados",
    place: "Caxias do Sul",
    flag: "🇧🇷",
    status: "past",
    aliases: ["it", "metadados"],
  },
];

export type ProjectItem = {
  id: number;
  name: string;
  stack: string;
  blurb: string;
  href: string;
  status: "live" | "past";
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "pdf-inspector",
    stack: "rust",
    blurb:
      "Fast PDF inspection/classification/text extraction (scanned vs text).",
    href: "https://github.com/melldson/pdf-inspector",
    status: "live",
  },
];

export const CONTACT_PORTS = [
  {
    id: 1,
    port: "github",
    state: "open" as const,
    service: "code · building together",
    href: LINKS.github,
  },
  {
    id: 2,
    port: "linkedin",
    state: "open" as const,
    service: "professional network",
    href: LINKS.linkedin,
  },
  {
    id: 3,
    port: "cold-sales",
    state: "filtered" as const,
    service: "—",
    href: null,
  },
];

export const TABS = [
  { id: "about", href: "/", promptHost: "home" },
  { id: "cv", href: "/cv", promptHost: "cv" },
  { id: "writing", href: "/writing", promptHost: "writing" },
  { id: "contact", href: "/contact", promptHost: "contact" },
  { id: "play", href: "/play", promptHost: "play" },
] as const;

export type SectionId = (typeof TABS)[number]["id"];

export function promptFor(section: SectionId) {
  const tab = TABS.find((t) => t.id === section) ?? TABS[0];
  return `melldson@${tab.promptHost}:~$`;
}

export function sectionFromPath(pathname: string): SectionId {
  if (pathname.startsWith("/cv")) return "cv";
  if (pathname.startsWith("/writing")) return "writing";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/play")) return "play";
  return "about";
}
