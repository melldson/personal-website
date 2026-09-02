import { CvView } from "@/components/sections/CvView";
import { promptFor } from "@/lib/content";

export default function CvPage() {
  return <CvView prompt={promptFor("cv")} />;
}
