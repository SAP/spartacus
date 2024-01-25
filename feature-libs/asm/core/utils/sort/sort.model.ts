/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type ComparatorResult = -1 | 0 | 1;

/**
 * Comparison function for use in javascript sort algorithms
 *
 * @returns `-1` if item `a` should be first, `0` if they are equal, and `1` if `b` should be first
 */
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export enum SortOrder {
  /** "Least" first */
  ASC = 1,
  /** "Greatest" first */
  DESC = -1,
}
