import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { products } from "@/config/company";
import { LeadButton } from "./lead-button";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

/**
 * Продукция в виде спецификационных листов: моно-таблица параметров,
 * бейдж норматива и точечный CTA. Такой формат читается инженерами
 * и закупщиками быстрее «маркетинговых» карточек.
 */
export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="products-title">
      {/* Фото-полоса: инженерная инфраструктура газового хозяйства */}
      <figure className="relative h-44 w-full overflow-hidden sm:h-60 lg:h-72">
        <Image
          src="/images/pipelines.jpg"
          alt="Технологические трубопроводы газорегуляторного пункта с жёлтой маркировкой газа"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" aria-hidden="true" />
        <figcaption className="mono-label absolute bottom-4 left-4 text-paper/80 sm:left-6">
          Газовое хозяйство: от узла учёта до горелки
        </figcaption>
      </figure>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="products-title"
            index="02"
            title="Продукция"
            sub="Четыре продуктовые линии оптового портфеля. Точная спецификация и цена с логистикой — в коммерческом предложении после вашего запроса."
            tone="dark"
          />
          <Reveal delay={120} className="shrink-0">
            <LeadButton source="modal" variant="outline-light">
              Получить прайс-лист
            </LeadButton>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 sm:mt-14">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <article className="flex h-full flex-col border border-line-dark bg-panel transition-colors hover:border-gas/60">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line-dark px-5 py-4 sm:px-7">
                  <h3 className="display text-[17px] uppercase text-paper sm:text-[19px]">{p.name}</h3>
                  <span className="mono-label border border-line-dark px-2.5 py-1 text-gas">{p.norm}</span>
                </header>

                <p className="px-5 pt-4 text-[14px] leading-relaxed text-mist sm:px-7">{p.short}</p>

                <dl className="mt-4 flex-1 px-5 sm:px-7">
                  {p.specs.map((s) => (
                    <div
                      key={s.k}
                      className="grid grid-cols-[128px_1fr] gap-4 border-t border-line-dark/60 py-2.5 text-[13.5px] sm:grid-cols-[150px_1fr]"
                    >
                      <dt className="mono-label pt-0.5 text-mist/80">{s.k}</dt>
                      <dd className="text-paper/90">{s.v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mx-5 mt-4 border-l-2 border-gas/70 pl-3 text-[13px] leading-relaxed text-mist sm:mx-7">
                  {p.note}
                </p>

                <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
                  <LeadButton source="modal" product={p.id} variant="outline-light" className="w-full sm:w-auto">
                    Запросить КП
                    <ArrowRight size={16} aria-hidden="true" />
                  </LeadButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
