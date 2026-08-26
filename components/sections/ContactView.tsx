import { CONTACT_PORTS } from "@/lib/content";
import { Block, ExtLink, PromptLine } from "../marks";

export function NmapTable() {
  return (
    <div className="text-[13px] leading-[1.5] sm:text-[15px]">
      <p className="mb-3 text-[var(--live)]">
        host is up · open to work, collaboration, infrastructure/security
        conversations
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <thead>
            <tr className="text-[var(--chrome)]">
              <th className="w-8 font-normal">#</th>
              <th className="w-28 font-normal">PORT</th>
              <th className="w-24 font-normal">STATE</th>
              <th className="font-normal">SERVICE</th>
            </tr>
            <tr>
              <td colSpan={4} className="pb-2">
                <span className="block h-px bg-[#ffffff22]" />
              </td>
            </tr>
          </thead>
          <tbody>
            {CONTACT_PORTS.map((p) => (
              <tr key={p.id} className="align-baseline">
                <td className="py-0.5 text-[var(--dim)]">{p.id}</td>
                <td className="py-0.5">
                  {p.href ? (
                    <ExtLink href={p.href}>{p.port}</ExtLink>
                  ) : (
                    p.port
                  )}
                </td>
                <td
                  className={
                    p.state === "open"
                      ? "py-0.5 text-[var(--live)]"
                      : "py-0.5 text-[var(--dim)]"
                  }
                >
                  {p.state}
                </td>
                <td className="py-0.5 text-[var(--chrome)]">{p.service}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ContactView({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-7 sm:space-y-8">
      <Block>
        <PromptLine prompt={prompt} command="nmap melldson" />
        <NmapTable />
      </Block>
    </div>
  );
}
