import Image from "next/image";
import { ArrowDownRight, FileText, ClipboardCheck, BadgeCheck } from "lucide-react";
import { LeadButton } from "./lead-button";
import { Reveal } from "./reveal";
import { asset } from "@/lib/asset";

const trust = [
  { icon: BadgeCheck, text: "Работаем с 2018 года" },
  { icon: FileText, text: "Паспорт качества на каждую партию" },
  { icon: ClipboardCheck, text: "ЭДО: Диадок, СБИС" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      {/* Фотография производства + затемнение + чертёжная сетка */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={asset("/images/plant-dusk.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/72 via-ink/55 to-ink" />
        <div className="bp-grid absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:pb-16 lg:pt-24">
        <Reveal>
          <p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1 text-gas">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-gas" />
            Оптовые поставки газа · Уфа / Республика Башкортостан
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mt-6 max-w-4xl text-[clamp(30px,7.2vw,64px)] uppercase text-paper">
            Снабжаем предприятия{" "}
            <span className="text-gas">сжиженным газом</span> без срывов графика
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-paper/75 sm:text-[17px]">
            СУГ, природный газ, газовый конденсат и ПНГ. Отгружаем партии от одной автоцистерны
            по Уфе и Республике Башкортостан, документооборот ведём через ЭДО.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LeadButton source="rfq" variant="primary" className="sm:min-w-[280px]">
              Запросить КП
              <ArrowDownRight size={18} aria-hidden="true" />
            </LeadButton>
            <a
              href="#products"
              className="inline-flex min-h-[52px] items-center justify-center border border-paper/25 px-7 text-[15px] font-semibold text-paper transition-colors hover:border-gas hover:text-gas"
            >
              Смотреть продукцию
            </a>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <ul className="mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {trust.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-[14px] text-paper/70">
                <Icon size={16} className="shrink-0 text-gas" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
