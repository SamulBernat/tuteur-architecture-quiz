#!/usr/bin/env bash
# Corrige apt sur Ubuntu 24.04 : HTTP bloqué par apt-secure → passer en HTTPS
# + désactive le dépôt Dell OEM (403 / non signé)
set -euo pipefail

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Relance avec sudo :"
  echo "  sudo $0"
  exit 1
fi

echo "=== Sauvegarde des sources apt ==="
cp -a /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak.$(date +%Y%m%d)
if [[ -f /etc/apt/sources.list.d/oem-somerville-muk-meta.list ]]; then
  cp -a /etc/apt/sources.list.d/oem-somerville-muk-meta.list \
    /etc/apt/sources.list.d/oem-somerville-muk-meta.list.bak.$(date +%Y%m%d)
fi

echo "=== Passage des dépôts Ubuntu en HTTPS ==="
sed -i \
  -e 's|http://archive.ubuntu.com/ubuntu/|https://archive.ubuntu.com/ubuntu/|g' \
  -e 's|http://security.ubuntu.com/ubuntu/|https://security.ubuntu.com/ubuntu/|g' \
  /etc/apt/sources.list.d/ubuntu.sources

echo "=== Désactivation du dépôt Dell OEM (dell.archive.canonical.com) ==="
if [[ -f /etc/apt/sources.list.d/oem-somerville-muk-meta.list ]]; then
  sed -i 's/^deb /# deb /' /etc/apt/sources.list.d/oem-somerville-muk-meta.list
fi

echo "=== apt update ==="
apt-get update

echo ""
echo "=== OK — tu peux maintenant installer git : ==="
echo "  sudo apt install -y git gh"
