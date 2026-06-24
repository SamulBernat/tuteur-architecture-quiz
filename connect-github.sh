#!/usr/bin/env bash
# Connexion Cursor + GitHub en ligne de commande
set -euo pipefail

export PATH="$HOME/.local/bin:$PATH"

echo "=== Connexion GitHub + Cursor ==="
echo ""

# 1. Git (requis pour push/pull)
if ! command -v git >/dev/null 2>&1; then
  echo "Git n'est pas installé."
  echo "Lance d'abord (mot de passe sudo demandé) :"
  echo "  sudo apt update && sudo apt install -y git"
  echo ""
  read -r -p "Appuie sur Entrée une fois git installé, ou Ctrl+C pour quitter…"
  if ! command -v git >/dev/null 2>&1; then
    echo "Git toujours introuvable. Abandon."
    exit 1
  fi
fi

echo "✓ Git : $(git --version)"

# 2. GitHub CLI
if ! command -v gh >/dev/null 2>&1; then
  echo "Installation de GitHub CLI dans ~/.local/bin …"
  mkdir -p ~/.local/bin
  tmp=$(mktemp -d)
  curl -fsSL "https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_linux_amd64.tar.gz" -o "$tmp/gh.tar.gz"
  tar -xzf "$tmp/gh.tar.gz" -C "$tmp"
  cp "$tmp/gh_2.63.2_linux_amd64/bin/gh" ~/.local/bin/gh
  rm -rf "$tmp"
fi

echo "✓ GitHub CLI : $(gh --version | head -1)"
echo ""

# 3. Authentification GitHub (ouvre le navigateur)
echo "--- Étape 1/2 : GitHub ---"
echo "Choisis : GitHub.com → HTTPS → Oui (login avec navigateur)"
echo ""
gh auth login --hostname github.com --git-protocol https --web

# 4. Configurer Git pour utiliser gh (credentials)
gh auth setup-git

echo ""
echo "✓ GitHub connecté : $(gh auth status 2>&1 | head -3)"
echo ""

# 5. Authentification Cursor (compte Cursor, pas GitHub)
echo "--- Étape 2/2 : Cursor ---"
echo "Une page va s'ouvrir pour te connecter à ton compte Cursor."
echo ""
cursor agent login

echo ""
echo "=== Terminé ==="
echo ""
cursor agent status
echo ""
echo "Pour lier GitHub à Cursor (Bugbot, clone intégré, etc.) :"
echo "  Cursor → Paramètres (Ctrl+,) → General → Account → GitHub → Connect"
echo ""
echo "Test rapide GitHub :"
echo "  gh repo list --limit 3"
