import { company } from "@/config/company";

/**
 * Вордмарк: сигнальная плашка с каплей-пламенем + название.
 * Вектор встроен в разметку — ноль запросов, идеальная резкость на retina.
 */
export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const textColor = tone === "light" ? "text-paper" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="34" height="34" rx="8" fill="#1B6FE0" />
        <path
          d="M17 7.5c3.8 4.6 6.5 8 6.5 11.4a6.5 6.5 0 1 1-13 0c0-3.4 2.7-6.8 6.5-11.4Z"
          fill="#F4F2ED"
        />
        <path
          d="M17 21.8a2.6 2.6 0 0 1-2.6-2.6c0-1.4 1.2-2.9 2.6-4.7 1.4 1.8 2.6 3.3 2.6 4.7a2.6 2.6 0 0 1-2.6 2.6Z"
          fill="#0C0F12"
        />
      </svg>
      <span className="leading-none">
        <span className={`display block text-[15px] font-bold tracking-[0.06em] ${textColor}`}>
          {company.name}
        </span>
        <span className="mono-label mt-1 block text-[9px] text-mist">оптовые поставки газа</span>
      </span>
    </span>
  );
}
