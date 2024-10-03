/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator } from './sort.model';

/**
 * Tests both values with type guard and uses comparator if both match the type.
 *
 * If either value fails the type guard, they values are considered equal.
 */
export function whenType<T, S extends T>(
  typeGuard: (value: T) => value is S,
  comparator: Comparator<S>
): Comparator<T> {
  return (a: T, b: T) => {
    if (typeGuard(a) && typeGuard(b)) {
      return comparator(a, b);
    }

    return 0;
  };
}
