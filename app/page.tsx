import { AboutView } from "@/components/sections/AboutView";
import { promptFor } from "@/lib/content";

export default function HomePage() {
  return <AboutView prompt={promptFor("about")} />;
}
