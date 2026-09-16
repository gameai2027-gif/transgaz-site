"use client";

import { X } from "lucide-react";
import { Modal } from "./modal";
import { useUi } from "./ui-context";
import { LegalContent, legalMeta } from "@/config/legal";

/**
 * Модалка юридических документов (политика ПДн, согласие).
 * Тексты живут в src/config/legal.tsx — юристу достаточно править один файл.
 */
export function LegalModal() {
  const { legalDoc, closeLegal } = useUi();

  return (
    <Modal
      open={legalDoc !== null}
      onClose={closeLegal}
      label={legalDoc ? legalMeta[legalDoc].title : "Документ"}
      size="lg"
    >
      {legalDoc && (
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mono-label text-gas">{legalMeta[legalDoc].updated}</p>
              <h3 className="display mt-2 max-w-md text-[19px] uppercase leading-snug text-ink sm:text-[21px]">
                {legalMeta[legalDoc].title}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeLegal}
              aria-label="Закрыть документ"
              className="flex size-10 shrink-0 items-center justify-center border border-line-light text-ink/60 transition-colors hover:border-gas hover:text-gas"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-7">
            <LegalContent doc={legalDoc} />
          </div>
        </div>
      )}
    </Modal>
  );
}
