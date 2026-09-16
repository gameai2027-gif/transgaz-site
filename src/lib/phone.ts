/**
 * Форматирование ввода телефона в маску +7 (XXX) XXX-XX-XX.
 * Свободная от зависимостей реализация: предсказуемое поведение
 * при удалении символов и вставке из буфера.
 */

export function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  // Вставка номера с 8 или без кода страны
  if (digits.length > 0 && digits[0] !== "7" && digits[0] !== "8") {
    // считаем, что ввели код оператора напрямую
    digits = "7" + digits;
  }
  if (digits.length > 0 && digits[0] === "8") digits = "7" + digits.slice(1);
  digits = digits.slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length === 1) return "+7";

  const [, code] = [digits[0], digits.slice(1, 4)];
  const rest = digits.slice(4);
  let out = "+7 (" + code;
  if (digits.length >= 4) out += ") ";
  if (rest.length > 0) out += rest.slice(0, 3);
  if (rest.length > 3) out += "-" + rest.slice(3, 5);
  if (rest.length > 5) out += "-" + rest.slice(5, 7);
  return out;
}

/** Валидность полной маски: +7 (XXX) XXX-XX-XX = 11 цифр */
export function isValidRuPhone(formatted: string): boolean {
  return formatted.replace(/\D/g, "").length === 11;
}
