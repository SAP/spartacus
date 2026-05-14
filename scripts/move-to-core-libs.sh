#!/usr/bin/env bash

cd "$(dirname "$0")/.."
ROOT=$(pwd)
SCRIPT_NAME="scripts/move-to-core-libs.sh"

# ============================================================
# CONFIGURATION - Edit mappings here: "source:destination"
# If you want to rename a folder, just change the destination:
#   "projects/storefrontlib:core-libs/storefront"
#   "projects/storefrontstyles:core-libs/styles"
# ============================================================
MAPPINGS=(
  "projects/assets:core-libs/assets"
  "projects/core:core-libs/core"
  "projects/schematics:core-libs/schematics"
  "projects/storefrontlib:core-libs/storefrontlib"
  "projects/storefrontstyles:core-libs/storefrontstyles"
)

# Directories to exclude from search-and-replace
EXCLUDE_DIRS=(
  node_modules dist .git .idea .vscode .angular .cache .nx tmp coverage unit-tests-reports
)
# ============================================================

# Build find exclude pattern
EXCLUDE_ARGS=()
for d in "${EXCLUDE_DIRS[@]}"; do
  EXCLUDE_ARGS+=(-path "./$d" -prune -o)
done

echo "=== Step 1: Move folders ==="
for mapping in "${MAPPINGS[@]}"; do
  src="${mapping%%:*}"
  dest="${mapping##*:}"
  if [ -d "$src" ]; then
    mkdir -p "$(dirname "$dest")"
    echo "Moving $src -> $dest"
    if ! mv "$src" "$dest"; then
      echo "ERROR: Failed to move $src -> $dest"
      exit 1
    fi
  else
    echo "SKIP: $src does not exist (already moved?)"
  fi
done
echo "Step 1 complete."

echo ""
echo "=== Step 2: Replace references in files ==="
for mapping in "${MAPPINGS[@]}"; do
  old="${mapping%%:*}"
  new="${mapping##*:}"

  # Skip no-op mappings
  if [ "$old" = "$new" ]; then
    echo "SKIP: '$old' == '$new', nothing to replace"
    continue
  fi

  echo "Replacing '$old' -> '$new' ..."

  # Fast: one grep pass to find matching files, then sed in batch
  find . "${EXCLUDE_ARGS[@]}" -type f \
    ! -name '*.png' ! -name '*.jpg' ! -name '*.jpeg' ! -name '*.ico' \
    ! -name '*.woff' ! -name '*.woff2' ! -name '*.ttf' ! -name '*.eot' \
    ! -name '*.gif' ! -name '*.svg' \
    ! -path "./$SCRIPT_NAME" \
    -print0 2>/dev/null | \
    xargs -0 grep -rl --binary-files=without-match "$old" 2>/dev/null | \
    xargs -I{} sed -i '' "s|$old|$new|g" {}
  echo "  Done with '$old'."
done
echo "Step 2 complete."

echo ""
echo "=== Step 3: Remove old entries from workspaces in package.json ==="
DEST_PATHS_JSON=$(printf '%s\n' "${MAPPINGS[@]}" | sed 's/.*://' | jq -R . | jq -s .)

node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const toRemove = new Set(${DEST_PATHS_JSON});
pkg.workspaces = pkg.workspaces.filter(w => !toRemove.has(w));
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('Remaining workspaces:', pkg.workspaces);
"
echo "Step 3 complete."

echo ""
echo "=== Step 4: npm install ==="
npm install
echo "Step 4 complete."

echo ""
echo "=== Step 5: git add ==="
git add .
echo "Step 5 complete."

echo ""
echo "=== All done! ==="
