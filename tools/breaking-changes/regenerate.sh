#!/bin/bash

# Quick regeneration script for breaking changes documentation
# This script regenerates all documentation and schematics for a version
# and validates the output for common issues

set -e  # Exit on error

VERSION=${1:-"221121_7"}

echo "🚀 Regenerating breaking changes documentation for version ${VERSION}"
echo ""

# Navigate to breaking-changes directory
cd "$(dirname "$0")"

echo "📦 Step 1: Checking if source directories exist..."
if [ ! -d "./src/old" ] || [ ! -d "./src/new" ]; then
    echo "❌ Error: Source directories not found!"
    echo "   Expected: ./src/old and ./src/new"
    echo "   Please run clone.sh and build:libs in both src/old and src/new first."
    exit 1
fi
echo "✓ Source directories found"
echo ""

echo "📁 Checking dist folders..."
if [ ! -d "./src/old/dist" ]; then
    echo "❌ Error: ./src/old/dist not found!"
    echo "   Please run 'npm run build:libs' in ./src/old first."
    exit 1
fi
if [ ! -d "./src/new/dist" ]; then
    echo "❌ Error: ./src/new/dist not found!"
    echo "   Please run 'npm run build:libs' in ./src/new first."
    exit 1
fi
echo "✓ Dist folders found"
echo ""

echo "🔍 Step 2: Extracting API (with fixed functions)..."
echo "   This uses the corrected extract-bundled.ts with all bug fixes."
echo "   Running: npm run extract-all"
echo ""
npm run extract-all
echo ""
echo "✓ Extraction complete"

# Check if extraction produced files
echo "📊 Checking extraction results..."
OLD_API_FILES=$(find ./src/old/temp -name "*.api.json" 2>/dev/null | wc -l | tr -d ' ')
NEW_API_FILES=$(find ./src/new/temp -name "*.api.json" 2>/dev/null | wc -l | tr -d ' ')
echo "   Found $OLD_API_FILES API files in ./src/old/temp"
echo "   Found $NEW_API_FILES API files in ./src/new/temp"
if [ "$OLD_API_FILES" -eq 0 ] || [ "$NEW_API_FILES" -eq 0 ]; then
    echo "❌ Error: Extraction did not produce expected files!"
    exit 1
fi
echo ""

echo "📊 Step 3: Parsing API from extracted files..."
echo "   Running: npm run parse-all"
echo ""
npm run parse-all
echo ""
echo "✓ Parsing complete"

# Check if parsing produced files
if [ ! -f "./src/old/public-api.json" ] || [ ! -f "./src/new/public-api.json" ]; then
    echo "❌ Error: Parsing did not produce public-api.json files!"
    exit 1
fi
echo "   ./src/old/public-api.json exists"
echo "   ./src/new/public-api.json exists"
echo ""

echo "🔄 Step 4: Comparing old and new API..."
echo "   Running: npm run compare"
echo ""
npm run compare
echo ""
echo "✓ Comparison complete"

# Check if comparison produced file
BREAKING_CHANGES_FILE="./data/${VERSION}/breaking-changes.json"
if [ ! -f "$BREAKING_CHANGES_FILE" ]; then
    echo "❌ Error: Comparison did not produce breaking-changes.json!"
    exit 1
fi
echo "   $BREAKING_CHANGES_FILE exists"
echo ""

echo "📝 Step 5: Generating documentation and schematics..."
echo "   Running: npm run gen-all"
echo ""
npm run gen-all
echo ""
echo "✓ Generation complete"
echo ""

echo "📝 Step 6: Running prettier for schematics..."
cd ../..
prettier --config ./.prettierrc --list-different "projects/schematics/src/migrations/**/*.ts" --write
cd -
echo ""

echo ""
echo "🎉 Successfully regenerated breaking changes for version ${VERSION}!"
echo ""
echo "Generated files:"
echo "  - docs/migration/${VERSION}/generated-typescript-changes-doc.md"
echo "  - projects/schematics/src/migrations/${VERSION}/*/data/*.migration.ts"
echo ""
echo "Next steps:"
echo "  1. Review the generated documentation"
echo "  2. Manually review Config abstract classes (may be non-breaking)"
echo "  3. Manually review TypeAlias changes (not all are breaking)"
echo "  4. Check constructor deprecations have proper overload signatures"
