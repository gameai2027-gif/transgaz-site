"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useUi } from "./ui-context";
import type { ProductId } from "@/config/company";

/**
 * Единая кнопка заявки. Любая точка конверсии сайта открывает
 * модальное окно КП с нужным контекстом (продукция/источник).
 */
type Variant = "primary" | "primary-sm" | "ghost-dark" | "outline-dark" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "inline-flex min-h-[52px] items-center justify-center gap-2 bg-gas px-7 text-[15px] font-semibold text-white transition-colors hover:bg-gas-hot active:bg-gas",
  "primary-sm":
    "inline-flex min-h-[44px] items-center justify-center gap-2 bg-gas px-5 text-[14px] font-semibold text-white transition-colors hover:bg-gas-hot active:bg-gas",
  "ghost-dark":
    "inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-[15px] font-semibold text-ink transition-colors hover:text-gas",
  "outline-dark":
    "inline-flex min-h-[52px] items-center justify-center gap-2 border border-ink/30 px-7 text-[15px] font-semibold text-ink transition-colors hover:border-gas hover:text-gas",
  "outline-light":
    "inline-flex min-h-[52px] items-center justify-center gap-2 border border-paper/25 px-7 text-[15px] font-semibold text-paper transition-colors hover:border-gas hover:text-gas",
};

export function LeadButton({
  source,
  product,
  variant = "primary",
  className = "",
  children,
  onClick,
  ...rest
}: {
  source: "rfq" | "modal" | "partners";
  product?: ProductId;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openLead } = useUi();
  return (
    <button
      type="button"
      className={`${variants[variant]} ${className}`}
      onClick={() => {
        onClick?.();
        openLead({ source, product });
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
