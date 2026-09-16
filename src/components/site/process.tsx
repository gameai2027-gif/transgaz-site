import { processSteps } from "@/config/company";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

/**
 * Схема работы: четыре шага от заявки до отгрузки.
 * Горизонтальная линия на десктопе, вертикальная — на мобильном.
 */
export function Process() {
  return (
    <section className="bg-paper" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead
          id="process-title"
          index="03"
          title="Как мы работаем"
          sub="Прозрачная схема без «перезвоним в течение 3 дней»: у каждого шага есть срок и ответственный."
          tone="light"
        />

        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line-light bg-line-light sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 70} className="bg-paper">
              <div className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="display text-[34px] font-bold text-gas">{step.index}</span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px w-10 bg-line-light lg:block" />
                  )}
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-smoke">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="mono-label mt-6 text-smoke/80">
            * КП в течение 2 рабочих часов — в рабочее время: пн–пт, 09:00–18:00
          </p>
        </Reveal>
      </div>
    </section>
  );
}
