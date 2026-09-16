import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Приём заявок с сайта.
 *
 * Защита (специалист по безопасности):
 *  — zod-схема с жёсткими ограничениями длины каждого поля;
 *  — honeypot-поле `website`: заполнено → тихо отклоняем;
 *  — тайминг: форма быстрее 2,5 секунд → бот;
 *  — in-memory rate limit: не более 5 заявок с одного IP в минуту.
 *
 * Уведомление менеджера: точка подключения — см. notifyManager().
 * Для Telegram: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env — код готов.
 */

const productEnum = z.enum(["sug", "natural", "condensate", "png", "other"]);
const sourceEnum = z.enum(["rfq", "modal", "partners"]);

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  company: z.string().trim().min(2, "Укажите компанию").max(120),
  phone: z
    .string()
    .trim()
    .transform((s) => s.replace(/\D/g, ""))
    .refine((d) => d.length === 11, "Телефон в формате +7 …"),
  email: z
    .union([z.literal(""), z.string().trim().email("Некорректный email").max(120)])
    .optional()
    .transform((v) => (v ? v : undefined)),
  product: productEnum,
  volume: z.string().trim().min(1, "Укажите объём").max(80),
  comment: z.string().trim().max(1000).optional().transform((v) => (v ? v : undefined)),
  consent: z.literal(true, { message: "Требуется согласие на обработку данных" }),
  source: sourceEnum.default("rfq"),
  // honeypot: допустимо только пустым; пустая строка нормализуется в undefined
  website: z
    .string()
    .max(0)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  ts: z.number().int().positive().optional(),
});

/** in-memory rate limit (на один процесс — достаточно для сайта-визитки) */
const hits = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

/**
 * Уведомление менеджера о новой заявке.
 * ЗАМЕНИТЬ КРЕДЕНЦИАЛЫ: положите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.
 * Пока уведомление отключено, лиды надёжно хранятся в БД (SQLite, таблица Lead).
 */
async function notifyManager(lead: {
  id: string;
  name: string;
  company: string;
  phone: string;
  product: string;
  volume: string;
  source: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // интеграция ещё не подключена — не роняем приём заявки

  const text =
    `Новая заявка №${lead.id} (${lead.source})\n` +
    `${lead.name}, ${lead.company}\n` +
    `Тел: ${lead.phone}\nПродукт: ${lead.product}\nОбъём: ${lead.volume}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // уведомление не ушло, но заявка уже сохранена — не теряем лид
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок подряд. Позвоните нам — так быстрее." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Проверьте поля формы";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const d = parsed.data;

  // honeypot заполнен или форма отправлена нечеловечески быстро — имитируем успех ботам
  const tooFast = d.ts ? Date.now() - d.ts < 2500 : false;
  if (d.website !== undefined || tooFast) {
    return NextResponse.json({ ok: true, id: "skipped" }, { status: 200 });
  }

  try {
    const lead = await db.lead.create({
      data: {
        name: d.name,
        company: d.company,
        phone: d.phone,
        email: d.email,
        product: d.product,
        volume: d.volume,
        comment: d.comment,
        source: d.source,
      },
    });

    await notifyManager({
      id: lead.id,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      product: lead.product,
      volume: lead.volume,
      source: lead.source,
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("lead create failed:", err);
    return NextResponse.json(
      { ok: false, error: "Сервер не смог сохранить заявку. Попробуйте ещё раз или позвоните." },
      { status: 500 }
    );
  }
}
