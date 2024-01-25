/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator, SortOrder } from './sort.model';

/**
 * Sort using basic comparison. Ascending is smaller items first
 */
export function byComparison<T>(
  ordering: SortOrder = SortOrder.ASC
): Comparator<T> {
  return (a: T, b: T) => {
    if (a === b) {
      return 0;
    }
    const lesser = a < b;
    return ((lesser ? -1 : 1) * ordering) as -1 | 1;
  };
}

/**
 * Smaller objects first
 */
export const byComparisonAscending = byComparison(SortOrder.ASC);
