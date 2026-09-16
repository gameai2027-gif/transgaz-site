"use client";

import { Logo } from "./logo";
import { company } from "@/config/company";
import { useUi } from "./ui-context";
import { LeadButton } from "./lead-button";

const nav = [
  { href: "#products", label: "Продукция" },
  { href: "#conditions", label: "Условия" },
  { href: "#partners", label: "Партнёрам" },
  { href: "#about", label: "О компании" },
  { href: "#faq", label: "Вопросы и ответы" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  const { openLegal } = useUi();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-[#090c0f] text-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-mist">
              Оптовые поставки СУГ, природного газа, газового конденсата и ПНГ предприятиям
              {` ${company.regionFull}`} с {company.foundedYear} года.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <h3 className="mono-label text-mist/70">Разделы</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[14px] text-paper/75 transition-colors hover:text-gas">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mono-label text-mist/70">Документы</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => openLegal("privacy")}
                  className="text-left text-[14px] text-paper/75 transition-colors hover:text-gas"
                >
                  Политика обработки персональных данных
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegal("consent")}
                  className="text-left text-[14px] text-paper/75 transition-colors hover:text-gas"
                >
                  Согласие на обработку данных
                </button>
              </li>
              <li className="pt-2 text-[13px] leading-relaxed text-mist/80">
                ЭДО: {company.edo}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mono-label text-mist/70">Связь</h3>
            <a
              href={company.phoneHref}
              className="mt-4 block text-[16px] font-semibold text-paper transition-colors hover:text-gas"
            >
              {company.phone}
            </a>
            <a
              href={`mailto:${company.emailSales}`}
              className="mt-2 block text-[14px] text-paper/75 transition-colors hover:text-gas"
            >
              {company.emailSales}
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-mist">{company.addressShort}</p>
            <div className="mt-5">
              <LeadButton source="modal" variant="primary-sm">
                Запросить КП
              </LeadButton>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-6 text-[12.5px] leading-relaxed text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {company.foundedYear}–{year} {company.legalName}. ИНН {company.requisites[0].value}.
          </p>
          <p className="max-w-xl sm:text-right">
            Информация на сайте носит справочный характер и не является публичной офертой
            (ст. 437 ГК РФ). Цены уточняйте в коммерческом предложении.
          </p>
        </div>
      </div>
    </footer>
  );
}
