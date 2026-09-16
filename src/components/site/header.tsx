"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./logo";
import { LeadButton } from "./lead-button";
import { company } from "@/config/company";

const nav = [
  { href: "#products", label: "Продукция" },
  { href: "#conditions", label: "Условия" },
  { href: "#partners", label: "Партнёрам" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Блокировка прокрутки под меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Закрытие меню по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-[60] border-b border-line-dark bg-ink/95 backdrop-blur-md">
      {/* Техническая строка — видна с планшета */}
      <div className="hidden border-b border-line-dark/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <p className="mono-label text-mist/80">Отгрузка по Уфе и РБ · Пн–Пт 09:00–18:00</p>
          <a
            href={`mailto:${company.emailSales}`}
            className="mono-label text-mist/80 transition-colors hover:text-gas"
          >
            {company.emailSales}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label={`${company.legalName} — на главную`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        {/* Навигация — десктоп */}
        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-paper/85 transition-colors hover:text-gas"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-[14px] font-semibold text-paper transition-colors hover:text-gas xl:flex"
          >
            <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
            {company.phone}
          </a>
          <span className="hidden sm:block">
            <LeadButton source="modal" variant="primary-sm">
              Запросить КП
            </LeadButton>
          </span>

          {/* Бургер — мобильный */}
          <button
            type="button"
            className="flex size-11 items-center justify-center text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>

    {/* Мобильное меню — сиблинг шапки: backdrop-blur шапки не должен создавать
        containing block для fixed-шторки (иначе она схлопывается) */}
    {open && (
      <div
        id="mobile-menu"
        className="fixed inset-x-0 bottom-0 top-[64px] z-[55] flex flex-col bg-ink lg:hidden"
      >
        <nav aria-label="Мобильная навигация" className="flex flex-1 flex-col justify-center gap-1 px-6">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-line-dark py-4"
            >
              <span className="mono-label text-gas">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[22px] text-paper transition-colors group-hover:text-gas">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="space-y-3 border-t border-line-dark px-6 py-6 pb-[calc(84px+env(safe-area-inset-bottom))]">
          <a href={company.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-paper">
            <Phone size={18} className="text-gas" aria-hidden="true" />
            {company.phone}
          </a>
          <p className="text-sm text-mist">{company.hours}</p>
          <LeadButton
            source="modal"
            variant="primary"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Запросить КП
          </LeadButton>
        </div>
      </div>
    )}
    </>
  );
}
