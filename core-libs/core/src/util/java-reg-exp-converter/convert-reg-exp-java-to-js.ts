/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;

/**
 * Converts Java-style regexp text to a JavaScript RegExp instance.
 *
 * Supported shape:
 * - optional Java modifiers prefix: `(?flags)`
 * - followed by pattern body, for example: `(?i)electronics`.
 *
 * The parser extracts:
 * - group 2: modifiers (`i`, `gimu`, etc.)
 * - group 3: regexp body
 *
 * If Java syntax contains features unsupported by JS RegExp, this function
 * returns `null` instead of throwing.
 *
 * Examples:
 * - `convertRegExpJavaToJs('(?i)electronics')` -> `/electronics/i`
 * - `convertRegExpJavaToJs('(?gimu)^a$')` -> `/^a$/gimu`
 * - `convertRegExpJavaToJs('x*+')` -> `null` (unsupported by JS engine)
 *
 * @param onError Optional callback receiving the original conversion error.
 */
export function convertRegExpJavaToJs(
  javaSyntax: string,
  onError?: (error: unknown) => void
): RegExp | null {
  const parts = javaSyntax.match(EXTRACT_JAVA_REGEXP_MODIFIERS);
  if (!parts) {
    return null;
  }

  const [, , modifiers, jsSyntax] = parts;
  try {
    return new RegExp(jsSyntax, modifiers);
  } catch (error) {
    onError?.(error);
    return null;
  }
}
