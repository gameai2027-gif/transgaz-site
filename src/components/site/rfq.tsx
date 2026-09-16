import { Clock, Mail, Phone } from "lucide-react";
import { LeadForm } from "./lead-form";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";
import { company } from "@/config/company";

const inKp = [
  "Цена с доставкой до вашего адреса — без «звёздочек» и скрытых наценок за плечо",
  "График поставок под ваш режим потребления, включая пиковые недели",
  "Условия оплаты и документы, которые понадобятся вашей бухгалтерии",
];

/**
 * Секция RFQ — главная конверсионная зона сайта.
 * Слева: что войдёт в КП и прямой контакт менеджера;
 * справа: форма из 5 полей — заполнение занимает около 30 секунд.
 */
export function Rfq() {
  return (
    <section id="rfq" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="rfq-title">
      <div className="bp-grid absolute inset-x-0 h-px" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <div>
            <SectionHead
              id="rfq-title"
              index="05"
              title="Запросить коммерческое предложение"
              sub="Пять полей — остальное уточним разговором, если потребуется."
              tone="dark"
            />

            <Reveal delay={120}>
              <ul className="mt-8 space-y-4 border-l border-line-dark pl-5">
                {inKp.map((t) => (
                  <li key={t} className="text-[14.5px] leading-relaxed text-paper/75">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 border border-line-dark bg-panel p-6">
                <p className="mono-label text-mist">Предпочитаете голосом?</p>
                <a
                  href={company.phoneHref}
                  className="display mt-3 flex items-center gap-3 text-[22px] text-paper transition-colors hover:text-gas sm:text-[26px]"
                >
                  <Phone size={22} className="text-gas" aria-hidden="true" />
                  {company.phone}
                </a>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13.5px] text-mist">
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-gas" aria-hidden="true" />
                    {company.hours}
                  </span>
                  <a href={`mailto:${company.emailSales}`} className="flex items-center gap-2 transition-colors hover:text-gas">
                    <Mail size={14} className="text-gas" aria-hidden="true" />
                    {company.emailSales}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="bg-paper p-6 text-ink shadow-2xl sm:p-8">
              <h3 className="display text-[18px] uppercase">Форма запроса</h3>
              <p className="mono-label mt-1.5 text-smoke">Обязательные поля отмечены *</p>
              <div className="mt-6">
                <LeadForm source="rfq" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
