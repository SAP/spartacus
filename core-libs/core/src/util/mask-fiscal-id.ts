/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** Masks a Fiscal ID, exposing its last four characters only for longer values. */
export function maskFiscalId(value = ''): string {
  if (value.length <= 4) {
    return '*'.repeat(value.length);
  }

  return '*'.repeat(value.length - 4) + value.slice(-4);
}
