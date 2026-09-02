import { WritingView } from "@/components/sections/WritingView";
import { promptFor } from "@/lib/content";

export default function WritingPage() {
  return <WritingView prompt={promptFor("writing")} />;
}
