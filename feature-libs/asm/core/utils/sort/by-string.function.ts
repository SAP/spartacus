/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator, SortOrder } from './sort.model';

/**
 * Compare strings using `String.localeCompare()`.  Ascending is alphabetical (a-z)
 *
 * Note: Nullish items are treated as an empty string.
 */
export function byString(
  ordering: SortOrder = SortOrder.ASC,
  locales?: string | Array<string>,
  opts?: Intl.CollatorOptions
): Comparator<string> {
  return (a: string, b: string) =>
    ((a ?? '').localeCompare(b ?? '', locales, opts) * ordering) as -1 | 0 | 1;
}

/**
 * Alphabetical a-z using `String.localeCompare()`
 *
 * Note: Nullish items are treated as an empty string.
 */
export const byStringAscending = byString(SortOrder.ASC);
