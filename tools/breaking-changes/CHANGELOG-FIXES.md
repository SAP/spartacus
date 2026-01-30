# Breaking Changes Tool - Fixes and Improvements

## Date: January 27, 2026 (Update 4 - FINAL FIXES)

### Fixed Three Critical Issues

#### Issue 6: `regenerate.sh` Not Running `extract-all`
**Problem**: Script skipped extraction, parsed old data  
**Fix**: Added `npm run extract-all` as Step 2 in regenerate.sh

#### Issue 7: False Breaking Changes from Semicolon Differences
**Problem**: 
```
Previous: saveCouponCodesFactory(): () => void
Current:  saveCouponCodesFactory(): () => void;
```
Reported as breaking change when only `;` differs.

**Fix**: 
- Updated `getFunctionBreakingChange()` and `getVariableBreakingChange()` in `compare.ts`
- Both now use `normalizeType()` before comparison
- Added `.replace(/;+$/, '')` to `normalizeType()` to remove trailing semicolons

#### Issue 8: 93 Empty TypeAlias Definitions
**Problem**: TypeAlias members were empty, showing blank "Current version"
```
Previous: StockLevel | StockLevelOnHold | ...
Current:  [EMPTY]
```

**Root Cause**: 
- TypeAlias syntax: `type MyType = string` (uses `=`)
- `findTokenRange()` was looking for `:` (like Variables)
- Returned `{startIndex: 0, endIndex: 0}` = empty range

**Fix**:
- Added new range type `'typealias'` to `findTokenRange()`
- `'typealias'` searches for `=` instead of `:`
- TypeAlias now uses: `findTokenRange(excerptTokens, 'typealias')`
- Correctly extracts type between `=` and `;`

#### Files Changed
- `regenerate.sh` - Added extract-all step
- `compare.ts` - Normalize types before comparison, remove trailing semicolons
- `extract-bundled.ts` - Handle TypeAlias with `=` separator

---

## Date: January 27, 2026 (Update 3 - FINAL)

### Fixed `actualStart` Bug in `findTokenRange()`

#### Critical Bug Found
After Update 2, types were still missing. Root cause: `findTokenRange()` had logic error:

```typescript
// BUG:
const actualStart = endIndex;  // actualStart === endIndex!
return { startIndex: actualStart, endIndex };  // Empty range!
```

When `actualStart` was assigned to `endIndex`, the range became empty (`startIndex === endIndex`), causing `getParamType()` to return empty string.

#### Solution
Fixed the logic to properly skip whitespace:

```typescript
// FIXED:
let startIndex = i + 1;
// Skip whitespace tokens
while (startIndex < tokens.length && tokens[startIndex].text.trim() === '') {
  startIndex++;
}
let endIndex = startIndex;
// ... find end ...
return { startIndex, endIndex };  // ✅ Correct range!
```

#### Also Fixed
- `parse.ts` - Better validation in `getParamType()` using optional chaining
- Now checks `startIndex < 0` and `endIndex < 0` separately

#### IMPORTANT
**You MUST regenerate files** to apply these fixes:
```bash
npm run extract-all  # Re-extract with fixed code
npm run parse-all    # Re-parse with fixed validation
npm run compare
npm run gen-all
```

---

## Date: January 27, 2026 (Update 2)

### Fixed Missing Types in Variable Declarations

#### Issue Fixed
After initial fix, some variable declarations had missing types in generated documentation:
```markdown
Previous version:
defaultOccUserProfileConfig: OccConfig

Current version:
defaultOccUserProfileConfig:
```

#### Root Cause
The improved `generateStructuredTokens()` function was too aggressive in splitting tokens, but wasn't consistently generating tokens that `findTokenRange()` could process. Special characters like `:` needed to be separate tokens.

#### Solution
- Refined `generateStructuredTokens()` regex pattern to properly tokenize special characters
- Pattern now matches: identifiers, special chars (`:=;,()[]{}< >|&`), whitespace, other content
- Updated `findTokenRange()` to handle tokens that may contain `:` within them
- Added fallback logic to search for `:` both as separate token and within tokens

---

## Date: January 27, 2026

### Type Normalization and Token Generation Fixes

#### Issues Fixed

1. **Types with $1, $2 suffixes appearing in documentation**
   - Root cause: TypeScript compiler adds `$1`, `$2` suffixes during declaration merging when type names conflict
   - Impact: Generated docs and schematics contained invalid type names like `Location$1`, `User$1`
   - Fix: Added `normalizeTypeString()` function that removes these suffixes

2. **Truncated types in documentation**
   - Root cause: `getParamType()` didn't validate token ranges before processing
   - Impact: Type declarations were cut off, e.g., `Command<{ email: string` instead of `Command<{ email: string; }>`
   - Fix: Added validation in `getParamType()` to check range validity

3. **Broken tokens creating unreadable code blocks**
   - Root cause: `generateExcerptTokens()` used TypeScript Scanner which tokenizes at lexical level
   - Impact: Code was rendered as individual characters/punctuation on separate lines
   - Fix: Completely rewrote `generateExcerptTokens()` to use structured token generation

4. **TypeAlias rendered as array of individual tokens**
   - Fix: Modified `getTypeAliases()` to join tokens; updated `getTypeAliasStateDoc()` to handle both formats

#### Files Modified
- `/tools/breaking-changes/extract-bundled.ts` - Added normalization, rewrote token generation
- `/tools/breaking-changes/parse.ts` - Added normalization and validation
- `/tools/breaking-changes/common.ts` - Updated TypeAlias rendering
- `/tools/breaking-changes/package.json` - Added `validate` and `test` scripts
- `/tools/breaking-changes/readme.md` - Added validation documentation

---

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

Output file: `data/221121_7/breaking-changes.json`

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
