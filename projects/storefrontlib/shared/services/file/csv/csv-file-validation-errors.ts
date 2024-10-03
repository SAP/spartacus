/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CsvFileValidationErrors {
  tooLarge?: { maxSize: number };
  tooManyEntries?: { maxEntries: number };
  empty?: boolean;
  notParsable?: boolean;
}
