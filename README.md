# melldson

Personal site for Melldson Soliz — a small fake desktop OS with a terminal, not a conventional portfolio.

Staff DevSecOps at Everysk. I keep the platform and security layer quiet enough that the product can move.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## What’s here

- Boot overlay, then a windowed terminal on a risograph-style wallpaper
- Tabs: about, cv, writing, contact, play
- Interactive prompt (`whois`, `cat`, `ls`, `nmap`, `open`, `help`, `clear`, plus a few play commands)
- `human | agent` — agent mode shows markdown and links to `/md/about` and `/llms.txt`
- Dock: GitHub and LinkedIn

## Stack

Next.js App Router, TypeScript, Tailwind CSS. No backend.
