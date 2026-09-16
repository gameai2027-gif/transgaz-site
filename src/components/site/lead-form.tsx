"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { productOptions, type ProductId } from "@/config/company";
import { formatRuPhone, isValidRuPhone } from "@/lib/phone";
import { useUi } from "./ui-context";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Единая форма заявки (секция RFQ и модальное окно).
 * Антиспам: скрытое поле-ловушка + метка времени рендера —
 * человек физически не отправит форму быстрее 2,5 секунд.
 */
export function LeadForm({
  source,
  defaultProduct = "sug",
  compact = false,
  onDone,
}: {
  source: "rfq" | "modal" | "partners";
  defaultProduct?: ProductId;
  compact?: boolean;
  onDone?: () => void;
}) {
  const { openLegal } = useUi();
  const [status, setStatus] = useState<Status>("idle");
  const [ticket, setTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const renderTs = useRef(Date.now());
  const phoneInvalid = touchedPhone && !isValidRuPhone(phone);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // минимальная клиентская проверка телефона
    if (!isValidRuPhone(phone)) {
      setTouchedPhone(true);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      phone,
      email: String(fd.get("email") ?? "").trim(),
      product: String(fd.get("product") ?? defaultProduct),
      volume: String(fd.get("volume") ?? "").trim(),
      comment: String(fd.get("comment") ?? "").trim(),
      consent: fd.get("consent") === "on",
      source,
      website: String(fd.get("website") ?? ""), // honeypot
      ts: renderTs.current,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
        setStatus("error");
        return;
      }
      setTicket(data.id ?? null);
      setStatus("success");
      onDone?.();
    } catch {
      setErrorMsg("Проблема с соединением. Проверьте интернет и отправьте ещё раз.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <CheckCircle2 size={40} className="text-gas" aria-hidden="true" />
        <div>
          <h3 className="display text-[20px] uppercase text-ink">Заявка принята</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-smoke">
            {ticket && (
              <>
                Номер запроса — <span className="mono-label text-ink">{ticket}</span>.{" "}
              </>
            )}
            Менеджер свяжется с вами в рабочее время — коммерческое предложение готовим
            в течение двух часов.
          </p>
        </div>
        <a href={productHref(defaultProduct)} className="mono-label text-gas underline underline-offset-4">
          Пока ждёте — посмотрите спецификации
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* honeypot: невидим для человека, авто-заполнение — признак бота */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Не заполняйте это поле
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={compact ? "space-y-4" : "grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"}>
        <input
          className="field"
          name="name"
          placeholder="Ваше имя *"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          aria-label="Ваше имя"
        />
        <input
          className="field"
          name="company"
          placeholder="Компания *"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={120}
          aria-label="Компания"
        />
        <div>
          <input
            className="field"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Телефон *"
            value={phone}
            onChange={(e) => setPhone(formatRuPhone(e.target.value))}
            onBlur={() => setTouchedPhone(true)}
            data-invalid={phoneInvalid}
            aria-invalid={phoneInvalid}
            required
            aria-label="Телефон"
          />
          {phoneInvalid && <p className="mt-1.5 text-[12.5px] text-[#c4381d]">Введите номер полностью</p>}
        </div>
        {!compact && (
          <input
            className="field"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email (по желанию)"
            maxLength={120}
            aria-label="Электронная почта"
          />
        )}
        <div className={compact ? "" : "sm:col-span-1"}>
          <select className="field select-chevron" name="product" defaultValue={defaultProduct} aria-label="Тип продукции">
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <input
          className="field"
          name="volume"
          placeholder="Объём, т или м³ в месяц *"
          required
          minLength={1}
          maxLength={80}
          aria-label="Потребность в объёме"
        />
        {!compact && (
          <div className="sm:col-span-2">
            <textarea
              className="field resize-none"
              name="comment"
              rows={3}
              placeholder="Комментарий: адрес доставки, сроки, требования к спецификации"
              maxLength={1000}
              aria-label="Комментарий"
            />
          </div>
        )}
      </div>

      {/* Согласие на обработку ПДн — обязательно по 152-ФЗ */}
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13px] leading-snug text-smoke">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 size-4 shrink-0 accent-gas"
        />
        <span>
          Согласен на обработку персональных данных согласно{" "}
          <button
            type="button"
            className="text-gas underline underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              openLegal("privacy");
            }}
          >
            политике конфиденциальности
          </button>{" "}
          и{" "}
          <button
            type="button"
            className="text-gas underline underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              openLegal("consent");
            }}
          >
            условиями согласия
          </button>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 flex items-start gap-2 text-[13.5px] text-[#c4381d]" role="alert">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-gas px-7 text-[15px] font-semibold text-white transition-colors hover:bg-gas-hot disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          "Получить коммерческое предложение"
        )}
      </button>
      <p className="mono-label mt-3 text-smoke/70">Ответим в рабочее время · обычно в течение 2 часов</p>
    </form>
  );
}

function productHref(id: ProductId) {
  return id === "other" ? "#partners" : "#products";
}
