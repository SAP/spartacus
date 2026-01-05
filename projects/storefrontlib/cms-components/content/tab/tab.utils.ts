/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * If the passed index its outside of the min and max boundaries,
 * wrap the index exceeding the max boundary to the min boundary or vice versa.
 * Return the index if it does not exceed any boundary.
 */
export function wrapIntoBounds(index: number, max: number, min = 0): number {
  if (index < min) {
    return max;
  } else if (index > max) {
    return min;
  }

  return index;
}
