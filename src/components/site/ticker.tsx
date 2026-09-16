const items = [
  "Котельные и ЖКХ",
  "Промышленные предприятия",
  "АГЗС и дистрибьюторы",
  "Строительство",
  "Агрокомплексы",
  "Газомоторный транспорт",
];

/**
 * Бегущая строка отраслей — между hero и сегментами.
 * Чистый CSS-артефакт (дублированный трек), дубль скрыт от скринридеров.
 */
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="mono-label px-6 text-mist">{t}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gas/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-line-dark bg-ink py-3.5">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
