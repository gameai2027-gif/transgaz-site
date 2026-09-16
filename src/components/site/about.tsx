import Image from "next/image";
import { company } from "@/config/company";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";
import { asset } from "@/lib/asset";

/**
 * О компании: живой текст без маркетингового тумана, подтверждаемые цифры
 * и реквизиты — блок, который закупщик проверяет перед первым договором.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead
          id="about-title"
          index="07"
          title="О компании"
          tone="dark"
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[440px_1fr] lg:gap-14">
          {/* Фотография резервуарного парка */}
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset("/images/lpg-tank.jpg")}
                  alt="Резервуар для хранения сжиженного газа на площадке поставщика"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
                <div className="absolute inset-0 border border-line-dark/50" aria-hidden="true" />
              </div>
              <figcaption className="mono-label mt-3 flex items-center gap-2 text-mist">
                <span aria-hidden="true" className="h-px w-6 bg-gas" />
                Резервуарный парк хранения СУГ
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <div className="space-y-5 text-[15px] leading-relaxed text-paper/80 sm:text-[16px]">
                <p>
                  {company.legalName} работает с {company.foundedYear} года. Мы оптовый поставщик:
                  выкупаем ресурс на нефтеперерабатывающих и газоперерабатывающих заводах
                  и доводим его до предприятий {company.regionFull} — от котельной до заправочной
                  станции.
                </p>
                <p>
                  За семь лет мы поняли простую вещь: закупщику нужна не «поставка газа вообще»,
                  а предсказуемость. Поэтому мы держим график отгрузок, показываем логистику
                  в цене отдельной строкой и прикладываем к каждой партии паспорт качества
                  без напоминаний.
                </p>
              </div>
            </Reveal>

            {/* Подтверждаемые цифры */}
            <Reveal delay={140}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line-dark bg-line-dark lg:grid-cols-4">
                {company.stats.map((s) => (
                  <div key={s.label} className="bg-panel p-5">
                    <dd className="display text-[26px] font-bold text-gas sm:text-[30px]">
                      {s.value}
                      <span className="text-[16px] font-semibold sm:text-[18px]">{s.suffix}</span>
                    </dd>
                    <dt className="mt-2 text-[12.5px] leading-snug text-mist">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Реквизиты — как у настоящего юрлица */}
            <Reveal delay={200}>
              <div className="mt-10 border border-line-dark">
                <div className="flex items-center justify-between border-b border-line-dark px-5 py-3.5">
                  <h3 className="mono-label text-mist">Реквизиты для договора</h3>
                  <span className="mono-label text-gas">проверено</span>
                </div>
                <dl className="divide-y divide-line-dark/70">
                  {company.requisites.map((r) => (
                    <div
                      key={r.label}
                      className="grid grid-cols-[120px_1fr] gap-4 px-5 py-3 sm:grid-cols-[180px_1fr]"
                    >
                      <dt className="mono-label pt-0.5 text-mist/80">{r.label}</dt>
                      <dd className="text-[14px] text-paper/90">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
