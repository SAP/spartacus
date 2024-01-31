/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator, SortOrder } from './sort.model';

/**
 * Sort using basic comparison. Ascending is true first
 */
export function byBoolean(
  ordering: SortOrder = SortOrder.ASC
): Comparator<boolean> {
  return (a: boolean, b: boolean) => {
    if (a === b) {
      return 0;
    }
    const lesser = a === true;
    return ((lesser ? -1 : 1) * ordering) as -1 | 1;
  };
}

/**
 * True first
 */
export const byBooleanTrueFirst = byBoolean(SortOrder.ASC);
