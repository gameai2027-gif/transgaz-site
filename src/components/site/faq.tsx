"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/config/company";
import { SectionHead } from "./section-head";
import { Reveal } from "./reveal";

/**
 * FAQ на возражениях, которые реально слышит отдел продаж.
 * Анимация раскрытия через grid-template-rows — плавно и без JS-хаков.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-paper-2/70" aria-labelledby="faq-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHead
            id="faq-title"
            index="08"
            title="Вопросы и ответы"
            sub="Собрали то, о чём чаще всего спрашивают закупщики перед первым договором."
            tone="light"
          />

          <ul className="border-t border-line-light">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={item.q} delay={i * 40} className="border-b border-line-light">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className={`text-[15.5px] font-semibold transition-colors sm:text-[16.5px] ${isOpen ? "text-gas" : "text-ink"}`}>
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex size-8 shrink-0 items-center justify-center border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-gas text-gas" : "border-line-light text-ink/50"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-smoke">{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
