#!/usr/bin/env sh
set -eu
: "${DATABASE_URL:?DATABASE_URL required}"
OUT_DIR="${BACKUP_DIR:-.backups}"
mkdir -p "$OUT_DIR"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
FILE="$OUT_DIR/bet-$STAMP.dump"
pg_dump --format=custom --no-owner --no-privileges "$DATABASE_URL" > "$FILE"
sha256sum "$FILE" > "$FILE.sha256"
echo "$FILE"
