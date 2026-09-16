/*
 * Пути к файлам из /public с учётом basePath статичного демо.
 *
 * Почему нужно: next/image в static-экспорте (output: "export" +
 * images.unoptimized) НЕ добавляет basePath к абсолютному src,
 * из-за чего фото на GitHub Pages отдают 404.
 * NEXT_PUBLIC_BASE_PATH инлайнится на этапе сборки:
 *   - демо (GitHub Pages): "/transgaz-site"
 *   - полная сборка/дев:   "" (пустая строка)
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
