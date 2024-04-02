/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator, SortOrder } from './sort.model';

/**
 * Compare numbers. Ascending is smaller numbers first
 */
export function byNumber(
  ordering: SortOrder = SortOrder.ASC
): Comparator<number> {
  return (a: number, b: number) => {
    if (a === b) {
      return 0;
    }
    return ((a - b < 0 ? -1 : 1) * ordering) as -1 | 1;
  };
}

/**
 * Small numbers first
 */
export const byNumberAscending = byNumber(SortOrder.ASC);

/**
 * Large numbers first
 */
export const byNumberDescending = byNumber(SortOrder.DESC);
