import { ABOUT_MD } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(ABOUT_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
