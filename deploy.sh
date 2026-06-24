#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npx >/dev/null 2>&1; then
  echo "Node.js est requis. Installe-le puis lance : npm install && npm run deploy"
  exit 1
fi

npm install
npm run deploy

echo ""
echo "Site publié sur Cloudflare Pages (projet : tuteur-architecture-quiz)"
echo "Première fois : connecte-toi avec « npx wrangler login » si demandé."
