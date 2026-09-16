#!/usr/bin/env bash
# ============================================================
# Статичный экспорт сайта для GitHub Pages (демо-версия).
# API-роуты временно убираются (в статике сервера нет),
# собираемся с NEXT_PUBLIC_DEMO_MODE=1 и basePath /transgaz-site.
# Результат: out/ → ветка gh-pages.
# ============================================================
set -euo pipefail
cd /home/z/my-project

API_DIR="src/app/api"
BACKUP_DIR="/home/z/.gh-api-backup"

cleanup() {
  if [ -d "$BACKUP_DIR" ] && [ ! -d "$API_DIR" ]; then
    mv "$BACKUP_DIR" "$API_DIR"
    echo "[export] api-роуты возвращены на место"
  fi
}
trap cleanup EXIT

if [ -d "$API_DIR" ]; then
  mv "$API_DIR" "$BACKUP_DIR"
  echo "[export] api/lead временно убран из сборки"
fi

rm -rf out
echo "[export] сборка статики..."
STATIC_EXPORT=1 NEXT_PUBLIC_DEMO_MODE=1 npx next build

# .nojekyll — иначе GitHub Pages отбросит каталоги с подчёркиванием (_next)
touch out/.nojekyll
echo "[export] готово: $(du -sh out | cut -f1), файлов: $(find out -type f | wc -l)"
