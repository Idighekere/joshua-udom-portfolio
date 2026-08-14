#!/usr/bin/env bash
# Manual local backup wrapper.
#
# Loads SANITY_AUTH_TOKEN from .env (if present), otherwise uses whatever is
# already exported in your shell, then runs the Node backup script.
#
# Usage:
#   bash scripts/backup-local.sh
#
# .env is gitignored — tokens never reach the repo.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Load SANITY_AUTH_TOKEN from .env if it's not already set in the environment.
if [[ -z "${SANITY_AUTH_TOKEN:-}" && -f "$ROOT_DIR/.env" ]]; then
  SANITY_AUTH_TOKEN="$(grep -E '^SANITY_AUTH_TOKEN=' "$ROOT_DIR/.env" | head -1 | cut -d '=' -f2- | tr -d '"' || true)"
  export SANITY_AUTH_TOKEN
fi

if [[ -z "${SANITY_AUTH_TOKEN:-}" ]]; then
  echo "Error: SANITY_AUTH_TOKEN is not set."
  echo "  1. Get a read-only token at https://www.sanity.io/manage -> API -> Tokens"
  echo "  2. Either export it:  export SANITY_AUTH_TOKEN=xxxx"
  echo "     or add to .env:    SANITY_AUTH_TOKEN=xxxx"
  exit 1
fi

exec node "$SCRIPT_DIR/backup-local.js"
