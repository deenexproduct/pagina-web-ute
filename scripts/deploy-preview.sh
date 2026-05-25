#!/usr/bin/env bash
# Deploy del build estático a https://soyalantapia.github.io/quem-central-preview/
# Source canónico sigue siendo deenexproduct/pagina-web-ute — esto es solo preview.
#
# Uso:
#   ./scripts/deploy-preview.sh
#
# Lo que hace:
#   1) Build con el base path correcto.
#   2) Crea/actualiza el git dentro de dist/ apuntando al repo preview personal.
#   3) Force-push del build a main → GitHub Pages publica solo.

set -euo pipefail

PREVIEW_REPO="https://github.com/soyalantapia/quem-central-preview.git"
PREVIEW_URL="https://soyalantapia.github.io/quem-central-preview/"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$PROJECT_ROOT"

echo "▸ Build con base /quem-central-preview/"
PUBLIC_SITE=https://soyalantapia.github.io \
  PUBLIC_BASE=/quem-central-preview/ \
  pnpm build

echo "▸ Preparar dist/"
cd dist
touch .nojekyll
if [ ! -d .git ]; then
  git init -b main >/dev/null
  git remote add origin "$PREVIEW_REPO"
fi
git config user.email "alannaimtapia@gmail.com"
git config user.name "Alan Tapia"

git add -A
if git diff --staged --quiet; then
  echo "▸ Sin cambios en el build. Nada para publicar."
  exit 0
fi
git commit -m "deploy: preview $(date -u +%Y-%m-%dT%H:%M:%SZ)" >/dev/null
git push -fu origin main

echo ""
echo "✅ Deploy enviado. Preview en: $PREVIEW_URL"
echo "   (GitHub Pages tarda ~30-90s en propagar)"
