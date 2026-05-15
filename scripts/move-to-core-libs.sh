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
  "projects/storefrontlib:core-libs/storefront"
  "projects/storefrontstyles:core-libs/styles"
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
  if [[ -d "$src" ]]; then
    mkdir -p "$(dirname "$dest")"
    echo "Moving $src -> $dest"
    if ! mv "$src" "$dest"; then
      echo "ERROR: Failed to move $src -> $dest" >&2
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
  if [[ "$old" = "$new" ]]; then
    echo "SKIP: '$old' == '$new', nothing to replace"
    continue
  fi

  echo "Replacing '$old' -> '$new' ..."

  # Fast: one grep pass to find matching files, then sed in batch
  # Use word boundary after folder name to avoid matching e.g. projects/schematics-test when replacing projects/schematics
  find . "${EXCLUDE_ARGS[@]}" -type f \
    ! -name '*.png' ! -name '*.jpg' ! -name '*.jpeg' ! -name '*.ico' \
    ! -name '*.woff' ! -name '*.woff2' ! -name '*.ttf' ! -name '*.eot' \
    ! -name '*.gif' ! -name '*.svg' \
    ! -path "./$SCRIPT_NAME" \
    -print0 2>/dev/null | \
    xargs -0 grep -rl --binary-files=without-match "$old" 2>/dev/null | \
    while IFS= read -r file; do
      # Replace only when NOT followed by a word character (letter, digit) or hyphen
      # This prevents e.g. projects/schematics from matching projects/schematics-test
      sed -i '' -E "s|${old}([^a-zA-Z0-9_-])|${new}\1|g; s|${old}$|${new}|g" "$file"
    done
  echo "  Done with '$old'."
done
echo "Step 2 complete."

echo ""
echo "=== Step 2b: Fix relative paths affected by renames ==="
for mapping in "${MAPPINGS[@]}"; do
  old_folder=$(basename "${mapping%%:*}")
  new_folder=$(basename "${mapping##*:}")

  if [[ "$old_folder" != "$new_folder" ]]; then
    # Find any file that references the old folder name as a relative sibling path (../<old_folder>)
    find . "${EXCLUDE_ARGS[@]}" -type f \( -name '*.json' -o -name '*.ts' -o -name '*.js' \) \
      ! -path "./$SCRIPT_NAME" \
      -print0 2>/dev/null | \
      xargs -0 grep -rl "\.\./\.*$old_folder" 2>/dev/null | \
      while IFS= read -r file; do
        sed -i '' "s|\.\./\(\.*/\)*$old_folder|../$new_folder|g" "$file"
        echo "  Updated: $file (../$old_folder -> ../$new_folder)"
      done
  fi
done
echo "Step 2b complete."

echo ""
echo "=== Step 2c: Fix dist/ paths for renamed folders ==="
for mapping in "${MAPPINGS[@]}"; do
  old_folder=$(basename "${mapping%%:*}")
  new_folder=$(basename "${mapping##*:}")

  if [[ "$old_folder" != "$new_folder" ]]; then
    echo "Replacing 'dist/$old_folder' -> 'dist/$new_folder' ..."
    find . "${EXCLUDE_ARGS[@]}" -type f \
      ! -name '*.png' ! -name '*.jpg' ! -name '*.jpeg' ! -name '*.ico' \
      ! -name '*.woff' ! -name '*.woff2' ! -name '*.ttf' ! -name '*.eot' \
      ! -name '*.gif' ! -name '*.svg' \
      ! -path "./$SCRIPT_NAME" \
      -print0 2>/dev/null | \
      xargs -0 grep -rl --binary-files=without-match "dist/$old_folder" 2>/dev/null | \
      while IFS= read -r file; do
        sed -i '' "s|dist/$old_folder|dist/$new_folder|g" "$file"
        echo "  Updated: $file"
      done
  fi
done
echo "Step 2c complete."

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
echo "=== Step 4: npm run config:update ==="
npm run config:update
echo "Step 4 complete."

echo ""
echo "=== Step 5: npm install ==="
npm install
echo "Step 5 complete."

echo ""
echo "=== Step 6: git add ==="
git add .
echo "Step 6 complete."

echo ""
echo "=== All done! ==="
