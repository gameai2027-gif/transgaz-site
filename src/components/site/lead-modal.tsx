"use client";

import { X } from "lucide-react";
import { Modal } from "./modal";
import { LeadForm } from "./lead-form";
import { useUi } from "./ui-context";
import { products, productOptions } from "@/config/company";

/**
 * Модальное окно заявки на КП. Открывается из любой точки сайта;
 * продукция предвыбрана, если запрос пришёл из карточки товара.
 */
export function LeadModal() {
  const { leadIntent, closeLead } = useUi();
  const open = leadIntent !== null;
  const product = leadIntent?.product ?? "sug";
  const heading =
    leadIntent?.source === "partners"
      ? "Заявка на партнёрство"
      : leadIntent?.product
        ? `Запросить КП: ${products.find((p) => p.id === product)?.name ?? "продукция"}`
        : "Запросить коммерческое предложение";

  return (
    <Modal open={open} onClose={closeLead} label={heading}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label text-gas">Ответим в рабочее время</p>
            <h3 className="display mt-2 text-[19px] uppercase leading-snug text-ink sm:text-[21px]">
              {heading}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeLead}
            aria-label="Закрыть окно"
            className="flex size-10 shrink-0 items-center justify-center border border-line-light text-ink/60 transition-colors hover:border-gas hover:text-gas"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6">
          <LeadForm
            key={`${leadIntent?.source}-${product}`}
            source={leadIntent?.source ?? "modal"}
            defaultProduct={product}
            compact
            onDone={undefined}
          />
        </div>
      </div>
    </Modal>
  );
}

export function productLabel(id: string) {
  return productOptions.find((o) => o.value === id)?.label ?? id;
}
