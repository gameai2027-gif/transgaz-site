import { Percent, Anchor, ArrowUpWideNarrow, FileCheck2 } from "lucide-react";
import { partnersBenefits } from "@/config/company";
import { LeadButton } from "./lead-button";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

const icons = [Percent, Anchor, ArrowUpWideNarrow, FileCheck2];

export function Partners() {
  return (
    <section id="partners" className="scroll-mt-20 bg-paper" aria-labelledby="partners-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead
          id="partners-title"
          index="06"
          title="Дистрибьюторам и партнёрам"
          sub="Для АГЗС, региональных дистрибьюторов и крупных закупщиков действуют отдельные условия — не те, что в базовом прайсе."
          tone="light"
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line-light bg-line-light sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {partnersBenefits.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={b.title} delay={i * 60}>
                <article className="flex h-full flex-col bg-paper p-6 transition-colors hover:bg-paper-2/70 sm:p-7">
                  <Icon size={22} className="text-gas" aria-hidden="true" />
                  <h3 className="mt-4 text-[16px] font-semibold text-ink sm:text-[17px]">{b.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-smoke">{b.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CTA-полоса партнёрства */}
        <Reveal delay={160}>
          <div className="bp-grid-light mt-10 flex flex-col gap-6 border border-ink/12 bg-ink px-6 py-8 text-paper sm:items-center sm:justify-between sm:px-10 sm:py-10 lg:flex-row">
            <div className="max-w-2xl">
              <h3 className="display text-[20px] uppercase sm:text-[24px]">Обсудить партнёрскую схему</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-paper/75">
                Расскажите про ваш регион и объёмы — за один звонок поймём, есть ли экономика
                партнёрства, и вышлом расчёт маржи по СУГ.
              </p>
            </div>
            <LeadButton source="partners" variant="primary" className="shrink-0">
              Стать партнёром
            </LeadButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
