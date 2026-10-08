/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Pattern that extracts modifiers from a Java regexp.
 *
 * Java regexps MAY start with ONE or MANY modifiers like `(?MODIFIERS)PATTERN`,
 * e.g. `(?i)PATTERN` (case-insensitive), `(?iu)PATTERN` (combined).
 *
 * Extracts 3 groups, i.e. for `(?iu)PATTERN`:
 *   1. the original modifiers syntax `(?iu)` (or undefined)
 *   2. the extracted modifiers `iu` (or undefined)
 *   3. the rest of the regexp `PATTERN`
 */
const EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;

/**
 * Pure-Node port of core's `JavaRegExpConverter.toJsRegExp`.
 *
 * Converts a RegExp from Java syntax to JavaScript by recognizing Java regexp
 * modifiers and converting them to the JavaScript ones
 * (e.g. case-insensitive: `(?i)PATTERN` -> `/PATTERN/i`).
 *
 * This is a deliberate copy of the framework logic so the SSR base-site
 * resolver does not depend on Angular DI. A drift test keeps it in sync with
 * `JavaRegExpConverter` in `@spartacus/core`.
 *
 * **CAUTION!** Not all features/modifiers of Java regexps are valid in
 * JavaScript. On an unsupported feature or modifier, `null` is returned
 * instead of a RegExp.
 */
export function toJsRegExp(javaSyntax: string): RegExp | null {
  const parts = javaSyntax.match(EXTRACT_JAVA_REGEXP_MODIFIERS);
  if (!parts) {
    return null;
  }
  const [, , modifiers, jsSyntax] = parts;
  try {
    return new RegExp(jsSyntax, modifiers);
  } catch {
    return null;
  }
}
