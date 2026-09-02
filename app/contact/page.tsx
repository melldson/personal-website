import { ContactView } from "@/components/sections/ContactView";
import { promptFor } from "@/lib/content";

export default function ContactPage() {
  return <ContactView prompt={promptFor("contact")} />;
}
