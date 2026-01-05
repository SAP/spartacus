/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns a new array with all unique items from the two arrays.
 *
 * The order of the items is not guaranteed.
 */
export function mergeArraysWithoutDuplicates<T>(array1: T[], array2: T[]): T[] {
  return Array.from(new Set([...(array1 ?? []), ...(array2 ?? [])]));
}
