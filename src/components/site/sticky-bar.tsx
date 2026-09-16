"use client";

import { Phone } from "lucide-react";
import { LeadButton } from "./lead-button";
import { company } from "@/config/company";

/**
 * Мобильная панель действий — главный конверсионный элемент на телефоне.
 * Всегда под большим пальцем: «Позвонить» + «Запросить КП».
 */
export function StickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-line-dark bg-ink/95 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={company.phoneHref}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-line-dark text-[14.5px] font-semibold text-paper transition-colors hover:border-gas hover:text-gas"
        >
          <Phone size={16} aria-hidden="true" />
          Позвонить
        </a>
        <LeadButton source="rfq" variant="primary-sm" className="min-h-[48px]">
          Запросить КП
        </LeadButton>
      </div>
    </div>
  );
}
