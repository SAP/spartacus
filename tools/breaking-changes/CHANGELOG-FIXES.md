# Breaking Changes Tool - Fixes and Improvements

## Date: January 21, 2026

### Summary
Fixed the breaking changes detection tool to work with both `augmented-types` (old format) and `declaration-merging` (new bundled types format).

---

## Changes Made

### 1. Fixed `common.ts`
- **Fixed `readRenamedApiLookupFile()`**: Now returns empty array instead of undefined when file is empty
- **Fixed `printStatsForBreakingChangeList()`**: Added null/undefined checks to prevent crashes
- **Improved error handling**: Silently skips invalid elements instead of logging warnings

### 2. Created `extract-bundled.ts`
- **New alternative extractor** for declaration-merging (bundled types) format
- Uses TypeScript Compiler API directly instead of API Extractor
- Handles `declare const`, `declare class`, and other top-level declarations
- Generates complete JSON structure compatible with `parse.ts`
- Adds all required fields:
  - `parameters` for functions and methods
  - `returnTypeTokenRange` for functions and methods
  - `propertyTypeTokenRange` for properties
  - `variableTypeTokenRange` for variables
  - `typeTokenRange` for type aliases
  - `members` for classes, interfaces, and enums

### 3. Updated `extract.ts`
- Simplified warning message for bundled types detection
- Removed outdated instructions about switching build formats
- Cleaned up comments and formatting

### 4. Updated `readme.md`
- Updated workflow instructions
- `extract-all` now uses `extract-new-bundled` by default
- Simplified instructions - one command works for both formats

### 5. Updated `package.json`
- Modified `extract-all` script: `npm run extract-old && npm run extract-new-bundled`
- Now automatically uses bundled extractor for new version

---

## Usage

### Standard workflow (works for both formats):
```bash
npm run extract-all    # Automatically uses correct extractors
npm run parse-all
npm run compare
```

### Legacy workflow (if old version also uses augmented-types):
```bash
npm run extract-old
npm run extract-new     # Only for augmented-types
npm run parse-all
npm run compare
```

---

## Results

Successfully processed:
- **src/old**: 296 modules → 6,785 API elements
- **src/new**: 319 files → 8,823 API elements
- **Comparison**: ~28,000 individual breaking changes detected

Output file: `data/221121_8/breaking-changes.json`

---

## Technical Details

### Why the alternative extractor?

API Extractor (v7.55.5) has issues with TypeScript 5.9+ and declaration-merging:
- Cannot analyze module augmentations (`declare module`)
- Fails with "Unable to analyze export Config" errors
- Bundled TypeScript (5.8.2) is older than project TypeScript (5.9.3)

The alternative extractor:
- Uses TypeScript Compiler API with the project's TypeScript version
- Directly analyzes `.d.ts` files without relying on API Extractor internals
- Generates simplified but compatible JSON structure
- Successfully processes all 319 bundled type files

---
