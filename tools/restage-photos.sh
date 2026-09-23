#!/bin/sh
# Cleans up photo backgrounds for the website (macOS only).
#
#   1. Put the photos that need a new background in photos/to-clean/
#   2. Run:  npm run photos            (blush pink backdrop)
#            npm run photos -- cream   (warm cream backdrop)
#            npm run photos -- white   (near-white backdrop)
#   3. The cleaned versions appear in public/images/ with the same name, as .jpg
#
# Originals are never changed. Photos that are already done are skipped, so
# delete the cleaned copy to redo one. Photos that look fine as they are
# (trays, boxes, food packs, photos with people) don't belong in to-clean —
# upload those through the admin panel, or ask for them to be resized as-is.
# Keep full-size originals in photos/originals/; public/ is what gets deployed.
set -e
cd "$(dirname "$0")/.."

STYLE="${1:-blush}"
SRC="photos/to-clean"
BIN="node_modules/.cache/restage"

if [ "$(uname)" != "Darwin" ]; then
  echo "This uses Apple's Vision framework, so it only runs on a Mac."; exit 1
fi

# compile once; running the .swift file directly recompiles every time
if [ ! -x "$BIN" ] || [ tools/restage.swift -nt "$BIN" ]; then
  echo "Preparing the photo tool (first run takes a minute)…"
  mkdir -p "$(dirname "$BIN")"
  swiftc -O tools/restage.swift -o "$BIN"
fi

found=0; done_count=0; skipped=0
for f in "$SRC"/*; do
  [ -f "$f" ] || continue
  case "$(echo "$f" | tr '[:upper:]' '[:lower:]')" in
    *.jpg|*.jpeg|*.png|*.heic|*.webp) ;;
    *) continue ;;
  esac
  found=$((found + 1))
  name="$(basename "$f")"
  out="public/images/${name%.*}.jpg"
  if [ -f "$out" ]; then
    skipped=$((skipped + 1)); continue
  fi
  if "$BIN" "$f" "$out" "$STYLE"; then
    done_count=$((done_count + 1))
  fi
done

if [ "$found" -eq 0 ]; then
  echo "No photos found. Put them in $SRC/ and run this again."
else
  echo "Done: $done_count cleaned, $skipped already done."
fi
