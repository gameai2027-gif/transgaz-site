import Image from "next/image";
import { Package, CreditCard, FileCheck, ClipboardList, Map, Truck } from "lucide-react";
import { conditions } from "@/config/company";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";
import { asset } from "@/lib/asset";

const icons = {
  package: Package,
  "credit-card": CreditCard,
  "file-check": FileCheck,
  "clipboard-list": ClipboardList,
  map: Map,
  truck: Truck,
} as const;

/**
 * Условия работы — bento-плитка: фото логистики крупно,
 * остальные условия компактными ячейками с hairline-границами.
 */
export function Conditions() {
  const main = conditions[5]; // Логистика — плитка с фото
  const rest = conditions.slice(0, 5);
  const MainIcon = icons[main.icon];

  return (
    <section id="conditions" className="scroll-mt-20 bg-paper-2/70" aria-labelledby="conditions-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead
          id="conditions-title"
          index="04"
          title="Условия работы"
          sub="Фиксируем всё, что обычно выясняется в переписке: партию, оплату, документы и логистику — до подписания договора."
          tone="light"
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line-light bg-line-light sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Крупная плитка: логистика */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <article className="relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden bg-ink text-paper">
              <Image
                src={asset("/images/tanker.jpg")}
                alt="Автоцистерна с сжиженным газом на площадке отгрузки"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" aria-hidden="true" />
              <div className="relative p-6 sm:p-7">
                <MainIcon size={22} className="text-gas" aria-hidden="true" />
                <h3 className="mt-3 text-[18px] font-semibold sm:text-[20px]">{main.k}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-paper/80">{main.v}</p>
              </div>
            </article>
          </Reveal>

          {rest.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <Reveal key={c.k} delay={60 + i * 50}>
                <article className="flex h-full flex-col bg-paper p-6 transition-colors hover:bg-paper-2/70 sm:p-7">
                  <Icon size={22} className="text-gas" aria-hidden="true" />
                  <h3 className="mt-4 text-[16px] font-semibold text-ink sm:text-[17px]">{c.k}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-smoke">{c.v}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
