"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Базовое модальное окно: Esc, клик по фону, блокировка прокрутки,
 * перенос фокуса внутрь, aria-атрибуты. Используется всеми модалками сайта.
 */
export function Modal({
  open,
  onClose,
  label,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  size?: "md" | "lg";
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // перенос фокуса в панель для клавиатурной навигации
    const timer = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        "input, select, textarea, button, a[href]"
      );
      (focusable ?? panelRef.current)?.focus();
    }, 30);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/70 backdrop-blur-[6px] sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[92dvh] w-full overflow-y-auto overscroll-contain bg-paper text-ink shadow-2xl outline-none
          ${size === "lg" ? "sm:max-w-2xl" : "sm:max-w-lg"}
          animate-modal-panel sm:rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
}
