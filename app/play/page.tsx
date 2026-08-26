import { PlayView } from "@/components/sections/PlayView";
import { promptFor } from "@/lib/content";

export default function PlayPage() {
  return <PlayView prompt={promptFor("play")} />;
}
