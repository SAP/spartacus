/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator, SortOrder } from './sort.model';

/**
 * Sorts based on items being nullish or not.  Ascending is nullish items first.
 */
export function byNullish<T>(
  ordering: SortOrder = SortOrder.ASC
): Comparator<T> {
  return (a: T, b: T) => {
    const aNullish = a === null || a === undefined;
    const bNullish = b === null || b === undefined;
    if (aNullish === bNullish) {
      return 0;
    }
    return ((aNullish ? -1 : 1) * ordering) as 1 | -1;
  };
}

export const byNullishFirst = byNullish(SortOrder.ASC);

export const byNullishLast = byNullish(SortOrder.DESC);
