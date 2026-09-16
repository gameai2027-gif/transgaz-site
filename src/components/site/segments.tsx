import { ArrowUpRight } from "lucide-react";
import { segments } from "@/config/company";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Segments() {
  return (
    <section className="bg-paper" aria-labelledby="segments-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead
          id="segments-title"
          index="01"
          title="Кому поставляем"
          sub="Шесть отраслей — шесть разных графиков отгрузки. Под каждый подбираем схему поставки, а не продаём «один размер для всех»."
          tone="light"
        />

        <ul className="mt-10 border-t border-line-light sm:mt-14">
          {segments.map((s, i) => (
            <Reveal as="li" key={s.index} delay={i * 40}>
              <div className="group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 border-b border-line-light py-5 transition-colors hover:bg-paper-2/60 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-x-8 sm:py-6">
                <span className="mono-label pt-1 text-gas sm:pt-0">{s.index}</span>
                <div className="sm:max-w-3xl">
                  <h3 className="text-[17px] font-semibold text-ink sm:text-[19px]">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-smoke sm:text-[15px]">{s.desc}</p>
                </div>
                <a
                  href="#rfq"
                  aria-label={`Запросить КП для сегмента: ${s.title}`}
                  className="hidden size-11 items-center justify-center border border-line-light text-ink/50 transition-all group-hover:border-gas group-hover:text-gas sm:flex"
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
