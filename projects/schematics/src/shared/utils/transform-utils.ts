/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function parseCSV(
  raw: string | undefined,
  defaultValues: string[] = []
): string {
  if (!raw) {
    return defaultValues.map((x) => `'${x}'`).join(', ');
  }

  return raw
    .split(',')
    .map((x) => `'${x}'`)
    .join(', ');
}
