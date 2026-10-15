/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;

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
