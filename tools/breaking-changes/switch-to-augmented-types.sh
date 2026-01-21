#!/bin/bash

# Script to switch all project.json files from declaration-merging to augmented-types builder
# This is necessary for the breaking changes tool to work correctly

TARGET_DIR=$1

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: $0 <target_directory>"
  echo "Example: $0 ../../src/new"
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory $TARGET_DIR does not exist"
  exit 1
fi

echo "Switching builder from 'declaration-merging' to 'augmented-types' in $TARGET_DIR"
echo ""

# Find all project.json files and replace declaration-merging with augmented-types
find "$TARGET_DIR" -name "project.json" -type f | while read -r file; do
  if grep -q "declaration-merging" "$file"; then
    echo "Updating: $file"
    sed -i.bak 's/"\.\/tools\/build-lib:declaration-merging"/"\.\/tools\/build-lib:augmented-types"/g' "$file"
    rm "${file}.bak"
  fi
done

echo ""
echo "✓ Done! Now rebuild the libraries:"
echo "  cd $TARGET_DIR"
echo "  npm run build:libs"
