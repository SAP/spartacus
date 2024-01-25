/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comparator } from './sort.model';

/**
 * Sort using specified item's property and comparator
 */
export function property<T, P extends keyof T>(
  prop: P,
  comparator: Comparator<T[P]>
): Comparator<T>;
// eslint-disable-next-line no-redeclare
export function property<T, P1 extends keyof T, P2 extends keyof T[P1]>(
  prop1: P1,
  prop2: P2,
  comparator: Comparator<T[P1][P2]>
): Comparator<T>;
// eslint-disable-next-line no-redeclare
export function property<T, P1 extends keyof T, P2 extends keyof T[P1]>(
  prop1: P1,
  prop2OrComparator: P2 | Comparator<T[P1]>,
  comparator?: Comparator<T[P1][P2]>
): Comparator<T> {
  if (typeof prop2OrComparator === 'function') {
    return (a: T, b: T) => prop2OrComparator(a[prop1], b[prop1]);
  } else {
    if (comparator) {
      return (a: T, b: T) =>
        comparator(a[prop1][prop2OrComparator], b[prop1][prop2OrComparator]);
    } else {
      throw new Error('No comparator provided');
    }
  }
}
