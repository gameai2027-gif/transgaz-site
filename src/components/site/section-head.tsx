/**
 * Единая шапка секции: моно-индекс, заголовок и подводка.
 * Держит один ритм на всех блоках страницы.
 */
export function SectionHead({
  id,
  index,
  title,
  sub,
  tone = "light",
  align = "left",
}: {
  id?: string;
  index: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const titleColor = tone === "light" ? "text-ink" : "text-paper";
  const subColor = tone === "light" ? "text-smoke" : "text-mist";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p className={`mono-label flex items-center gap-3 text-gas ${align === "center" ? "justify-center" : ""}`}>
        <span aria-hidden="true">/</span>
        {index}
      </p>
      <h2
        id={id}
        className={`display mt-4 text-[clamp(24px,5.4vw,40px)] uppercase ${titleColor}`}
      >
        {title}
      </h2>
      {sub ? <p className={`mt-4 text-[15px] leading-relaxed sm:text-[16px] ${subColor}`}>{sub}</p> : null}
    </div>
  );
}
