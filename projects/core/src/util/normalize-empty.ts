/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Normalizes empty strings to `undefined` for use with nullish coalescing
 *
 * ```ts
 * const x = normalizeEmpty(statusText) ?? 'N/A';
 * ```
 */
export function normalizeEmpty(
  str: string | undefined | null
): string | undefined | null {
  return str === '' ? undefined : str;
}
