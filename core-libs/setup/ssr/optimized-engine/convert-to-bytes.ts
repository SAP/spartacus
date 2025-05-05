/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converts a given size (KB, MB, GB) to its equivalent value in bytes.
 *
 * @param amount - The numerical size value.
 * @param unit - The unit of measurement ('KB', 'MB', 'GB').
 * @returns The corresponding size in bytes.
 */
export function convertToBytes(
  amount: number,
  unit: 'KB' | 'MB' | 'GB'
): number {
  const unitMap: Record<string, number> = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  };

  if (unitMap[unit] === undefined) {
    throw new Error(`Invalid unit: ${unit}. Valid units are: KB, MB, GB.`);
  }

  return amount * unitMap[unit];
}
