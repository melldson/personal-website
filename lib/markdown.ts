import {
  ABOUT_PARAGRAPHS,
  CONTACT_PORTS,
  LINKS,
  PROJECTS,
  SITE,
  UPDATES,
  WORK,
} from "./content";

export const ABOUT_MD = `# Melldson Soliz

> ${SITE.oneLiner}

## profile

- **name**: ${SITE.name}
- **role**: ${SITE.role}
- **org**: ${SITE.org}
- **location**: ${SITE.location}
- **focus**: ${SITE.focus}

## about

${ABOUT_PARAGRAPHS.map((p) => `> ${p}`).join("\n>\n")}

## links

- [github](${LINKS.github})
- [linkedin](${LINKS.linkedin})

## recent

${UPDATES.map((u) => `- \`${u.date}\` *${u.kind}* — ${u.text}`).join("\n")}
`;

export const CV_MD = `# CV

## work

${WORK.map((w) => {
  const where = [w.org, w.place, w.flag].filter(Boolean).join(" · ");
  const period = w.period ? ` · ${w.period}` : "";
  return `- **${w.title}** — ${where}${period} · ${w.status}`;
}).join("\n")}

## projects

${PROJECTS.map(
  (p) =>
    `- **[${p.name}](${p.href})** — ${p.stack} · ${p.blurb} · ${p.status}`,
).join("\n")}
`;

export const WRITING_MD = `# writing

No posts yet.
`;

export const CONTACT_MD = `# contact

host is up · open to work, collaboration, infrastructure/security conversations.

${CONTACT_PORTS.map(
  (p) =>
    `- **${p.port}** — ${p.state}${p.href ? ` · ${p.href}` : ""} · ${p.service}`,
).join("\n")}
`;

export const PLAY_MD = `# play

A small terminal sandbox. Type a command, or try \`fortune\`.
`;

export const LLMS_TXT = `# Melldson Soliz

> ${SITE.oneLiner}

Staff DevSecOps Engineer at Everysk Technologies. Brazil.

This file is the machine-readable version of this site.
Individual page: /md/about

---

${ABOUT_MD}

---

${CV_MD}

---

${WRITING_MD}

---

${CONTACT_MD}
`;

export function markdownForSection(
  section: "about" | "cv" | "writing" | "contact" | "play",
) {
  switch (section) {
    case "cv":
      return CV_MD;
    case "writing":
      return WRITING_MD;
    case "contact":
      return CONTACT_MD;
    case "play":
      return PLAY_MD;
    default:
      return ABOUT_MD;
  }
}
